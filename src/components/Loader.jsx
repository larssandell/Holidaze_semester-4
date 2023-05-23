import { Container } from '@mui/material';
import { Bars } from 'react-loader-spinner';

function Loader() {
    return (
        <Container>
            <Bars
                height='80'
                width='80'
                color='#023059'
                ariaLabel='bars-loading'
                visible={true}
            />
        </Container>
    );
}

export default Loader;
