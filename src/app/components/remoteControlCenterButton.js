import React, { Component, PropTypes } from 'react';

const RemoteControlCenterButton = class RemoteControlCenterButton extends Component {
    render() {
        const disabled = this.props.disabled ? ' disabled' : '';
        const buttonWrapperClassName = `button-wrapper ${this.props.type}-button${disabled}`;
        const buttonClassName = `button-center-${this.props.buttonType} button-${this.props.color}`;

        const buttonMarkup = (button, i) =>
            (<div className={button.className} onClick={button.onClick} key={i}>
                <span className="text">{button.text}</span>
                <span className="material-icons icon">{button.icon}</span>
                </div>
            );

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
};

RemoteControlCenterButton.propTypes = {
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    color: PropTypes.string.isRequired,
    buttonType: PropTypes.string.isRequired,
    labelText: PropTypes.string,
    topButtons: PropTypes.array.isRequired,
    bottomButtons: PropTypes.array.isRequired,
    arrowButtons: PropTypes.array.isRequired,
    arrowCenterButton: PropTypes.object.isRequired,
};

export default RemoteControlCenterButton;
