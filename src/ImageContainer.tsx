import { Box } from "@mui/material";
import BlurContainer from "./BlurContainer";

export default function ImageContainer({ children, background }: { children: JSX.Element | JSX.Element[], background: string }) {
    return (
        <Box margin={2} sx={{
            borderRadius: 4,
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: "50% 50%"
        }}>
            <BlurContainer>
                {children}
            </BlurContainer>
        </Box>
    )
}