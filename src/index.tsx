import React from 'react';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './assets/styles/index.scss';

const rootEl = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootEl);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

const ro = new ResizeObserver(() => {
  if (document.body.scrollWidth !== window.innerWidth) {
    rootEl.style.paddingRight = '0';
    console.log('>>>>scroll', document.body.scrollWidth, window.innerWidth);
  } else {
    rootEl.style.paddingRight = '15px';
    console.log('>>>>scroll', document.body.scrollWidth, window.innerWidth);
  }
});

ro.observe(document.body);

// reportWebVitals();
