// classes
import Crud from '../../Classes/Crud';

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

// global variables
const crud = new Crud();
const endpoint = '/candidates';

// function to get all the candidates
export function getCandidatesAction() {
  return crud.getElement(
    endpoint,
    getCandidates,
    getCandidatesSuccess,
    getCandidatesError
  );
}

const getCandidates = () => ({
  type: START_INITIAL_GET_CANDIDATE,
  payload: true
});

const getCandidatesSuccess = (candidates) => ({
  type:  INITIAL_GET_CANDIDATE_SUCCESS,
  payload: candidates
});

const getCandidatesError = () => ({
  type: INITIAL_GET_CANDIDATE_ERROR,
  payload: true
});

// functions to create a candidate
export function addCandidateAction(candidate) {
  return crud.addElement(
    endpoint,
    candidate,
    addCandidate,
    addCandidateSuccess,
    addCandidateError
  );
}

const addCandidate = () => ({
  type: CREATE_CANDIDATE,
  payload: true
});

const addCandidateSuccess = (candidate) => ({
  type: CREATE_CANDIDATE_SUCCESS,
  payload: candidate
});

const addCandidateError = () => ({
  type: CREATE_CANDIDATE_ERROR,
  payload: true
});

// functions to delete a candidate
export function deleteCandidateAction(id) {
  return crud.deleteElement(
    endpoint,
    id,
    deleteCandidate,
    deleteCandidateSuccess,
    deleteCandidateError
  );
}

const deleteCandidate = () => ({
  type: DELETE_CANDIDATE,
  payload: true
});

const deleteCandidateSuccess = (id) => ({
  type: DELETE_CANDIDATE_SUCCESS,
  payload: id
});

const deleteCandidateError = () => ({
  type: DELETE_CANDIDATE_ERROR,
  payload: true
});

// functions to update a candidate
export function updateCandidateAction(candidate) {
  return crud.updateElement(
    endpoint,
    candidate,
    updateCandidate,
    updateCandidateSuccess,
    updateCandidateError
  );
}

// functions to update a candidate without ask
export function updateCandidateFastAction(candidate) {
  return crud.updateElementFast(
    endpoint,
    candidate,
    updateCandidate,
    updateCandidateSuccess,
    updateCandidateError
  );
}

const updateCandidate = () => ({
  type: UPDATE_CANDIDATE,
  payload: true
});

const updateCandidateSuccess = (candidate) => ({
  type: UPDATE_CANDIDATE_SUCCESS,
  payload: candidate
});

const updateCandidateError = () => ({
  type: UPDATE_CANDIDATE_ERROR,
  payload: true
});