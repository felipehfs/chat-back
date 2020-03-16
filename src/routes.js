import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import ChatPage from './pages/Chat';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';

export default props => (
    <BrowserRouter>
        <Route exact path="/" component={LoginPage} />
        <Route path="/chat" component={ChatPage} />
        <Route path="/register" component={RegisterPage} />
    </BrowserRouter>
)