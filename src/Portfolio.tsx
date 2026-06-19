import { Box, CardMedia, Chip, Container, Divider, Link, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import Spacer from "./Spacer";
import SectionHeader from './SectionHeader';
import { fadeInUp, staggerContainer, viewportOnce } from './motion';
import glassStyles from './glassStyle.module.css';
import hoverStyles from './hoverStyle.module.css';
import styles from './Portfolio.module.css';
import generatedExperience from './data/experience.generated.json';
import ProjectModal, { type ProjectModalData } from './ProjectModal';

type SkillGroup = {
    category: string;
    items: string[];
};

type Project = {
    title: string;
    description: string;
    skillGroups: SkillGroup[];
    images: string[];
};

type Company = {
    title: string;
    logo: string;
    siteUrl: string;
    kind: string;
    date: string;
    location: string;
    description: string;
    roles: { position: string }[];
    projects: Project[];
};

const companies = (generatedExperience as { companies: Company[] }).companies;

export default function Portfolio() {
    const [selectedProject, setSelectedProject] = useState<ProjectModalData | null>(null);

    return (
        <Container className={styles.wrapper}>
            <SectionHeader>Experience</SectionHeader>
            <Experience onProjectClick={setSelectedProject} />
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </Container>
    );
}

function Experience({ onProjectClick }: { onProjectClick: (p: ProjectModalData) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
        >
            <Box>
                {companies.map((company, index) => (
                    <Box
                        key={index}
                        component={motion.div}
                        variants={fadeInUp}
                        boxShadow={8}
                        className={`${styles.companyCard} ${glassStyles.glassPanel}`}
                    >
                        <CompanyHeader {...company} />
                        <Divider sx={{ my: 3, borderColor: 'rgba(236,64,122,0.2)' }} />
                        <CompanyRoles {...company} />
                        <Divider sx={{ my: 3, borderColor: 'rgba(236,64,122,0.2)' }} />
                        <CompanyProjects {...company} onProjectClick={onProjectClick} />
                    </Box>
                ))}
            </Box>
        </motion.div>
    );
}

function CompanyHeader({ logo, title, kind, location, date, siteUrl, description }: Company) {
    return <Stack direction="row" spacing={2} className={styles.companyHeaderRow}>
        {logo && <CardMedia
            component="img"
            image={logo}
            className={styles.companyLogo} />}
        <Stack>
            <Typography variant="h4" color="text.primary">{title}</Typography>
            <Spacer size={0.5} />
            <Typography variant="body1" color="text.primary">{kind} | {location} | {date}</Typography>
            <Spacer size={0.5} />
            {siteUrl && <Link color="text.primary" href={siteUrl}>{siteUrl}</Link>}
            <Spacer size={0.5} />
            <Typography variant="body1" color="text.primary">{description}</Typography>
        </Stack>
    </Stack>;
}

function CompanyRoles({ roles }: Company) {
    return <Stepper activeStep={roles.length} color="secondary" alternativeLabel>
        {roles.map((role, index) => (
            <Step key={index}>
                <StepLabel>{role.position}</StepLabel>
            </Step>
        ))}
    </Stepper>;
}

function CompanyProjects({ projects, onProjectClick }: Company & { onProjectClick: (p: ProjectModalData) => void }) {
    return (
        <Box className={styles.projectsGrid}>
            {projects.map((project, index) => {
                const chips = project.skillGroups[0]?.items.slice(0, 3) ?? [];
                return (
                    <Box
                        key={index}
                        onClick={() => onProjectClick(project)}
                        className={`${styles.projectTile} ${hoverStyles.liftHover}`}
                    >
                        {project.images[0]
                            ? <img src={project.images[0]} className={styles.tileImage} alt={project.title} />
                            : <Box className={styles.tilePlaceholder} />
                        }
                        <Box className={styles.tileOverlay}>
                            <Typography variant="h6" fontWeight={700} color="white" sx={{ lineHeight: 1.2 }}>
                                {project.title}
                            </Typography>
                            {chips.length > 0 && (
                                <Box className={styles.tileChips}>
                                    {chips.map((skill, i) => (
                                        <Chip key={i} label={skill} size="small" variant="outlined" sx={{
                                            bgcolor: 'rgba(0,0,0,0.45)',
                                            color: 'rgba(255,255,255,0.85)',
                                            borderColor: 'rgba(255,255,255,0.15)',
                                            fontSize: '0.65rem',
                                            height: 20,
                                        }} />
                                    ))}
                                </Box>
                            )}
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
}
