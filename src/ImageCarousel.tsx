import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import styles from "./ImageCarousel.module.css";

export default function ImageCarousel({ images }: { images: string[] }) {
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const dragState = useRef<{ startX: number; startScroll: number } | null>(null);
    const draggedDistance = useRef(0);

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        // Whichever item sits in the middle ~20% strip of the scroller counts as active.
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
                    if (index !== -1) setActiveIndex(index);
                });
            },
            { root: scroller, rootMargin: "0px -40% 0px -40%", threshold: 0 }
        );
        itemRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, [images.length]);

    // Dragging is tracked via window listeners (not onPointerMove/onPointerLeave on the
    // scroller) so the gesture survives the cursor leaving the element or passing over
    // a child image — element-level pointerleave was cancelling the drag mid-gesture.
    useEffect(() => {
        if (!isDragging) return;

        function onMove(e: PointerEvent) {
            const scroller = scrollerRef.current;
            if (!dragState.current || !scroller) return;
            const dx = e.clientX - dragState.current.startX;
            draggedDistance.current = Math.abs(dx);
            scroller.scrollLeft = dragState.current.startScroll - dx;
        }
        function onUp() {
            dragState.current = null;
            setIsDragging(false);
        }

        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
        };
    }, [isDragging]);

    function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
        const scroller = scrollerRef.current;
        if (!scroller) return;
        dragState.current = { startX: e.clientX, startScroll: scroller.scrollLeft };
        draggedDistance.current = 0;
        setIsDragging(true);
    }

    function scrollToIndex(index: number) {
        const scroller = scrollerRef.current;
        const item = itemRefs.current[index];
        if (!scroller || !item) return;
        const scrollerRect = scroller.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        const delta = (itemRect.left + itemRect.width / 2) - (scrollerRect.left + scrollerRect.width / 2);
        scroller.scrollTo({ left: scroller.scrollLeft + delta, behavior: "smooth" });
    }

    function onItemClick(index: number) {
        // Ignore the click that follows a drag-to-scroll gesture.
        if (draggedDistance.current > 5) return;
        scrollToIndex(index);
    }

    if (images.length === 0) return null;

    return (
        <div className={styles.carousel}>
            <div
                className={`${styles.scroller} ${isDragging ? styles.dragging : ""}`}
                ref={scrollerRef}
                onPointerDown={onPointerDown}
            >
                {images.map((url, index) => (
                    <div
                        key={url}
                        ref={(el) => { itemRefs.current[index] = el; }}
                        className={`${styles.item} ${index === activeIndex ? styles.active : ""}`}
                        onClick={() => onItemClick(index)}
                    >
                        <img src={url} draggable={false} alt="" />
                    </div>
                ))}
            </div>
            {images.length > 1 && (
                <div className={styles.dots}>
                    {images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            aria-label={`Go to image ${index + 1}`}
                            className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
                            onClick={() => scrollToIndex(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
