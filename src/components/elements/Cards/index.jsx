import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    styled,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useGetShowCaseVenuesQuery } from '../../features/api/apiSlice';
const StyledCard = styled(Card)({
    maxWidth: '400px',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
});

function Cards() {
    const {
        data: venues,
        error,
        isError,
        isLoading,
    } = useGetShowCaseVenuesQuery();
    console.log(venues);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error occurred: {error}</div>;
    }

    return (
        <Grid container spacing={2}>
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
                                image={venue.media[0]}
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
                        <CardActions>
                            <Button variant='outlined'>Hello</Button>
                        </CardActions>
                    </StyledCard>
                </Grid>
            ))}
        </Grid>
    );
}

export default Cards;
