import { configureStore } from '@reduxjs/toolkit';
import { holidazeApi } from './components/features/api/apiSlice';
import dataReducer from './components/features/slice/dataSlice';
// import dataSlice from './components/features/slice/dataSlice';
export const store = configureStore({
    reducer: {
        [holidazeApi.reducerPath]: holidazeApi.reducer,
        data: dataReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(holidazeApi.middleware),
    // getDefaultMiddleware().concat(dataSlice.middleware),
    devTools: true,
});
