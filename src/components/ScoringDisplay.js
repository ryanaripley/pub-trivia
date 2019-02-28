import React, { Component } from 'react'

import ScoreBoard from './ScoreBoard';

export default class ScoringDisplay extends Component {

  state = {
    scoreChange: []
  }
  
  async componentDidMount() {
    const scoreChange = [];
    this.props.players.forEach(player => {
      scoreChange.push(0);
    });
    this.setState({ scoreChange });
  }

  componentWillUnmount() {
  }

  processScoring = () => {
    this.props.players.forEach((player, index) => {
      const score = this.state.scoreChange[index];
      this.props.updatePlayerScore(index, this.state.scoreChange[index]);
    });
    this.props.processNextQuestion();
  }

  updateScore = (event) => {
    event.target.classList.remove("positive", "negative")
    const val = parseInt(event.target.value);
    if (val === 1) {
      event.target.classList.add("positive");
    }
    if (val === -1) {
      event.target.classList.add("negative");
    }
    const { scoreChange } = this.state;
    const { index } = event.target.dataset;
    const score = parseInt(val, 10);
    scoreChange[index] = score;
    this.setState({ scoreChange });
  }

  render() {
    return (
      <div className="Scoring-display">
        <p>Score the previous question:</p>
          {this.props.players.map((player, index) => {
          return (
            <div key={index} className="player-score-input">
              <label>
                <div className="scoring-name">{player.name}</div>
                <div className="scores">
                  <span>-1</span>
                  <span>0</span>
                  <span>+1</span>
                </div>
              </label>
              <input data-index={index} type="range" min="-1" max="1" defaultValue="0" className="score-slider" step="1" onChange={this.updateScore} ></input>
            </div>
          )
          })}
        <button onClick={this.processScoring} className="next-question">Next question &rarr;</button>
      </div>
    )
  }
}
