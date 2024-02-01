import React from 'react';
import RouterMain from './routers/RouterMain';
import { BrowserRouter } from 'react-router-dom';
import './components/CommonStyle.css';


const Root = () => {
    return (
        <BrowserRouter>
            <RouterMain/>
        </BrowserRouter>
    );
};

export default Root;