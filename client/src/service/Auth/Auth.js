import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './Layout';

export const Authenticated = ({ component: Component, ...rest }) => (
    <Layout>
        <Route {...rest} render={props => (<Component {...props}/>)}/>
    </Layout>
)