import axios from 'axios';
import { GET_TASKS, ADD_TASKS,  UPDATE_TASKS, DELETE_TASKS, TASKS_LOADING } from './types'; 
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';


export const getTasks = () =>   dispatch => {
    dispatch(setItemsLoading()); 
    
    /*
    axios.get('http://localhost:4000/tasks')    
    .then(res => 
        dispatch({
            type: GET_TASKS ,
            payload: res.data
        })
        )
*/
        axios.get('http://localhost:4000/api/tasks')    
        .then(res => dispatch({
            type: GET_TASKS ,
            payload: res.data
        })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

    
};

export const deleteTasks = (_id) => dispatch => {
    axios.delete(`http://localhost:4000/api/tasks/${_id}`)
    .then(res => 
        dispatch({
            type: DELETE_TASKS,
            payload: _id
        })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addTasks = task => (dispatch, getState ) => {
    axios.post('http://localhost:4000/api/tasks',
      task,
      tokenConfig(getState)
     )
    .then ( res => 
        dispatch({
            type: ADD_TASKS,
            payload:res.data
        })
        )  
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status))); 
};

export const updateTasks = (_id, status) => dispatch => {
    axios.put(`http://localhost:4000/tasks/${_id}`,
    {status: "completed"}
    )
    .then(res => 
        dispatch({
            type: UPDATE_TASKS,
            payload:res.data

        })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

/*export const updateTasks = (_id, prio ) => {    
    axios.put(`http://localhost:4000/tasks/${_id}`, {
      prio 
    })
    //.then( res => this.setState({ todos: [...this.state.todos, res.data ] }) )
  }
  */  



export const setItemsLoading = () => {
    return {
        type: TASKS_LOADING
    }
}