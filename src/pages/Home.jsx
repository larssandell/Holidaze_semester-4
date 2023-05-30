import { Box, Container, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import { useGetAllVenuesQuery } from '../components/features/rtkSlices/apiSlice';
import ShowCaseCards from '../components/elements/ShowCaseCards';
import useDocumentTitle from '../components/constants';

function useInterval(callback, delay) {
    useDocumentTitle('Holidaze');
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            const intervalId = setInterval(tick, delay);
            return () => clearInterval(intervalId);
        }
    }, [delay]);
}

function Home() {
    const dispatch = useDispatch();
    const {
        data: venuesData = [],
        isLoading,
        isError,
        refetch,
    } = useGetAllVenuesQuery();

    useInterval(() => {
        refetch();
    }, 10 * 60 * 1000);

    useEffect(() => {
        if (!venuesData || isError) {
            dispatch(getAllVenues());
        }
    }, [dispatch, venuesData, isError]);

    if (isLoading) {
        return (
            <Container>
                <Loader />
            </Container>
        );
    }

    return (
        <Container>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h4'>
                    Book your next venue at Holidaze
                </Typography>
                <Typography sx={{ mt: 2 }} variant='h5'>
                    Check out todays new venues!
                </Typography>
            </Box>
            <ShowCaseCards
                name='Newest Venues'
                filterByCreated
                api={venuesData}
            />
            <ShowCaseCards
                name='Low Price Venues'
                filterByPriceLessThan100
                api={venuesData}
            />
            <ShowCaseCards
                name='Price above 10000'
                filterByPriceOver10000
                api={venuesData}
            />
        </Container>
    );
}

export default Home;
