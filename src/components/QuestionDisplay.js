import React, { Component } from 'react'

import ScoreBoard from './ScoreBoard';
import CategorySelection from './CategorySelection';
import Question from './Question';

import SampleQuestions from '../data/SampleQuestions';


export default class QuestionDisplay extends Component {
  
  state = {
    questions: [],
    questionsLoading: false,
    showAnswer: false,
    currentQuestion: null
  }

  async componentDidMount() {
    // try to get state from localStorage
    // this.hydrateStateWithLocalStorage();

    // window.addEventListener(
    //   "beforeunload",
    //   this.saveStateToLocalStorage.bind(this)
    // );
    if (this.props.gameSettings.useSampleQuestions) {
      const questions = this.filterQuestions(SampleQuestions, 5);
      this.setState({
        questions
      })
    } else if (this.state.questions.length === 0) {
      // if no questions were loaded from localStorage, fetch new
      try {
        const { numberOfQuestions } = this.props.gameSettings;
        // fetch 10 extra questions in order to filter out duds
        const res = await fetch(`http://jservice.io/api/random?count=${numberOfQuestions + 15}`);
        const unfilteredQuestions = await res.json();
        const questions = this.filterQuestions(unfilteredQuestions, numberOfQuestions);
        this.setState({
          questions
        });
        this.props.setGamePhase('questions');
      } catch(e) { console.log(e); }
    }
  }

  componentWillUnmount() {
    // window.removeEventListener(
    //   "beforeunload",
    //   this.saveStateToLocalStorage.bind(this)
    // );

    // // saves if component has a chance to unmount
    // this.saveStateToLocalStorage();
  }

  filterQuestions = (questions, number) => {
    // Make sure questions all have cat, question, answer, 
    // and don't contain "seen here" or "heard here"
    const filteredQuestions = questions.filter(q => {
      return (!q.question.includes('seen here') && !q.question.includes('heard here'));
    }).filter(q => {
      return (q.category.title && q.question && q.answer );
    }).slice(0, number);
    return filteredQuestions; 
  }

  selectCategory = (e) => {
    const pickedQuestion = e.target.dataset.cat;
    this.setState({
      currentQuestion: pickedQuestion
    })
  }

  deleteCurrentQuestion = () => {
    if (this.state.currentQuestion) {
      const { questions, currentQuestion } = this.state;
      questions.splice(currentQuestion, 1);
      this.setState({
        questions,
        currentQuestion: null,
        showAnswer: false
      })
      if (this.state.questions.length === 0 ) this.props.processGameOver();
    }
  }

  toggleShowAnswer = () => {
    this.setState({
      showAnswer: !this.state.showAnswer,
    })
  }

  processNextQuestion = () => {
    this.deleteCurrentQuestion();
  }

  processCorrectAnswer = () => {
    this.deleteCurrentQuestion();
    this.props.addPointForCurrentPlayer();
  }

  processIncorrectAnswer = () => {
    this.deleteCurrentQuestion();
    this.props.advanceTurn();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  resetQuestionState = () => {
    this.setState({
      questions: [],
      currentQuestion: null
    })
  }

  render() {
    const {currentPlayer, players } = this.props;
    const playerName = players[currentPlayer]["name"];
    return (
      <div className="Question-display">
        <div className="App-content">
          {this.props.gameSettings.gameMode === 'turn-based' && (
            <h2 className="turn-notice"> It's {playerName}'s turn. </h2>
          )}
          <p>
           There are {this.state.questions.length} questions remaining.&nbsp;
          </p>
          {!this.state.currentQuestion && (
            <CategorySelection 
              questions={this.state.questions} 
              selectCategory={this.selectCategory} 
          />
          )}
          {this.state.currentQuestion && (
            <Question 
              gameSettings={this.props.gameSettings}
              question={this.state.questions[this.state.currentQuestion]} 
              processCorrectAnswer={this.processCorrectAnswer}
              processIncorrectAnswer={this.processIncorrectAnswer}
              moveToScoringPhase={this.moveToScoringPhase}
              showAnswer={this.state.showAnswer}
              toggleShowAnswer={this.toggleShowAnswer}
            />
          )}
        </div>

        <div className="App-footer">
          <ScoreBoard
            currentPlayer={currentPlayer}
            gameSettings={this.props.gameSettings}
            players={players}
            processNextQuestion={this.processNextQuestion}
            showAnswer={this.state.showAnswer}
            updatePlayerScore={this.props.updatePlayerScore}
          />
        </div>

      </div>
    )
  }
}
