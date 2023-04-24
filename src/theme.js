import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            mainbg: '#FFFDFA',
        },
        secondary: {
            darkblue: '#023059',
            midblue: '#5D7CA6',
            lightblue: '73A2BF',
        },
        otherColor: {
            red: '#A52A2A',
            green: '#228B22',
            gray: '#D9D9D9',
        },
    },
    customizeToolbar: {
        minHeight: 100,
    },
});
