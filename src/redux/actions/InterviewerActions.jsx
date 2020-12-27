// classes
import Crud from '../../Classes/Crud';

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

// global variables
const crud = new Crud();
const endpoint = '/interviewers';

// functions to get all interviewers
export function getInterviewersAction() {
  return crud.getElement(
    endpoint,
    getInterviewers,
    getInterviewersSuccess,
    getInterviewersError
  )
}

const getInterviewers = () => ({
  type: START_INITIAL_GET_INTERVIEWER,
  payload: true
});

const getInterviewersSuccess = (interviewers) => ({
  type: INITIAL_GET_INTERVIEWER_SUCCESS,
  payload: interviewers
});

const getInterviewersError = () => ({
  type: INITIAL_GET_INTERVIEWER_ERROR,
  payload: true
});

// functions to create an interviewer
export function addInterviewerAction(interviewer) {
  return crud.addElement(
    endpoint,
    interviewer,
    addInterviewer,
    addInterviewerSuccess,
    addInterviewerError
  )
}

const addInterviewer = () => ({
  type: CREATE_INTERVIEWER,
  payload: true
});

const addInterviewerSuccess = (interviewer) => ({
  type: CREATE_INTERVIEWER_SUCCESS,
  payload: interviewer
});

const addInterviewerError = () => ({
  type: CREATE_INTERVIEWER_ERROR,
  payload: true
});

// functions to delete an interviewer
export function deleteInterviewerAction(id) {
  return crud.deleteElement(
    endpoint,
    id,
    deleteInterviewer,
    deleteInterviewerSuccess,
    deleteInterviewerError
  );
}

const deleteInterviewer = () => ({
  type: DELETE_INTERVIEWER,
  payload: true
});

const deleteInterviewerSuccess = (id) => ({
  type: DELETE_INTERVIEWER_SUCCESS,
  payload: id
});

const deleteInterviewerError = () => ({
  type: DELETE_INTERVIEWER_ERROR,
  payload: true
});

// functions to update an Interviewer
export function updateInterviewerActions(interviewer) {
  return crud.updateElement(
    endpoint,
    interviewer,
    updateInterviewer,
    updateInterviewerSuccess,
    updateInterviewerError
  )
}

const updateInterviewer = () => ({
  type: UPDATE_INTERVIEWER,
  payload: true
});

const updateInterviewerSuccess = (interviewer) => ({
  type: UPDATE_INTERVIEWER_SUCCESS,
  payload: interviewer
});

const updateInterviewerError = () => ({
  type: UPDATE_INTERVIEWER_ERROR,
  payload: true
});