import { useState } from 'react';
import dayjs from 'dayjs';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {
    useGetSingleVenueQuery,
    useMakeBookingMutation,
} from '../../features/rtkSlices/apiSlice';
import { InputNumber, Slider } from 'antd';
import isBetween from 'dayjs/plugin/isBetween';
import { toast } from 'react-toastify';
dayjs.extend(isBetween);

const DatePicker = ({ id, venue }) => {
    const {
        data: { bookings = [] } = {},
        error,
        isLoading,
        refetch,
    } = useGetSingleVenueQuery(id);

    const [makeBooking] = useMakeBookingMutation();
    const [selectedRange, setSelectedRange] = useState([]);
    const [inputValue, setInputValue] = useState(0);

    /**
     * Determines if a given date should be disabled. Using DayJS
     * @param {Date} date - The date to check.
     * @returns {boolean} - `true` if the date should be disabled, `false` otherwise.
     */
    const shouldDisableDate = (date) => {
        const today = dayjs().startOf('day');

        if (dayjs(date).isBefore(today, 'day')) {
            return true;
        }

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
        }

        return false;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const [dateFrom, dateTo] = selectedRange;
        const dateFromISO = dateFrom.toISOString();
        const dateToISO = dateTo.toISOString();

        const bookingForm = {
            dateFrom: dateFromISO,
            dateTo: dateToISO,
            guests: inputValue,
            venueId: id,
        };

        try {
            const payload = await makeBooking(bookingForm).unwrap();
            console.log('fulfilled', payload);
            if (payload) {
                toast.success('Booking Complete');
                setSelectedRange([]);
                setInputValue(0);
                refetch();
            }
        } catch (error) {
            console.error('rejected', error);
            toast.error(`Booking failed ${error}`);
        }
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
