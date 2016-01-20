import React, { PropTypes } from 'react';
import FontIcon from 'material-ui/lib/font-icon';

var style = {
    cursor: 'pointer',
    position: 'absolute',
    right: 10,
    bottom: 10,
    fontSize: 27
};

export default class App extends React.Component {

    handleButtonClick(e) {
        this.props.actions.uiShowSettings();
    }

    render() {
        return (
            <FontIcon className="material-icons" style={style} onClick={(e) => this.handleButtonClick(e)}>settings</FontIcon>
        );
    }

}