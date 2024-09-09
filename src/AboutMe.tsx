import { Box, Button, CardMedia, Container, Stack, Typography } from '@mui/material';
import Spacer from './Spacer';
import ImageContainer from './ImageContainer';
import { borderStyle } from './borderStyle';

export default function AboutMe() {
    return (
        <Container sx={{ padding: 2 }}>
            <ImageContainer background='about_background.jpg'>
            <Typography padding={2} variant="h2" color="text.primary">Hey! Who are you?</Typography>
            </ImageContainer>
            <Box padding={1} margin={2} sx={{
                minHeight: '128px',
                borderRadius: 4,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(5px)',
                boxShadow: 8,
                ...borderStyle,
            }}>
                <Stack direction="row">
                    <Box width="50%">
                        <CardMedia
                            component="img"
                            image="me.jpg"
                            width='256px'
                            height='100%'
                            sx={{
                                borderRadius: 4,
                                objectPosition: "35% 50%"
                            }} />
                    </Box>
                    <Container>
                        <Typography variant="h4" color="text.primary">Heyo, I'm Luke</Typography>
                        <Spacer />
                        <Typography variant="h5" color="text.primary">A multi-disciplinary creative technologist focusing on engaging experiences in Canberra, Australia.</Typography>
                        <Spacer />
                        <Typography variant="body" color="text.primary">I'm passionate about pushing the boundaries of what's possible and building interactivity into everyday life. </Typography>
                        <Spacer />
                        <Typography variant="body" color="text.primary">Throughout my career so far i've had the opportunity to work on a wide range of projects and products, from mobile games and applications, AR/VR experiences to PaaS platforms. I'm also a big believer in open source and the power of community, and I've spent time contributing to fan projects and initiatives helping grow large fan bases and empowering colleagues to pursue their dreams.<p /> In my free time, I'm a passionate tinkerer. I love diving into projects that combine technology with creativity. Whether it's building custom electronics, experimenting with 3D printing, or learning a new programming language, I'm always looking for new ways to push my boundaries and learn something new. I also have a deep appreciation for nature and enjoy spending time outdoors gardening, looking after my many fish, hanging out with my cats, and exploring natures beauty.<p /> If anything here interests you see the details below on how we can get in contact, im always excited to hear about amazing projects.</Typography>
                        <Spacer />
                        <Button color="secondary" href="#contact">Contact Me</Button>
                    </Container>      
                </Stack>
            </Box>
        </Container>
    );
}