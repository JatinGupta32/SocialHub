import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {Provider} from 'react-redux';
import rootreducer from './reducer/index.jsx';
import {configureStore} from "@reduxjs/toolkit";
import './index.css'
import App from './App.jsx'

const store = configureStore({
  reducer: rootreducer,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
    </Provider>    
  </StrictMode>,
);
