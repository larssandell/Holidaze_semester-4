import { FormControl, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import FormErrorMessage from './ErrorMessage';

const TextFields = ({ label, inputProps, control, name, errors }) => {
    const addErrorIntoField = (errors) =>
        errors ? { error: true } : { error: false };
    return (
        <FormControl fullWidth sx={{ mb: '1rem' }}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        {...addErrorIntoField(errors[name])}
                        required
                        label={label}
                        variant='filled'
                        InputProps={inputProps}
                    />
                )}
            />
            {errors[name] ? (
                <FormErrorMessage message={errors[name].message} />
            ) : null}
        </FormControl>
    );
};

export default TextFields;
