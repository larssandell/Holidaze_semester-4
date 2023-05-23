import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const UserNav = () => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                flexDirection: 'row',
            }}
        >
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/venues'>Venues</NavLink>
        </Box>
    );
};
