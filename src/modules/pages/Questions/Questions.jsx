// Libraries
import React, { Component } from 'react';
import { Form, Button, Carousel } from 'react-bootstrap';

// redux
import { connect } from 'react-redux';
import { getCandidatesAction, updateCandidateFastAction } from '../../../redux/actions/candidateActions';

// classes
import Alerts from '../../../Classes/Alerts';

// Components modules
import Title from '../../components/Title/Title';
import Loading from '../../components/Loading/Loading';
import Question from '../../components/Question/Question';
import Error from '../../components/Error/Error';

// styles
import './Questions.scss';

class Questions extends Component {
  arrows = {}
  thisCount = 0;
  alerts = new Alerts();
  constructor(props) {
    super(props);
    this.state = {
      candidate: {
        loading: false,
        error: false,
        candidates: [
          {
            skills: []
          }
        ]
      }
    }
    this.arrows = {
      nextIcon: <i className="fas fa-chevron-right"></i>,
      prevIcon: <i className="fas fa-chevron-left"></i>
    }
    this.submittedForm = this.submittedForm.bind(this);
  }

  componentDidMount() {
    this.props.getCandidatesAction();
  }

  shouldComponentUpdate(nextProps) {
    if( this.state.candidate.loading !== nextProps.candidate.loading ) {
      this.setState({
        candidate: this.props.candidate
      });
      return true;
    } else {
      return false;
    }
  }

  submittedForm(e) {
    e.preventDefault();
    let ansValue;
    let candidate = this.state.candidate.candidates[0];
    let skills = candidate.skills;
    let questions = [];
    let notesValue;
    skills.forEach(skill => {
      skill.questions.forEach(question => {
        questions.push(question);
      })
    })
    for (let i = 1; i <= this.thisCount; i++) {
      ansValue = document.querySelector(`input[name="answer-${i}"]:checked`);
      notesValue = document.querySelector(`textarea[name="notes-${i}"]`);
      if (ansValue !== null) {
        questions[i-1].score = ansValue.value;
        questions[i-1].notes = notesValue.value;
      } else {
        if( questions[i-1] !== undefined ) {
          this.alerts.getErrorAlert('Debe responder todas las preguntas');
          return;
        }
      }
    }

    skills.forEach(skill => {
      let lengthArray = skill.questions.length;
      let score = 0;
      let mean = 0;
      skill.questions.forEach(question => {
        if(question.score === 'Correcto') {
          score++;
        }
        questions.forEach(ans => {
          if(question.name === ans.name) {
            question = ans;
          }
        })
      })
      mean = score * 100 / lengthArray;
      skill.score = mean;
    });

    candidate.skills = skills;

    this.alerts.getConfirmAlert(
      '¿Esta seguro que desea continuar?'
    ).then((result) => {
      if(result.isConfirmed) {
        this.props.updateCandidateFastAction(candidate);
        setTimeout(() => {
          this.props.history.push('/summary');
        }, 100)
      }
    });
  }

  render() {
    const { nextIcon, prevIcon } = this.arrows;
    const { error, loading, candidates } = this.state.candidate;
    if(error) {
      return (
        <Error />
      )
    }
    const thisCandidate = candidates[0];
    if(thisCandidate.interviewd) {
      setTimeout(() => {
        this.props.history.push('/interview');
      }, 100)
    }
    let skills = [];
    let questions = [];
    let arrayLength = 0;
    if(thisCandidate !== undefined) {
      skills = candidates[0].skills;
      questions = skills.map(skill => {
        return skill.questions.map(question => {
          return question;
        })
      })
      questions.forEach(question => {
        arrayLength += question.length;
      })
    }
    return (
      <section className="questions animate__animated animate__fadeIn">
        <Title title="Preguntas" />
        {
          loading === true ? (<Loading />): null
        }
        <article className="questions-content">
          <Form onSubmit={this.submittedForm}>
            
            <Carousel nextIcon ={nextIcon} prevIcon={prevIcon} interval={null} >

              {
                skills.map( (skill) => {
                  let name = skill.name
                  return skill.questions.map( (question, idx) => {
                    this.thisCount++;
                    return (
                      <Carousel.Item key={idx}>
                        <Question name={name}
                                  question={question}
                                  length={arrayLength}
                                  idx={this.thisCount}
                        />
                      </Carousel.Item>
                    )
                  })
                })
              }
              
            </Carousel>

            <Button className="submit-questions-form btn-primary" variant="primary" type="submit">
              Finalizar
            </Button>
          </Form>
          
        </article>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    candidate: state.candidate
  }
}

const mapDispatchToProps = () => {
  return {
    getCandidatesAction,
    updateCandidateFastAction
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(Questions);