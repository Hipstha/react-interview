// Libraries
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

// Component modules
import Title from '../../components/Title/Title';

// classes
import Props from '../../../Classes/Props';

// Styles
import './Summary.scss';

class Summary extends Component {

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
    return (
      <>

        <div className="summary">
          <Title title="Resumen" />

          <div className="summary-content">

            <div className="row">

              <div className="col">
                <div className="candidate-data">
                  <div className="title">
                    <h3>Datos del candidato</h3>
                  </div>
                  <div className="candidate-name">
                    <div className="label">
                      <p>Nombre completo:</p>
                    </div>
                    <div className="name">
                      <p>Daniel Alejandro Cruz Pérez</p>
                    </div>
                  </div>

                  <div className="candidate-email">
                    <div className="label">
                      <p>Correo electrónico:</p>
                    </div>
                    <div className="email">
                      <p>alex_crz97@hotmail.com</p>
                    </div>
                  </div>

                  <div className="candidate-type">
                    <div className="label">
                      <p>Type:</p>
                    </div>
                    <div className="type">
                      <p>Interno</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">

                <table className="skills">
                  <thead>
                    <tr>
                      <th className="results">Resultados</th>
                      <td className="see-results second">
                        <span onClick={() => this.handleShow()}>Ver resultados</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="head">Skill</td>
                      <td className="score-title second">Puntaje</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Javascript</td>
                      <td className="second">P1</td>
                    </tr>
                  </tbody>
                </table>


              </div>

            </div>

            <div className="comment-section">
              <div className="comment-header">
                <h3>Comentarios: </h3>
              </div>
              <div className="comment">
                <textarea name="comment" 
                          id="comment-sum" 
                          rows="5"
                ></textarea>
              </div>
            </div>

            <div className="summary-footer">
              <div className="finish-button disabled">
                <p>Finalizar</p>
              </div>
            </div>
          </div>
        </div>


        <Modal className="modal-quest" show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="fas fa-question"></i>
              <strong>   Preguntas</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table border="1" className="question-table">
              <thead>
                <tr>
                  <th>Pregunta</th>
                  <th>Respuesta</th>
                  <th>Comentario</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    ¿Diferencia entre let, const y var?
                  </td>
                  <td>
                    Correcto
                  </td>
                  <td>
                    blablabla
                  </td>
                </tr>
                <tr>
                  <td>
                    ¿Diferencia entre let, const y var?
                  </td>
                  <td>
                    Correcto
                  </td>
                  <td>
                    blablabla
                  </td>
                </tr>
                <tr>
                  <td>
                    ¿Diferencia entre let, const y var?
                  </td>
                  <td>
                    Correcto
                  </td>
                  <td>
                    blablabla
                  </td>
                </tr>
                <tr>
                  <td>
                    ¿Diferencia entre let, const y var?
                  </td>
                  <td>
                    Correcto
                  </td>
                  <td>
                    blablabla
                  </td>
                </tr>
                <tr>
                  <td>
                    ¿Diferencia entre let, const y var?
                  </td>
                  <td>
                    Correcto
                  </td>
                  <td>
                    blablabla
                  </td>
                </tr>
              </tbody>
            </table>
          </Modal.Body>
        </Modal>

      </>
    )
  }
}

export default Summary;