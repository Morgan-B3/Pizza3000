import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from "./slices";
import './index.css';
import App from './App';
import NewOrder from './components/NewOrder';
import Order from './components/Order';
import PaymentOrder from './components/PaymentOrder';
import Orders from './components/Orders';
import NotFound from './components/NotFound';
import * as serviceWorker from './serviceWorker';

import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';

// Création du store via Redux Toolkit
const store = configureStore({
    reducer: {
        data: dataReducer
    }
});

const Root = () => (
    <Router>
        <Routes>
            {/* La prop exact n'est plus nécessaire React Router le gère désormais nativement */}
            <Route path='/' element={<App/>} />
            <Route path='/new' element={<NewOrder/>} />
            <Route path='/order/:oid' element={<Order/>} />
            <Route path='/orders' element={<Orders/>} />
            <Route path='/payment-order' element={<PaymentOrder/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    </Router>
);

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
