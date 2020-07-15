import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Header from './compomments/layout/Header';
import Tasks from './compomments/Tasks/Tasks';
import EditTask from './compomments/Tasks/EditTask';
import PreviewTask from './compomments/Tasks/privewTask';
import CreateNewTask from './compomments/Tasks/CreateNewTask';

class App extends Component {
  render(){
    return (
      <Router>
        <Header />
        <Route exact path="/" render={props => (
          <React.Fragment>
            <Tasks />
          </React.Fragment>
        )} />  
      
        <Route path="/edittask/:userId" component={EditTask} />
        <Route path="/previewtask/:userId" component={PreviewTask} />
        <Route path="/createnewtask" component={CreateNewTask} />

      </Router>
    )
  };
}

export default App;
