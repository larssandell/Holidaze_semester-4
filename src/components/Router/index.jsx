import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from '../../pages/Home';
import Venues from '../../pages/Venues';
import Profile from '../../pages/Profile';
import SingleVenue from '../../pages/SingleVenue';
import CreateVenues from '../../pages/CreateVenues';
import BookingComplete from '../../pages/BookingComplete';
import Error from '../../pages/Error';

function Router() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/venues' element={<Venues />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/SingleVenue:id' element={<SingleVenue />} />
                <Route path='/createVenue' element={<CreateVenues />} />
                <Route path='/Complete' element={<BookingComplete />} />
                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    );
}

export default Router;
