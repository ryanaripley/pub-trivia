import React, { Component } from 'react'

export default class ScoreBoard extends Component {
  render() {
    return (
      <div className="Score-board">
        <ul>
        {this.props.players.map((player, index) => {
          return (
            <li key={index}>
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
