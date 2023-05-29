import { Box, Button } from '@mui/material';
import TextFields from './form/TextFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useLoginUserMutation } from '../features/rtkSlices/apiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials, setUser } from '../features/rtkSlices/dataSlice';

const schema = yup.object({
    email: yup
        .string()
        .matches(
            /^([a-zA-Z0-9_])+(@stud.noroff.no)/,
            'must be a valid stud.noroff.no and only symbol accepted _'
        )

        .required(),
    password: yup
        .string({ minLength: 8 })
        .required('The password value must be at least 8 characters.'),
});

function LoginModal({ toggleLoginModal }) {
    const [loginUser, isError, isSuccess] = useLoginUserMutation();
    const dispatch = useDispatch();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = async (inputData) => {
        try {
            const userData = await loginUser(inputData);

            if (!userData.data) {
                toast.error(
                    `Login failed. Error: ${userData.error.data.errors[0].message}`
                );
            } else {
                dispatch(setCredentials({ ...userData }));
                toast.success(`Login ${userData.data.name} successful`);
                setInterval(() => {
                    toggleLoginModal();
                }, 500);
            }
        } catch (err) {
            console.log(err);
            toast.error('Login failed. Please try again.');
        }
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
            <Button
                type='submit'
                fullWidth
                sx={{ mt: 2, mb: 2 }}
                variant='outlined'
            >
                Login
            </Button>
        </Box>
    );
}

export default LoginModal;
