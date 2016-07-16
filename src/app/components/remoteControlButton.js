import React, { Component, PropTypes } from 'react';

const RemoteControlButton = class RemoteControlButton extends Component {
    render() {
        const disabled = this.props.disabled ? ' disabled' : '';
        const buttonWrapperClassName = `button-wrapper ${this.props.type}-button${disabled}`;
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
    disabled: PropTypes.bool,
    color: PropTypes.string.isRequired,
    buttonType: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    labelText: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.string,
};

export default RemoteControlButton;
