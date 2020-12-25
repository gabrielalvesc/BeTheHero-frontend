import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';

import getIsLoggedIn from './utils/getIsLoggedIn';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

const requireLogin = (to, from, next) => {
    if (to.meta.auth) {
        if (getIsLoggedIn()) {
            next();
        }
        next.redirect('/');
    } else {
        next();
    }
};


export default function Routes() {
    return (
        <BrowserRouter>
            <GuardProvider guards={[requireLogin]}>
                <Switch>
                    <GuardedRoute path="/" exact component={Logon} />
                    <GuardedRoute path="/register" component={Register} />
                    <GuardedRoute path="/incidents/new" component={NewIncident} meta={{ auth: true }} />
                    <GuardedRoute path="/profile" component={Profile} meta={{ auth: true }} />
                </Switch>
            </GuardProvider>
        </BrowserRouter>
    );
}