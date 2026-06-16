import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "./motion";
import glassStyles from "./glassStyle.module.css";
import styles from "./SectionHeader.module.css";

export default function SectionHeader({ children }: { children: string }) {
    return (
        <Box
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeInUp}
            boxShadow={8}
            className={`${styles.header} ${glassStyles.glassPanel}`}
        >
            <Typography variant="h2" color="text.primary">{children}</Typography>
            <Box className={styles.accent} />
        </Box>
    );
}
