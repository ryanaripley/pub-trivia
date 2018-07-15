import React, { Component } from 'react';

import NewGameForm from './NewGameForm';
import GameSettingsForm from './GameSettingsForm';
import ScoreBoard from './ScoreBoard';
import TurnNotice from './TurnNotice';
import QuestionDisplay from './QuestionDisplay';
import GameOver from './GameOver';

class App extends Component {
  state = {
    currentPlayer: 0,
    gamePhase: '',
    players: [],
    gameSettings: {
      numberOfQuestions: 50,
      readQuestionsAlound: false
    },
  }

  componentDidMount() {
    // this.hydrateStateWithLocalStorage();

    // window.addEventListener(
    //   "beforeunload",
    //   this.saveStateToLocalStorage.bind(this)
    // );

    // if noting was recovered from local storage, reset everything
    if (this.state.gamePhase === '') {
      this.setState({
        gamePhase: 'new',
        players: []
      })
    }
  }

  componentWillUnmount() {
    // window.removeEventListener(
    //   "beforeunload",
    //   this.saveStateToLocalStorage.bind(this)
    // );

    // // saves if component has a chance to unmount
    // this.saveStateToLocalStorage();
  }

  loadGameInfo = (newPlayers, settings) => {
    const players = newPlayers.map(player => {
      return ({
        name: player,
        score: 0
      })
    });
    this.setState({
      players,
      gamePhase: 'questions'
    })
  }

  updateSettings = (newSettings) => {
    // update settings
  }

  addPointForCurrentPlayer = () => {
    const { players, currentPlayer } = this.state;
    players[currentPlayer].score++;
    this.setState({
      players,
    })
  }

  advanceTurn = () => {
    const { currentPlayer, players } = this.state;
    const nextPlayer = currentPlayer < players.length - 1 ? currentPlayer + 1 : 0;
    this.setState({
      currentPlayer: nextPlayer
    })
  }

  processGameOver = () => {
    this.setState({
      gamePhase: 'gameover'
    })
  }

  resetGame = () => {
    this.setState({
      players: [],
      currentPlayer: 0,
      gamePhase: 'new'
    })
  }

  setGamePhase = (phase) => {
    this.setState({
      gamePhase: phase
    })
  } 

  clearScores = () => {
    const newPlayers = this.state.players.map(player => {
      player.score = 0;
      return player;
    });
    this.setState({
      players: newPlayers
    })
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  nukeLocalStorage = () => {
    localStorage.clear();
    this.resetGame();
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Beer Hall Trivia</h1>
        </header>
        {this.state.gamePhase === 'new' && (
          <div className="new-game-view">
            <NewGameForm 
              loadGameInfo={this.loadGameInfo} 
            />
          </div>
        )}
        {/* {this.state.gamePhase === 'loadingQuestions' && (
          <p>Loading new questions...</p>
        )} */}
        {this.state.gamePhase === 'questions' && (
          <div>
            <ScoreBoard players={this.state.players} />
            <TurnNotice players={this.state.players} currentPlayer={this.state.currentPlayer} /> 
            <QuestionDisplay 
              gameSettings={this.state.gameSettings}
              addPointForCurrentPlayer={this.addPointForCurrentPlayer}
              advanceTurn={this.advanceTurn}
              processGameOver={this.processGameOver}
              setGamePhase={this.setGamePhase}
            />
          </div>
        )}
        {this.state.gamePhase === 'gameover' && (
          <div>
            <ScoreBoard players={this.state.players} />
            <GameOver 
              players={this.state.players}
            />
            <button onClick={this.resetGame}>New game</button>
          </div>
        )}
        <hr />
        <button onClick={this.addPointForCurrentPlayer}>Point for current player</button>
        <button onClick={this.advanceTurn}>Advance turn</button>
        <button onClick={this.clearScores}>Clear scores</button>
        <button onClick={this.processGameOver}>End Game</button>
        <button onClick={this.nukeLocalStorage}>Nuke local storage</button>
      </div>
    );
  }
}

export default App;
