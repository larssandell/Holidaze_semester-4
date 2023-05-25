import { Box, Button, Typography } from '@mui/material';
import TextFields from './form/TextFields';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useEditProfileMutation } from '../features/rtkSlices/apiSlice';
import { toast } from 'react-toastify';
import FormErrorMessage from './form/ErrorMessage';

const schema = yup.object({
    avatar: yup
        .string()
        .required('URLs are required')
        .matches(
            /^(https?:\/\/)?(www\.)?([^\s.]+\.\S{2,}|localhost[\:?\d]*)\S*$/gm,
            'Invalid URL format'
        ),
});

function UpdateProfile({ user, refetch, handleClose }) {
    const [editProfile, { errors: editError, isLoading }] =
        useEditProfileMutation();

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

        const updateAvatar = await editProfile(myArray);
        console.log(updateAvatar);
        if (editError) {
            toast.error(`failed to update ${errors}`);
            return;
        }
        // console.log('update avatar!!', test, isSuccess, isLoading);
        setTimeout(() => {
            refetch();
            toast.success('Profile avatar updated');
            handleClose();
        }, 500);
    };

    return (
        <Box noValidate component='form' onSubmit={handleSubmit(onSubmit)}>
            <TextFields
                label='Avatar'
                name='avatar'
                control={control}
                errors={errors}
            />
            <Button fullWidth type='submit'>
                Update
            </Button>
        </Box>
    );
}

export default UpdateProfile;
