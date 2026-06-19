import { Box, Chip, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography } from "@mui/material";
import ImageCarousel from "./ImageCarousel";
import glassStyles from "./glassStyle.module.css";
import styles from "./ProjectModal.module.css";

const GROUP_COLORS = [
    'oklch(70% 0.13 0)',
    'oklch(70% 0.13 200)',
    'oklch(70% 0.13 55)',
    'oklch(70% 0.13 155)',
    'oklch(70% 0.13 290)',
];

type SkillGroup = {
    category: string;
    items: string[];
};

export type ProjectModalData = {
    title: string;
    description: string;
    skillGroups: SkillGroup[];
    images: string[];
};

type Props = {
    project: ProjectModalData | null;
    onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
    return (
        <Dialog
            open={project !== null}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                className: glassStyles.glassPanel,
                sx: { borderRadius: '16px', backgroundImage: 'none' },
            }}
        >
            {project && (
                <>
                    <DialogTitle component="div" className={styles.title}>
                        <Typography variant="h5" color="text.primary">{project.title}</Typography>
                        <IconButton onClick={onClose} aria-label="close" size="small" sx={{ color: 'text.secondary', fontSize: '1.2rem', fontWeight: 300 }}>
                            ✕
                        </IconButton>
                    </DialogTitle>

                    <DialogContent className={styles.content}>
                        {project.images.length > 0 && (
                            <Box className={styles.carouselWrapper}>
                                <ImageCarousel images={project.images} />
                            </Box>
                        )}

                        <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
                            {project.description}
                        </Typography>

                        {project.skillGroups.length > 0 && (
                            <>
                                <Divider sx={{ mb: 2, borderColor: 'rgba(236,64,122,0.2)' }} />
                                <Box className={styles.skillGroups}>
                                    {project.skillGroups.map((group, gi) => (
                                        <Box key={gi} className={styles.skillGroup}>
                                            <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1.4 }}>
                                                {group.category}
                                            </Typography>
                                            <Box className={styles.chips}>
                                                {group.items.map((skill, si) => (
                                                    <Chip
                                                        key={si}
                                                        label={skill}
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{ color: 'white', borderColor: GROUP_COLORS[gi % GROUP_COLORS.length] }}
                                                    />
                                                ))}
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </>
                        )}
                    </DialogContent>
                </>
            )}
        </Dialog>
    );
}
