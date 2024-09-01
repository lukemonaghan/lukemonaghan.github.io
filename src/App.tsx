import { Stack } from '@mui/material';
import BannerImage from './Banner';
import Portfolio from './Portfolio';
// import Three from './Three';

export default function App() {
  return (
    <Stack>
      <BannerImage></BannerImage>
      <Portfolio></Portfolio>
      {/* <Three></Three> */}
    </Stack>
  );
}
