import { configureStore } from '@reduxjs/toolkit';
import { holidazeApi } from './components/features/rtkSlices/apiSlice';
import dataReducer from './components/features/rtkSlices/dataSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
    reducer: {
        [holidazeApi.reducerPath]: holidazeApi.reducer,
        data: dataReducer,
    },
    // preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(holidazeApi.middleware),
});

export const RootState = store.dispatch;
setupListeners(store.dispatch);

export default store;
