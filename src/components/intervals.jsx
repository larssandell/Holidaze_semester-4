import { useDispatch } from 'react-redux';
import { useGetAllVenuesQuery } from './features/rtkSlices/apiSlice';
import { setVenues } from './features/rtkSlices/dataSlice';
import Loader from './Loader';

// export const runFetchAuto = () => {
//     const dispatch = useDispatch();
//     const { data, error, isLoading } = useGetAllVenuesQuery({
//         pollingInterval: 3000,
//     });
//     dispatch(setVenues);
//     console.log('runFetchAuto', data);
// };
export async function runFetchAuto() {
    const dispatch = useDispatch();
    const { data, error, isLoading } = useGetAllVenuesQuery();

    if (isLoading) {
        return (
            <div>
                <Loader />
            </div>
        );
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    dispatch(setVenues);
    console.log('runFetchAuto', data);
}
