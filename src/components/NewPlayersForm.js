import React, { Component } from 'react'

export default class NewPlayersForm extends Component {

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
    this.props.addNewPlayers(this.state.newPlayers);
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
        <button onClick={this.startGame}>Start game!</button>
      </div>
    )
  }
}
