import { Box, CardMedia, Container, Grid, Typography } from '@mui/material';
import logo from '../../../assets/logo/holidazelogo.png';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <Box
            sx={{
                backgroundColor: '#1976d2',
                color: '#000',
                marginTop: 8,
                height: '100px',
            }}
        >
            <Container sx={{ height: '100%' }}>
                <Box
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            alignItems: 'center',
                            height: '100px',
                        }}
                        spacing={3}
                    >
                        <Grid item xs>
                            <Typography
                                sx={{
                                    userSelect: 'none',
                                    marginRight: 1,
                                    opacity: '0.8',
                                }}
                                variant='body2'
                                component='p'
                            >
                                ©{currentYear} Holidaze. All rights reserved.
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sx={{ display: 'flex', justifyContent: 'center' }}
                            xs={6}
                        >
                            <CardMedia
                                component='img'
                                image={logo}
                                alt='Logo'
                                sx={{ height: '80px', width: 'auto' }}
                            />
                        </Grid>
                        <Grid item xs sx={{ width: '100%' }}></Grid>
                    </Box>
                </Box>

                {/* <Grid
                    container
                    sx={{ alignItems: 'center', justifyContent: 'center' }}
                >
                    <Grid item>
                        <Typography
                            sx={{
                                userSelect: 'none',
                                marginRight: 1,
                                opacity: '0.8',
                            }}
                            variant='body2'
                            component='p'
                        >
                            ©{currentYear} Holidaze. All rights reserved.
                        </Typography>
                    </Grid>
                    <Grid item container justifyContent='center'>
                        <CardMedia
                            component='img'
                            image={logo}
                            alt='Logo'
                            sx={{ height: '40px', width: 'auto' }}
                        />
                    </Grid>
                </Grid> */}
            </Container>
        </Box>

        // <Box
        //     sx={{
        //         backgroundColor: '#1976d2',
        //         color: '#000',
        //         marginTop: 8,
        //         height: '100px',
        //     }}
        // >
        //     <Container
        //         sx={{
        //             display: 'flex',
        //             alignItems: 'center',
        //             justifyContent: 'center',
        //         }}
        //     >
        //         <Container
        //             sx={{
        //                 display: 'flex',
        //                 alignItems: 'center',
        //             }}
        //         >
        //             <Typography
        //                 sx={{
        //                     userSelect: 'none',
        //                     marginRight: 1,
        //                     opacity: '0.8',
        //                 }}
        //                 variant='body2'
        //                 component='p'
        //             >
        //                 ©{currentYear} Holidaze. All rights reserved.
        //             </Typography>
        //             <CardMedia
        //                 component='img'
        //                 image={logo}
        //                 alt='Logo'
        //                 sx={{ height: '40px', width: 'auto' }}
        //             />
        //         </Container>
        //     </Container>
        // </Box>
    );
}

export default Footer;
