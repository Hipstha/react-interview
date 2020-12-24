// Libraries
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

// Styles
import './Question.scss';

class Question extends Component {
  render() {
    return (
      <div className="question-content">
        <div className="question-topic">
          <h3>Javascript</h3>
        </div>
        <div className="question">
          <div className="question-text">
            <p><strong>¿Qué diferencia existe entre let, var y const?</strong></p>
          </div>
          <div className="answers">
            <Form.Group controlId="radio">
              <div className="success">
                <Form.Check
                  type="radio"
                  label="Correcto"
                  name="answer"
                  id="correcto"
                />
              </div>
              <div className="fail">
                <Form.Check
                  type="radio"
                  label="Incorrecto"
                  name="answer"
                  id="incorrecto"
                />
              </div>
            </Form.Group>
          </div>
          <div className="comments">
            <div className="comment-label">
              <p>comentarios:</p>
            </div>
            <div className="comment">
            <Form.Group controlId="ControlTextarea1">
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            </div>
          </div>
          <div className="counter">
            <p><span className="at-moment">3 </span>/ 20</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Question;