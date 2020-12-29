// This class can help you to create custom alerts
import Swal from 'sweetalert2';

class Alerts {

  getErrorAlert(message) {
    return Swal.fire({
      icon: 'warning',
      title: 'Error',
      text: message
    })
  }

  getSuccessAlert(message) {
    return Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: message
    })
  }

  getConfirmAlert(message) {
    return Swal.fire({
      title: message,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    });
  }

}

export default Alerts;