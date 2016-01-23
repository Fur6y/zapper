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

// <i class="material-icons">input</i>
// <i class="material-icons">volume_off</i>
// <i class="material-icons">info_outline</i>
// kästchen
// <i class="material-icons">view_module</i>
// <i class="material-icons">pause</i>
// <i class="material-icons">play_arrow</i>
// <i class="material-icons">fast_forward</i>
// <i class="material-icons">fast_rewind</i>
// kreis
// <i class="material-icons">fiber_manual_record</i>
// <i class="material-icons">radio_button_checked</i>
// kästchen
// <i class="material-icons">view_comfy</i>
// striche
// <i class="material-icons">format_align_justify</i>
// <i class="material-icons">adjust</i>
// <i class="material-icons">undo</i>
// <i class="material-icons">import_contacts</i>
// <i class="material-icons">space_bar</i>
// <i class="material-icons">home</i>
// arrow:
// <i class="material-icons">expand_less</i>
// <i class="material-icons">expand_more</i>
// <i class="material-icons">chevron_left</i>
// <i class="material-icons">chevron_right</i>