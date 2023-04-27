import { Box, Button } from '@mui/material';
import TextFields from './form/TextFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUrl } from '../hooks/useFetch/options/options';
import useFetch from '../hooks/useFetch';
import { Triangle } from 'react-loader-spinner';

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

function LoginModal() {
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
    // console.log(errors);
    const { data, isError, isLoading, responseOk } = useFetch(registerUrl);
    console.log(data);
    if (isError) {
        return <div>error : {responseOk.code}</div>;
    }
    if (isLoading) {
        return (
            <div className='loader'>
                <Triangle
                    height='80'
                    width='80'
                    color='#4fa94d'
                    ariaLabel='triangle-loading'
                    wrapperStyle={{}}
                    wrapperClassName=''
                    visible={true}
                />
            </div>
        );
    }

    const onSubmit = (ele) => {
        console.log(ele);
        const { data, isError } = useFetch(registerUrl);
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
