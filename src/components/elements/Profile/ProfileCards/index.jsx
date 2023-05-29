import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import DialogComp from '../../../modals/DialogComp';
import { DeleteItem } from './DeleteItem';
import UpdateVenue from '../../../modals/UpdateVenue';
import noImage from '../../../../assets/noimage.webp';

const ProfileCards = ({
    image,
    title,
    id,
    venues,
    bookings,
    refetch,
    bookingId,
    data,
    dateTo,
    dateFrom,
    created,
}) => {
    return (
        <Card>
            <Link to={`/venues/${id}`}>
                <CardMedia
                    component='img'
                    height='140'
                    image={image}
                    alt='Card Image'
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = noImage;
                    }}
                />
            </Link>
            <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant='h6'>{title.slice(0, 22)}</Typography>{' '}
            </CardContent>
            {venues && (
                <Typography variant='p'>
                    {`Created: ${new Date(created).toLocaleDateString()}`}
                </Typography>
            )}
            {bookings && (
                <Typography variant='p'>
                    {`from:${new Date(
                        dateFrom
                    ).toLocaleDateString()} to:${new Date(
                        dateTo
                    ).toLocaleDateString()}`}
                </Typography>
            )}
            <CardActions>
                <DialogComp
                    title={`Delete ${venues || bookings}?`}
                    btnName='Delete'
                    id={id}
                >
                    <DeleteItem
                        title={title}
                        id={id}
                        bookingId={bookingId}
                        venues={venues}
                        bookings={bookings}
                        refetch={refetch}
                    />
                </DialogComp>
                {venues ? (
                    <DialogComp title={'Edit'} btnName='Edit' id={id}>
                        <UpdateVenue refetch={refetch} data={data} id={id} />
                    </DialogComp>
                ) : (
                    ''
                )}
            </CardActions>
        </Card>
    );
};

export default ProfileCards;
