import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    styled,
    Container,
    Box,
    IconButton,
} from '@mui/material';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import noImage from '../assets/noimagewhite.webp';
// import Loader from '../../Loader.jsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import useStatus from '../components/hooks/useStatus';

export const StyledCard = styled(Card)({
    maxWidth: '400px',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
});

const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: '#000',
});

function Venues() {
    const venues = useSelector((state) => state.data.apiData);
    const [filteredData, setFilteredData] = useState([]);

    const { status: filter, toggleStatus: toggleFilter } = useStatus(false);

    const handleDataReceived = (data) => {
        setFilteredData(data);
    };

    return (
        <Container>
            <div>Venues</div>
            <Container sx={{ position: 'relative', maxWidth: '700px' }}>
                <SearchBar onDataReceived={handleDataReceived} />
                <Box
                    display='flex'
                    top='calc(100% + 1rem)'
                    left={0}
                    flexWrap='wrap'
                    justifyContent='center'
                    marginTop='1rem'
                    position='absolute'
                    zIndex={1}
                    style={{
                        width: '100%',
                        margin: '0.5rem',
                        background: 'white',
                    }}
                >
                    {filteredData.map((item) => (
                        <Card
                            key={item.id}
                            component={StyledLink}
                            to={`/venues/${item.id}`}
                            style={{ margin: '0.5rem', width: '100%' }}
                        >
                            <CardMedia
                                component='img'
                                height='200'
                                image={item.media[0] || noImage}
                                alt={item.name}
                                style={{ objectFit: 'cover' }}
                            />
                            <CardContent>
                                <p>{item.name}</p>
                                <p>{item.location.country}</p>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
            <Box sx={{ my: 1 }}>
                <IconButton onClick={toggleFilter}>
                    {filter ? (
                        <TuneRoundedIcon color='black' />
                    ) : (
                        <TuneRoundedIcon color='black' />
                    )}
                </IconButton>
                {filter && (
                    <Box>
                        <Filters />
                    </Box>
                )}
            </Box>
            {/* <Box sx={{ my: 1 }}>
                <IconButton onClick={toggleFilter}>
                    <TuneRoundedIcon color='black' />
                </IconButton>
                <Box open={filter} onClose={toggleFilter}>
                    <Filters />
                </Box>
            </Box> */}
            <div>
                <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                    {venues.map((venue) => (
                        <Grid key={venue.id} item xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component={Link}
                                    to={`/venues/${venue.id}`}
                                    sx={{ height: '200px' }}
                                    image={
                                        venue.media[0] ||
                                        'https://source.unsplash.com/1600x900/?hotel'
                                    }
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
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    );
}

export default Venues;
