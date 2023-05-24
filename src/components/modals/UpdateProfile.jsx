import { Box, Button, Typography } from '@mui/material';
import TextFields from './form/TextFields';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useEditProfileMutation } from '../features/rtkSlices/apiSlice';
import { toast } from 'react-toastify';

const schema = yup.object({
    avatar: yup
        .string()
        .required('URLs are required')
        .matches(
            /^(https?:\/\/)?(www\.)?([^\s.]+\.\S{2,}|localhost[\:?\d]*)\S*$/gm,
            'Invalid URL format'
        ),
});

function UpdateProfile({ user, refetch, toggleCreateVenueModal }) {
    const [editProfile, { isSuccess, isLoading }] = useEditProfileMutation();
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        defaultValues: {
            avatar: '',
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = async (content) => {
        const myArray = {
            user: user,
            avatar: { ...content },
        };

        const test = await editProfile(myArray);
        // editProfile(user);
        console.log(test);
        // console.log('update avatar!!', test, isSuccess, isLoading);
        setTimeout(() => {
            refetch();
            console.log('refetch');
            toggleCreateVenueModal;
            toast.success('Profile avatar updated');
        }, 1000);
    };

    return (
        <Box noValidate component='form' onSubmit={handleSubmit(onSubmit)}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
                Edit profile Avatar
            </Typography>
            <TextFields
                label='Avatar'
                name='avatar'
                control={control}
                errors={errors}
            />
            <Button type='submit'>Update</Button>
        </Box>
    );
}

export default UpdateProfile;
