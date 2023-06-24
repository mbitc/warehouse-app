import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WithNav, WithoutNav } from './util/NavStatus/NavStatus';
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
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
                    </Route>
                </Routes>
            </Router>
        </>
    );
};

export default App;
