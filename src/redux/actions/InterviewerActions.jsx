// libraries

// api server
import axiosClient from '../../config/axios';

// classes
import Alerts from '../../Classes/Alerts';

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

const alerts = new Alerts();

// functions to get all interviewers
export function getInterviewersAction() {
  return async(dispatch) => {
    dispatch( getInterviewers() );
    try {
      const resp = await axiosClient.get('/interviewer');
      dispatch( getInterviewersSuccess(resp.data) );
    }
    catch(error) {
      console.log(error);
      dispatch( getInterviewersError() );
    }
  }
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
  return async (dispatch) => {
    dispatch( addInterviewer() );
    try {
      const resp = await axiosClient.post('/interviewer', interviewer);
      dispatch( addInterviewerSuccess(resp.data) );
      alerts.getSuccessAlert('Se ha ingresado con correctamente');
    } catch(error) {
      console.log(error);
      dispatch( addInterviewerError() );
    }
  }
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
  return (dispatch) => {
    try {
      alerts.getConfirmAlert(
        'Esta seguro que desea eliminar este objeto?'
      ).then((result) => {
        if(result.isConfirmed) {
          dispatch( deleteInterviewer() );
          axiosClient.delete(`/interviewer/${id}`);
          dispatch( deleteInterviewerSuccess(id) )
          alerts.getSuccessAlert('Se ha eliminado con éxito');
        }
      });
    } catch(error) {
      console.log(error);
      dispatch( deleteInterviewerError() );
    }
  }
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
  return (dispatch) => {
    try {
      alerts.getConfirmAlert(
        'Esta seguro que desea modificar este objeto?'
      ).then((result) => {
        if(result.isConfirmed) {
          dispatch( updateInterviewer() );
          console.log(interviewer);
          // axiosClient.put(
          //   `/interviewer/${interviewer.id}`, 
          //   interviewer
          // );
          dispatch( updateInterviewerSuccess(interviewer) );
          alerts.getSuccessAlert('Se ha modifcado con éxito');
        }
      })
    } catch(error) {
      console.log(error);
      dispatch( updateInterviewerError() );
    }
  }
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