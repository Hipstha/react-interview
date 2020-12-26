// libraries
import { combineReducers } from 'redux';

//Reducers
import InterviewerReducer from './InterviewerReducer';

export default combineReducers({
  interviewer: InterviewerReducer
});