import { createSlice } from '@reduxjs/toolkit';
import { holidazeApi } from './apiSlice';

const initialState = {
    apiData: [],
    name: localStorage.getItem('name') ? localStorage.getItem('name') : null,
    venueManager: localStorage.getItem('venueManager')
        ? JSON.parse(localStorage.getItem('venueManager'))
        : false,
    accessToken: localStorage.getItem('token')
        ? localStorage.getItem('token')
        : null,
    user: false,
    avatar: '',
    apiDataStatus: 'idle',
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { name, venueManager, accessToken, avatar } =
                action.payload.data;
            state.name = name;
            state.venueManager = venueManager;
            state.accessToken = accessToken;
            state.user = true;
            state.avatar = avatar;

            localStorage.setItem('loggedIn', true);
            localStorage.setItem('name', name);
            localStorage.setItem('venueManager', venueManager);
            localStorage.setItem('token', accessToken);
            // localStorage.setItem('user', true);
        },
        setUser: (state, action) => {
            console.log(payload);
            const { name, venueManager, accessToken } = action.payload.data;
            console.log(name, venueManager, accessToken);
            state.name = action.payload.name;
            state.user = true;

            localStorage.setItem('name', name);
            localStorage.setItem('venueManager', venueManager);
            localStorage.setItem('token', accessToken);
        },
        setVenues: (state, action) => {
            const data = action.payload.data;
            console.log(data);
            state.userData = data;
        },
        setRegisterUser: (state, action) => {
            const regUser = action.payload.data.email;
            console.log(regUser);
        },
        logOutUser: (state, action) => {
            // state
            state.name = null;
            state.venueManager = false;
            state.accessToken = null;
            state.user = false;
            state.avatar = '';
            // localStorage
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('name');
            localStorage.removeItem('venueManager');
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                holidazeApi.endpoints.getAllVenues.matchFulfilled,
                (state, action) => {
                    state.apiDataStatus = 'succeeded';
                    state.apiData = action.payload;
                }
            )
            .addMatcher(
                holidazeApi.endpoints.getAllVenues.matchPending,
                (state, action) => {
                    state.apiDataStatus = 'Pending';
                }
            )
            .addMatcher(
                holidazeApi.endpoints.getAllVenues.matchRejected,
                (state, action) => {
                    state.apiDataStatus = 'Rejected';
                }
            );
        // .addMatcher()
    },
});

export const selectToken = (state) => {
    state.accessToken;
};
export const selectData = (state) => state.apiData;
export const { setCredentials, setUser, setVenues, logOutUser } =
    dataSlice.actions;
export default dataSlice.reducer;
