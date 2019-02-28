import React, { Component } from 'react'

import { arrayToSentence } from '../helpers';

import ScoreBoard from './ScoreBoard';

export default class GameOver extends Component {
  render() {
    const { players } = this.props;
    const scores = players.map(player => player.score);
    const highestScore = Math.max(...scores);
    const winners = players.filter(player => player.score === highestScore);
    const winnerNames = winners.map(winner => winner.name);
    const winnersList = arrayToSentence(winnerNames);
    return (
      <div className="App-content">
        <div className="app-content-inside">
          <h2>Game Over</h2>
          <p>
            {winnersList} won.
            {winners.length > 1 && (
              <span>Ties are cool. Share the victory.</span>
            )}
          </p>
          <p>
            <button onClick={this.props.startNewGame}>New game</button><br />
            <button onClick={this.props.startNewGameSamePlayers}>New game with same players</button>
          </p>
        </div>
        <div className="App-footer">
          <ScoreBoard
            gameSettings={this.props.gameSettings}
            players={players}
          />
        </div>
      </div>
    )
  }
}
