import React, { PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import LinearProgress from 'material-ui/lib/linear-progress';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

import DeviceList from './deviceList';

export default class App extends React.Component {

    handleDiscoverButtonClick(e) {
        this.props.actions.discoverTv();
    }

    abortDiscoverTv() {
        this.props.actions.abortDiscoverTv();
    }

    render() {
        let content;
        if(!this.props.isDiscoveringTv) {
            content = (
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <RaisedButton onClick={(e) => { this.handleDiscoverButtonClick(e) }} label={chrome.i18n.getMessage('discoverButton')} secondary={true} />
                    </div>
                </div>
            );
        } else {
            content = (
                <div>
                    <RaisedButton style={{ margin: '0 20px 10px 0' }} label={chrome.i18n.getMessage('discoverCancelButton')} onClick={(e) => { this.abortDiscoverTv(e) }} />
                    <span>{chrome.i18n.getMessage('discovering')}</span>
                    <LinearProgress mode="indeterminate"/>
                    <DeviceList discoveredDevices={this.props.discoveredDevices} actions={this.props.actions} />
                </div>
            );
        }

        return (
            <Card style={this.props.style}>
                {content}
            </Card>
        );
    }
}