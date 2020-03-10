import React   from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'

import Navbar from "./components/layout/navbar/navbar";
import Menu from "./components/layout/menu/menu";
import Dashboard from "./components/dashboard/dashboard";
import AllWorkouts from "./components/workouts/all_workouts/all_workouts";
import AddWorkout from "./components/workouts/add_workout/add_workout";
import EditData from "./components/edit_data/edit_data";
import Login from "./components/auth/login";
import SignUp from "./components/auth/sign_up";
import NotFoundPage from './components/layout/404_page/404_page'
import FullPagePreloader from './components/layout/preloader/full_page_preloader'

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <FullPagePreloader />;
  return children
}

function PrivateRoute({ component: Component, ...rest }) {
  const auth = useSelector(state => state.firebase.auth)
  return (
    <Route {...rest} render={(props) => (
      isLoaded(auth) && !isEmpty(auth) ? (
        <Component {...props} />
      ) : (
        <Redirect to='/login' />
      )
    )} />
  )
}

function AuthRoute({ component: Component, ...rest }) {
  const auth = useSelector(state => state.firebase.auth)
  return (
    <Route {...rest} render={(props) => (
      isLoaded(auth) && isEmpty(auth) ? (
        <Component {...props} />
      ) : (
        <Redirect to='/' />
      )
    )} />
  )
}

function App() {  
  return (
    <BrowserRouter>
      <AuthIsLoaded>
        <div className="App">
          <Navbar />
          <Switch>
            <PrivateRoute exact path="/" component={ Dashboard } />            
            <PrivateRoute path="/workouts" component={ AllWorkouts } />
            <PrivateRoute path="/add-workout" component={ AddWorkout } />
            <PrivateRoute path="/edit-data" component={ EditData } />
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/signup" component={SignUp} />
            <Route component={ NotFoundPage } />
          </Switch>
        </div>
        <Menu />
      </AuthIsLoaded>
    </BrowserRouter>
  );  
}

export default App;
