import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './containers/LoginContainer';
import Logout from './containers/LogoutContainer';
import Settings from './containers/SettingsContainer';
import NotFound from './components/NotFound';
import SiteNavbar from './components/SiteNavbar.jsx';
import configureStore from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { authenticated, unauthenticated} from './actions/actionCreators.js';
import reportWebVitals from './reportWebVitals';

const store = configureStore();

const token = localStorage.getItem('token');
if(token){
  store.dispatch(authenticated())
}
else{
  store.dispatch(unauthenticated())
}

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter> 
          <div>
              <SiteNavbar/>
              <Switch>
                  <Route exact path='/' component={App}/>
                  <Route path="/login" component={Login}/>
                  <Route path="/logout" component={Logout}/>
                  <Route path="/settings" component={Settings}/>
                  <Route component={NotFound}/>
              </Switch>
          </div>
      </BrowserRouter>    
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
