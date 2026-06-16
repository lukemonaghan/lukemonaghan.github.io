import { Box, Button, ButtonGroup, CardMedia, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Spacer from './Spacer';
import { fadeInUp, staggerContainer } from './motion';
import glassStyles from './glassStyle.module.css';
import styles from './Banner.module.css';

export default function BannerImage() {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`${glassStyles.glassPanel} ${styles.banner}`}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className={styles.staggerWrap}
      >
        <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }}>
          <CardMedia
            component="img"
            alt="Banner Image"
            image="profile.png"
            className={styles.profileImage}
          />
        </motion.div>
        <Spacer />
        <motion.div variants={fadeInUp}>
          <Typography className={styles.titleText} variant="h1" color="text.primary">
            Luke Monaghan
          </Typography>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Typography className={styles.subtitleText} variant="h5" color="text.primary">
            Making rocks smart daily
          </Typography>
        </motion.div>
        <Spacer />
        <motion.div variants={fadeInUp}>
          {Links()}
        </motion.div>
        <Spacer size={4} />
        <motion.div variants={fadeInUp}>
          {LearnMore()}
        </motion.div>
      </motion.div>
    </Box>
  );
}

function Links() {
  return <ButtonGroup aria-label="Contact Buttons">
      <Button color="secondary" href="https://github.com/lukemonaghan" target="_blank">
          Github <GitHubIcon className={styles.iconSpacing} />
      </Button>
      <Button color="secondary" href="https://www.linkedin.com/in/lmonaghan" target="_blank">
          Linkedin <LinkedInIcon className={styles.iconSpacing} />
      </Button>
      <Button color="secondary" href="mailto:portfolio@lukemonaghan.com">
          Email <EmailIcon className={styles.iconSpacing} />
      </Button>
  </ButtonGroup>;
}

function LearnMore() {
  return <Box color="text.primary" className={styles.learnMore}>
    <Typography color="text.primary" variant="h6">Scroll to learn more about me</Typography>
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <ExpandMoreIcon className={styles.scrollIcon} />
    </motion.div>
  </Box>;
}
