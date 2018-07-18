import React, { Component } from 'react';

import GameSettings from './GameSettings';
import GameSettingsToggle from './GameSettingsToggle';
import NewGameDisplay from './NewGameDisplay';
import QuestionDisplay from './QuestionDisplay';
import GameOverDisplay from './GameOverDisplay';

class App extends Component {
  /* Sample players: {name: "Ryan", score: 7},{name: "Marit", score: 10} */
  state = {
    currentPlayer: 0,
    gamePhase: '',
    players: [],
    gameSettings: {
      numberOfQuestions: 50,
      readQuestionsAlound: false
    },
    settingsMenuOpen: false,
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

  toggleSettingsMenu = () => {
    this.setState({
      settingsMenuOpen: !this.state.settingsMenuOpen
    })
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
    const appClass = this.state.settingsMenuOpen ? "App settings-menu-open" : "App";
    return (
      <div className={appClass}>
        <header className="App-header">
          <h1 className="App-title">Beer Hall Trivia</h1>
          <GameSettingsToggle
            toggleSettingsMenu={this.toggleSettingsMenu}
            settingsMenuOpen={this.state.settingsMenuOpen}
          />
        </header>
        {this.state.gamePhase === 'new' && (
          <NewGameDisplay 
            loadGameInfo={this.loadGameInfo} 
          />
        )}
        {this.state.gamePhase === 'questions' && (
          <QuestionDisplay 
            gameSettings={this.state.gameSettings}
            currentPlayer={this.state.currentPlayer}
            players={this.state.players}
            addPointForCurrentPlayer={this.addPointForCurrentPlayer}
            advanceTurn={this.advanceTurn}
            processGameOver={this.processGameOver}
            setGamePhase={this.setGamePhase}
          />
        )}
        {this.state.gamePhase === 'gameover' && (
          <GameOverDisplay
            players={this.state.players}
          />
        )}
      </div>
    );
  }
}

export default App;
