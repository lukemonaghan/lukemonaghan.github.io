import { Box, Stack } from '@mui/material';
import BannerImage from './Banner';
import AboutMe from './AboutMe';
import Portfolio from './Portfolio';
import Contact from './Contact';
import Spacer from './Spacer';
import Nav from './Nav';

export default function App() {
  return (
    <Stack>
      <Nav></Nav>
      <BannerImage></BannerImage>
      <Box id="about">
        <AboutMe></AboutMe>
      </Box>
      <Box id="portfolio">
        <Portfolio></Portfolio>
      </Box>
      <Contact></Contact>
      <Spacer size={20} />
    </Stack>
  );
}
