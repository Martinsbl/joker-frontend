import {AppBar, Box, Container, Stack, Toolbar, Typography} from '@mui/material';
import {ReactNode} from "react";
import {VersionNumber} from "./VersionNumber.tsx";
import {ModelProviderChips} from "./ModelProviderChips.tsx";

export function Layout(props: { children: ReactNode }) {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <AppBar position="static" elevation={0}>
                <Toolbar sx={{
                    backgroundColor: 'white',
                    color: 'white',
                }}>
                    <Stack direction='row'
                           justifyContent="space-between"
                           sx={{width: "100%"}}
                    >
                        <Typography variant="h6">Your App Name</Typography>
                        <ModelProviderChips/>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Container component="main" sx={{flexGrow: 1, py: 3}}>
                {props.children}
            </Container>

            <Box component="footer" sx={{py: 3, px: 2, mt: 'auto', backgroundColor: 'primary.main'}}>
                <Typography variant="body2" color="white" align="center">
                    <VersionNumber/>
                </Typography>
            </Box>
        </Box>
    );
};
