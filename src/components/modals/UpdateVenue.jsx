import { Box, Button, Typography } from '@mui/material';
import TextFields from './form/TextFields';
import SwitchFields from './form/SwitchFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useEditVenueMutation } from '../features/rtkSlices/apiSlice';
import { useState } from 'react';
import { removeEmptyInputs } from '../constants';

const schema = yup.object({
    name: yup.string().optional(),
    description: yup
        .string()
        .optional()
        .required('Must be at least five characters'),
    country: yup.string().optional(),
    media: yup.string().optional().url('Needs to be An URL'),
    media2: yup.string().optional().url('Needs to be An URL'),
    media3: yup.string().optional().url('Needs to be An URL'),
    maxGuests: yup.number().optional(),
    price: yup.number().optional(),
});

const UpdateVenue = ({ refetch, handleClose, data, id }) => {
    const [msgOk, setMsgOk] = useState('');
    const [msgErr, setMsgErr] = useState('');
    const [updateVenue] = useEditVenueMutation();

    let foundObject = null;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            foundObject = data[i];
            break;
        }
    }

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        defaultValues: {
            name: foundObject.name,
            description: foundObject.description,
            price: foundObject.price,
            maxGuests: foundObject.maxGuests,
            wifi: foundObject.meta.wifi ? true : false,
            parking: foundObject.meta.parking ? true : false,
            breakfast: foundObject.meta.breakfast ? true : false,
            pets: foundObject.meta.pets ? true : false,
            country: foundObject.location.country,
            media: foundObject.media.length > 0 ? foundObject.media[0] : '',
            media2: foundObject.media.length > 0 ? foundObject.media[1] : '',
            media3: foundObject.media.length > 0 ? foundObject.media[2] : '',
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = async (inputData) => {
        const updateFormData = removeEmptyInputs(inputData);
        const contentArray = {
            id: id,
            data: { ...updateFormData },
        };
        try {
            const venueUpdate = await updateVenue(contentArray);
            if (venueUpdate.data) {
                toast.success(`'Venue ${venueUpdate.data.name} Updated'`);
                refetch();
                handleClose();
            } else {
                toast.error(
                    `error ${venueUpdate.error.data.errors[0].message}`
                );
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
                noReq={true}
            />
            <TextFields
                control={control}
                errors={errors}
                name='country'
                label='Country'
                noReq={true}
            />
            <TextFields
                control={control}
                errors={errors}
                name='media'
                label='Media'
                noReq={true}
            />
            <TextFields
                control={control}
                errors={errors}
                name='media2'
                label='Media two'
                // noReq={true}
            />
            <TextFields
                control={control}
                errors={errors}
                name='media3'
                label='Media three'
                noReq={true}
            />
            <TextFields
                control={control}
                errors={errors}
                name='description'
                label='Description'
                noReq={true}
            />
            <TextFields
                control={control}
                errors={errors}
                name='price'
                label='Price'
                type='number'
                noReq={true}
            />
            <TextFields
                control={control}
                errors={errors}
                name='maxGuests'
                label='Max Guests'
                type='number'
                noReq={true}
            />
            <SwitchFields
                checked={foundObject.meta.wifi ? true : false}
                control={control}
                name='wifi'
                label='Wifi'
            />
            <SwitchFields
                checked={foundObject.meta.parking ? true : false}
                control={control}
                name='parking'
                label='Parking'
            />
            <SwitchFields
                checked={foundObject.meta.breakfast ? true : false}
                control={control}
                name='breakfast'
                label='Breakfast'
            />
            <SwitchFields
                checked={foundObject.meta.pets ? true : false}
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
                Update
            </Button>
        </Box>
    );
};

export default UpdateVenue;
