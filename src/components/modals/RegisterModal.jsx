import { Box, Button } from '@mui/material';
import TextFields from './form/TextFields';
import SwitchFields from './form/SwitchFields';
import { useForm } from 'react-hook-form';

const RegisterModal = () => {
    const { handleSubmit, control } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            avatar: '',
            venueManager: false,
        },
    });

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: '100%', mt: '2rem' }}
        >
            <TextFields control={control} name='name' label='Name' />
            <TextFields control={control} name='email' label='Email' />
            <TextFields control={control} name='password' label='Password' />
            <TextFields
                control={control}
                name='confirmPassword'
                label='Confirm Password'
            />
            <TextFields control={control} name='avatar' label='Avatar' />
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
