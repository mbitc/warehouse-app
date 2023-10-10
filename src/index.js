import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Loader from './components/Loader/Loader';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
