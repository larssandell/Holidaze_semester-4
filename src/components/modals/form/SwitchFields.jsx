import { FormControlLabel, Switch } from '@mui/material';
import { Controller } from 'react-hook-form';

const SwitchFields = ({ name, control, label, checked, unControlled }) => {
    if (checked) {
        return (
            <>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            className='userSelectNone'
                            control={<Switch {...field} />}
                            label={label}
                            checked
                        />
                    )}
                />
            </>
        );
    }
    if (unControlled === true) {
        return (
            <>
                <Controller
                    name={name}
                    render={({ field }) => (
                        <FormControlLabel
                            className='userSelectNone'
                            control={<Switch {...field} />}
                            label={label}
                            checked
                        />
                    )}
                />
            </>
        );
    }
    return (
        <>
            <Controller
                name={name}
                control={control || ''}
                render={({ field }) => (
                    <FormControlLabel
                        className='userSelectNone'
                        control={<Switch {...field} />}
                        label={label}
                    />
                )}
            />
        </>
    );
};

export default SwitchFields;
