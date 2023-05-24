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

    endpoints: (builder) => ({
        getAllVenues: builder.query({
            query: (userData) => ({
                url: 'venues?sort=created&_owner=true&_bookings=true',
                params: { q: userData },
            }),
        }),
        getSingleVenue: builder.query({
            query: (id) => ({
                url: `venues/${id}?_owner=true&_bookings=true`,
            }),
        }),
        getShowCaseVenues: builder.query({
            query: (userData) => ({
                url: 'venues?limit=8&sort=created',
                params: { q: userData },
            }),
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
        }),
        getProfileBookings: builder.query({
            query: (name) => ({
                url: `profiles/${name}/bookings?sort=created&_venue=true`,
                // transformResponse: (res) =>
                //     res.sort((a, b) => b.fromDate - a.fromDate),
            }),
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
                console.log('request user', content.user);
                console.log('request meth', content.avatar);
                return {
                    url: `profiles/${content.user}/media`,
                    method: 'PUT',
                    body: content.avatar,
                };
            },
        }),
        delete: builder.mutation({
            query: ({ path, id }) => ({
                url: `${path}/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetAllVenuesQuery,
    useLoginUserMutation,
    useGetShowCaseVenuesQuery,
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
    useDeleteMutation,
} = holidazeApi;
