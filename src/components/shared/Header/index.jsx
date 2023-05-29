import { useState, useEffect, useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
    Avatar,
    Box,
    Container,
    IconButton,
    Drawer,
    MenuItem,
    useMediaQuery,
    useTheme,
    Modal,
    Typography,
    Button,
    BottomNavigation,
    Grid,
} from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { ChevronRight, MenuRounded } from '@mui/icons-material';
import logo from '../../../assets/logo/holidazelogo.png';
import { styleModal } from '../../modals/modalstyle';
import RegisterModal from '../../modals/RegisterModal';
import LoginModal from '../../modals/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../utils/Auth/auth';
import { logOutUser } from '../../features/rtkSlices/dataSlice';
import {
    StyledBottomNavigationAction,
    StyledIconButton,
    StyledAppBar,
    StyledToolbar,
    StyledDiv,
    StyledDivider,
} from '../../MuiStyles';
import { pages } from '../../constants';

function Header() {
    const [open, setOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const toggleRegModal = () => {
        setRegisterModalOpen(!registerModalOpen);
        setLoginModalOpen(false);
    };

    const toggleLoginModal = () => {
        setLoginModalOpen(!loginModalOpen);
        setRegisterModalOpen(false);
    };
    const navigate = useNavigate();

    const theme = useTheme();
    const medium = useMediaQuery(theme.breakpoints.up('md'));
    const { isUser, setIsUser } = useContext(AuthContext);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logOutUser());
        setIsUser(false);
        navigate('/');
    };

    const userProfile = useSelector((state) => state.data);

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
        <StyledAppBar position='sticky' sx={{ mb: 4 }}>
            <Container>
                <Grid>
                    <StyledToolbar disableGutters>
                        <Grid item>
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
                        </Grid>
                        <Grid item xs={12} md={true}>
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
                                        sx={{
                                            my: 2,
                                            color: 'black',
                                            display: 'block',
                                        }}
                                    >
                                        <NavLink to={page.url}>
                                            {page.name}
                                        </NavLink>
                                    </MenuItem>
                                ))}
                            </Box>
                        </Grid>
                        <Grid item>
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
                                        <StyledBottomNavigationAction
                                            label='Logout'
                                            onClick={handleLogOut}
                                            icon={
                                                <LogoutRoundedIcon
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        backgroundColor:
                                                            'transparent',
                                                        color: '#000',
                                                        height: '30px',
                                                        width: 'auto',
                                                        verticalAlign:
                                                            'baseline',
                                                    }}
                                                />
                                            }
                                        />
                                        <StyledBottomNavigationAction
                                            label='User'
                                            component={NavLink}
                                            to='/profile'
                                            icon={
                                                <Avatar
                                                    src={
                                                        userProfile.avatar || ''
                                                    }
                                                    sx={{
                                                        backgroundColor:
                                                            'transparent',
                                                        height: 40,
                                                        width: 40,
                                                        color: '#000',
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
                                        <StyledBottomNavigationAction
                                            label='User'
                                            onClick={toggleLoginModal}
                                            sx={{ marginLeft: 'auto' }}
                                            icon={
                                                <Avatar
                                                    sx={{
                                                        backgroundColor:
                                                            'transparent',
                                                        height: 40,
                                                        width: 40,
                                                        color: '#000',
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
                                        <div
                                            onClick={toggleMenuDrawer}
                                            role='button'
                                        >
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
                                                        <div
                                                            onClick={
                                                                toggleMenuDrawer
                                                            }
                                                        >
                                                            <StyledIconButton
                                                                onClick={
                                                                    handleLogOut
                                                                }
                                                            >
                                                                <LogoutRoundedIcon
                                                                    sx={{
                                                                        fontWeight:
                                                                            'bold',
                                                                        backgroundColor:
                                                                            'transparent',
                                                                        color: '#000',
                                                                        height: 30,
                                                                        width: 30,
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
                                                                        height: 40,
                                                                        width: 40,
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
                                                    <div
                                                        onClick={
                                                            toggleMenuDrawer
                                                        }
                                                    >
                                                        <StyledIconButton
                                                            onClick={
                                                                toggleLoginModal
                                                            }
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
                        </Grid>
                    </StyledToolbar>
                </Grid>
            </Container>

            <Modal
                title='register'
                open={registerModalOpen}
                onClose={toggleRegModal}
                aria-labelledby='register-modal'
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
                open={loginModalOpen}
                onClose={toggleLoginModal}
                aria-labelledby='login-modal'
            >
                <Box sx={styleModal}>
                    <Typography align='center' variant='h4'>
                        Login
                    </Typography>
                    <LoginModal toggleLoginModal={toggleLoginModal} />
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
