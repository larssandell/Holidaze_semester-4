import { Outlet } from 'react-router-dom';
import Header from '../../shared/header';
import Footer from '../../shared/Footer';

function Layout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default Layout;
