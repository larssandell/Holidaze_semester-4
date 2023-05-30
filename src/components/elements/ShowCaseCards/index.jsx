import {
    CardContent,
    CardMedia,
    Container,
    Divider,
    Grid,
    Typography,
} from '@mui/material';
import { StyledCard } from '../../MuiStyles';
import { NavLink } from 'react-router-dom';
import noImage from '../../../assets/noimagewhite.webp';

function ShowCaseCards(props) {
    const {
        api,
        filterByCreated,
        filterByPriceLessThan100,
        filterByPriceOver10000,
        name,
    } = props;

    const currentDate = new Date().toISOString().split('T')[0];

    const filteredApi = api.filter((venue) => {
        if (filterByCreated && venue.created.split('T')[0] === currentDate) {
            return true;
        }
        if (filterByPriceLessThan100 && venue.price < 100) {
            return true;
        }
        if (filterByPriceOver10000 && venue.price > 10000) {
            return true;
        }
        return false;
    });
    const limitedFilteredApi = filteredApi.slice(0, 4);
    return (
        <Container sx={{ my: 4 }}>
            <Typography variant='h6'>{name}</Typography>
            <Divider sx={{ border: 1, mb: 2 }} />
            <Grid container spacing={2}>
                {limitedFilteredApi.map((venue) => (
                    <Grid item xs={12} sm={6} md={4} key={venue.id}>
                        {console.log()}
                        <StyledCard
                            component={NavLink}
                            className='card_link'
                            to={`venues/${venue.id}`}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = noImage;
                            }}
                        >
                            <div>
                                <CardMedia
                                    component='img'
                                    height='200'
                                    src={
                                        venue.media[0]
                                            ? venue.media[0]
                                            : noImage
                                    }
                                    alt={venue.name || 'No image'}
                                    title={venue.name || 'No image'}
                                    onError={(e) => {
                                        e.target.src = noImage;
                                    }}
                                />
                                <CardContent>
                                    <Typography variant='h6' component='div'>
                                        {venue.name.slice(0, 22)}
                                    </Typography>
                                    <Typography variant='body2' component='div'>
                                        {`Country: ${venue.location.city}`}
                                    </Typography>
                                    <Typography variant='body2' component='div'>
                                        {`Price per night: $${venue.price}`}
                                    </Typography>
                                </CardContent>
                            </div>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default ShowCaseCards;
