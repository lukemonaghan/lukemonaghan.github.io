import { Box, Stack } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import glassStyles from './glassStyle.module.css';
import styles from './Nav.module.css';

const links = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
];

export default function Nav() {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, window.innerHeight * 0.7, window.innerHeight], [0, 0, 1]);
    const pointerEvents = useTransform(opacity, (value) => (value > 0.5 ? 'auto' : 'none'));

    return (
        <motion.div className={styles.navWrapper} style={{ opacity, pointerEvents }}>
            <Box boxShadow={4} className={`${styles.navBar} ${glassStyles.glassPanel}`}>
                <Stack direction="row" spacing={4}>
                    {links.map((link) => (
                        <Box
                            key={link.href}
                            component="a"
                            href={link.href}
                            color="text.primary"
                            className={styles.link}
                        >
                            {link.label}
                        </Box>
                    ))}
                </Stack>
            </Box>
        </motion.div>
    );
}
