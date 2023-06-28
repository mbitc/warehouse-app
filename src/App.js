import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WithNav, WithoutNav } from './util/NavStatus/NavStatus';
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import LocationPage from './pages/LocationPage/LocationPage';
import TeamPage from './pages/TeamPage/TeamPage';
import UserPage from './pages/UserPage/UserPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ItemPage from './pages/ItemPage/ItemPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.scss';

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='*' element={<h1>404 Page not found...</h1>} />
                    <Route element={<WithoutNav />} >
                        <Route path='/warehouse-app' element={<LoginPage />} />
                    </Route>
                    <Route element={<WithNav />} >
                        <Route path='/warehouse-app/dashboard' element={<DashboardPage />} />
                        <Route path='/warehouse-app/location' element={<LocationPage />} />
                        <Route path='/warehouse-app/team' element={<TeamPage />} />
                        <Route path='/warehouse-app/user/:id' element={<UserPage />} />
                        <Route path='/warehouse-app/catalog' element={<CatalogPage />} />
                        <Route path='/warehouse-app/catalog/:id' element={<ProductsPage />} />
                        <Route path='/warehouse-app/catalog/item/:id' element={<ItemPage />} />
                    </Route>
                </Routes>
            </Router>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default App;
