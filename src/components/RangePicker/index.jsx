import { Button, DatePicker, Input, Slider, Space, message } from 'antd';
// import { useEffect, useState } from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useGetSingleVenueQuery } from '../features/rtkSlices/apiSlice';
// import { WarningOutlined } from '@mui/icons-material';

const { RangePicker } = DatePicker;

const RangePickerVali = ({ id, maxGuests }) => {
    const [selectedRange, setSelectedRange] = useState([]);
    const { data: { bookings = [] } = {}, error } = useGetSingleVenueQuery(id);
    const [sliderValue, setSliderValue] = useState(0);

    console.log(bookings);
    // console.log(data);

    const handleRangeChange = (dates) => {
        setSelectedRange(dates);
    };
    const disabledDate = (current) => {
        const takenDates = bookings.map((booking) => ({
            from: dayjs(booking.dateFrom),
            to: dayjs(booking.dateTo),
        }));

        return takenDates.some(
            (takenDate) =>
                current.isAfter(takenDate.from, 'day') &&
                current.isBefore(takenDate.to, 'day')
        );
    };

    const checkDateRange = (bookings, dateFrom, dateTo) => {
        for (const booking of bookings) {
            const bookingDateFrom = dayjs(booking.dateFrom);
            const bookingDateTo = dayjs(booking.dateTo);

            if (
                dateFrom.isBetween(
                    bookingDateFrom,
                    bookingDateTo,
                    null,
                    '[]'
                ) ||
                dateTo.isBetween(bookingDateFrom, bookingDateTo, null, '[]') ||
                bookingDateFrom.isBetween(dateFrom, dateTo, null, '[]') ||
                bookingDateTo.isBetween(dateFrom, dateTo, null, '[]')
            ) {
                return false;
            }
        }

        return true;
    };

    const handleSubmit = () => {
        if (!checkDateRange(bookings, selectedRange[0], selectedRange[1])) {
            message.error('Selected dates are already taken.');
            return;
        }

        const [dateFrom, dateTo] = selectedRange.map((date) =>
            date.toISOString()
        );
        const formData = {
            fromDate,
            toDate,
            sliderValue,
            id,
        };
        console.log(formData);
        console.log('Selected dates:', dateFrom, dateTo);
    };

    return (
        <>
            <form>
                <RangePicker
                    value={selectedRange}
                    onChange={handleRangeChange}
                />
                <Slider
                    max={maxGuests}
                    value={sliderValue}
                    onChange={(value) => setSliderValue(value)}
                />
                <Input
                    type='number'
                    value={sliderValue}
                    onChange={(e) => setSliderValue(e.target.value)}
                />
                <Button type='primary' onClick={handleSubmit}>
                    Submit
                </Button>
                {error && <div>Error: {error.message}</div>}
            </form>
        </>
    );

    // const [selectedRange, setSelectedRange] = useState([]);

    // const { data: { bookings = [] } = {} } = useGetSingleVenueQuery(id);
    // console.log(bookings);

    // const disabledDate = (current) => {
    //     const takenDates = bookings.map((booking) => ({
    //         from: dayjs(booking.dateFrom),
    //         to: dayjs(booking.dateTo),
    //     }));

    //     return takenDates.some(
    //         (takenDate) =>
    //             current.isAfter(takenDate.from, 'day') &&
    //             current.isBefore(takenDate.to, 'day')
    //     );
    // };
    // const handleRangeChange = (dates) => {
    //     setSelectedRange(dates);
    // };
    // console.log(selectedRange);
    // const handleOpenChange = (open) => {
    //     if (open && selectedRange && selectedRange.length > 0) {
    //         const isRangeTaken = selectedRange.some((date) =>
    //             disabledDate(date)
    //         );
    //         if (isRangeTaken) {
    //             message.error('Selected date range includes taken dates.');
    //         }
    //     }
    // };
    // return (
    //     <Space direction='vertical'>
    //         <RangePicker
    //             value={selectedRange}
    //             onChange={handleRangeChange}
    //             disabledDate={disabledDate}
    //             onOpenChange={handleOpenChange}
    //         />
    //     </Space>
    // );
};
// console.log('from ragePickerVali', id);
// const [selectedRange, setSelectedRange] = useState([]);
// const {
//     data = [],
//     isError,
//     isFetching,
//     isLoading,
//     error,
// } = useGetSingleVenueQuery(id);
// const [isRangeTaken, setIsRangeTaken] = useState(false);
// console.log(data, isError, isFetching, isLoading, error);
// console.log('getBookings', data.bookings);
// const bookings = data.bookings;
// useEffect(() => {
//     setIsRangeTaken(false);
// }, [selectedRange]);

// const checkIsRangeTaken = (start, end) => {
//     const taken = bookings.some((booking) => {
//         const bookingStart = moment(booking.startDate);
//         const bookingEnd = moment(booking.endDate);

//         return (
//             (start.isSameOrAfter(bookingStart) &&
//                 start.isBefore(bookingEnd)) ||
//             (end.isAfter(bookingStart) && end.isSameOrBefore(bookingEnd))
//         );
//     });

//     setIsRangeTaken(taken);
//     return taken;
// };

// const disabledDate = (current) => {
//     if (selectedRange.length === 1) {
//         return current.isBefore(selectedRange[0].startOf('day'));
//     }
//     if (selectedRange.length === 2) {
//         return current.isAfter(selectedRange[1].endOf('day'));
//     }
//     return false;
// };

// const ranges = {
//     Today: [moment().startOf('day'), moment().endOf('day')],
//     'This Week': [moment().startOf('week'), moment().endOf('week')],
//     'This Month': [moment().startOf('month'), moment().endOf('month')],
// };

// return (
//     <>
//         <RangePicker
//             className='responsive-range-picker'
//             onChange={(dates) => setSelectedRange(dates)}
//             disabledDate={disabledDate}
//             // ranges={ranges}
//             style={isRangeTaken ? { border: '1px solid red' } : null}
//             suffixIcon={
//                 isRangeTaken ? (
//                     <WarningOutlined style={{ color: 'red' }} />
//                 ) : null
//             }
//         />
//         {isRangeTaken && (
//             <p style={{ color: 'red' }}>
//                 This date range is already booked. Please select another
//                 range.
//             </p>
//         )}
//     </>
// );
// };

export default RangePickerVali;
