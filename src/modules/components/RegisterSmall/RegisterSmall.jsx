// libraries
import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// classes
import Props from '../../../Classes/Props';

// styles
import './RegisterSmall.scss';

class RegisterSmall extends Component {

  thisProps = new Props();
  state = {};
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.thisProps.setProps(props);
  }

  handleClose() {
    this.setState({
      show: false
    })
  }

  handleShow() {
    this.setState({
      show: true
    });
  }

  render() {
    const { type } = this.thisProps.getProps();
    return (
      <>
        <article className="registerSmall" onClick={ () => this.handleShow() }>
          <div className="icon">
            <i className="fas fa-user-plus"></i>
          </div>
          <div className="text">
            <p>Haz click aquí para añadir a otro { type }</p>
          </div>
        </article>

        <Modal className="modal-interviewer" show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="fas fa-user-plus"></i>
              <strong> Nuevo entrevistador</strong>
            </Modal.Title>
          </Modal.Header>

          <Form>
            <Modal.Body>

              <Form.Group controlId="employeeName">
                <Form.Label><strong>Nombre completo</strong></Form.Label>
                <Form.Control className="form-input" type="text" placeholder="Ingrese el nombre" />
              </Form.Group>

              <Form.Group controlId="employeeId">
                <Form.Label><strong>Id del empleado</strong></Form.Label>
                <Form.Control className="form-input" type="text" placeholder="Ingrese el id del empleado" />
              </Form.Group>

              <Form.Group controlId="employeeEID">
                <Form.Label><strong>EID</strong></Form.Label>
                <Form.Control className="form-input" type="text" placeholder="Ingrese el EID" />
              </Form.Group>

            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={() => this.handleClose()}>
                Guardar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    )
  }

}

export default RegisterSmall;