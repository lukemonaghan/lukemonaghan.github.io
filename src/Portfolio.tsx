import { Box, CardMedia, Chip, Container, Link, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
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
                        {CompanyHeader(company)}
                        <Spacer />
                        {CompanyRoles(company)}
                        <Spacer />
                        {CompanyProjects(company)}
                    </Box>
                ))}
            </Box>
        </motion.div>
    );
}

function CompanyHeader(company: Company) {
    return <Stack direction="row" spacing={2} className={styles.companyHeaderRow}>
        {company.logo && <CardMedia
            component="img"
            image={company.logo}
            className={styles.companyLogo} />}
        <Stack>
            <Typography variant="h4" color="text.primary">{company.title}</Typography>
            <Spacer size={0.5} />
            <Typography variant="body1" color="text.primary">{company.kind} | {company.location} | {company.date}</Typography>
            <Spacer size={0.5} />
            {company.siteUrl && <Link color="text.primary" href={company.siteUrl}>{company.siteUrl}</Link>}
            <Spacer size={0.5} />
            <Typography variant="body1" color="text.primary">{company.description}</Typography>
        </Stack>
    </Stack>;
}

function CompanyRoles(company: Company) {
    return <Stepper activeStep={10} color="secondary" alternativeLabel>
        {company.roles.map((role, index) => (
            <Step key={index}>
                <StepLabel>{role.position}</StepLabel>
            </Step>
        ))}
    </Stepper>;
}


function CompanyProjects(company: Company) {
    return (
        <Container className={styles.projectsWrapper}>
            {company.projects.map((project, index) => (
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
