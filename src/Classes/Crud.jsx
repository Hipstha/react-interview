import Alerts from  './Alerts';
import axiosClient from '../config/axios';

class Crud {
  alerts = new Alerts();
  
  getElement(endpoint, getState, getSuccess, getError) {
    return async(dispatch) => {
      dispatch( getState() );
      try {
        const resp = await axiosClient.get(endpoint);
        dispatch( getSuccess(resp.data) );
      }
      catch(error) {
        console.log(error);
        dispatch( getError() );
      }
    }
  }

  addElement(endpoint, body, getState, getSuccess, getError) {
    return async (dispatch) => {
      dispatch( getState() );
      try {
        const resp = await axiosClient.post(endpoint, body);
        dispatch( getSuccess(resp.data) );
        this.alerts.getSuccessAlert('Se ha agregado correctamente');
      } catch(error) {
        console.log(error);
        dispatch( getError() );
      }
    }
  }
  
  deleteElement(endpoint, id, getState, getSuccess, getError) {
    return (dispatch) => {
      try {
        this.alerts.getConfirmAlert(
          '¿Esta seguro que desea eliminar este objeto?'
        ).then((result) => {
          if(result.isConfirmed) {
            dispatch( getState() );
            axiosClient.delete(`${endpoint}/${id}`);
            dispatch( getSuccess(id) )
            this.alerts.getSuccessAlert('Se ha eliminado con éxito');
          }
        });
      } catch(error) {
        console.log(error);
        dispatch( getError() );
      }
    }
  }

  updateElement(endpoint, body, getState, getSuccess, getError) {
    return (dispatch) => {
      try {
        this.alerts.getConfirmAlert(
          '¿Esta seguro que desea continuar?'
        ).then((result) => {
          if(result.isConfirmed) {
            dispatch( getState() );
            axiosClient.put(
              `${endpoint}/${body.id}`, 
              body
            );
            dispatch( getSuccess(body) );
            // this.alerts.getSuccessAlert('Se ha modifcado con éxito');
          }
        })
      } catch(error) {
        console.log(error);
        dispatch( getError() );
      }
    }
  }

  updateElementFast(endpoint, body, getState, getSuccess, getError) {
    return async (dispatch) => {
      dispatch( getState() );
      try {
        const resp = await axiosClient.put(`${endpoint}/${body.id}`, body);
        dispatch( getSuccess(resp.data) );
      } catch(error) {
        console.log(error);
        dispatch( getError() );
      }
    }
  }

}

export default Crud;