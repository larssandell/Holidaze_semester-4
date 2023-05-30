import { IconButton, Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import user from '../assets/user.png';

function AvatarIcon(toggle, src, userImg) {
    return (
        <IconButton onClick={toggle}>
            <NavLink>
                <Avatar
                    src={src || ''}
                    sx={{
                        backgroundColor: 'transparent',
                        width: 56,
                        height: 56,
                    }}
                    alt={userImg || user}
                ></Avatar>
            </NavLink>
        </IconButton>
    );
}

export default AvatarIcon;
