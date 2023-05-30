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
    const [editProfile] = useEditProfileMutation();

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
        const contentArray = {
            user: user,
            avatar: { ...content },
        };
        // console.log(contentArray);
        const updateAvatar = await editProfile(contentArray);
        if (updateAvatar.data) {
            setTimeout(() => {
                refetch();
                toast.success('Profile avatar updated');
                handleClose();
            }, 500);
        } else {
            toast.error(`error ${updateAvatar.error.data.errors[0].message}`);
        }
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
