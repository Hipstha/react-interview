// libraries
import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// classes
import Props from '../../../Classes/Props';

// styles
import './Register.scss';

class Register extends Component {

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
      <section className="register">
        <article className="register-container">

          <div className="register-title">
            <h2>
              No se ha registrado ningún { type }
            </h2>
          </div>

          <div className="add-type" onClick={ () => this.handleShow() }>
            <div className="icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <div className="sub-title">
              <p>Haz click aquí para añadir</p>
            </div>
          </div>

        </article>

        <Modal className="modal-interviewer" show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="fas fa-user-plus"></i>
              <strong>
              { type === 'entrevistador' ? 
                <span> Nuevo entrevistador</span> : 
                <span> Datos del candidato</span>
              }
              </strong>
            </Modal.Title>
          </Modal.Header>

          <Form>
            <Modal.Body>

              {
                type === 'entrevistador' ?
                (
                  <div>
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
                  </div>
                ) :
                (
                  <div>
                    <Form.Group controlId="candidateName">
                      <Form.Label><strong>Nombre completo</strong></Form.Label>
                      <Form.Control className="form-input" type="text" placeholder="Nombre del candidato" />
                    </Form.Group>

                    <Form.Group controlId="employeeId">
                      <Form.Label><strong>Correo electrónico</strong></Form.Label>
                      <Form.Control className="form-input" type="email" placeholder="Ingrese el email del candidato" />
                    </Form.Group>

                    <Form.Group controlId="employeeEID">
                      <Form.Label><strong>Tipo</strong></Form.Label>
                      <Form.Control as="select" className="form-input">
                        <option value="">Seleccionar</option>
                        <option value="Interno">Interno</option>
                        <option value="Contractor">Contractor</option>
                      </Form.Control>
                    </Form.Group>
                  </div>
                )
              }

              

            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={() => this.handleClose()}>
                Guardar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

      </section>

      
    )
  }
}

export default Register;