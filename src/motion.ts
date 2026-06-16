import type { Variants } from 'framer-motion';

export const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 },
    },
};

export const viewportOnce = { once: true, amount: 0.2 };
