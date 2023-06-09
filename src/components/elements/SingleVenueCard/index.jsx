import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    ListItem,
    Rating,
    Typography,
} from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import PetsIcon from '@mui/icons-material/Pets';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import ImgCarousel from '../../ImgCarousel/index';
import { useState } from 'react';
import { useGetSingleVenueQuery } from '../../features/rtkSlices/apiSlice';
import Loader from '../../Loader';
import DatePicker from '../DatePicker';
import useDocumentTitle from '../../constants';

function SingleVenueCard({ id }) {
    const [reFetch, setReFetch] = useState(false);
    const {
        data: venue = [],
        isFetching,
        error,
        refetch,
    } = useGetSingleVenueQuery(id);
    useDocumentTitle(`Holidaze | ${venue.name}`);
    if (isFetching) {
        return <Loader />;
    }
    if (error) {
        return <div>Error</div>;
    }

    return (
        <Container>
            <Card sx={{ mt: 3 }}>
                <Grid container spacing={2} sx={{}}>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            justifyContent: 'center',
                        }}
                    >
                        <ImgCarousel images={venue.media} venue={venue} />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <CardContent>
                            <Typography variant='h5' component='div'>
                                {venue.name}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mt: 1,
                                }}
                            >
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                >
                                    <Rating
                                        name='read-only'
                                        value={venue.rating}
                                        readOnly
                                    />
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    variant='body1'
                                    color='text.secondary'
                                    mt={2}
                                >
                                    {`Location: ${venue.location.city}`}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    variant='body1'
                                    color='text.secondary'
                                    mt={2}
                                >
                                    {`per night: $ ${venue.price}`}
                                </Typography>
                            </Box>
                            <Box>
                                <Container
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <Typography
                                        mt={2}
                                        variant='body1'
                                        color='text.secondary'
                                    >
                                        Facilities:
                                    </Typography>
                                    <div role='img'>
                                        {venue.meta.wifi ? (
                                            <ListItem>
                                                <WifiIcon />
                                            </ListItem>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    <div role='img'>
                                        {venue.meta.parking ? (
                                            <ListItem>
                                                <LocalParkingIcon />
                                            </ListItem>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    <div role='img'>
                                        {venue.meta.breakfast ? (
                                            <ListItem>
                                                <FreeBreakfastIcon />
                                            </ListItem>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    <div role='img'>
                                        {venue.meta.pets ? (
                                            <ListItem>
                                                {' '}
                                                <PetsIcon />{' '}
                                            </ListItem>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </Container>
                            </Box>
                            <Container sx={{ my: '10px' }}>
                                <DatePicker id={id} venue={venue} />
                            </Container>
                            <div>
                                <Typography
                                    variant='body1'
                                    color='text.secondary'
                                    mt={2}
                                >
                                    Description:
                                    <span> {venue.description} </span>
                                </Typography>
                            </div>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );

    // return (
    //     <Container sx={{ mt: '20px', mb: '20px', maxWidth: '730px' }}>
    //         <Card
    //             sx={{
    //                 boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
    //             }}
    //         >
    //             <div>
    //                 <ImgCarousel images={venue.media} venue={venue} />

    //                 <Box
    //                     sx={{
    //                         display: 'flex',
    //                         justifyContent: 'center',
    //                         mt: '10px',
    //                         mb: '10px',
    //                     }}
    //                 >
    //                     <Typography variant='h5'>{venue.name}</Typography>
    //                 </Box>
    //                 <CardContent>
    //                     <Grid container spacing={2}>
    //                         <Grid item xs={8}>
    //                             <div>{`pr night: $ ${venue.price}`}</div>
    //                         </Grid>
    //                         <Grid item xs={4}>
    //                             <div>
    //                                 <Typography>Rating</Typography>
    //                                 <Rating
    //                                     name='read-only'
    //                                     value={venue.rating}
    //                                     readOnly
    //                                 />
    //                             </div>
    //                         </Grid>
    //                         <Grid item xs={6}>
    //                             <div>{`Location: ${venue.location.city}`}</div>
    //                         </Grid>
    //                         <Grid item xs={6}></Grid>
    //                         <Grid item xs={8}>
    //                             <Typography>{venue.description}</Typography>
    //                         </Grid>
    //                         <Grid item xs={4} sx={{ borderLeft: 1 }}>
    //                             <div>Facility:</div>
    //                             <div>
    //                                 {venue.meta.wifi ? (
    //                                     <ListItem>
    //                                         <WifiIcon />
    //                                     </ListItem>
    //                                 ) : (
    //                                     ''
    //                                 )}
    //                                 {venue.meta.parking ? (
    //                                     <ListItem>
    //                                         <LocalParkingIcon />
    //                                     </ListItem>
    //                                 ) : (
    //                                     ''
    //                                 )}
    //                                 {venue.meta.breakfast ? (
    //                                     <ListItem>
    //                                         <FreeBreakfastIcon />
    //                                     </ListItem>
    //                                 ) : (
    //                                     ''
    //                                 )}
    //                                 {venue.meta.pets ? (
    //                                     <ListItem>
    //                                         {' '}
    //                                         <PetsIcon />{' '}
    //                                     </ListItem>
    //                                 ) : (
    //                                     ''
    //                                 )}
    //                                 <ListItem
    //                                     fontSize='large'
    //                                     sx={{ textAlign: 'center' }}
    //                                     secondaryAction={
    //                                         <Typography fontSize='1.5rem'>
    //                                             {venue.maxGuests}
    //                                         </Typography>
    //                                     }
    //                                 >
    //                                     <HotelRoundedIcon fontSize='large' />
    //                                 </ListItem>
    //                             </div>
    //                         </Grid>
    //                     </Grid>
    //                 </CardContent>
    //             </div>
    //         </Card>
    //         <Container sx={{ mt: '10px' }}>
    //             <DatePickerTest id={id} venue={venue} />
    //         </Container>
    //     </Container>
    // );
}

export default SingleVenueCard;
