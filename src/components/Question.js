import React, { Component } from 'react'

export default class Question extends Component {
  state = {
    showAnswer: false
  }

  toggle = () => {
    this.setState({
      showAnswer: !this.state.showAnswer,
    })
  }

  render() {
    const { question } = this.props;
    return (
      <div>
        <h4>Category:</h4>
        <p>{question.category.title}</p>
        <h4>Question:</h4>
        <p>{question.question}</p>
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
