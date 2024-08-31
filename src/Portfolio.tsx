import Grid from '@mui/material/Grid2';
import { Box, Container } from '@mui/material';
import ExampleREST from './ExampleREST';

function PortfolioBox() {
    return (
      <Box sx={{
        minHeight: '200px',
        borderRadius: 4,
        bgcolor: 'primary.main',
        boxShadow: 8,
        '&:hover': {
          bgcolor: 'primary.dark',
        },
      }}>
        <ExampleREST></ExampleREST>
      </Box>
    )
  }

export default function App() {
    return (
    <Container>
        <Grid container spacing={2}>
        <Grid size={8}>
            <PortfolioBox></PortfolioBox>
        </Grid>
        <Grid size={4}>
            <PortfolioBox></PortfolioBox>
        </Grid>
        <Grid size={4}>
            <PortfolioBox></PortfolioBox>
        </Grid>
        <Grid size={8}>
            <PortfolioBox></PortfolioBox>
        </Grid>
        </Grid>
    </Container>
    );
  }