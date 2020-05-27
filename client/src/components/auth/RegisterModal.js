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
    Input, 
    NavLink,
    Alert
} from 'reactstrap';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors} from '../../actions/errorActions';



class RegisterModal extends Component {
    state =    {
        modal: false,
        username: '',
        password: '',
        role: '',
        assigned: '',
        dropdownOpen: false,
        value: '',
        msg: null,
        dropdownOpen: false        
    };

   /* constructor(props) {
        super(props);
    
        this.toggledd = this.toggledd.bind(this);
        this.state = {
          dropdownOpen: false
          
        };
      }
*/
      toggledd() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

      onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.role
        })    
       }

    static propTypes = {  
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired 
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error != prevProps.error){
            if(error.id === 'REGISTER_FAIL'){
                 this.setState({ msg: error.msg.msg})
            } else{
                this.setState( { msg: null})
            }
        }
        
        if(this.state.modal){
            if(isAuthenticated){
                  this.toggle();
            }
        }

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

    
    

    toggle = () => {
        this.props.clearErrors();
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


    select = e => {
        this.setState({
            //dropdownOpen: !this.state.dropdownOpen,
            role: e.target.innerText
          });
    }


    onSubmit = e => {
        e.preventDefault();
        
        const { username, password, role } = this.state;
        //Create User object
        const newUser = {
          username, 
          password,
          role
        };

        this.props.register( newUser );



        //close modal
    //    this.toggle();
    }

    render() {
        
        return(
          <div>
              <NavLink onClick={this.toggle} href="#">
                  Register
              </NavLink>
              <Modal
              isOpen = {this.state.modal}
              toggle = {this.toggle}

              > 
                <ModalHeader toggle= {this.toggle}>
                    Register
                </ModalHeader>
                <ModalBody>
        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null }
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                             type = "text"
                             name="username"
                             id="username"
                             placeholder="username"
                             onChange={this.onChange}
                            />

                            <br/>
                            <Label for="password">Password</Label>
                            <Input
                             type = "password"
                             name="password"
                             id="password"
                             placeholder="password"
                             onChange={this.onChange}
                            />

                            <br/>
                            Role
                            <Dropdown  isOpen={this.state.dropdownOpen} toggle={this.toggledd}>
                                    <DropdownToggle caret color="info" className="nav-link">
                                        {this.state.role}      
                                    </DropdownToggle >
                                    
                                    <DropdownMenu>                                    
                                    <DropdownItem onClick={this.select}>user</DropdownItem>
                                    <DropdownItem onClick={this.select}>coordinator</DropdownItem>                                    
                                    </DropdownMenu>

                                    
                                    </Dropdown>

                            
                            <Button 
                            color="info"
                            style={{marginTop: '2rem'}}
                            block
                            >
                                Register
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
              </Modal>
          </div>      
        );
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { register , clearErrors })(RegisterModal);