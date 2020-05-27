import React, {Component, useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from  'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import{ connect } from 'react-redux';
import {getTasks, deleteTasks, updateTasks} from '../actions/taskActions';
import PropTypes from 'prop-types';


class TaskList extends Component{  
  state = {

  }   
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: true
        };
      }


      static propTypes = {
        auth: PropTypes.object.isRequired
      }


    
      toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }
    
    componentDidMount()
    {
        this.props.getTasks();
    }


    onDeleteClick = (id) => {
        this.props.deleteTasks(id); 
    }

    onStatusClick= (id) => {        
        this.props.updateTasks(id); 
    }
    

    getStyle = () => {                    
         return{                             
           backgroundColor: 
           this.props.task.completed === false ?  "#BDF7CC" : '#45D672'
         }
       }
   
       
       
    

     render(){
        const { isAuthenticated, user } = this.props.auth;               
         const { tasks } = this.props.task;
         
         //const filtered = tasks.filter(x => x.username === user.user.username);
        const filtered = isAuthenticated
        ?  
          user.user.role === 'user'?
            tasks.filter(x => x.assigned === user.user.username &&
            x.status === 'in progress')
            :
            tasks
        : tasks
        

        
          
         return(
             <Container>
                
                
               <ListGroup >
                   <TransitionGroup className="task-list">
                       {filtered.map(({_id, description, assigned, status }) => (
                           <CSSTransition key={_id} timeout={500} classNames= "fade" >
                            { isAuthenticated ?  

                              //user.user.role === 'coordinator' ?

                               <ListGroupItem >
                                {
                                  user.user.role === 'coordinator' ||
                                  user.user.username === assigned ?
                                    ' '
                                  
                                  : ' '
                                }


                                   <b>{description} </b> 
                                   &nbsp;
                                   &nbsp;
                                   &nbsp;
                                   &nbsp;
                                   status: {status}
                                   <br/>
                                   Assigned to:&nbsp; {assigned}

                                   { isAuthenticated ? 
                                    user.user.role === 'coordinator' ?
                                    <Button
                                    className="remove-btn"
                                    color="danger"
                                    style={{float: 'right'} }
                                    size="sm"
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                   >delete task</Button>
                                     : 
                                     <Button
                                    className="status"
                                    color="success"     
                                    style={{float: 'right'} }
                                    size="sm"                                   
                                    onClick={this.onStatusClick.bind(this, _id)} 
                                   >mark completed</Button> 
                                     :
                                       ' '
                                  }
                               </ListGroupItem>

                              //: ' '

                          :
                          //NOT AUTHENTICATED
                          <ListGroupItem >
                                
                          <b>{description} </b> 
                          &nbsp;
                          &nbsp;
                          &nbsp;
                          &nbsp;
                          status: {status}
                          <br/>
                          Assigned to:&nbsp; {assigned}

                            </ListGroupItem>
                        }

                           </CSSTransition>
                       ))}
                   </TransitionGroup>
               </ListGroup>
               
               
             </Container>
             
         );
     }
}

TaskList.propTypes = {
    getTasks: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    task: state.task,    
    auth: state.auth
});

export default connect(mapStateToProps, 
        { getTasks, deleteTasks, updateTasks })
        (TaskList);