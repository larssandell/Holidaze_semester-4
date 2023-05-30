import { Outlet } from 'react-router-dom';
import Header from '../../shared/Header/index';
import Footer from '../../shared/Footer/index';

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
