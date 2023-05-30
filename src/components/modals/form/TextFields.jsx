import { FormControl, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { addErrorToField } from './utils';
import FormErrorMessage from './ErrorMessage';

const TextFields = ({ label, control, name, noReq, errors, type }) => {
    if (noReq === true) {
        return (
            <FormControl fullWidth sx={{ mb: '1rem' }}>
                <Controller
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={label}
                            variant='outlined'
                            type={type}
                        />
                    )}
                />
            </FormControl>
        );
    }
    return (
        <FormControl fullWidth sx={{ mb: '1rem' }}>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <TextField
                        {...field}
                        {...addErrorToField(errors[name])}
                        required
                        label={label}
                        variant='outlined'
                        type={type}
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
