import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './home/App';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './common/ErrorBoundary';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './home/homeReducers';
import middleware from './middlewares';

const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    {/* Custom component for global error catch and treatment */}
    <ErrorBoundary>
      {/* React Router DOM component to manage routes */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);
