//import React, { Component } from 'react';
import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import './custom.css';
import { XLogin } from './components/XLogin';
import XRequestSms from './components/XRequestSms';
import XFastSmsList from './components/XFastSmsList';
import XMenuAppBar from './components/XMenuAppBar';
import XVpnSmsList from './components/XVpnSmsList';
import XBulkSmsList from './components/XBulkSmsList';

export default function App() {
    return (
        <Layout>
            <Route exact path='/' component={XLogin} />
            <Route path='/home' component={XMenuAppBar} />
            <Route path='/fast-sms-request' component={XRequestSms} />
            <Route path='/fast-sms' component={XFastSmsList} />
            <Route path='/vpn-list' component={XVpnSmsList} />
            <Route path='/bulk-list' component={XBulkSmsList} />
        </Layout>
    );
}