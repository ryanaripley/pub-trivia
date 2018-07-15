import React, { Component } from 'react'

export default class SettingsForm extends Component {
  render() {
    return (
      <div>
        <button onClick={this.addPointForCurrentPlayer}>Point for current player</button>
        <button onClick={this.advanceTurn}>Advance turn</button>
        <button onClick={this.clearScores}>Clear scores</button>
        <button onClick={this.processGameOver}>End Game</button>
        <button onClick={this.nukeLocalStorage}>Nuke local storage</button>
      </div>
    )
  }
}
