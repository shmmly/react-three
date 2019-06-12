import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import CourseOne from './views/CourseOne';
import CourseTwo from './views/CourseTwo';

ReactDOM.render(
    <BrowserRouter>
        <Route path='/01' component={CourseOne}></Route>
        <Route path='/02' component={CourseTwo}></Route>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
