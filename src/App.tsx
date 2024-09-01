import { Stack } from '@mui/material';
import BannerImage from './Banner';
import Portfolio from './Portfolio';
// import Three from './Three';

export default function App() {
  return (
    <Stack>
    <div style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "./cover.jpg",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: "fixed"
    }}>
    </div>
      <BannerImage></BannerImage>
      <Portfolio></Portfolio>
      {/* <Three></Three> */}
    </Stack>
  );
}
