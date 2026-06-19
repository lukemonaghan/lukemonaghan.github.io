import ReactMarkdown from "react-markdown";
import { Typography, Box } from "@mui/material";
import type { Components } from "react-markdown";

const components: Components = {
    p: ({ children }) => (
        <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
            {children}
        </Typography>
    ),
    strong: ({ children }) => (
        <Box component="strong" sx={{ fontWeight: 700 }}>
            {children}
        </Box>
    ),
    ul: ({ children }) => (
        <Box component="ul" sx={{ pl: 2.5, mt: 0.5, mb: 1 }}>
            {children}
        </Box>
    ),
    li: ({ children }) => (
        <Typography component="li" variant="body1" color="text.primary">
            {children}
        </Typography>
    ),
};

export default function MarkdownText({ children }: { children: string }) {
    return <ReactMarkdown components={components}>{children}</ReactMarkdown>;
}
