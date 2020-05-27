import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import React, {Component ,  useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form, 
    FormGroup, 
    Label, 
    Input
} from 'reactstrap';
import{ connect } from 'react-redux';
import { addTasks } from '../actions/taskActions';
import { allUsers } from '../actions/authActions';
import PropTypes from 'prop-types';


class TaskModal extends Component {
    state =    {
        modal: false,
        description: '',
        assigned: '',
        dropdownOpen: false,
        value: ''
        //user: ''
    }
    
    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
    
        this.toggledd = this.toggledd.bind(this);
        this.state = {
          dropdownOpen: false
          
        };
      }

    
      toggledd() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

      componentDidMount()
      {                
          this.props.allUsers();
      }
    

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        }); 
    }

    onChange = (e) => {
     this.setState({
         [e.target.name]: e.target.value
     })    
    }


    select = e => {
        this.setState({
            //dropdownOpen: !this.state.dropdownOpen,
            value: e.target.innerText            
          });
    }


    onSubmit = e => {
        e.preventDefault();
        const newTask = {            
            description: this.state.name,
            assigned: this.state.value,
            status: "in progress"

        } 
        //add item via ADD_TASKS action
        this.props.addTasks(newTask);

        //close modal
        this.toggle();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const { allUsers } = this.props.auth;
        var onlyUsers = allUsers.filter(x => x.role === 'user');
        return(
          <div>

              { isAuthenticated ? 
                user.user.role === 'coordinator' ?
                <Button
                 color="info"
                 style={{marginBottom: "2rem"}}
                 onClick= {this.toggle}
                 >Add task</Button>  
                 : ' '
                 :
                 ' '
                }
             
              <Modal
              isOpen = {this.state.modal}
              toggle = {this.toggle}

              > 
                <ModalHeader toggle= {this.toggle}>
                    Add new task to the tasklist
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="task">Task Description</Label>
                            <Input
                             type = "text"
                             name="name"
                             id="task"
                             placeholder="add new task..."
                             onChange={this.onChange}
                            />

                            <br/>
                            Assigned to
                            &nbsp;&nbsp;
                            <Dropdown  isOpen={this.state.dropdownOpen} toggle={this.toggledd}>
                                    <DropdownToggle caret color="info" className="nav-link">
                                        {this.state.value}      
                                    </DropdownToggle >
                                    
                                    <DropdownMenu>
                                    {onlyUsers.map(ddi => (
                                    <DropdownItem onClick={this.select}>{ddi.username}</DropdownItem>
                                    ))}
                                    </DropdownMenu>

                                    
                                    </Dropdown>


                                    

                                    

                                        

                           
                            <Button 
                            color="info"
                            style={{marginTop: '2rem'}}
                            block
                            >
                                Add task
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
              </Modal>
          </div>      
        );
    }
}

TaskModal.propTypes = {
    allUsers: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    task: state.task,
    auth: state.auth,
    allUser: state.allUser      
});

export default connect(mapStateToProps, {addTasks, allUsers})(TaskModal);