import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import { GitHub as GitHubIcon, LinkedIn as LinkedInIcon, Email as EmailIcon } from '@mui/icons-material';
import Spacer from './Spacer';
import { fadeInUp, viewportOnce } from './motion';
import glassStyles from './glassStyle.module.css';
import styles from './Contact.module.css';
import experienceData from './data/experience.generated.json';

const contact = (experienceData as { profile: { contact: { email: string; linkedin: string; github: string; website?: string } } }).profile.contact;

export default function Contact() {
    return (
        <Container id="contact" className={styles.wrapper}>
            <Box
                component={motion.div}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeInUp}
                boxShadow={8}
                className={`${styles.panel} ${glassStyles.glassPanel}`}
            >
                <Typography variant="h3" color="text.primary" className={styles.heading}>Let's build something great together</Typography>
                <Spacer />
                <Typography variant="h6" color="text.primary" className={styles.subheading}>If you're looking for someone who is passionate about creating immersive experiences and has a strong technical background, I'd love to hear from you. Let's connect and discuss how we can collaborate on your next project.</Typography>
                <Spacer size={3} />
                <Stack direction="row" spacing={3} useFlexGap flexWrap="wrap" justifyContent="center">
                    <Button size="large" variant="contained" color="secondary" href={contact.email} className={styles.ctaButton}>
                        Email Me <EmailIcon className={styles.iconSpacing} />
                    </Button>
                    <Button size="large" variant="outlined" color="secondary" href={contact.github} target="_blank" className={styles.ctaButton}>
                        Github <GitHubIcon className={styles.iconSpacing} />
                    </Button>
                    <Button size="large" variant="outlined" color="secondary" href={contact.linkedin} target="_blank" className={styles.ctaButton}>
                        Linkedin <LinkedInIcon className={styles.iconSpacing} />
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}
