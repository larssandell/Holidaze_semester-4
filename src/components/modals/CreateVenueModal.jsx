import { Box, Button, Typography } from '@mui/material';
import TextFields from './form/TextFields';
import SwitchFields from './form/SwitchFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useCreateVenueMutation } from '../features/rtkSlices/apiSlice';
import { useState } from 'react';
import { removeEmptyInputsCreateVenue } from '../constants';

const schema = yup.object({
    name: yup.string().required('Must be a title'),
    description: yup.string().required('Must be at least five characters'),
    country: yup.string().required('Must contain a Country'),

    media: yup.string().required('URL is required').url('Needs to be An URL'),
    media2: yup.string().optional().url('Needs to be An URL'),
    media3: yup.string().optional().url('Needs to be An URL'),
    maxGuests: yup.number().required('must set max guests'),
    price: yup.number().required('must set a price'),
});

const CreateVenueModal = ({ refetch, handleClose, venues, bookings, data }) => {
    const [msgOk, setMsgOk] = useState('');
    const [msgErr, setMsgErr] = useState('');
    const [createVenue] = useCreateVenueMutation();

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        defaultValues: {
            name: '',
            description: '',
            price: '',
            maxGuests: '',
            wifi: false,
            parking: false,
            breakfast: false,
            pets: false,
            country: '',
            media: '',
            media2: '',
            media3: '',
        },
        resolver: yupResolver(schema),
    });
    // console.log(errors);

    const onSubmit = async (inputData) => {
        const updateFormData = removeEmptyInputsCreateVenue(inputData);
        try {
            const createNewVenue = await createVenue(updateFormData);
            console.log(createNewVenue);
            if (createNewVenue.data) {
                toast.success(`'Venue ${createNewVenue.data.name} Created'`);
                refetch();
                handleClose();
            } else {
                toast.error(`Error ${createNewVenue}`);
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Box
            noValidate
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: '100%', mt: '2rem' }}
        >
            <Box sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
                <Typography color='red' variant='p'>
                    {msgErr}
                </Typography>
                <Typography color='green' variant='p'>
                    {msgOk}
                </Typography>
            </Box>
            <TextFields
                control={control}
                errors={errors}
                name='name'
                label='Title'
            />
            <TextFields
                control={control}
                errors={errors}
                name='country'
                label='Country'
            />
            <TextFields
                control={control}
                errors={errors}
                name='media'
                label='Media'
            />
            <TextFields
                control={control}
                errors={errors}
                name='media2'
                label='Media two'
            />
            <TextFields
                control={control}
                errors={errors}
                name='media3'
                label='Media three'
            />
            <TextFields
                control={control}
                errors={errors}
                name='description'
                label='Description'
            />
            <TextFields
                control={control}
                errors={errors}
                name='price'
                label='Price'
                type='number'
            />
            <TextFields
                control={control}
                errors={errors}
                name='maxGuests'
                label='Max Guests'
                type='number'
            />
            <SwitchFields
                defaultValues={false}
                control={control}
                name='wifi'
                label='Wifi'
            />
            <SwitchFields
                defaultValues={false}
                control={control}
                name='parking'
                label='Parking'
            />
            <SwitchFields
                defaultValues={false}
                control={control}
                name='breakfast'
                label='Breakfast'
            />
            <SwitchFields
                defaultValues={false}
                control={control}
                name='pets'
                label='Pets'
            />

            <Button
                type='submit'
                fullWidth
                sx={{ mt: 2, mb: 2 }}
                variant='outlined'
            >
                Register
            </Button>
        </Box>
    );
};

export default CreateVenueModal;
