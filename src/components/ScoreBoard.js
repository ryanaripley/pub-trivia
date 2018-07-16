import React, { Component } from 'react'

export default class ScoreBoard extends Component {
  render() {
    const { currentPlayer } = this.props;
    return (
      <div className="Score-board">
        <h3>Score</h3>
        <ul className="scoreboard-list">
        {this.props.players.map((player, index) => {
          const liClass = (index === currentPlayer) ? "scoreboard-item current-player" : "scoreboard-item";
          return (
            <li key={index} className={liClass}>
              <span className="player-name">{player.name}</span> 
              <span className="player-score">{player.score}</span>
            </li>
          )
        })}
        </ul>
      </div>
    )
  }
}
