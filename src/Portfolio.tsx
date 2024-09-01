import { Box, Container, Typography } from '@mui/material';
import Experience from './Experience';

export default function App() {
    return (
        <Container sx={{ padding: 2 }}>
            <Box padding={2} margin={2} sx={{
                borderRadius: 4,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(10px)',
                boxShadow: 8,
            }}><Typography variant="h2" color="text.primary">Experience</Typography></Box>
            <Experience></Experience>
        </Container>
    );
}