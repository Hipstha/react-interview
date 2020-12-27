// types
import {
  GET_SKILLS,
  GET_SKILLS_SUCCESS,
  GET_SKILLS_ERROR
} from '../types/skillsTypes';

// reducer state
const initialState = {
  skills: [],
  error: false,
  loading: false
}

const SkillsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_SKILLS:
      return {
        ...state,
        loading: action.payload
      }
    case GET_SKILLS_SUCCESS: 
      return {
        ...state,
        loading: false,
        error: false,
        skills: action.payload
      }
    case GET_SKILLS_ERROR: 
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default: 
      return state;
  }
}

export default SkillsReducer;