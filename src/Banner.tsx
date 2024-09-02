import { Box, Button, ButtonGroup, CardMedia, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Spacer from './Spacer';

export default function BannerImage() {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        height: '100vh',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CardMedia
        component="img"
        alt="Banner Image"
        image="profile.png"
        sx={{
          width: '170px',
        }}
      />
      <Spacer />
      <Typography sx={{
        textShadow: '8px 8px 8px rgba(0, 0, 0, 1)',
        fontWeight: '600'
      }} variant="h1" color="text.primary">
        Luke Monaghan
      </Typography>
      <Typography sx={{
        textShadow: '8px 8px 8px rgba(0, 0, 0, 1)',
        fontWeight: '300'
      }} variant="h5" color="text.primary">
        Making rocks smart daily
      </Typography>
      <Spacer />
      {Links()}
      <Spacer size={4} />
      {LearnMore()}
    </Box>
  );
}

function Links() {
  return <ButtonGroup aria-label="Contact Buttons">
      <Button color="secondary" href="https://github.com/lukemonaghan" target="_blank">
          Github <GitHubIcon sx={{paddingLeft: "8px"}} />
      </Button>
      <Button color="secondary" href="https://www.linkedin.com/in/lmonaghan" target="_blank">
          Linkedin <LinkedInIcon sx={{paddingLeft: "8px"}} />
      </Button>
      <Button color="secondary" href="mailto:portfolio@lukemonaghan.com">
          Email <EmailIcon sx={{paddingLeft: "8px"}} />
      </Button>
  </ButtonGroup>;
}

function LearnMore() {
  return <Box color="text.primary" sx={{ textAlign: 'center' }}>
    <Typography color="text.primary" variant="h6">Scroll to learn more about me</Typography>
    <ExpandMoreIcon sx={{ height: "2em", width: "2em" }} />
  </Box>;
}
