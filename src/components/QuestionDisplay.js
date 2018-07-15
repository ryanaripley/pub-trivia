import React, { Component } from 'react'

import CategorySelection from './CategorySelection';
import Question from './Question';


export default class QuestionDisplay extends Component {
  
  state = {
    questions: [],
    questionsLoading: false,
    currentQuestion: null
    /**
     * Game phases:
     * 0 : categories
     * 1 : question
     * 2 : question and answer
     * 3 : score and reset
     */
  }

  async componentDidMount() {
    // try to get state from localStorage
    // this.hydrateStateWithLocalStorage();

    // window.addEventListener(
    //   "beforeunload",
    //   this.saveStateToLocalStorage.bind(this)
    // );

    // if no questions were loaded from localStorage, fetch new
    if (this.state.questions.length === 0) {
      try {
        const { numberOfQuestions } = this.props.gameSettings;
        const res = await fetch(`http://jservice.io/api/random?count=${numberOfQuestions}`);
        const questions = await res.json();
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
      })
      if (this.state.questions.length === 0 ) this.processGameOver();
    }
  }

  processCorrectAnswer = () => {
    console.log('processing correct answer');
    this.deleteCurrentQuestion();
    this.props.addPointForCurrentPlayer();
  }

  processIncorrectAnswer = () => {
    console.log('processing incorrect answer');
    this.deleteCurrentQuestion();
    this.props.advanceTurn();
  }

  processGameOver = () => {
    // query new questions
    this.resetQuestionState();
    this.props.processGameOver();
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
    return (
      <div>
        <p>
          There are {this.state.questions.length} questions remaining.&nbsp;
          <button onClick={this.resetQuestionState}>Reset current questions</button>
          <button onClick={this.loadNewQuestions}>Load new questions</button>
        </p>
        {!this.state.currentQuestion && (
          <CategorySelection 
            questions={this.state.questions} 
            selectCategory={this.selectCategory} 
        />
        )}
        {this.state.currentQuestion && (
          <Question 
            question={this.state.questions[this.state.currentQuestion]} 
            processCorrectAnswer={this.processCorrectAnswer}
            processIncorrectAnswer={this.processIncorrectAnswer}
          />
        )}

      </div>
    )
  }
}
