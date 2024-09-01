import { Box, Button, ButtonGroup, CardMedia, Link, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import Spacer from "./Spacer";

class Experience {
    companies: Array<Company> = [];

    constructor(thus: Partial<Experience>) {
        Object.assign(this, thus);
    }
}

class Company {
    title: string = "";
    url: string = "";
    siteUrl: string = "";
    kind: string = "";
    date: string = "";
    roles: Array<Role> = [];
    projects: Array<Project> = [];
    location: string = "";
    description: string = "";

    constructor(thus: Partial<Company>) {
        Object.assign(this, thus);
    }
}

class Role {
    position: string = "";
    constructor(thus: Partial<Role>) {
        Object.assign(this, thus);
    }
}

class Project {
    urls: Array<string> = [];
    title: string = "";
    description: string = "";
    skills: Array<string> = [];

    constructor(thus: Partial<Project>) {
        Object.assign(this, thus);
    }
}

// Simple function to mock an API response
function mockApi(): Promise<string> {
    return new Promise(res => {
        setTimeout(() => {
            const jobs = new Experience({
                companies: [
                    new Company({
                        title: 'Aura Labs',
                        url: './Aura_Animated.gif',
                        siteUrl: 'https://thisisaura.com/',
                        kind: 'Full Time',
                        date: 'Feb 2018 - Sep 2024',
                        location: 'Canberra',
                        description: 'Multi-disciplinary application of skills across engineering, architecture, product management and ownership, UX, UI, design and strategy.',
                        roles: [
                            new Role({
                                position: 'Digital Specialist',
                            }),
                            new Role({
                                position: 'Software Engineer',
                            }),
                            new Role({
                                position: 'Software Architect',
                            }),
                            new Role({
                                position: 'Head of Platform & Architecture',
                            }),
                        ],
                        projects: [
                            new Project({
                                title: 'Aura Platform | Aura OS',
                                urls: ['./Aura_Thumb.jpg', './Aura_OS.png'],
                                description: 'Aura is an Immersive Technology company. Our products are the future of interactive entertainment, fundamentally changing how people consume content. Aura is about doing, not viewing.',
                                skills: ['Unity', 'C#', 'Flutter', 'JavaScript', 'TypeScript', 'React', 'AWS', 'Serverless'],
                            }),
                            new Project({
                                title: 'Missing In Action | MIA',
                                urls: ['./Aura_MIA.jpg','./Aura_MIA2.png'],
                                description: 'MIA is a mixed reality mobile application, launched by immersive technology company Unbnd, offering fans an interactive experience to watch games, with six live NBA games broadcast per week. Bringing the experience of watching games in virtual reality from the convenience of your mobile phone, MIA  transports viewers to a virtual space where everything you want is at your fingertips.  The mixed-reality technology provides a 360-degree ‘virtual theatre’ that provides around-the-clock coverage of the NBA 24/7, including live games, live in-game statistics, highlights, interactive content, panel discussions, lifestyle shows and replays.',
                                skills: ['Unity', 'C#', 'JavaScript', 'TypeScript', 'AWS', 'Serverless'],
                            }),
                        ],
                    }),
                    new Company({
                        title: 'Soon Studios',
                        url: 'I01_Icon.jpg',
                        siteUrl: 'https://installation01.org/',
                        kind: 'Freelance',
                        date: 'Nov 2015 - Dec 2021',
                        location: 'Online',
                        description: 'Developing a fan game inside the Halo universe with a blessing from Microsoft in hand. Working passionately after hours alongside a group of dedicated people around the globe. Nurturing a culture of inclusion and passion leading to many progressing into professional careers.',
                        roles: [
                            new Role({
                                position: 'Software Engineer',
                            }),
                            new Role({
                                position: 'Technical Development Lead',
                            }),
                            new Role({
                                position: 'Consultant',
                            }),
                        ],
                        projects: [
                            new Project({
                                title: 'Installation 01',
                                urls: ['./I01_Thumb.jpg', './I01_Cover.jpg'],
                                description: 'The free, fan-made Halo game being made by Halo lovers from around the world to recreate the experience of the original Halo games on Windows, macOS, and Linux.',
                                skills: ['Unity', 'C#'],
                            }),
                        ],
                    }), 
                    new Company({
                        title: 'Dreamgate',
                        url: 'Dreamgate_Icon.jpg',
                        siteUrl: 'https://dreamgatestudios.com/',
                        kind: 'Full Time',
                        date: 'Apr 2016 - Jan 2018',
                        location: 'Canberra',
                        description: 'Indie studio in Canberra ACT working on ',
                        roles: [
                            new Role({
                                position: 'Jnr Software Programmer',
                            }),
                            new Role({
                                position: 'Software Programmer',
                            }),
                        ],
                        projects: [
                            new Project({
                                title: 'Untitled Mobile Space MMO',
                                urls: ['./Dreamgate_SpaceGame.jpg'],
                                description: 'Untitled Space Game, Android and iOS Mobile MMO.',
                                skills: ['Unity', 'C#', "GLSL", "AWS", "EC2", "Realtime Networking"],
                            }),
                            new Project({
                                title: 'Light in the Dark',
                                urls: ['./Dreamgate_LITD.jpg'],
                                description: 'Light in the Dark tests players’ wits as they help the cute, colourful cartoon species known as totems find and rescue their babies, lost in the labyrinths of long forgotten tombs. Baby totems are reunited with their parents by spotlighting the children in a specific colour, requiring gamers to bend and blend sources of light.',
                                skills: ['Unity', 'C#', "GLSL"],
                            }),
                        ],
                    }),
                    new Company({
                        title: 'Vortexel Games',
                        url: './Vortexel_Logo.png',
                        kind: 'Full Time',
                        date: 'Jan 2015 - Mar 2016',
                        location: 'Canberra',
                        description: 'Founding a game studio with fellow colleagues, working on our own unique IP, leading development, company management, events and budgeting.',
                        roles: [
                            new Role({
                                position: 'Programmer and Co-founder',
                            }),
                        ],
                        projects: [
                            new Project({
                                title: 'Corsair Kings',
                                urls: ['./Vortexel_Thumb.jpg'],
                                description: 'Corsair Kings is a roguelike ship combat game set in a world full of cut-throat pirates and mythical monsters.',
                                skills: ['Unity', 'C#'],
                            }),
                        ],
                    }),
                ],
            });
            res(JSON.stringify(jobs));
        }, 5);
    });
}

export default function ExampleREST() {

    const [state, setState] = React.useState<Experience>();

    React.useEffect(() => {
        mockApi()
            .then(res => JSON.parse(res))
            .then(data => setState(data));
    }, []);

    if (!state) {
        return <div></div> // make skeleton
    }

    return (
        <Box>
            {state.companies.map((company, index) => (
                <Box key={index} padding={2} margin={2} sx={{
                    borderRadius: 4,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 8,
                }}>
                    {CompanyHeader(company)}
                    <Spacer />
                    <Stepper activeStep={10} color="secondary" alternativeLabel>
                        {company.roles.map((role, index) => (
                            <Step key={index}>
                                <StepLabel>{role.position}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Spacer />
                    {company.projects.map((project, index) => (
                        <Box key={index} padding={1} margin={1} sx={{
                            minHeight: '128px',
                            borderRadius: 4,
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(5px)',
                            boxShadow: 8,
                        }}>
                            <Stack direction="row" spacing={2} >
                                {project.urls.map((url, index) => (
                                    <CardMedia
                                        key={index}
                                        component="img"
                                        image={url}
                                        height='256px' sx={{
                                            borderRadius: 4,
                                        }}
                                         />
                                ))}
                            </Stack>
                            <Spacer />
                            <Typography variant="h5" color="text.primary">{project.title}</Typography>
                            <Spacer />
                            <Typography variant="body" color="text.primary">{project.description}</Typography>
                            <Spacer />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                                <ButtonGroup>
                                    {project.skills.map((skill, index) => (
                                        <Button key={index} color="secondary" target="_blank">
                                            {skill}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </Box>
                        </Box>
                    ))}
                </Box>
            ))}
        </Box>
    );
}

function CompanyHeader(company: Company) {
    return <Stack direction="row" spacing={2} style={{ display: 'flex', alignItems: 'center' }}>
        <CardMedia
            component="img"
            image={company.url}
            sx={{ width: '96px', borderRadius: 4 }} />
        <Stack>
            <Typography variant="h4" color="text.primary">{company.title}</Typography>
            <Spacer size={0.5} />
            <Typography variant="body" color="text.primary">{company.kind} | {company.location} | {company.date}</Typography>
            <Spacer size={0.5} />
            <Link color="text.primary" href={company.siteUrl}>{company.siteUrl}</Link>
            <Spacer size={0.5} />
            <Typography variant="body" color="text.primary">{company.description}</Typography>
        </Stack>
    </Stack>;
}
