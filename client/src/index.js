import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux'
import manageImage from './reducers/manageImage';
import manageUsers from './reducers/manageUsers';
import { sessionReducer } from 'redux-react-session';
import { sessionService } from 'redux-react-session';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Center from 'react-center'

const root_reducers = combineReducers({image: manageImage, user: manageUsers, session: sessionReducer})

export function configureStore(){
  return createStore(root_reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
};

const store = configureStore();
sessionService.initSessionService(store);

ReactDOM.render(
  <Provider store={store}>
    <App store={store}/>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
