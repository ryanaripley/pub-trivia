import React, { Component } from 'react'

import ScoreBoard from './ScoreBoard';

export default class ScoringDisplay extends Component {
  
  async componentDidMount() {
  }

  componentWillUnmount() {
  }

  processNextQuestion = () => {
    this.deleteCurrentQuestion();
  }

  updateScore = (event) => {
    const { index, score } = event.target.dataset;
    const scoreInt = parseInt(score, 10);
    this.props.updatePlayerScore(index, scoreInt);
  }

  render() {
    return (
      <div className="Scoring-display">
        <p>Score the previous question:</p>
        <ul>
          {this.props.players.map((player, index) => {
          return (
            <li key={index}>
              <button data-index={index} data-score="-1" onClick={this.updateScore}>&#8722;</button>
              <div className="scoring-name">{player.name}</div> 
              <button data-index={index} data-score="1" onClick={this.updateScore}>&#43;</button>
            </li>
          )
          })}
        </ul>
        <button onClick={this.props.processNextQuestion} className="next-question">Next question &rarr;</button>
      </div>
    )
  }
}
