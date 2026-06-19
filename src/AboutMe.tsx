import { Fragment } from 'react';
import { Box, Button, CardMedia, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Spacer from './Spacer';
import { fadeInUp, viewportOnce } from './motion';
import glassStyles from './glassStyle.module.css';
import hoverStyles from './hoverStyle.module.css';
import styles from './AboutMe.module.css';
import experienceData from './data/experience.generated.json';

const profile = (experienceData as { profile: { summary: string } }).profile;
const summaryParagraphs = profile.summary.split(/\n{2,}/).map((p) => p.replace(/\n/g, ' ').trim()).filter(Boolean);

export default function AboutMe() {
    return (
        <Container className={styles.wrapper}>
            <Box
                component={motion.div}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeInUp}
                boxShadow={8}
                className={`${styles.panel} ${glassStyles.glassPanel} ${hoverStyles.borderStyle}`}
            >
                <Stack direction={{ xs: 'column', sm: 'row' }}>
                    <Box className={`${styles.imageBox} ${hoverStyles.liftHover}`}>
                        <CardMedia
                            component="img"
                            image="me.jpg"
                            className={styles.image} />
                    </Box>
                    <Container>
                        <Typography variant="h4" color="text.primary">Heyo, I'm Luke</Typography>
                        <Spacer />
                        <Typography variant="h5" color="text.primary">Lead Developer, Technical Product Manager and Creative Technologist based in Canberra, Australia with a career spanning game development, immersive sports experiences, and enterprise SaaS.</Typography>
                        <Spacer />
                        {summaryParagraphs.map((para, i) => (
                            <Fragment key={i}>
                                <Typography variant="body1" color="text.primary">{para}</Typography>
                                <Spacer />
                            </Fragment>
                        ))}
                        <Typography variant="body1" color="text.primary">Outside of work I'm a hands-on tinkerer — 3D printing, custom electronics, and whatever catches my curiosity. I have a deep appreciation for anything that grows: a garden full of plants, a tank full of fish, and two cats who are largely unimpressed by all of it.</Typography>
                        <Spacer />
                        <Button color="secondary" href="#contact">Contact Me</Button>
                    </Container>
                </Stack>
            </Box>
        </Container>
    );
}
