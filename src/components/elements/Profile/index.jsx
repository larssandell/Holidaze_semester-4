import {
    Avatar,
    Typography,
    Container,
    Grid,
    Button,
    Card,
    Box,
} from '@mui/material';
import { useSelector } from 'react-redux';
import {
    useGetProfileBookingsQuery,
    useGetProfileVenuesQuery,
    useSpecificProfileQuery,
} from '../../features/rtkSlices/apiSlice';
import { useEffect, useState } from 'react';
import TabComp from '../TabPanel/index';
import Loader from '../../Loader';
import { handleDelete } from './Buttons';
import { handleEdit } from './Buttons';
import { TabGridBookings, TabGridVenues } from './TabGrid';
import useStatus from '../../hooks/useStatus';
import CreateVenueModal from '../../modals/CreateVenueModal';
import UpdateProfile from '../../modals/UpdateProfile';
import DialogComp from '../../modals/DialogComp';

const Profile = () => {
    const [activeTab, SetActiveTab] = useState(0);

    const { status: createVenueModal, toggleStatus: toggleCreateVenueModal } =
        useStatus(false);
    const { status: editProfile, toggleStatus: toggleEditProfile } =
        useStatus(false);

    const handleTabChange = (event, newValue) => {
        SetActiveTab(newValue);
    };

    // const handleModal = () => {
    //     setOpenModal(!openModal);
    // };

    // useEffect(() => {
    //     refetchVenues();
    //     refetchBookings();
    // }, [refetchVenues, refetchBookings]);

    const tabs = [
        { label: 'Bookings', value: 0 },
        { label: 'Venues', value: 1 },
    ];

    const user = useSelector((state) => state.data.name);
    const {
        data = [],
        isLoading,
        isError,
        isFetching,
        error,
    } = useSpecificProfileQuery(user);

    const { refetch } = useSpecificProfileQuery(user);

    const {
        data: venues = [],
        isLoading: venuesLoading,
        error: venuesError,
        refetch: refetchVenues,
    } = useGetProfileVenuesQuery(user);
    // console.log('venues', venues, venuesError, venuesLoading);

    const {
        data: bookings = [],
        isLoading: bookingsLoading,
        error: bookingsError,
        refetch: bookingsBookings,
    } = useGetProfileBookingsQuery(user);

    if (isLoading) {
        <Container>
            <Loader />
        </Container>;
    }

    return (
        <Container
            sx={{ mt: '20px', display: 'flex', flexDirection: 'column' }}
        >
            <Card>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                        <Avatar
                            variant='rounded'
                            src={data.avatar ? data.avatar : ''}
                            sx={{
                                width: 150,
                                height: 150,
                                objectPosition: 'center',
                                objectFit: 'cover',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={9} lg={10}>
                        <Typography variant='h4' gutterBottom>
                            {data.name}
                        </Typography>
                        <Typography variant='body1'>
                            {data.venueManager
                                ? 'Role: Venue Manager'
                                : 'Role: User'}
                        </Typography>
                        <Typography variant='body2' color='textSecondary'>
                            {`Email: ${data.email}`}
                        </Typography>
                        {data.venueManager ? (
                            <DialogComp
                                btnName='Create Venue'
                                title='Create Venue'
                            >
                                <CreateVenueModal />
                            </DialogComp>
                        ) : (
                            ''
                        )}
                        <DialogComp btnName='update' title='Edit Avatar'>
                            <UpdateProfile user={user} refetch={refetch} />
                        </DialogComp>
                    </Grid>
                </Grid>
            </Card>
            <Card sx={{ mt: '20px' }}>
                <Grid
                    container
                    spacing={3}
                    alignItems='center'
                    textAlign='center'
                    sx={{ width: '100%' }}
                >
                    <Grid item width={'100%'}>
                        <TabComp
                            tabs={tabs}
                            activeTab={activeTab}
                            onChange={handleTabChange}
                            venueManager={data.venueManager}
                        />

                        {activeTab === 0 && (
                            <Container sx={{ pb: 1, ml: 0 }}>
                                <TabGridBookings
                                    items={bookings}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                    type='Bookings'
                                />
                            </Container>
                        )}
                        {activeTab === 1 && (
                            <Container sx={{ pb: 1 }}>
                                <TabGridVenues
                                    items={venues}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                    type='Venues'
                                />
                            </Container>
                        )}
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
};

export default Profile;
