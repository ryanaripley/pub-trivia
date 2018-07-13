import React, { Component } from 'react'

export default class TurnNotice extends Component {
  render() {
    const { players, currentPlayer } = this.props;
    const playerName = players[currentPlayer]["name"];
    return (
      <div>
        <h2>It's currently {playerName}'s turn.</h2>
      </div>
    )
  }
}
