import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCTliTYEqy1p4ywt-B1W6Cb1xI_iMuPnro",
  authDomain: "you-should-check-this-out.firebaseapp.com",
  databaseURL: "https://you-should-check-this-out.firebaseio.com",
  projectId: "you-should-check-this-out",
  storageBucket: "you-should-check-this-out.appspot.com",
  messagingSenderId: "1096926417853",
  appId: "1:1096926417853:web:430acd0b4da4060dbdf8d4"
};

var app = firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
