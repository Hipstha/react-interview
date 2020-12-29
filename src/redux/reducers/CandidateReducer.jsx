// types
import {
  START_INITIAL_GET_CANDIDATE,
  INITIAL_GET_CANDIDATE_SUCCESS,
  INITIAL_GET_CANDIDATE_ERROR,
  CREATE_CANDIDATE,
  CREATE_CANDIDATE_SUCCESS,
  CREATE_CANDIDATE_ERROR,
  DELETE_CANDIDATE,
  DELETE_CANDIDATE_SUCCESS,
  DELETE_CANDIDATE_ERROR,
  UPDATE_CANDIDATE,
  UPDATE_CANDIDATE_SUCCESS,
  UPDATE_CANDIDATE_ERROR
} from '../types/candidateTypes';

const initialState = {
  candidates: [],
  error: false,
  loading: false,
}

const CandidateReducer = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_CANDIDATE:
    case DELETE_CANDIDATE:
    case CREATE_CANDIDATE: 
    case START_INITIAL_GET_CANDIDATE:
      return {
        ...state,
        loading: action.payload
      };
    case INITIAL_GET_CANDIDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        candidates: action.payload
      }
    case UPDATE_CANDIDATE_ERROR:
    case DELETE_CANDIDATE_ERROR:
    case CREATE_CANDIDATE_ERROR:
    case INITIAL_GET_CANDIDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CREATE_CANDIDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        candidates: [ ...state.candidates, action.payload]
      }
    case DELETE_CANDIDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        candidates: state.candidates.filter( cand => cand.id !== action.payload)
      }
    case UPDATE_CANDIDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        candidates: state.candidates.map(
          cand => {
            return cand.id === action.payload.id ? cand = action.payload : cand
          }
        ) 
      }
    default: 
      return state;
  }
}

export default CandidateReducer;