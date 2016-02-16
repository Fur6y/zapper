import React, { Component, PropTypes } from 'react';

const RemoteControlCombinedButton = class RemoteControlCombinedButton extends Component {
    render() {
        const buttonWrapperClassName =
            `button-wrapper ${this.props.type}-button`;
        const buttonClassName =
            `button-combined-${this.props.buttonType} button-${this.props.color}`;
        return (
            <div className={buttonWrapperClassName}>
                <div className="label">{this.props.labelText}</div>
                <div className={buttonClassName}>
                    {this.props.buttons.map((button, i) =>
                        (
                            <div
                              className="button-combined-inner"
                              onClick={button.onClick}
                              key={i}
                            >
                                <span className="text">{button.text}</span>
                                <span className="material-icons icon">{button.icon}</span>
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }
};

RemoteControlCombinedButton.propTypes = {
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    buttonType: PropTypes.string.isRequired,
    labelText: PropTypes.string,
    buttons: PropTypes.array.isRequired,
};

export default RemoteControlCombinedButton;
