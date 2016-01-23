import React, { Component, PropTypes } from 'react';

export default class RemoteControlCenterButton extends Component {
    render() {
        let buttonWrapperClassName = `button-wrapper ${this.props.type}-button`;
        let buttonClassName = `button-center-${this.props.buttonType} button-${this.props.color}`;

        let buttonMarkup = (button, i) => {
            return (<div className={button.className} onClick={button.onClick} key={i}>
                <span className="text">{button.text}</span>
                <span className="material-icons icon">{button.icon}</span>
                </div>
            );
        }
        return (
            <div className={buttonWrapperClassName}>
                <div className="label">{this.props.labelText}</div>
                <div className={buttonClassName}>
                    {this.props.topButtons.map(buttonMarkup)}
                    {this.props.bottomButtons.map(buttonMarkup)}
                    <div className="button-combined-arrows button-black">
                    {this.props.arrowButtons.map(buttonMarkup)}
                    {buttonMarkup(this.props.arrowCenterButton, 7)}
                    </div>
                </div>
            </div>
        );
    }
}