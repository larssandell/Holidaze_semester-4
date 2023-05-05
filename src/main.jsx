import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { ThemeProvider } from '@mui/material';
import myTheme from './theme';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './store';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { holidazeApi } from './components/features/api/apiSlice';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={myTheme}>
            <ToastContainer
                position='top-right'
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
            <Provider store={store}>
                <ApiProvider api={holidazeApi}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ApiProvider>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);
