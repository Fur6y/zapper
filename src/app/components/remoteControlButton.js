import React, { Component, PropTypes } from 'react';

export default class RemoteControlButton extends Component {
    render() {
        let buttonWrapperClassName = `button-wrapper ${this.props.type}-button`;
        let buttonClassName = `button-${this.props.buttonType} button-${this.props.color}`;
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
}