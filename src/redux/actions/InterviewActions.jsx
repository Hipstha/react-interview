// classes
import Crud from '../../Classes/Crud';

// types
import {
  GET_INTERVIEWS,
  GET_INTERVIEWS_SUCCESS,
  GET_INTERVIEWS_ERROR,
  CREATE_INTERVIEW,
  CREATE_INTERVIEW_SUCCESS,
  CREATE_INTERVIEW_ERROR
} from '../types/InterviewTypes';

// global variables
const crud = new Crud();
const endpoint = '/interviews';

// functions to get all interviewers
export function getInterviewesAction() {
  return crud.getElement(
    endpoint,
    getInterviewes,
    getInterviewesSuccess,
    getInterviewesError
  )
}

const getInterviewes = () => ({
  type: GET_INTERVIEWS,
  payload: true
});

const getInterviewesSuccess = (interviews) => ({
  type: GET_INTERVIEWS_SUCCESS,
  payload: interviews
});

const getInterviewesError = () => ({
  type: GET_INTERVIEWS_ERROR,
  payload: true
});

// functions to create an interviewer
export function addInterviewAction(interview) {
  return crud.addElement(
    endpoint,
    interview,
    addInterview,
    addInterviewSuccess,
    addInterviewError
  )
}

const addInterview = () => ({
  type: CREATE_INTERVIEW,
  payload: true
});

const addInterviewSuccess = (interviewer) => ({
  type: CREATE_INTERVIEW_SUCCESS,
  payload: interviewer
});

const addInterviewError = () => ({
  type: CREATE_INTERVIEW_ERROR,
  payload: true
});