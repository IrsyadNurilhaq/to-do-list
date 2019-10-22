import React from 'react';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dasboard'
import { 
    BrowserRouter as Router, 
    Route,Switch
} from "react-router-dom";

const MainRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/register" component={Register}/>
        </Switch>

    </Router>
);
export default MainRouter;