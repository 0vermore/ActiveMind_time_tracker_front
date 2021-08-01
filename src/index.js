import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './containers/LoginContainer';
import Logout from './containers/LogoutContainer';
import Settings from './containers/SettingsContainer';
import NotFound from './components/NotFound';
import SiteNavbar from './components/SiteNavbar.jsx';
import Session from './components/Session.jsx';
import Manage from './containers/ManageContainer';
import configureStore from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import { authenticated, unauthenticated } from './actions/actionCreators.js';
import Reports from './containers/ReportsContainer';
import MyReport from './containers/UserReportContainer';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const store = configureStore();

const token = localStorage.getItem('token');
if (token) {
  store.dispatch(authenticated())
}
else {
  store.dispatch(unauthenticated())
}



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <ToastContainer />
        <Session />
        <SiteNavbar />
        <Switch>
          <Route exact path='/' component={App} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/settings" component={Settings} />
          <Route path="/reports" component={Reports} />
          <Route path="/my-report" component={MyReport} />
          <Route path="/manage" component={Manage} />
          <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
