import { Box } from "@mui/material";
import React from "react";

const { useEffect, useState } = React;

class Item {
    title: string = "";
    url: string = "";

    constructor() {}
}

// Simple function to mock an API response
function mockApi(): Promise<string> {
    return new Promise(res => {
        setTimeout(() => {
            const item = new Item();
            item.title = "Hello World";
            item.url = "https://picsum.photos/1000/1000";
            res(JSON.stringify(item));
        }, 2000);
    });
}

export default function ExampleREST() {

    const [state, setState] = useState<Item>();

    useEffect(() => {
        mockApi()
            .then(res => JSON.parse(res))
            .then(data => setState(data));
    }, []);

    return (
        <Box>
            <h1>{state?.title || "Item Title"}</h1>
            <Box
            component="img"
            sx={{
                width: "100%",
                height: 300,
                objectFit: "cover",
                objectPosition: "50% 75%",
                overflow: 'hidden'
            }}
            src={state?.url || 'cover.jpg'}
            />
        </Box>
    );
}