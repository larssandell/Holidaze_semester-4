import { Box, Button, Typography } from '@mui/material';
import TextFields from './form/TextFields';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useEditProfileMutation } from '../features/rtkSlices/apiSlice';

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
    // console.log('user', user);
    const [editProfile, { isSuccess, isLoading }] =
        useEditProfileMutation(user);
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
        console.log('content', content);
        const fuckYouRtk = content;
        const testMe = user + content;
        // const body = { ...content };
        // const data = JSON.stringify(content);
        console.log('Fuck you RTK', fuckYouRtk);
        // const avatar = JSON.stringify(inputData);
        // console.log('from on submit', user);

        const test = await editProfile(testMe);
        // editProfile(user);
        console.log(test);
        // console.log('update avatar!!', test, isSuccess, isLoading);
        // setTimeout(() => {
        //     refetch();
        //     console.log('refetch');
        //     toggleCreateVenueModal;
        // }, 1000);
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
