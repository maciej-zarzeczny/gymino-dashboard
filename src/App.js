import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/navbar/navbar'
import Menu from './components/layout/menu/menu';
import M from 'materialize-css';
import Dashboard from './components/dashboard/dashboard';
import AllTrainings from './components/trainings/all_trainings/all_trainings';
import AddTraining from './components/trainings/add_training/add_training';
import EditData from './components/edit_data/edit_data';

class App extends Component {  
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="wrapper">
            <Navbar />
            <div className="content">
              <Switch>
                <Route exact path='/' component={ Dashboard } />
                <Route path='/trainings' component={ AllTrainings } />
                <Route path='/add_training' component={ AddTraining } />
                <Route path='/edit_data' component={ EditData } />
              </Switch>
            </div>            
          </div>         
          <Menu />   
        </div>
      </BrowserRouter>
    );
  }  
}

export default App;
