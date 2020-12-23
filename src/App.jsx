// Libraries
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// Shared Modules
import Header from './modules/shared/Header/Header';

// Pages Modules
import Interviewer from './modules/pages/Interviewer/Interviewer';
import Candidate from './modules/pages/Candidate/Candidate';
import Questions from './modules/pages/Questions/Questions';
import Summary from './modules/pages/Summary/Summary';

// styles
import './App.scss';

class App extends Component {
  render() {
    return (
      <>
        <Router>

          <Header />
          <div className="contain">

            <Switch>
              <Route exact path="/">
                <Redirect to="/interviewers" />
              </Route>
              {/* NAVIGATION */}
              <Route path="/interviewers" component={ Interviewer } />
              <Route path="/candidates" component={ Candidate } />
              <Route path="/questions" component={ Questions } />
              <Route path="/summary" component={ Summary } />
            </Switch>

            {/* <Interviewer /> */}
          </div>
        </Router>
      </>
    )
  }
}

export default App;