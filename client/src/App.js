import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Container } from 'reactstrap';
import AppNavbar from './components/AppNavbar';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal'
import { loadUser } from './actions/authActions';


import { Provider } from 'react-redux';
import store from './store';

//function App() {
class App extends Component{
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render() {
  return (
  <Provider store={store}>  
    <div className="App">
      
        <AppNavbar/>
        <Container>
          <TaskModal/>
          <TaskList/>
        </Container>        

    </div>
    </Provider>
  );  
  }
}

export default App;
