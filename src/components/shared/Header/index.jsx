import { useState, useEffect, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
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
    Modal,
    Typography,
    Button,
    BottomNavigation,
    BottomNavigationAction,
} from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { ChevronRight, MenuRounded } from '@mui/icons-material';
// import Modals from '../../modals/modals';
import logo from '../../../assets/logo/holidazelogo.png';
import useStatus from '../../hooks/useStatus';
import { styleModal } from '../../modals/modalstyle';
import RegisterModal from '../../modals/RegisterModal';
import LoginModal from '../../modals/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../utils/Auth/auth';
import { logOutUser } from '../../features/rtkSlices/dataSlice';
import ModalComp from '../../modals/ModalComp';
// import { AuthContext } from '../../utils/Auth/auth';

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

const pages = [
    { name: 'Home', url: '/' },
    { name: 'Venues', url: '/venues' },
];

const StyledDivider = styled(Divider)({
    margin: '10px 0',
});
// const StyledMenu = styled(Menu)({
//     backgroundColor: 'blue',
// });
const StyledIconButton = styled(IconButton)({
    backgroundColor: 'transparent',
    color: '#000',
    width: '100px',
    height: '100px',
    '&:hover': {
        color: '#blue',
        backgroundColor: 'transparent',
    },
});

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
    const { status: regModal, toggleStatus: toggleRegModal } = useStatus(false);
    const { status: loginModal, toggleStatus: toggleLoginModal } =
        useStatus(false);

    const theme = useTheme();
    const medium = useMediaQuery(theme.breakpoints.up('md'));
    const { isUser, setIsUser } = useContext(AuthContext);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logOutUser());
        console.log('Loggged OUT');
    };

    const userProfile = useSelector((state) => state.data);
    console.log('userAvatar', userProfile.avatar);

    console.log('is logged inn: ', isUser);
    // const { isLoggedIn, login, logout } = useContext(AuthContext);

    // const switchSignup = (event) => {
    //     setLoginOpen(false)
    //     setSignupOpen(true)
    //   }

    // console.log(isLoggedIn);
    useEffect(() => {
        if (medium) {
            setOpen(false);
        }
    }, [medium]);

    // const handleAvatarClick = () => {
    //     if (loggedIn) {
    //         console.log('Open profile or perform logout');
    //     } else {
    //         toggleLoginModal();
    //     }
    // };

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
                                sx={{ my: 2, color: 'black', display: 'block' }}
                            >
                                <NavLink to={page.url}>{page.name}</NavLink>
                            </MenuItem>
                        ))}
                    </Box>
                    <StyledDiv
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
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

                        {/* ------Nav menu--------- */}
                        {isUser ? (
                            <BottomNavigation
                                sx={{
                                    backgroundColor: 'transparent',
                                    display: { xs: 'none', md: 'flex' },
                                }}
                            >
                                <BottomNavigationAction
                                    label='Logout'
                                    onClick={handleLogOut}
                                    icon={
                                        <LogoutRoundedIcon
                                            sx={{
                                                fontWeight: 'bold',
                                                backgroundColor: 'transparent',
                                                color: '#fff',
                                                height: '30px',
                                                width: 'auto',
                                                verticalAlign: 'baseline',
                                            }}
                                        />
                                    }
                                />
                                <BottomNavigationAction
                                    label='User'
                                    component={NavLink}
                                    to='/profile'
                                    icon={
                                        <Avatar
                                            src={userProfile.avatar || ''}
                                            sx={{
                                                backgroundColor: 'transparent',
                                                height: '60px',
                                                width: 'auto',
                                            }}
                                        />
                                    }
                                />
                            </BottomNavigation>
                        ) : (
                            <BottomNavigation
                                sx={{
                                    backgroundColor: 'transparent',
                                    display: { xs: 'none', md: 'flex' },
                                }}
                            >
                                <BottomNavigationAction
                                    label='User'
                                    onClick={toggleLoginModal}
                                    icon={
                                        <Avatar
                                            sx={{
                                                backgroundColor: 'transparent',
                                                height: '60px',
                                                width: 'auto',
                                                color: '#fff',
                                            }}
                                        />
                                    }
                                />
                            </BottomNavigation>
                        )}
                        {/* ------Nav Drawer--------- */}
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
                                <Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            my: 1,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {isUser ? (
                                            <>
                                                <div onClick={toggleMenuDrawer}>
                                                    <StyledIconButton
                                                        onClick={handleLogOut}
                                                    >
                                                        <LogoutRoundedIcon
                                                            sx={{
                                                                fontWeight:
                                                                    'bold',
                                                                backgroundColor:
                                                                    'transparent',
                                                                color: '#000',
                                                                height: '40px',
                                                                width: 'auto',
                                                                verticalAlign:
                                                                    'baseline',
                                                            }}
                                                        />
                                                    </StyledIconButton>
                                                    <StyledIconButton
                                                        component={Link}
                                                        to='/profile'
                                                    >
                                                        <Avatar
                                                            sx={{
                                                                backgroundColor:
                                                                    'transparent',
                                                                height: '90px',
                                                                width: 'auto',
                                                                color: '#000',
                                                            }}
                                                            src={
                                                                userProfile.avatar
                                                            }
                                                        />
                                                    </StyledIconButton>
                                                </div>
                                            </>
                                        ) : (
                                            <div onClick={toggleMenuDrawer}>
                                                <StyledIconButton
                                                    onClick={toggleLoginModal}
                                                >
                                                    <Avatar
                                                        sx={{
                                                            backgroundColor:
                                                                'transparent',
                                                            height: '90px',
                                                            width: 'auto',
                                                            color: '#000',
                                                        }}
                                                    />
                                                </StyledIconButton>
                                            </div>
                                        )}
                                    </Box>
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
            <Modal
                title='register'
                open={regModal}
                onClose={toggleRegModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={styleModal}>
                    <Typography align='center' variant='h4'>
                        Register
                    </Typography>

                    <RegisterModal />
                    <Button
                        onClick={toggleLoginModal}
                        fullWidth
                        variant='outlined'
                    >
                        Back to Login
                    </Button>
                </Box>
            </Modal>
            <Modal
                title='Login'
                open={loginModal}
                onClose={toggleLoginModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={styleModal}>
                    <Typography align='center' variant='h4'>
                        Login
                    </Typography>
                    <LoginModal />
                    <Button
                        onClick={toggleRegModal}
                        fullWidth
                        variant='outlined'
                    >
                        Register
                    </Button>
                </Box>
            </Modal>
        </StyledAppBar>
    );
}

export default Header;
