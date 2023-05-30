import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from '../../pages/Home';
import Venues from '../../pages/Venues';
import ProfilePage from '../../pages/ProfilePage';
import SingleVenue from '../../pages/SingleVenue';
import Error from '../../pages/Error';
import { RequireAuth } from '../utils/Auth/RequireAuth';
import AuthProvider from '../utils/Auth/auth';

function Router() {
    return (
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='venues' element={<Venues />} />
                    <Route path='venues/:id' element={<SingleVenue />} />
                    <Route
                        path='/profile'
                        element={
                            <RequireAuth>
                                <ProfilePage />
                            </RequireAuth>
                        }
                    />
                    <Route path='*' element={<Error />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default Router;
