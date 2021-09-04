import React from 'react';
import Login from '../screens/login/Login'

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


export default function MainRoute() {
    return (
        <Router>
            <>
                <Switch>
                    <Route path="/login" exact component={Login} />
                </Switch>
            </>
        </Router>
    )
}