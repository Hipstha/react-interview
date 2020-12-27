// libraries
import { combineReducers } from 'redux';

//Reducers
import InterviewerReducer from './InterviewerReducer';
import CandidateReducer from './CandidateReducer';
import SkillsReducer from './SkillsReducer';

export default combineReducers({
  interviewer: InterviewerReducer,
  candidate: CandidateReducer,
  skills: SkillsReducer
});