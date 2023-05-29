import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Error() {
    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            minHeight='100%'
        >
            <div>
                <Typography variant='h4' gutterBottom>
                    Error 404
                </Typography>
                <Typography variant='body1' gutterBottom>
                    This page could not be found
                </Typography>
                <Button
                    sx={{ mt: 2 }}
                    variant='outlined'
                    component={Link}
                    to='/'
                >
                    Go back to homepage
                </Button>
            </div>
        </Box>
    );
}

export default Error;
// { errorCode }
