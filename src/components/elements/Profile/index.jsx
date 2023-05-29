import { Avatar, Typography, Container, Grid, Card, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import {
    useGetProfileBookingsQuery,
    useGetProfileVenuesQuery,
    useSpecificProfileQuery,
} from '../../features/rtkSlices/apiSlice';
import { useEffect, useState } from 'react';
import TabComp from '../TabPanel/index';
import Loader from '../../Loader';

import { TabGridBookings, TabGridVenues } from './TabGrid';
import CreateVenueModal from '../../modals/CreateVenueModal';
import UpdateProfile from '../../modals/UpdateProfile';
import DialogComp from '../../modals/DialogComp';

const Profile = () => {
    const [activeTab, SetActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        SetActiveTab(newValue);
    };

    const tabs = [
        { label: 'Bookings', value: 0 },
        { label: 'Venues', value: 1 },
    ];

    const user = useSelector((state) => state.data.name);
    const { data = [], isLoading, refetch } = useSpecificProfileQuery(user);

    const { data: venues = [], refetch: refetchVenues } =
        useGetProfileVenuesQuery(user);

    const { data: bookings = [], refetch: refetchBookings } =
        useGetProfileBookingsQuery(user);

    if (isLoading) {
        <Loader />;
    }
    // må se på denne, bookings tab blir ikke oppdatert
    // useEffect(() => {
    //     refetchVenues();
    //     refetchBookings();
    // }, [activeTab]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                                <CreateVenueModal refetch={refetchVenues} />
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
                                    type='Bookings'
                                    refetch={refetchBookings}
                                />
                            </Container>
                        )}
                        {activeTab === 1 && (
                            <Container sx={{ pb: 1 }}>
                                <TabGridVenues
                                    items={venues}
                                    type='Venues'
                                    refetch={refetchVenues}
                                />
                            </Container>
                        )}
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
};

export default Profile;
