import { CardContent, CardMedia, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { NavLink } from 'react-router-dom';
import noImage from '../../../assets/noimagewhite.webp';

import './Cards.css';
import { StyledCard } from '../../MuiStyles';

function Cards(props) {
    const venues = props.api ?? [];
    return (
        <Container>
            <Grid container spacing={2}>
                {venues.map((venue) => (
                    <Grid item xs={12} sm={6} md={4} key={venue.id}>
                        {console.log()}
                        <StyledCard
                            component={NavLink}
                            className='card_link'
                            to={`${venue.id}`}
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
                                        {`Price pr night: $${venue.price}`}
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

export default Cards;
// function Cards() {
//     // const dispatch = useDispatch();
//     const { data: venues, error, isError, isLoading } = useGetAllVenuesQuery();
//     // console.log('api', api[1].id);
//     // console.log(venues, error, isError, isLoading);
//     // dispatch(setVenues);
//     // const venues = useSelector((state) => state.data.apiData);
//     // console.log(venues[0].id);
//     // console.log(api[0].id);
//     if (isLoading) {
//         return (
//             <Container sx={{ display: 'flex', justifyContent: 'center' }}>
//                 <Loader />
//             </Container>
//         );
//     }
//     if (isError) {
//         return <div>Error occurred:{error} </div>;
//     }

//     return (
//         <>
//             <Grid container spacing={2}>
//                 {venues.map((venue) => (
//                     <Grid item xs={12} sm={6} md={4} key={venue.id}>
//                         {console.log()}
//                         <StyledCard
//                             component={NavLink}
//                             className='card_link'
//                             to={`${venue.id}`}
//                             sx={{
//                                 height: '100%',
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 justifyContent: 'space-between',
//                             }}
//                             onError={({ currentTarget }) => {
//                                 currentTarget.onerror = null;
//                                 currentTarget.src = noImage;
//                             }}
//                         >
//                             <div>
//                                 <CardMedia
//                                     component='img'
//                                     height='200'
//                                     src={
//                                         venue.media[0]
//                                             ? venue.media[0]
//                                             : noImage
//                                     }
//                                     alt={venue.name || 'No image'}
//                                     title={venue.name || 'No image'}
//                                     onError={(e) => {
//                                         e.target.src = noImage;
//                                     }}
//                                 />
//                                 <CardContent>
//                                     <Typography variant='h6' component='div'>
//                                         {venue.name.slice(0, 22)}
//                                     </Typography>
//                                     <Typography variant='body2' component='div'>
//                                         {`Country: ${venue.location.city}`}
//                                     </Typography>
//                                     <Typography variant='body2' component='div'>
//                                         {`Price pr night: $${venue.price}`}
//                                     </Typography>
//                                 </CardContent>
//                             </div>
//                         </StyledCard>
//                     </Grid>
//                 ))}
//             </Grid>
//         </>
//     );
// }

// export default Cards;
