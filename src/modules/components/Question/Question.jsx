// Libraries
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

// CLasses
import Props from '../../../Classes/Props';

// Styles
import './Question.scss';

class Question extends Component {

  thisProps = new Props();
  constructor(props) {
    super(props);
    this.state = {
    };
    this.thisProps.setProps(this.props);  
  }

  render() {
    const { name, question, length, idx } = this.thisProps.getProps();
    const inputName = `answer-${idx}`;
    const textName = `notes-${idx}`;
    return (
      <div className="question-content">
        <div className="question-topic">
          <h3>{ name }</h3>
        </div>
        <div className="question">
          <div className="question-text">
            <p><strong>{ question.quest }</strong></p>
          </div>
          <div className="answers">
            <Form.Group>
              <div className="success">
                <Form.Check
                  className="answer-for-quest"
                  type="radio"
                  label="Correcto"
                  name={inputName}
                  value="Correcto"
                />
              </div>
              <div className="fail">
                <Form.Check
                 className="answer-for-quest"
                  type="radio"
                  label="Incorrecto"
                  name={inputName}
                  value="Incorrecto"
                />
              </div>
            </Form.Group>
          </div>
          <div className="comments">
            <div className="comment-label">
              <p>comentarios:</p>
            </div>
            <div className="comment">
            <Form.Group controlId={textName}>
              <Form.Control className="notes" name={textName} as="textarea" rows={3} />
            </Form.Group>
            </div>
          </div>
          <div className="counter">
            <p><span className="at-moment">{ idx } </span>/ { length }</p>
          </div>
        </div>
      </div>
    )
  }
}


export default Question;