// types
import {
  START_INITIAL_GET_INTERVIEWER,
  INITIAL_GET_INTERVIEWER_SUCCESS,
  INITIAL_GET_INTERVIEWER_ERROR,
  CREATE_INTERVIEWER,
  CREATE_INTERVIEWER_SUCCESS,
  CREATE_INTERVIEWER_ERROR,
  DELETE_INTERVIEWER,
  DELETE_INTERVIEWER_SUCCESS,
  DELETE_INTERVIEWER_ERROR,
  UPDATE_INTERVIEWER,
  UPDATE_INTERVIEWER_SUCCESS,
  UPDATE_INTERVIEWER_ERROR
} from '../types/InterviewerTypes';

// reducer state 
const initialState = {
  interviewers: [],
  error: false,
  loading: false
}

const InterviewerReducer = (state = initialState, action) => {
  switch(action.type) {
    case START_INITIAL_GET_INTERVIEWER:
      return {
        ...state,
        loading: action.payload
      };
    case INITIAL_GET_INTERVIEWER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        interviewers: action.payload,

      }
    case INITIAL_GET_INTERVIEWER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CREATE_INTERVIEWER: 
      return {
        ...state,
        loading: action.payload
      }
    case CREATE_INTERVIEWER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        interviewers: [ ...state.interviewers, action.payload ]
      }
    case CREATE_INTERVIEWER_ERROR: 
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case DELETE_INTERVIEWER:
      return {
        ...state,
        loading: action.payload
      }
    case DELETE_INTERVIEWER_SUCCESS: 
      return {
        ...state,
        loading: false,
        error: false,
        interviewers: state.interviewers.filter( interv => interv.id !== action.payload )
      }
    case DELETE_INTERVIEWER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case UPDATE_INTERVIEWER:
      return {
        ...state,
        loading: action.payload
      }
    case UPDATE_INTERVIEWER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        interviewers: state.interviewers.map(
          interv => {
            return interv.id === action.payload.id ? interv = action.payload : interv
          }
        )
      }
    case UPDATE_INTERVIEWER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default: 
      return state;
  }
};

export default InterviewerReducer;