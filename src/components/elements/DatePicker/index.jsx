import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
// import DateRangePicker from 'rsuite/DateRangePicker';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

import {
    useGetSingleVenueQuery,
    useMakeBookingMutation,
} from '../../features/rtkSlices/apiSlice';
import { InputNumber, Slider } from 'antd';
import Loader from '../../Loader';
import { json } from 'react-router-dom';
// var isBetween = require('dayjs/plugin/isBetween');
import isBetween from 'dayjs/plugin/isBetween';
import { toast } from 'react-toastify';
dayjs.extend(isBetween);

// må legge til try catch her
const DatePicker = ({ id, venue }) => {
    // const { data = [], error, isLoading, isError } = useGetSingleVenueQuery(id);
    // console.log('!!', data, error, isLoading, isError);
    const {
        data: { bookings = [] } = {},
        error,
        isLoading,
    } = useGetSingleVenueQuery(id);
    // console.log('venue from datapicker', venue);
    // console.log('Bookings!!', bookings, error, isLoading);
    const [makeBooking] = useMakeBookingMutation();
    const [selectedRange, setSelectedRange] = useState([]);
    const [inputValue, setInputValue] = useState(0);
    // const bookings = venue;
    // useEffect(() => {
    //     const { data: { bookings = [] } = {}, error } =
    //         useGetSingleVenueQuery(id);
    //     console.log('Bookings!!', bookings);
    //     console.log('ERROR!!', error);
    // }, []);

    const shouldDisableDate = (date) => {
        const today = dayjs().startOf('day');

        // Disable dates before today
        if (dayjs(date).isBefore(today, 'day')) {
            return true;
        }

        // Disable dates within bookings
        for (const booking of bookings) {
            const fromDate = dayjs(booking.dateFrom);
            const toDate = dayjs(booking.dateTo);
            if (
                dayjs(date).isBetween(fromDate, toDate, null, '[)') ||
                dayjs(date).isSame(fromDate, 'day') ||
                dayjs(date).isSame(toDate, 'day')
            ) {
                return true;
            }
            // if (dayjs(date).isBetween(fromDate, toDate, null, '[]')) {
            //     return true;
            // }
        }

        return false;
    };

    // må teste disable dates fra api, legg inn en i fremtiden og sjekk den
    const handleSubmit = async (e) => {
        e.preventDefault();
        const [dateFrom, dateTo] = selectedRange;
        const dateFromISO = dateFrom.toISOString();
        const dateToISO = dateTo.toISOString();
        // console.log('Selected date range FROM:', dateFrom);
        // console.log('dateFromISO', dateFromISO);
        // console.log('dateToISO', dateToISO);
        // console.log('inputData', inputValue);
        const bookingForm = {
            dateFrom: dateFromISO,
            dateTo: dateToISO,
            guests: inputValue,
            venueId: id,
        };
        // console.log(bookingForm);
        try {
            const payload = await makeBooking(bookingForm).unwrap();
            console.log('fulfilled', payload);
            if (payload) {
                toast.success('Booking Complete');
                setSelectedRange([]);
                setInputValue(0);
            }
        } catch (error) {
            console.error('rejected', error);
            toast.error(`Booking failed ${error}`);
        }

        // makeBooking(bookingForm)
        //     .unwrap()
        //     .then((payload) => console.log('fulfilled', payload))
        //     .catch((error) => console.error('rejected', error));
        // console.log(makeBooking);
    };

    const onChange = (newValue) => {
        setInputValue(newValue);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <DateRangePicker
                    showOneCalendar
                    ranges={[]}
                    shouldDisableDate={shouldDisableDate}
                    value={selectedRange}
                    onChange={(value) => setSelectedRange(value)}
                />
                <Slider
                    min={1}
                    max={venue.maxGuests}
                    onChange={onChange}
                    value={typeof inputValue === 'number' ? inputValue : 1}
                />
                <InputNumber
                    min={1}
                    max={venue.maxGuests}
                    style={{
                        margin: '0 16px',
                    }}
                    value={inputValue}
                    onChange={onChange}
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default DatePicker;
