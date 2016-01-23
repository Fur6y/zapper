import React, { Component, PropTypes } from 'react';

export default class RemoteControlCombinedButton extends Component {
    render() {
        let buttonWrapperClassName = `button-wrapper ${this.props.type}-button`;
        let buttonClassName = `button-combined-${this.props.buttonType} button-${this.props.color}`;
        return (
            <div className={buttonWrapperClassName}>
                <div className="label">{this.props.labelText}</div>
                <div className={buttonClassName}>
                    {this.props.buttons.map((button, i) => {
                        return (<div className="button-combined-inner" onClick={button.onClick} key={i}>
                            <span className="text">{button.text}</span>
                            <span className="material-icons icon">{button.icon}</span>
                            </div>);
                    })}
                </div>
            </div>
        );
    }
}