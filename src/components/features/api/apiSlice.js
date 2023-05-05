import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const holidazeApi = createApi({
    reducerPath: 'holidazeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.noroff.dev/api/v1/holidaze/',
    }),
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
            headers.set('Content-Type', 'application/json');
        }
        return headers;
    },
    tagTypes: ['venues'],
    endpoints: (builder) => ({
        getAllVenues: builder.query({
            query: () => 'venues',
        }),
        getShowCaseVenues: builder.query({
            query: () => 'venues?limit=8&sort=created',
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        registerUser: builder.mutation({
            query: (credentials) => ({
                url: 'auth/register',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        deleteVenue: builder.mutation({
            // url: `venues/${id}`,
            // method: 'DELETE',
        }),
    }),
});

export const {
    useGetAllVenuesQuery,
    useGetShowCaseVenuesQuery,
    useLoginUserMutation,
    useDeleteVenueMutation,
    useRegisterUserMutation,
} = holidazeApi;
