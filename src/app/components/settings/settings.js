import React, { PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import TextField from 'material-ui/lib/text-field';
import LinearProgress from 'material-ui/lib/linear-progress';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

import IpSetting from './ipSetting'
import Discover from './discover'

let style = {
    height: '100%'
};

const cardStyle = {
    padding: 10,
    margin: '10px 0'
}

const buttonRowStyle = {
    marginTop: 20
}

export default class App extends React.Component {

    handleCancelButtonClick() {
        this.props.actions.uiCloseSettings();
    }

    handleSaveButtonClick(e) {
        let location = this.refs['ipInput'].getValue()
        console.log('save ip', location)
        this.props.actions.updateLocation(location);
        this.props.actions.uiCloseSettings();
    }

    render() {
        let isDiscoveringTv = this.props.isDiscoveringTv;

        return (
            <div style={style}>
                <div style={{width: 276, margin: '0 auto'}}>
                    <h1 style={{ margin: '20px 0' }}>Einstellungen</h1>
                    <Discover actions={this.props.actions} style={cardStyle} connection={this.props.connection} isDiscoveringTv={this.props.isDiscoveringTv} discoveredDevices={this.props.discoveredDevices} />
                    { isDiscoveringTv ? '' : (<IpSetting ref="ipInput" location={this.props.connection.location} style={cardStyle} />) }
                    { isDiscoveringTv ? '' : (
                        <div style={buttonRowStyle}>
                            <RaisedButton label="Cancel" onClick={ (e) => this.handleCancelButtonClick(e) } />
                            <RaisedButton primary={true} label="Save" onClick={ (e) => this.handleSaveButtonClick(e) } style={{ float: 'right' }} />
                        </div>
                    ) }
                </div>
            </div>
        );
    }
}