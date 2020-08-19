// react 
import React from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom'

//redux
import store from './redux/store';
import { Provider } from 'react-redux';
import { SET_AUTHENTICATED } from './redux/types';
// import { logOutUser, getUserData } from './redux/actions/userActions';
import { getUserData } from './redux/actions/userActions';

// project files
import './App.css';

//MUI
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'; >> Caused error warning
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

//Pages
// import landing from './pages/landing';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import profile from './pages/profile';
import user from './pages/user';
import timeline from './pages/timeline';
import favorites from './pages/favorites';
import landing from './pages/landing';
import policy from './pages/policy';

//Components
import { Main as MainLayout } from './components/layout';
import { RouteWithLayout } from './components';

// Util
import themeFile from './util/theme';
import AuthRoute from './util/AuthRoute';
import jwtDecode from 'jwt-decode';

import axios from 'axios';

// theme parameters
// create colors palette : https://material-ui.com/customization/color/
const theme = createMuiTheme(themeFile)

axios.defaults.baseURL = 'https://europe-west1-historycards-a64e0.cloudfunctions.net/api';
axios.defaults.timeout = 10000;
const token = localStorage.token;

// if we have a token
// decode it with jwt-deocde : npm install --save jwt-decode
// decoded token will have an 'exp' property
// check if exp property < date.now (* 1000 cause it's in seconds)
// if less than date.now redirect to login page 

// if (token) {
//   const decodedToken = jwtDecode(token);
//   if ((decodedToken.exp * 1000) < Date.now()) {
//     store.dispatch(logOutUser());
//     window.location.href = '/login';
//     // window.location.href = '/landing';
//   } else {
//     store.dispatch({ type: SET_AUTHENTICATED });
//     axios.defaults.headers.common['Authorization'] = token;
//     store.dispatch(getUserData());
//   }
// }

if (token) {
  const decodedToken = jwtDecode(token);
  if (!decodedToken) {
    // store.dispatch(logOutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <div className='container'>
              <Switch>
                <AuthRoute exact path='/' component={landing} />
                <RouteWithLayout exact path='/home' component={home} layout={MainLayout} />
                <AuthRoute exact path='/login' component={login} />
                <AuthRoute exact path='/signup' component={signup} />
                <Route exact path='/users/:handle' component={user} />
                <RouteWithLayout exact path='/account' component={profile} layout={MainLayout} />
                <RouteWithLayout exact path='/favorites/:handle' component={favorites} layout={MainLayout} />
                <RouteWithLayout exact path='/timelines/:timelineId' component={timeline} layout={MainLayout}/>
                <Route exact path='/policy' component={policy} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;