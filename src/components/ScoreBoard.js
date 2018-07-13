import React, { Component } from 'react'

export default class ScoreBoard extends Component {
  render() {
    return (
      <div>
        <h2>Score board</h2>
        <ul>
        {this.props.players.map((player, index) => {
          return (
            <li key={index}>{player.name}: {player.score}</li>
          )
        })}
        </ul>
      </div>
    )
  }
}
