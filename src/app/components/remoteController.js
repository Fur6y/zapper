import React, { Component, PropTypes } from 'react';

import websocket from '../lib/websocket'
import Shortcuts from '../shortcuts'

let style = {
    background: 'lightgrey'
};

let buttonStyle = {
    cursor: 'pointer',
    height: 40,
    width: 40,
    margin: 5,
    backgroundColor: 'grey',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 500
}

export default class App extends Component {

    constructor(props) {
        super(props);

        this.shortcuts = new Shortcuts({
            up: () => { this.handleVolumeUpButtonClick() },
            down: () => { this.handleVolumeDownButtonClick() },
            right: () => { this.channelUp() },
            left: () => { this.channelDown() }
        });
    }

    componentWillUnmount() {
        this.shortcuts.remove();
    }

    channelUp() {
        if(this.props.connection.readyState === WebSocket.OPEN) {
            websocket.channelUp();
        }
    }

    channelDown() {
        if(this.props.connection.readyState === WebSocket.OPEN) {
            websocket.channelDown();
        }
    }

    handleVolumeUpButtonClick(e) {
        if(this.props.connection.readyState === WebSocket.OPEN) {
            websocket.volumeUp();
        }
    }

    handleVolumeDownButtonClick(e) {
        if(this.props.connection.readyState === WebSocket.OPEN) {
            websocket.volumeDown();
        }
    }

    handleKeyDown(e) {
        console.debug(e);
    }

    render() {
        return (
            <div className="remote-controller" style={style}>
                <div className="remote-controller-inner">
                    <div>Remote Controller</div>
                    <div style={buttonStyle} onClick={(e) => {this.handleVolumeUpButtonClick(e)}}>Volume +</div>
                    <div style={buttonStyle} onClick={(e) => {this.handleVolumeDownButtonClick(e)}}>Volume –</div>
                </div>
            </div>
        );
    }

}