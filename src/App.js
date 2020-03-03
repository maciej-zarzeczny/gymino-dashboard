import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/navbar/navbar'
import Menu from './components/layout/menu/menu';
import Dashboard from './components/dashboard/dashboard';
import AllTrainings from './components/trainings/all_trainings/all_trainings';
import AddTraining from './components/trainings/add_training/add_training';
import EditData from './components/edit_data/edit_data';
import Login from './components/auth/login';
import SignUp from './components/auth/sign_up';

class App extends Component {    
  render() {
    return (
      <BrowserRouter>
        <div className="App">          
          <Navbar />                             
            <Switch>
              <Route exact path='/' component={ Dashboard } />
              <Route path='/trainings' component={ AllTrainings } />
              <Route path='/add_training' component={ AddTraining } />
              <Route path='/edit_data' component={ EditData } />
              <Route path='/login' component={ Login } />
              <Route path='/signup' component={ SignUp } />
            </Switch>            
        </div>         
        <Menu />           
      </BrowserRouter>
    );
  }  
}

export default App;
