import React, {Component} from 'react';
import './App.css';
import MainLayout from './components/pages/mainlayout'
import LoginPage from './components/pages/auth/Login'

import {Route, Router} from 'react-router-dom';
import rootReducer from './reducers/index';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import createHashHistory from 'history/createBrowserHistory';
import {AUTH_USER} from './actions/types.js'
import {axiosClient} from './tools/axiosClient.js'


export const history = createHashHistory();

const store = createStore(rootReducer, undefined, compose(
    applyMiddleware(thunkMiddleware),
));

if (window.sessionStorage.getItem('hackathon_api_user')) {

    let user = JSON.parse(window.sessionStorage.getItem('hackathon_api_user'))

    if (history.location.pathname === '/') {
        history.replace('/app')
    }
    store.dispatch({type: AUTH_USER, payload: user});
}

export class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={MainLayout}/>
                </Router>
            </Provider>
        );
    }
}

