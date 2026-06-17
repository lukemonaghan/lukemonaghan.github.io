import { Box, CardMedia, Chip, Container, Divider, Link, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Spacer from "./Spacer";
import SectionHeader from './SectionHeader';
import { fadeInUp, staggerContainer, viewportOnce } from './motion';
import glassStyles from './glassStyle.module.css';
import hoverStyles from './hoverStyle.module.css';
import styles from './Portfolio.module.css';
import generatedExperience from './data/experience.generated.json';
import ImageCarousel from './ImageCarousel';

type Project = {
    title: string;
    description: string;
    skills: string[];
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

const companies = generatedExperience as Company[];

export default function Portfolio() {
    return (
        <Container className={styles.wrapper}>
            <SectionHeader>Oh yeah? Prove it.</SectionHeader>
            <Experience/>
        </Container>
    );
}

function Experience() {
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
                        <CompanyProjects {...company} />
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

function CompanyProjects({ projects }: Company) {
    return (
        <Container className={styles.projectsWrapper}>
            {projects.map((project, index) => (
                <Box
                    key={index}
                    boxShadow={8}
                    className={`${styles.projectCard} ${glassStyles.innerPanel} ${hoverStyles.liftHover}`}
                >
                    <ImageCarousel images={project.images} />
                    <Typography variant="h5" color="text.primary">{project.title}</Typography>
                    <Typography variant="body1" color="text.primary">{project.description}</Typography>
                    <Box className={styles.skillsRow}>
                        {project.skills.map((skill, index) => (
                            <Chip key={index} label={skill} color="secondary" variant="outlined" />
                        ))}
                    </Box>
                </Box>
            ))}
        </Container>
    );
}
