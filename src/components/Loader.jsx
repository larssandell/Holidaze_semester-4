import { Box, Container } from '@mui/material';
import { Bars } from 'react-loader-spinner';

function Loader() {
    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                my: 'auto',
                alignItems: 'center',
            }}
        >
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                minHeight='80vh'
            >
                <Bars
                    height='80'
                    width='80'
                    color='#023059'
                    ariaLabel='bars-loading'
                    visible={true}
                />
            </Box>
        </Container>
    );
}

export default Loader;
