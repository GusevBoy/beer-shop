import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import { store } from './Redux/redux-store';
import GrandHotel from './fonts/GrandHotel.ttf'
import Catamaran800 from './fonts/Catamaran800.ttf'
import Catamaran from './fonts/Catamaran.ttf'
import {
  BrowserRouter as Router,
} from 'react-router-dom';

const FontStyle = createGlobalStyle`
  @font-face {
    font-family: 'GrandHotel';
    src: url(${GrandHotel}) format('woff2');
  }
  @font-face {
    font-family: 'Catamaran800';
    font-weight: 800;
    src: url(${Catamaran800}) format('woff2');
  }
  @font-face {
    font-family: 'Catamaran';
    src: url(${Catamaran}) format('woff2');
  }
`

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Catamaran', sans-serif;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <FontStyle />
      <GlobalStyle />
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
