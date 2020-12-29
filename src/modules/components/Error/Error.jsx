import React, { Component } from 'react';

class Error extends Component {
  render() {
    return (
      <div className="alert alert-danger animate__animated animate__fadeIn" role="alert">
        <h4 className="alert-heading">Error 505! Servidor no disponible</h4>
        <p className="mb-0">Lamentamos las molestias, de momento el servidor no está disponible, intentelo más tarde.</p>
      </div>
    );
  }
}

export default Error;