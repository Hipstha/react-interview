// types
import {
  GET_INTERVIEWS,
  GET_INTERVIEWS_SUCCESS,
  GET_INTERVIEWS_ERROR,
  CREATE_INTERVIEW,
  CREATE_INTERVIEW_SUCCESS,
  CREATE_INTERVIEW_ERROR
} from '../types/InterviewTypes';

// reducer state
const initialState = {
  interviews: [],
  error: false,
  loading: false
};

const InterviewReducer = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_INTERVIEW: 
    case GET_INTERVIEWS: 
      return {
        ...state,
        loading: action.payload
      }
    case GET_INTERVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        interviews: action.payload
      }
    case CREATE_INTERVIEW_ERROR:
    case GET_INTERVIEWS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      }
    case CREATE_INTERVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        interviews: [ ...state.interviews, action.payload]
      }
    default: 
      return state;
  }
}

export default InterviewReducer;