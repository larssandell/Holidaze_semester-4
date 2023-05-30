import { Box, Typography } from '@mui/material';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';

const FormErrorMessage = ({ message }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                mt: '6px',
            }}
        >
            <PriorityHighRoundedIcon color='error' sx={{ width: '20px' }} />
            <Typography color='red' variant='span' fontSize='14px'>
                {message}
            </Typography>
        </Box>
    );
};

export default FormErrorMessage;
