import React, { Component, PropTypes } from 'react';

const RemoteControlButton = class RemoteControlButton extends Component {
    render() {
        const buttonWrapperClassName = `button-wrapper ${this.props.type}-button`;
        const buttonClassName = `button-${this.props.buttonType} button-${this.props.color}`;
        return (
            <div className={buttonWrapperClassName}>
                <div className="label">{this.props.labelText}</div>
                <div className={buttonClassName} onClick={this.props.onClick}>
                    <span className="text">{this.props.text}</span>
                    <span className="material-icons icon">{this.props.icon}</span>
                </div>
            </div>
        );
    }
};

RemoteControlButton.propTypes = {
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    buttonType: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    labelText: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.string,
};

export default RemoteControlButton;
