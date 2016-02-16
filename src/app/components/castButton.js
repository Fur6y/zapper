import React, { Component, PropTypes } from 'react';
import FontIcon from 'material-ui/lib/font-icon';

const style = {
    cursor: 'pointer',
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
};

const CastButton = class App extends Component {

    constructor(props) {
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick() {
        const isConnected =
            this.props.connection.readyState === 0 ||
            this.props.connection.readyState === 1;

        if (isConnected) {
            this.props.actions.closeConnection();
        } else {
            this.props.actions.openConnection();
        }
    }

    render() {
        const isConnected =
            this.props.connection.readyState === 0 ||
            this.props.connection.readyState === 1;
        const icon = isConnected ? 'cast_connected' : 'cast';
        return (
            <div>
                <FontIcon
                  className="material-icons"
                  style={style}
                  onClick={this.handleButtonClick}
                >
                    {icon}
                </FontIcon>
            </div>
        );
    }

};

CastButton.propTypes = {
    actions: PropTypes.object.isRequired,
    connection: PropTypes.object.isRequired,
};

export default CastButton;
