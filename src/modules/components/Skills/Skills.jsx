// libraries
import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

// classes
import Props from '../../../Classes/Props';

// styles
import './Skills.scss';

class Skills extends Component {

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
    });
  }

  handleShow() {
    this.setState({
      show: true
    });
  }

  render() {
    if ( this.thisProps.getProps().data.length === 0) {
      console.log('esta vacío');
    } else {
      console.log( this.thisProps.getProps().data.length );
    }
    return (
      <>
        <article className="skills">
          <div className="skills-container">
            <div className="title">
              <h2>Skills a evaluar: </h2>
            </div>
            <div className="select-skills">
              <div className="select-skills-container" 
                   onClick={() => this.handleShow()}
              >
                <div className="head-select">
                  <p>No se han seleccioando skills</p>
                </div>
                <div className="icon">
                  <i className="fas fa-laptop-code"></i>
                </div>
                <div className="footer-select">
                  <p>Haz click para añadir</p>
                </div>
              </div>
            </div>
            <div className="skills-list" onClick={() => this.handleShow()}>
              <ul>
                <li>Javascript</li>
                <li>HTML</li>
                <li>CSS</li>
                <li>ReactJS</li>
              </ul>
            </div>
          </div>
        </article>

        <Modal className="skill-modal" show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="fas fa-laptop-code"></i>
              <strong> Skills a evaluar</strong>
            </Modal.Title>
          </Modal.Header>

          <Form>
            <Modal.Body>

                <div className="row">
                  <div className="col">
                    <Form.Group controlId="javascriptCheck">
                      <Form.Check type="checkbox" label="Javascript" />
                    </Form.Group>
                    <Form.Group controlId="ReactJSCheck">
                      <Form.Check type="checkbox" label="ReactJS" />
                    </Form.Group>
                    <Form.Group controlId="AngularCheck">
                      <Form.Check type="checkbox" label="Angular" />
                    </Form.Group>
                    <Form.Group controlId="HTMLCheck">
                      <Form.Check type="checkbox" label="HTML" />
                    </Form.Group>
                  </div>
                  <div className="col">
                    <Form.Group controlId="CSSCheck">
                        <Form.Check type="checkbox" label="CSS" />
                      </Form.Group>
                      <Form.Group controlId="TypeScriptCheck">
                        <Form.Check type="checkbox" label="TypeScript" />
                      </Form.Group>
                      <Form.Group controlId="GitCheck">
                        <Form.Check type="checkbox" label="Git" />
                      </Form.Group>
                      <Form.Group controlId="NodeJsCheck">
                        <Form.Check type="checkbox" label="NodeJs" />
                      </Form.Group>
                  </div>
                </div>
                

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

export default Skills;