import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './Components/AppRoute';
import { Provider } from 'react-redux';
import store from './Components/Redux/store';
import Book_RoomBtn from './Components/Book_RoomBtn/Book_RoomBtn';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    {/* <AppRoute /> */}
    <Book_RoomBtn hotelGroupName={"Ontrac Hotel"}/>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
