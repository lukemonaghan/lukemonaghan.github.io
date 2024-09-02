import { Stack } from '@mui/material';
import BannerImage from './Banner';
import AboutMe from './AboutMe';
import Portfolio from './Portfolio';
import Contact from './Contact';
import Spacer from './Spacer';
// import Three from './Three';

export default function App() {
  return (
    <Stack>
      <BannerImage></BannerImage>
      <AboutMe></AboutMe>
      <Portfolio></Portfolio>
      <Contact></Contact>
      <Spacer size={20} />
      {/* <Three></Three> */}
    </Stack>
  );
}
