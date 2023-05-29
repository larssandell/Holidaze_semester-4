import { Box, Button, Typography } from '@mui/material';
import TextFields from './form/TextFields';
import SwitchFields from './form/SwitchFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useRegisterUserMutation } from '../features/rtkSlices/apiSlice';
import { useState } from 'react';

const schema = yup.object({
    name: yup
        .string()
        .required(
            'must not contain punctuation symbols apart from underscore (_)'
        ),
    email: yup
        .string()
        .required('Email must be a valid stud.noroff.no or noroff.no'),
    password: yup
        .string({ minLength: 8 })
        .required('Must be at least 8 characters.'),
    confirmPassword: yup
        .string()
        .label('Confirm Password')
        .required()
        .oneOf([yup.ref('password'), null], 'Password do not match'),
});

const RegisterModal = () => {
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
            email: '',
            password: '',
            confirmPassword: '',
            avatar: '',
            venueManager: false,
        },
        resolver: yupResolver(schema),
    });

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
                name='email'
                label='Email'
            />
            <TextFields
                control={control}
                errors={errors}
                name='password'
                label='Password'
                type='password'
            />
            <TextFields
                control={control}
                errors={errors}
                name='confirmPassword'
                label='Confirm Password'
                type='password'
            />
            <TextFields
                control={control}
                noReq={true}
                name='avatar'
                label='Avatar'
                errors={errors}
                placeholder='Must be a valid URL'
            />
            <SwitchFields
                control={control}
                name='venueManager'
                label='Venue Manager'
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

export default RegisterModal;
