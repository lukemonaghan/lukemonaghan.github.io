import { Box, Button, ButtonGroup, Container, Typography } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ImageContainer from './ImageContainer';
import Spacer from './Spacer';

export default function Contact() {
    return (
        <Container id="contact" sx={{ padding: 2 }}>
            <ImageContainer background='contact_background.jpg'>
                <Typography padding={2} variant="h2" color="text.primary">How can we get in contact?</Typography>
            </ImageContainer>
            <Box padding={1} margin={1} sx={{
                minHeight: '128px',
                borderRadius: 4,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(5px)',
                boxShadow: 8,
            }}>
                <Spacer />
                <Typography variant="body" color="text.primary">If you're looking for someone who is passionate about creating immersive experiences and has a strong technical background, I'd love to hear from you. Let's connect and discuss how we can collaborate on your next project.</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Spacer />
                    <ButtonGroup aria-label="Contact Buttons">
                        <Button color="secondary" href="https://github.com/lukemonaghan" target="_blank">
                            Github <GitHubIcon sx={{ paddingLeft: "8px" }} />
                        </Button>
                        <Button color="secondary" href="https://www.linkedin.com/in/lmonaghan" target="_blank">
                            Linkedin <LinkedInIcon sx={{ paddingLeft: "8px" }} />
                        </Button>
                        <Button color="secondary" href="mailto:portfolio@lukemonaghan.com">
                            Email <EmailIcon sx={{ paddingLeft: "8px" }} />
                        </Button>
                    </ButtonGroup>
                </Box>
            </Box>
        </Container>
    );
}