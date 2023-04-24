import * as React from 'react';
// import { useState, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import {
    AppBar,
    Avatar,
    Box,
    Container,
    Divider,
    IconButton,
    // InputBase,
    Menu,
    MenuItem,
    styled,
    Toolbar,
} from '@mui/material';
import { ChevronRight, MenuRounded } from '@mui/icons-material';
import logo from '../../../assets/logo/holidazelogo.png';
import './Header.css';

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
    // alignItems: 'center',
});

// const Search = styled('div')(({ theme }) => ({
//     backgroundColor: 'white',
//     padding: '0 10px',
//     borderRadius: theme.shape.borderRadius,
//     width: '40%',
// }));

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
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
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
                                onClick={handleCloseNavMenu}
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
                            onClick={handleOpenNavMenu}
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
                        <Menu
                            id='hamburger'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <div onClick={handleCloseNavMenu} role='button'>
                                <IconButton>
                                    <ChevronRight tabIndex={0} />
                                </IconButton>
                            </div>
                            <StyledDivider />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <IconButton>
                                    <NavLink to='/profile'>
                                        <Avatar
                                            sx={{
                                                backgroundColor: 'black',
                                                fontSize: 'large',
                                            }}
                                        ></Avatar>
                                    </NavLink>
                                </IconButton>
                            </Box>
                            <StyledDivider />
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                    }}
                                >
                                    <NavLink to={page.url}>{page.name}</NavLink>
                                </MenuItem>
                            ))}
                        </Menu>
                    </StyledDiv>
                </StyledToolbar>
            </Container>
        </StyledAppBar>
    );
}

export default Header;

{
    /* <StyledDiv>
                        <IconButton onClick={() => setNavOpen(true)}>
                            <Avatar
                                sx={{
                                    backgroundColor: 'transparent',
                                    width: 30,
                                    height: 30,
                                }}
                            ></Avatar>
                        </IconButton>
                        <IconButton onClick={() => setNavOpen(true)}>
                            <Avatar
                                sx={{
                                    backgroundColor: 'transparent',
                                    width: 30,
                                    height: 30,
                                }}
                            >
                                <MenuRounded fontSize='large' />
                            </Avatar>
                        </IconButton>
                    </StyledDiv> */
}
