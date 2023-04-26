import { createTheme } from '@mui/material';

const myTheme = createTheme({
    palette: {
        background: {
            default: '#FFFDFA',
        },
        blues: {
            dark: '#023059',
            light: '#73A2BF',
            medium: '#5D7CA6',
        },
        colors: {
            black: '#000',
            green: '#228B22',
            red: '#A52A2A',
            gray: '#D9D9D9',
        },
        selectableLabel: {
            userSelect: 'none',
        },
    },
});

export default myTheme;
