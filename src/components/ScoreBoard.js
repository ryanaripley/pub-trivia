import React, { Component } from 'react'

export default class ScoreBoard extends Component {

  updateScore = (event) => {
    const { index, score } = event.target.dataset;
    const scoreInt = parseInt(score, 10);
    this.props.updatePlayerScore(index, scoreInt);
  }

  render() {
    const { currentPlayer, gameSettings, showAnswer } = this.props;
    return (
      <div className="Score-board">
        <ul className="scoreboard-list">
        {this.props.players.map((player, index) => {
          const liClass = (index === currentPlayer && gameSettings.gameMode === 'turn-based') ? "scoreboard-item current-player" : "scoreboard-item";
          return (
            <li key={index} className={liClass}>
              <span className="player-name">{player.name}</span> 
              <span className="player-score">{player.score}</span>
              {gameSettings.gameMode === 'shout-out' && (
                <div className="player-score-buttons">
                  <button data-index={index} data-score="-1" onClick={this.updateScore}>&#8722;</button>
                  <button data-index={index} data-score="1" onClick={this.updateScore}>&#43;</button>
                </div>
              )}
            </li>
          )
        })}
        {showAnswer && (
          <li>
            <button onClick={this.props.processNextQuestion} className="next-question">Next question &rarr;</button>
          </li>
        )}
        </ul>
        
      </div>
    )
  }
}
