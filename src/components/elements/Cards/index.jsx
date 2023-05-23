import {
    Card,
    CardContent,
    CardMedia,
    Container,
    Typography,
    styled,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { useGetAllVenuesQuery } from '../../features/rtkSlices/apiSlice';
import noImage from '../../../assets/noimagewhite.webp';
import Loader from '../../Loader.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setVenues } from '../../features/rtkSlices/dataSlice';

const StyledCard = styled(Card)({
    maxWidth: '400px',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
});

const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: '#000',
});

function Cards() {
    // const dispatch = useDispatch();
    const { data: venues, error, isError, isLoading } = useGetAllVenuesQuery();

    // console.log(venues, error, isError, isLoading);
    // dispatch(setVenues);
    // const venues = useSelector((state) => state.data.apiData);

    if (isLoading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Loader />
            </Container>
        );
    }
    if (isError) {
        return <div>Error occurred:{error} </div>;
    }

    return (
        <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
            {venues.map((venue) => (
                <Grid
                    sx={{
                        minHeight: '450px',
                    }}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={venue.id}
                >
                    <StyledCard
                        component={StyledLink}
                        to={`venues/${venue.id}`}
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            <CardMedia
                                component='img'
                                height='200'
                                image={venue.media[0] || noImage}
                                alt={venue.name || 'No image'}
                                title={venue.name || 'No image'}
                            />
                            <CardContent>
                                <Typography variant='h5' component='div'>
                                    {venue.name}
                                </Typography>
                                <Typography variant='body2'>
                                    {venue.description.slice(0, 192)}
                                </Typography>
                            </CardContent>
                        </div>
                    </StyledCard>
                </Grid>
            ))}
        </Grid>
    );
}

export default Cards;
