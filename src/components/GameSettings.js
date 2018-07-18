import React, { Component } from 'react'

export default class GameSettings extends Component {

  state = this.props.gameSettings;

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  }

  updateGameSettings = (event) => {
    event.preventDefault();
    this.props.updateSettings(this.state);
    this.props.closeSettingsMenu();
  }

  render() {
    return (
      <div className="App-settings">
        <h2>Game settings</h2>
        <form className="App-settings-form" onSubmit={this.updateGameSettings}>
        <label>
          <input
            name="readQuestions"
            type="checkbox"
            checked={this.state.readQuestions}
            onChange={this.handleInputChange} />
            Read questions out loud
        </label>
        <label>
          <input
            name="useSampleQuestions"
            type="checkbox"
            checked={this.state.useSampleQuestions}
            onChange={this.handleInputChange} />
            Use sample questions (for debugging)
        </label>
        <label>
          Number of questions
          <input
            name="numberOfQuestions"
            type="number"
            value={this.state.numberOfQuestions}
            onChange={this.handleInputChange} />
        </label>
          <input type="submit" value="Save settings" />
        </form>
      </div>
    )
  }
}
