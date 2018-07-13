import React, { Component } from 'react'

import { arrayToSentence } from '../helpers';

export default class GameOver extends Component {
  render() {
    const { players } = this.props;
    const scores = players.map(player => player.score);
    const highestScore = Math.max(...scores);
    const winners = players.filter(player => player.score === highestScore);
    const winnerNames = winners.map(winner => winner.name);
    const winnersList = arrayToSentence(winnerNames);
    return (
      <div>
        <h2>Game Over</h2>
        <p>
          {winnersList} won.
          {winners.length > 1 && (
            <span>Ties are cool. Share the victory.</span>
          )}
        </p>
      </div>
    )
  }
}
