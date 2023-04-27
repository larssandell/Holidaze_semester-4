import { FormControlLabel, Switch } from '@mui/material';
import { Controller } from 'react-hook-form';

const SwitchFields = ({ name, control, label }) => {
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <FormControlLabel
                        control={<Switch {...field} />}
                        label={label}
                    />
                )}
            />
        </>
    );
};

export default SwitchFields;
{
    /* <>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <FormControlLabel
                        control={<Switch {...field} />}
                        label='Venue Manager'
                    />
                )}
            />
        </> */
}
