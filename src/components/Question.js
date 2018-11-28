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

  render() {
    const { question, showAnswer } = this.props;
    return (
      <div className="Question">
        <h4>Category:</h4>
        <p className="category">{question.category.title}</p>
        <h4>Question:</h4>
        <p className="question">{question.question}</p>
        
        <button onClick={this.props.toggleShowAnswer}>
          {!showAnswer && ("Show answer")}
          {showAnswer && ("Hide answer")}
        </button>
        {showAnswer && (
          <div className="answer">
            <h4>Answer:</h4>
            <p>{question.answer}</p>
            {this.props.gameSettings.gameMode === 'shout-out' && ( 
              <div>
                <button onClick={this.props.toggleScoring}>Go to scoring...</button>
              </div>
            )}
            {this.props.gameSettings.gameMode === 'turn-based' && ( 
              <div>
                <button onClick={this.props.processCorrectAnswer}>Correct!</button>
                <button onClick={this.props.processIncorrectAnswer}>#nope</button>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}
