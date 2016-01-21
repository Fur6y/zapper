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
        let isConnected = this.props.connection.readyState === 0 || this.props.connection.readyState === 1;

        if(isConnected) {
            this.props.actions.closeConnection()
        } else {
            this.props.actions.openConnection()
        }
    }

    render() {
        let isConnected = this.props.connection.readyState === 0 || this.props.connection.readyState === 1;
        let icon = isConnected ? 'cast_connected' : 'cast';
        return (
            <div>
                <FontIcon className="material-icons" style={style} onClick={this.handleButtonClick.bind(this)}>{icon}</FontIcon>
            </div>
        );
    }

}