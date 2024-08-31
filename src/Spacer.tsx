import { Box } from "@mui/material";

export default function Spacer({size = 2}) {
    return (
        <Box sx={{ margin: size }}></Box>
    );
}