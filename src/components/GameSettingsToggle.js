import React, { Component } from 'react';
import { IconCog, IconX } from './IconSet';

export default class GameSettingsToggle extends Component {
  render() {
    const { toggleSettingsMenu, settingsMenuOpen } = this.props;
    return (
      <div className="Game-settings-toggle" onClick={toggleSettingsMenu}>
        {!settingsMenuOpen && (<IconCog fill="#fff" />)}
        {settingsMenuOpen && (<IconX fill="#fff" />)} 
      </div>
    )
  }
}
