import { createSlice } from '@reduxjs/toolkit';
import { holidazeApi } from '../api/apiSlice';

const initialState = {
    api: [],
    venueManager: false,
    name: null,
    avatar: '',
    user: null,
};

const dataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { name, accessToken, venueManager, avatar } = action.payload;
            state.name = name;
            state.accessToken = accessToken;
            state.avatar = avatar;
            state.user = true;
            state.venueManager = venueManager;
        },
        logOut: (state, action) => {
            state = initialState;
        },
    },
    // extraReducers: (builder) => {
    //     builder.addMatcher(
    //         holidazeApi.endpoints.matchFulfilled,
    //         (state, action) => {
    //             state.api = action.payload;
    //         }
    //     );
    // },
});

export const { setCredentials, logOut } = dataSlice.actions;

export default dataSlice.reducer;

export const selectCurrentName = (state) => state.data.name;
export const selectCurrentToken = (state) => state.data.accessToken;
