import React, { Component } from 'react'

export default class newGameForm extends Component {

  state = {
    input: '',
    newPlayers: []
  }

  startGame = () => {
    this.props.addNewPlayers(this.state.newPlayers);
  }

  updateInput = (value) => {
    this.setState({
      input: value
    })
  }

  addPlayer = (e) => {
    e.preventDefault();
    const newPlayer = this.state.input;
    const newPlayers = [...this.state.newPlayers];
    newPlayers.push(newPlayer);
    this.setState({
      newPlayers,
      input: ''
    })
  }

  startGame = () => {
    this.props.loadGameInfo(this.state.newPlayers);
  }

  render() {
    const { newPlayers } = this.state; 
    return (
      <div>
        <h3>Add players</h3>
        {newPlayers.length > 0 && (
          <ul>
            {newPlayers.map((player, index) => {
              return <li key={index}>{player}</li>
            })}
          </ul>
        )}
        <form onSubmit={this.addPlayer} >
          <input 
            type="text"
            placeholder="Player name"
            value={this.state.input}
            onChange={e => this.updateInput(e.target.value)}
          />
          <input type="submit"
            value="Add player"
          />
        </form>
        {/* <h3>Game settings</h3>
        <p>
          <input type="checkbox" checked="true" />Read questions out loud<br />
        </p> */}

        <button disabled={newPlayers.length === 0} onClick={this.startGame}>Start game!</button>
      </div>
    )
  }
}
