import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import './config/lang/i18n';
import Store from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import App from './App';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={Store.store}>
      <PersistGate loading={null} persistor={Store.persistor}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </PersistGate>
    </Provider>,
);