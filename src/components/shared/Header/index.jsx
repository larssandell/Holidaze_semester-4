import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
    AppBar,
    Avatar,
    Box,
    Container,
    Divider,
    IconButton,
    Drawer,
    MenuItem,
    styled,
    Toolbar,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { ChevronRight, MenuRounded } from '@mui/icons-material';
import logo from '../../../assets/logo/holidazelogo.png';

// import { theme } from '../theme';

const StyledAppBar = styled(AppBar)({
    alignItems: 'center',
    minHeight: '100px',
});

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    height: '100px',
    padding: '0',
});

const StyledDiv = styled('div')({
    display: 'flex',
    flexDirection: 'row-reverse',
});

// const navInfo = {
//     manager: [
//         { name: 'Home', url: '/' },
//         { name: 'Venues', url: '/venues' },
//         { name: 'Profile', url: '/profile' },
//         { name: 'Create Venue', url: '/create' },
//         { name: 'logout', url: '/create' },
//     ],
//     registered: [
//         { name: 'Home', url: '/' },
//         { name: 'Venues', url: '/venues' },
//         { name: 'Logout', url: '/profile' },
//     ],
//     user: [
//         { name: 'Home', url: '/' },
//         { name: 'Venues', url: '/venues' },
//         { name: 'Register', url: '/profile' },
//     ],
// };

const pages = [
    { name: 'Home', url: '/' },
    { name: 'Venues', url: '/venues' },
    { name: 'Profile', url: '/profile' },
    { name: 'Create Venue', url: '/create' },
];

const StyledDivider = styled(Divider)({
    margin: '10px 0',
});
// const StyledMenu = styled(Menu)({
//     backgroundColor: 'blue',
// });

// const UserBox = styled(Box)(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     gap: '10px',
//     cursor: 'pointer',
//     // [theme.breakpoints.up('sm')]: {
//     //     display: 'none',
//     // },
// }));

function Header() {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const medium = useMediaQuery(theme.breakpoints.up('md'));

    useEffect(() => {
        if (medium) {
            setOpen(false);
        }
    }, [medium]);

    const toggleMenuDrawer = (e) => {
        if (e.type === 'keydown' && (e.key === 'tab' || e.key === 'shift')) {
            return;
        }
        setOpen(!open);
    };

    return (
        <StyledAppBar position='sticky'>
            <Container>
                <StyledToolbar>
                    <NavLink to='/'>
                        <Box
                            component='img'
                            sx={{
                                height: 82,
                                display: { xs: 'block', sm: 'block' },
                            }}
                            alt='Logo'
                            src={logo}
                        ></Box>
                    </NavLink>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'center',
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem
                                key={page.name}
                                onClick={toggleMenuDrawer}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <NavLink to={page.url}>{page.name}</NavLink>
                            </MenuItem>
                        ))}
                    </Box>
                    <StyledDiv
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                        }}
                    >
                        <IconButton
                            aria-label='hamburger icon'
                            aria-controls='hamburger'
                            aria-haspopup='true'
                            onClick={toggleMenuDrawer}
                            color='inherit'
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                            }}
                        >
                            <MenuRounded
                                fontSize='large'
                                sx={{
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                }}
                            />
                        </IconButton>
                        <IconButton>
                            <NavLink to='/profile'>
                                <Avatar
                                    sx={{
                                        backgroundColor: 'transparent',
                                        fontSize: 'large',
                                    }}
                                ></Avatar>
                            </NavLink>
                        </IconButton>
                        <Drawer
                            PaperProps={{
                                sx: {
                                    width: '50%',
                                    color: 'black',
                                },
                            }}
                            anchor='right'
                            open={open}
                            onClose={toggleMenuDrawer}
                        >
                            <Box>
                                <div onClick={toggleMenuDrawer} role='button'>
                                    <IconButton>
                                        <ChevronRight
                                            sx={{
                                                fontSize: 40,
                                            }}
                                        />
                                    </IconButton>
                                </div>
                                <StyledDivider />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <IconButton sx={{ fontSize: 40 }}>
                                        <NavLink to='/profile'>
                                            <Avatar
                                                sx={{
                                                    backgroundColor: 'black',
                                                }}
                                            ></Avatar>
                                        </NavLink>
                                    </IconButton>
                                </Box>
                                <StyledDivider />
                                {pages.map((page) => (
                                    <MenuItem
                                        key={page.name}
                                        onClick={toggleMenuDrawer}
                                        sx={{
                                            my: 2,
                                            color: 'white',
                                            display: 'block',
                                        }}
                                    >
                                        <NavLink to={page.url}>
                                            {page.name}
                                        </NavLink>
                                    </MenuItem>
                                ))}
                            </Box>
                        </Drawer>
                    </StyledDiv>
                </StyledToolbar>
            </Container>
        </StyledAppBar>
    );
}

export default Header;
