import { FormControl, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const TextFields = ({ label, control, name }) => {
    return (
        <FormControl fullWidth sx={{ mb: '1rem' }}>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <TextField
                        {...field}
                        required
                        label={label}
                        variant='outlined'
                    />
                )}
            />
        </FormControl>
    );
};

export default TextFields;
