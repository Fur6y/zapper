import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

import IpSetting from './ipSetting';
import Discover from './discover';
import AppVersion from '../appVersion';

const style = {
    height: '100%',
};

const cardStyle = {
    padding: 10,
    margin: '10px 0',
};


const Settings = class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
        this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    }

    handleCancelButtonClick() {
        this.props.actions.uiCloseSettings();
    }

    handleSaveButtonClick() {
        const location = this.refs.ipInput.getValue();
        this.props.actions.saveLocation(location);
        this.props.actions.uiCloseSettings();
    }

    render() {
        const isDiscoveringTv = this.props.isDiscoveringTv;

        let ipSettings;
        if (!isDiscoveringTv) {
            ipSettings = (
                <div>
                    <IpSetting
                      ref="ipInput"
                      location = {this.props.connection.location}
                      style = {cardStyle}
                    />
                    <div style={{ marginTop: 20 }}>
                        <RaisedButton
                          fullWidth
                          label={chrome.i18n.getMessage('settingsCancelButton')}
                          onClick={this.handleCancelButtonClick}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <RaisedButton
                          primary
                          fullWidth
                          label={chrome.i18n.getMessage('settingsSaveButton')}
                          onClick={this.handleSaveButtonClick}
                        />
                    </div>
                </div>
            );
        }

        return (
            <div style={style}>
                <div style={{ minWidth: 180, maxWidth: 276, margin: '0 auto', padding: 10 }}>
                    <h1 style={{ margin: '20px 0' }}>
                        {chrome.i18n.getMessage('settingsTitle')}
                    </h1>
                    <Discover
                      actions={this.props.actions}
                      style={cardStyle}
                      connection={this.props.connection}
                      isDiscoveringTv={this.props.isDiscoveringTv}
                      discoveredDevices={this.props.discoveredDevices}
                    />
                    {ipSettings}
                    <AppVersion />
                </div>
            </div>
        );
    }
};

Settings.propTypes = {
    actions: PropTypes.object.isRequired,
    discoveredDevices: PropTypes.array.isRequired,
    connection: PropTypes.object.isRequired,
    isDiscoveringTv: PropTypes.bool.isRequired,
};

export default Settings;
