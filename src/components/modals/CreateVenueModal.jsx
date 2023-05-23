import { Box, Button, Typography } from '@mui/material';
import TextFields from './form/TextFields';
import SwitchFields from './form/SwitchFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useRegisterUserMutation } from '../features/rtkSlices/apiSlice';
import { useState } from 'react';

const schema = yup.object({
    name: yup
        .string()
        .required(
            'must not contain punctuation symbols apart from underscore (_)'
        ),
    description: yup
        .string()
        .required('Email must be a valid stud.noroff.no or noroff.no'),
    // media: yup
    //     .string()
    //     .required('URLs are required')
    //     .matches(
    //         /^(https?:\/\/)?(www\.)?([^\s.]+\.\S{2,}|localhost[\:?\d]*)\S*$/gm,
    //         'Invalid URL format'
    //     ),
    // media2: yup.string().when('media2', {
    //     is: (value) => value && value.trim() !== '',
    //     then: yup
    //         .string()
    //         .required('Invalid URL format')
    //         .matches(
    //             /^(https?:\/\/)?(www\.)?([^\s.]+\.\S{2,}|localhost[\:?\d]*)\S*$/gm,
    //             'Invalid URL format'
    //         ),
    // }),
    // media: yup.string().when('media', {
    //     is: (value) => value && value.trim() !== '',
    //     then: yup
    //         .string()
    //         .required('Input field is required')
    //         .matches(
    //             /^(https?:\/\/)?(www\.)?([^\s.]+\.\S{2,}|localhost[\:?\d]*)\S*$/,
    //             'Invalid URL format'
    //         ),
    // }),
    media3: yup
        .string()
        .required('URLs are required')
        .matches(
            /^(https?:\/\/)?(www\.)?([^\s.]+\.\S{2,}|localhost[\:?\d]*)\S*$/gm,
            'Invalid URL format'
        ),

    price: yup
        .string()
        .label('Confirm Password')
        .required()
        .oneOf([yup.ref('password'), null], 'Password do not match'),
    // avatar: yup.string().required('value must be a valid URL.'),
});

const CreateVenueModal = () => {
    const [msgOk, setMsgOk] = useState('');
    const [msgErr, setMsgErr] = useState('');
    // const dispatch = useDispatch();
    const [registerUser] = useRegisterUserMutation();

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            maxGuests: 0,
            rating: 0,
            wifi: false,
            parking: false,
            breakfast: false,
            pets: false,
            country: '',
            media: '',
        },
        resolver: yupResolver(schema),
    });
    // console.log(errors);

    const onSubmit = async (inputData) => {
        const { confirmPassword, ...rest } = inputData;
        try {
            const userData = await registerUser(rest);
            console.log('first userdata', userData);
            console.log('registerUser', registerUser);
            if (userData.error) {
                console.log('failed', userData);
                console.log(userData.error.data.errors[0].message);
                toast.error(
                    `'Error: ${userData.error.data.errors[0].message}'`
                );
                setMsgErr(`Error: ${userData.error.data.errors[0].message}`);
                setMsgOk('');
                // setMsg = userData.error.data.errors[0].message;
            } else {
                console.log('success');
                setMsgErr(`User ${userData.data.name} registered`);
                setMsgOk('');
                toast.success(`'User ${userData.data.name} registered'`);
                resetForm();
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
                label='Name'
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
            />
            <TextFields
                control={control}
                errors={errors}
                name='media2'
                label='Media 2'
            />
            <TextFields
                control={control}
                errors={errors}
                name='media3'
                label='Media 3'
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
            <TextFields
                control={control}
                errors={errors}
                noReq={true}
                name='rating'
                label='Rating'
                type='number'
            />
            <SwitchFields control={control} name='wifi' label='Wifi' />
            <SwitchFields control={control} name='parking' label='Parking' />
            <SwitchFields
                control={control}
                name='breakfast'
                label='Breakfast'
            />
            <SwitchFields control={control} name='pets' label='Pets' />

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
