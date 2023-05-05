import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from '../../pages/Home';
import Venues from '../../pages/Venues';
import Profile from '../../pages/Profile';
import SingleVenue from '../../pages/SingleVenue';
import CreateVenues from '../../pages/CreateVenues';
import BookingComplete from '../../pages/BookingComplete';
import Error from '../../pages/Error';
import PrivateRoute from '../utilits/PrivateRoute';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import SingleVenuePage from '../../pages/SingleVenue';

function Router() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/venues'>
                    <Route index element={<Venues />} />
                    <Route path=':id' element={<SingleVenue />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path='/profile' element={<Profile />} />
                </Route>
                <Route path='/createVenue' element={<CreateVenues />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/complete' element={<BookingComplete />} />
                <Route path='/singlevenue' element={<SingleVenuePage />} />
                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    );
}

export default Router;
