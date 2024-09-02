import { Box } from "@mui/material";

export default function BlurContainer({ children }: { children: JSX.Element | JSX.Element[] }) {
    return (
        <Box padding={1} sx={{
            borderRadius: 4,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(5px)',
        }}>
            {children}
        </Box>
    )
}