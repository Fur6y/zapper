import React, { PropTypes } from 'react';
import FontIcon from 'material-ui/lib/font-icon';

const style = {
    cursor: 'pointer',
    position: 'absolute',
    right: 10,
    bottom: 10,
    fontSize: 27,
};

const SettingsButton = class SettingsButton extends React.Component {

    constructor(props) {
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick() {
        this.props.actions.uiShowSettings();
    }

    render() {
        return (
            <FontIcon
              className="material-icons"
              style={style}
              onClick={ this.handleButtonClick }
            >
              settings
            </FontIcon>
        );
    }
};

SettingsButton.propTypes = {
    actions: PropTypes.object.isRequired,
};

export default SettingsButton;
