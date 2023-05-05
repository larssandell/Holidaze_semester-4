import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Checkbox,
    Container,
    Grid,
    IconButton,
    ListItem,
    Rating,
    Switch,
    Typography,
} from '@mui/material';
import image from '../../../assets/image.jpg';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import PetsIcon from '@mui/icons-material/Pets';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import { DatePicker } from 'antd';

function SingleVenueCard() {
    let value = 5;
    let guests = 6;
    const { RangePicker } = DatePicker;

    return (
        <Container sx={{ mt: '20px', mb: '20px', maxWidth: '730px' }}>
            <Card
                sx={{
                    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
                }}
            >
                <div>
                    <CardMedia
                        sx={{
                            objectFit: 'contain',
                            objectPosition: 'center',
                            width: '100%',
                        }}
                        component='img'
                        // height='300'
                        image={image}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: '10px',
                            mb: '10px',
                        }}
                    >
                        <Typography variant='h5'>Title</Typography>
                    </Box>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <div>Price: $200</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div>
                                    <Typography>Rating</Typography>
                                    <Rating
                                        name='read-only'
                                        value={value}
                                        readOnly
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>Location: Oslo</div>
                            </Grid>
                            <Grid item xs={6}></Grid>
                            <Grid item xs={8}>
                                <Typography>
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Aperiam voluptas quia
                                    quibusdam enim, dolorem pariatur porro, id
                                    alias praesentium eaque aut sint recusandae
                                    voluptates vel, a fugit sapiente labore ad.
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sx={{ borderLeft: 1 }}>
                                <div>Facility:</div>
                                <div>
                                    <ListItem
                                        secondaryAction={
                                            <CheckRoundedIcon fontSize='large' />
                                        }
                                    >
                                        <WifiIcon />
                                    </ListItem>
                                    <ListItem
                                        secondaryAction={
                                            <CheckRoundedIcon fontSize='large' />
                                        }
                                    >
                                        <LocalParkingIcon />
                                    </ListItem>
                                    <ListItem
                                        secondaryAction={
                                            <CloseRoundedIcon fontSize='large' />
                                        }
                                    >
                                        <FreeBreakfastIcon />
                                    </ListItem>
                                    <ListItem
                                        secondaryAction={
                                            <CheckRoundedIcon fontSize='large' />
                                        }
                                    >
                                        <PetsIcon />
                                    </ListItem>

                                    <ListItem
                                        fontSize='large'
                                        sx={{ textAlign: 'center' }}
                                        secondaryAction={
                                            <Typography fontSize='1.5rem'>
                                                {guests}
                                            </Typography>
                                        }
                                    >
                                        <HotelRoundedIcon fontSize='large' />
                                    </ListItem>
                                </div>
                            </Grid>
                        </Grid>
                    </CardContent>
                </div>
            </Card>
            <div>
                <RangePicker
                    onChange={(date) => console.log(date[0].$d, date[1].$d)}
                />
            </div>
        </Container>
    );
}

export default SingleVenueCard;
