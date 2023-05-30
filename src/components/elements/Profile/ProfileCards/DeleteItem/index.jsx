import { Box, Button, Container, Typography } from '@mui/material';
import {
    useDeleteBookingMutation,
    useDeleteVenueMutation,
} from '../../../../features/rtkSlices/apiSlice';
import { toast } from 'react-toastify';

export const DeleteItem = ({
    title,
    id,
    handleClose,
    bookings,
    venues,
    refetch,
    bookingId,
}) => {
    const [deleteBooking] = useDeleteBookingMutation();
    const [deleteVenue] = useDeleteVenueMutation();

    const handleDelete = async () => {
        if (venues) {
            const reqDelete = await deleteVenue(id);
            console.log(reqDelete);
            if (reqDelete.data === null) {
                console.log('null');
                toast.success(`Venue ${title} Deleted`);
                refetch();
                handleClose();
            } else {
                toast.error(`Error: ${reqDelete.error}`);
            }
        }
        if (bookings) {
            const reqDelete = await deleteBooking(bookingId);
            console.log(reqDelete);
            if (reqDelete.data === null) {
                console.log('null');
                toast.success(`Booking ${title} Deleted`);
                refetch();
                handleClose();
            } else {
                toast.error(`Error: ${reqDelete.error.data.errors[0].message}`);
            }
        }
    };

    return (
        <>
            <Container sx={{ p: 1 }}>
                <Box sx={{ textAlign: 'center', mb: 1 }}>
                    <Typography
                        variant='p'
                        gutterBottom
                        sx={{ fontSize: '1rem' }}
                    >
                        Are you sure you want to delete
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant='p'
                        gutterBottom
                        sx={{ fontSize: '1rem' }}
                    >
                        {title}
                    </Typography>
                </Box>
            </Container>

            <Button fullWidth onClick={handleDelete}>
                Yes
            </Button>
        </>
    );
};
