import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { headersAuth } from '../../hooks/useFetch/options/options';
import { useSelector } from 'react-redux';

export const holidazeApi = createApi({
    reducerPath: 'holidazeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.noroff.dev/api/v1/holidaze/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().data.accessToken;
            headers.set('content-type', 'application/json');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['venues', 'bookings', 'profile'],

    endpoints: (builder) => ({
        getAllVenues: builder.query({
            query: () => ({
                url: 'venues?_owner=true&_bookings=true',
            }),
            transformResponse: (response) => {
                const sortedResponse = Object.values(response).sort((a, b) => {
                    const dateA = new Date(a.created);
                    const dateB = new Date(b.created);
                    return dateA - dateB;
                });

                return sortedResponse;
            },
            providesTags: ['venues'],
        }),
        getAllVenuesSearch: builder.query({
            query: () => ({
                url: 'venues?_owner=true&_bookings=true',
            }),
        }),

        reFetchAllVenues: builder.query({
            query: () => ({
                url: 'venues?sort=created&_owner=true&_bookings=true',
            }),
            providesTags: ['venues'],
        }),
        getSingleVenue: builder.query({
            query: (id) => ({
                url: `venues/${id}?_owner=true&_bookings=true`,
            }),
        }),
        createVenue: builder.mutation({
            query: (form) => ({
                url: 'venues',
                method: 'POST',
                body: { ...form },
            }),
            invalidatesTags: ['venues'],
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
        bookingsRequestId: builder.mutation({
            query: (id, meth, content) => ({
                url: `bookings/${id}?_customer=true&_venue=true`,
                method: `${meth}`,
                body: { ...content },
            }),
        }),
        getBookings: builder.query({
            query: () => ({
                url: 'bookings',
            }),
            providesTags: ['bookings'],
        }),
        getBookingsID: builder.query({
            query: (id) => ({
                url: `bookings/${id}?_customer=true&_venue=true`,
            }),
        }),
        makeBooking: builder.mutation({
            query: (body) => ({
                url: 'bookings',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['bookings'],
        }),

        venueRequestId: builder.mutation({
            query: (id, meth, content) => ({
                url: `venues/${id}`,
                method: meth,
                body: { ...content },
            }),
        }),
        getProfiles: builder.query({
            query: () => ({
                url: 'profiles?_bookings=true&_venues=true',
            }),
            providesTags: ['profile'],
        }),
        getProfileBookings: builder.query({
            query: (name) => ({
                url: `profiles/${name}/bookings?sort=created&_venue=true`,
                transformResponse: (response) => {
                    const sortedResponse = Object.values(response).sort(
                        (a, b) => {
                            const dateA = new Date(a.dateFrom);
                            const dateB = new Date(b.dateFrom);
                            return dateA - dateB;
                        }
                    );

                    return sortedResponse;
                },
            }),
            providesTags: ['bookings'],
        }),
        getProfileVenues: builder.query({
            query: (name) => ({
                url: `profiles/${name}/venues?sort=created&_owner=true&_bookings=true`,
            }),
        }),

        specificProfile: builder.query({
            query: (name) => ({
                url: `profiles/${name}`,
            }),
        }),

        editProfile: builder.mutation({
            query: (content) => {
                // console.log('Request Body:', body);
                return {
                    url: `profiles/${content.user}/media`,
                    method: 'PUT',
                    body: content.avatar,
                };
            },
            invalidatesTags: ['profile'],
        }),
        editVenue: builder.mutation({
            query: (content) => {
                // console.log('Request Body:', body);
                // console.log('request content.id', content.id);
                // console.log('request content.data', content.data);
                return {
                    url: `venues/${content.id}`,
                    method: 'PUT',
                    body: { ...content.data },
                };
            },
        }),
        deleteVenue: builder.mutation({
            query: (id) => ({
                url: `venues/${id}`,
                method: 'DELETE',
            }),
        }),
        deleteBooking: builder.mutation({
            query: (id) => ({
                url: `bookings/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['bookings'],
        }),
    }),
});

export const {
    useGetAllVenuesQuery,
    useLoginUserMutation,
    useRegisterUserMutation,
    useGetSingleVenueQuery,
    useGetProfilesQuery,
    useEditProfileMutation,
    useVenueRequestIdMutation,
    useGetBookingsQuery,
    useBookingsRequestIdMutation,
    useSpecificProfileQuery,
    useGetBookingsIDQuery,
    useMakeBookingMutation,
    useGetProfileBookingsQuery,
    useGetProfileVenuesQuery,
    useDeleteBookingMutation,
    useDeleteVenueMutation,
    useCreateVenueMutation,
    useEditVenueMutation,
    useReFetchAllVenuesQuery,
    useGetAllVenuesSearchQuery,
} = holidazeApi;
