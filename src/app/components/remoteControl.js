import React, { Component, PropTypes } from 'react';

import websocket from '../lib/websocket'
import Shortcuts from '../shortcuts'
import Button from './remoteControlButton'
import CombinedButton from './remoteControlCombinedButton'
import CenterButton from './remoteControlCenterButton'

let style = {
};

export default class RemoteController extends Component {

    constructor(props) {
        super(props);

        this.shortcuts = new Shortcuts({
            up: () => { this.handleVolumeUpButtonClick() },
            down: () => { this.handleVolumeDownButtonClick() },
            right: () => { this.channelUp() },
            left: () => { this.channelDown() }
        });
    }

    componentWillUnmount() {
        this.shortcuts.remove();
    }

    render() {
        return (
            <div className="remote-controller" style={style}>
                <div className="casing-top"></div>
                <div className="casing">
                    <div className="button-row">
                        <Button type="power" buttonType="round" color="red" icon="power_settings_new" onClick={this.onClick} />
                    </div>
                    <div className="button-row">
                        <Button type="input" buttonType="round" color="white" icon="input" labelText="INPUT" onClick={this.onClick} />
                        <Button type="settings" buttonType="round" color="white" text="SETTINGS" labelText="Q.MENU" onClick={this.onClick} />
                        <Button type="info" buttonType="round" color="white" text="INFO" icon="info_outline" onClick={this.onClick} />
                        <Button type="help" buttonType="round" color="white" icon="import_contacts" onClick={this.onClick} />
                    </div>
                    <div className="button-row">
                        <Button type="num1" buttonType="square" color="white" text="1" onClick={this.onClick} />
                        <Button type="num2" buttonType="square" color="white" text="2" onClick={this.onClick} />
                        <Button type="num3" buttonType="square" color="white" text="3" onClick={this.onClick} />
                    </div>
                    <div className="button-row">
                        <Button type="num4" buttonType="square" color="white" text="4" onClick={this.onClick} />
                        <Button type="num5" buttonType="square" color="white" text="5" onClick={this.onClick} />
                        <Button type="num6" buttonType="square" color="white" text="6" onClick={this.onClick} />
                    </div>
                    <div className="button-row">
                        <Button type="num7" buttonType="square" color="white" text="7" onClick={this.onClick} />
                        <Button type="num8" buttonType="square" color="white" text="8" onClick={this.onClick} />
                        <Button type="num9" buttonType="square" color="white" text="9" onClick={this.onClick} />
                    </div>
                    <div className="button-row">
                        <Button type="guide" buttonType="square" color="white" text="GUIDE" onClick={this.onClick} />
                        <Button type="num0" buttonType="square" color="white" text="0" onClick={this.onClick} />
                        <Button type="qview" buttonType="square" color="white" text="Q.VIEW" onClick={this.onClick} />
                    </div>
                    <div className="button-row">
                        <CombinedButton type="vol" buttonType="square" color="lightblue" buttons={[
                                { onClick: this.onClick, text: '+' },
                                { onClick: this.onClick, text: '–' }
                            ]}>
                        </CombinedButton>
                        <div className="button-column">
                            <Button type="fav" buttonType="square" color="white" text="FAV" onClick={this.onClick} />
                            <Button type="d3" buttonType="square" color="white" text="3D" onClick={this.onClick} />
                            <Button type="mute" buttonType="square" color="white" text="MUTE" icon="volume_off" onClick={this.onClick} />
                        </div>
                        <CombinedButton type="channel" buttonType="square" color="lightblue" buttons={[
                                { onClick: this.onClick, icon: 'expand_less' },
                                { onClick: this.onClick, icon: 'expand_more' }
                            ]}>
                        </CombinedButton>
                    </div>
                    <div className="button-row">
                        <CenterButton type="center" buttonType="square" color="black"
                            topButtons={[
                                { onClick: this.onClick, className: 'recent-button', text: 'RECENT' },
                                { onClick: this.onClick, className: 'smart-button', text: 'SMART', icon: 'home' },
                                { onClick: this.onClick, className: 'apps-button', text: 'MY APPS', icon: 'view_module' }
                            ]}
                            bottomButtons={[
                                { onClick: this.onClick, className: 'back-button', text: 'BACK', icon: 'undo' },
                                { onClick: this.onClick, className: 'live-button', text: 'LIVE MENU' },
                                { onClick: this.onClick, className: 'exit-button', text: 'EXIT' }
                            ]}
                            arrowButtons={[
                                { onClick: this.onClick, className: 'up-button', icon: 'expand_less' },
                                { onClick: this.onClick, className: 'left-button', icon: 'chevron_left' },
                                { onClick: this.onClick, className: 'right-button', icon: 'chevron_right' },
                                { onClick: this.onClick, className: 'down-button', icon: 'expand_more' }
                            ]}
                            arrowCenterButton={{
                                onClick: this.onClick, className: 'ok-button button-black', text: 'OK', icon: 'radio_button_checked'
                            }}
                        >
                        </CenterButton>
                    </div>
                    <div className="button-row">
                        <Button type="dot-one" buttonType="square" color="red" icon="fiber_manual_record" onClick={this.onClick} />
                        <Button type="dot-two" buttonType="square" color="green" icon="fiber_manual_recordfiber_manual_record" onClick={this.onClick} />
                        <Button type="dot-three" buttonType="square" color="yellow" icon="fiber_manual_record     fiber_manual_recordfiber_manual_record" onClick={this.onClick} />
                        <Button type="dot-four" buttonType="square" color="blue" icon="fiber_manual_recordfiber_manual_record fiber_manual_recordfiber_manual_record" onClick={this.onClick} />
                    </div>
                    <div className="button-row">
                        <Button type="text" buttonType="square" color="black" icon="format_align_justify" text="TEXT" onClick={this.onClick} />
                        <Button type="topt" buttonType="square" color="black" text="T.OPT" onClick={this.onClick} />
                        <Button type="app2" buttonType="square" color="black" text="APP/*" onClick={this.onClick} />
                    </div>
                    <div className="button-row">
                        <Button type="stop" buttonType="square" color="black" icon="view_module" onClick={this.onClick} />
                        <Button type="play" buttonType="square" color="black" icon="play_arrow" onClick={this.onClick} />
                        <Button type="pause" buttonType="square" color="black" icon="pause" onClick={this.onClick} />
                    </div>
                    <div className="button-row">
                        <Button type="rewind" buttonType="square" color="black" icon="fast_rewind" onClick={this.onClick} />
                        <Button type="forward" buttonType="square" color="black" icon="fast_forward" onClick={this.onClick} />
                        <Button type="rec" buttonType="square" color="black" text="REC/*" onClick={this.onClick} />
                    </div>
                    <div className="button-row">
                        <Button type="subtitle" buttonType="square" color="black" text="SUBTITLE" onClick={this.onClick} />
                        <Button type="ad" buttonType="square" color="black" text="AD" onClick={this.onClick} />
                        <Button type="radio" buttonType="square" color="black" text="TV/RAD" onClick={this.onClick} />
                    </div>
                </div>
            </div>
        );
    }

    channelUp() {
        if(this.props.connection.readyState === WebSocket.OPEN) {
            websocket.channelUp();
        }
    }

    channelDown() {
        if(this.props.connection.readyState === WebSocket.OPEN) {
            websocket.channelDown();
        }
    }

    handleVolumeUpButtonClick(e) {
        if(this.props.connection.readyState === WebSocket.OPEN) {
            websocket.volumeUp();
        }
    }

    handleVolumeDownButtonClick(e) {
        if(this.props.connection.readyState === WebSocket.OPEN) {
            websocket.volumeDown();
        }
    }

    onClick(e) {
        console.log('button clicked:', e.currentTarget.className);
    }


}