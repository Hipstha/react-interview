// Libraries
import React, { Component } from 'react';
import { Form, Button, Carousel } from 'react-bootstrap';

// Components modules
import Title from '../../components/Title/Title';
import Question from '../../components/Question/Question';

// styles
import './Questions.scss';

class Questions extends Component {
  arrows = {}
  constructor(props) {
    super(props);
    this.state = {
      
    }
    this.arrows = {
      nextIcon: <i className="fas fa-chevron-right"></i>,
      prevIcon: <i className="fas fa-chevron-left"></i>
    }
  }

  submittedForm(e) {
    e.preventDefault();
    console.log('Se dio click al submit');
  }

  render() {
    const { nextIcon, prevIcon } = this.arrows;
    return (
      <section className="questions">
        <Title title="Preguntas" />
        <article className="questions-content">
          <Form onSubmit={this.submittedForm}>
            
            <Carousel nextIcon ={nextIcon} prevIcon={prevIcon} interval={null} >

              <Carousel.Item>
                <Question />
              </Carousel.Item>

              <Carousel.Item>
                <Question />
              </Carousel.Item>

              <Carousel.Item>
                <Question />
              </Carousel.Item>

              
            </Carousel>

            <Button className="submit-questions-form disabled" variant="primary" type="submit">
              Finalizar
            </Button>
          </Form>
          

          
        </article>
      </section>
    )
  }
}

export default Questions;