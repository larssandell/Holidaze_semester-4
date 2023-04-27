import { Box, Button } from '@mui/material';
import TextFields from './form/TextFields';
import SwitchFields from './form/SwitchFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
    avatar: yup.string().required('value must be a valid URL.'),
});

const RegisterModal = () => {
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
    console.log(errors);

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <Box
            noValidate
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: '100%', mt: '2rem' }}
        >
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
// resetForm();
