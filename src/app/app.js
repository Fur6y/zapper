import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from './actions';
import CastButton from './components/castButton';
import SettingButton from './components/settingButton';
import AppSnackbar from './components/appSnackbar';
import Settings from './components/settings/settings';
import RemoteControl from './components/remoteControl';

const ControllerApp = class ControllerApp extends React.Component {

    constructor(props) {
        super(props);
        // on app start
        props.actions.readLocation();
        props.actions.readPairingKey();
    }

    render() {
        const showSettings = this.props.ui.settings;

        let castButton;
        if (!showSettings) {
            castButton = (<CastButton
              actions={this.props.actions}
              connection={this.props.connection}
            />);
        }

        let content;
        if (showSettings) {
            content = (<Settings
              actions={this.props.actions}
              isDiscoveringTv={this.props.isDiscoveringTv}
              discoveredDevices={this.props.discoveredDevices}
              connection={this.props.connection}
            />);
        } else {
            content = (<RemoteControl
              actions={this.props.actions}
              connection={this.props.connection}
            />);
        }

        return (
            <div className="app">
                { castButton }
                <div className="content">
                    { content }
                </div>
                { showSettings ? '' : <SettingButton actions={this.props.actions} /> }
                <AppSnackbar connection={this.props.connection} />
            </div>
        );
    }

};

ControllerApp.propTypes = {
    actions: PropTypes.object.isRequired,
    isDiscoveringTv: PropTypes.bool.isRequired,
    discoveredDevices: PropTypes.array.isRequired,
    ui: PropTypes.object.isRequired,
    connection: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ControllerApp);
