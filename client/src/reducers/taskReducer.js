import { GET_TASKS, ADD_TASKS,  UPDATE_TASKS, DELETE_TASKS, TASKS_LOADING } from '../actions/types';



const initialState= {
    tasks: [],
    loading: false

}


export default function(state = initialState, action){
    switch(action.type){
        case GET_TASKS: 
        return {
            ...state,
            tasks: action.payload,
            loading: false
        } ;
        case DELETE_TASKS: 
            return {
                ...state,
                tasks: state.tasks.filter(item => item._id !== action.payload) 
            };
        case UPDATE_TASKS:
            return {                
                ...state,                
                tasks: action.payload, 
                //tasks: state.tasks.filter(item => item._id !== action.payload)
            };
        case ADD_TASKS:
            return {                
                ...state, 
                tasks: [action.payload, ...state.tasks]
            };
        case TASKS_LOADING: 
            return{
                ...state, 
                loading: true
            }
        default:
            return state; 
    }
}