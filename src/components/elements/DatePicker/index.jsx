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

// må legge til try catch her
const DatePicker = ({ id }) => {
    const { data = [], error, isLoading, isError } = useGetSingleVenueQuery(id);
    console.log('!!', data, error, isLoading, isError);
    console.log('id dataPicker', id);
    const [makeBooking] = useMakeBookingMutation();
    const [selectedRange, setSelectedRange] = useState([]);
    const [inputValue, setInputValue] = useState(0);

    if (isLoading) {
        return <Loader />;
    }
    if (error) {
        console.log(error);
        return <div>Venue dose not exist</div>;
    }

    const combineDisabledDates = (bookings) => (date) => {
        const today = dayjs().startOf('day');
        const day = dayjs(date);

        const isBeforeToday = day.isBefore(dayjs(), 'day');

        if (!Array.isArray(bookings) || bookings.length === 0) {
            return isBeforeToday;
        } else {
            const isBookingDate = bookings.some((booking) =>
                dayjs(date).isBetween(
                    booking.dateFrom,
                    booking.dateTo,
                    'day',
                    '[]'
                )
            );

            if (isBeforeToday || isBookingDate) {
                return { disabled: true, error: 'This date is unavailable.' };
            } else {
                return { disabled: false };
            }
        }
    };

    // const combineDisabledDates = (bookings) => (date) => {
    //     const today = dayjs().startOf('day');
    //     const day = dayjs(date);
    //     const isBeforeToday = day.isBefore(dayjs(), 'day');

    //     if (!Array.isArray(bookings) || bookings.length === 0) {
    //         return isBeforeToday;
    //     } else {
    //         const isBookingDate = bookings.some((booking) =>
    //             dayjs(date).isBetween(
    //                 booking.dateFrom,
    //                 booking.dateTo,
    //                 'day',
    //                 '[]'
    //             )
    //         );

    //         return isBeforeToday && isBookingDate;
    //     }
    // };

    // må teste disable dates fra api, legg inn en i fremtiden og sjekk den
    const handleSubmit = async (e) => {
        e.preventDefault();
        const [dateFrom, dateTo] = selectedRange;
        const dateFromISO = dateFrom.toISOString();
        const dateToISO = dateTo.toISOString();
        // console.log('Selected date range FROM:', dateFrom);
        console.log('dateFromISO', dateFromISO);
        console.log('dateToISO', dateToISO);
        console.log('inputData', inputValue);
        const bookingForm = {
            dateFrom: dateFromISO,
            dateTo: dateToISO,
            guests: inputValue,
            venueId: data.id,
        };
        console.log(bookingForm);
        try {
            const payload = await makeBooking(bookingForm).unwrap();
            console.log('fulfilled', payload);
        } catch (error) {
            console.error('rejected', error);
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
                    shouldDisableDate={combineDisabledDates()}
                    value={selectedRange}
                    onChange={(value) => setSelectedRange(value)}
                />
                <Slider
                    min={1}
                    max={data.maxGuests}
                    onChange={onChange}
                    value={typeof inputValue === 'number' ? inputValue : 0}
                />
                <InputNumber
                    min={1}
                    max={data.maxGuests}
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
