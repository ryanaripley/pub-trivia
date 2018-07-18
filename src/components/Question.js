import React, { Component } from 'react'


export default class Question extends Component {
  state = {
    showAnswer: false,
    questionRead: false
  }

  componentDidMount() {
    if (!this.state.questionRead && this.props.gameSettings.readQuestions) {
      this.readTheQuestion();
      this.setState({
        questionRead: true
      })
    }
  }

  readTheQuestion = () => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(this.props.question.question);
    synth.speak(utterThis);
  }

  toggle = () => {
    this.setState({
      showAnswer: !this.state.showAnswer,
    })
  }

  render() {
    const { question } = this.props;
    return (
      <div className="Question">
        <h4>Category:</h4>
        <p className="category">{question.category.title}</p>
        <h4>Question:</h4>
        <p className="question">{question.question}</p>
        
        <button onClick={this.toggle}>
          {!this.state.showAnswer && ("Show answer")}
          {this.state.showAnswer && ("Hide answer")}
        </button>
        {this.state.showAnswer && (
          <div className="answer">
            <h4>Answer:</h4>
            <p>{question.answer}</p>
            <button onClick={this.props.processCorrectAnswer}>Correct!</button>
            <button onClick={this.props.processIncorrectAnswer}>#nope</button>
          </div>
        )}
      </div>
    )
  }
}
