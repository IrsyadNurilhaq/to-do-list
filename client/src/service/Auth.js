import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Layout from '../service/Layout';

export const Authenticated = ({ component: Component, ...rest }) => (
    <Layout>
    <Route {...rest} render={props => (
        localStorage.getItem('token') !== null  ?
        ( <Component {...props}/>) 
        :
        ( <Redirect to={{ pathname: '/' }}/>)
    )} />
    </Layout>
)