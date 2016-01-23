import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import actions from './actions'
import CastButton from './components/castButton'
import SettingButton from './components/settingButton'
import AppSnackbar from './components/appSnackbar'
import Settings from './components/settings/settings'
import RemoteControl from './components/remoteControl'

let ControllerApp = class App extends React.Component {

    constructor(props) {
        super(props);
        // on app start
        props.actions.readLocation();
        props.actions.readPairingKey();
    }

    render() {
        let showSettings = this.props.ui.settings;

        return (
            <div className="app">
                { showSettings ? '' : <CastButton actions={this.props.actions} connection={this.props.connection} /> }
                <div className="content">
                    {
                        showSettings ?
                        <Settings actions={this.props.actions} isDiscoveringTv={this.props.isDiscoveringTv} discoveredDevices={this.props.discoveredDevices} connection={this.props.connection} /> :
                        <RemoteControl actions={this.props.actions} connection={this.props.connection} />
                    }
                </div>
                { showSettings ? '' : <SettingButton actions={this.props.actions} /> }
                <AppSnackbar connection={this.props.connection} />
            </div>
        );
    }

}


let mapStateToProps = function(state) {
    return state;
}
let mapDispatchToProps = function(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ControllerApp)