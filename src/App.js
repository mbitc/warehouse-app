import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WithNav, WithoutNav } from './util/NavStatus/NavStatus';
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import LocationPage from './pages/LocationPage/LocationPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ItemPage from './pages/ItemPage/ItemPage';
import './App.scss';

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='*' element={<h1>404 Page not found...</h1>} />
                    <Route element={<WithoutNav />} >
                        <Route path='/' element={<LoginPage />} />
                    </Route>
                    <Route element={<WithNav />} >
                        <Route path='/dashboard' element={<DashboardPage />} />
                        <Route path='/location' element={<LocationPage />} />
                        <Route path='/catalog' element={<CatalogPage />} />
                        <Route path='/catalog/:id' element={<ProductsPage />} />
                        <Route path='/catalog/item/:id' element={<ItemPage />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
};

export default App;
