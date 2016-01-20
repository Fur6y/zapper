import React, { Component, PropTypes } from 'react';
import FontIcon from 'material-ui/lib/font-icon';

var style = {
    cursor: 'pointer',
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1
};

export default class App extends Component {

    handleButtonClick(e) {
        let isConnected = this.props.connection.isEstablished;

        if(isConnected) {
            this.props.actions.disconnect()
        } else {
            this.props.actions.connect()
        }
    }

    render() {
        let icon = this.props.connection.isEstablished ? 'cast_connected' : 'cast';
        return (
            <div>
                <FontIcon className="material-icons" style={style} onClick={this.handleButtonClick.bind(this)}>{icon}</FontIcon>
            </div>
        );
    }

}