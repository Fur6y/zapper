import React, { PropTypes } from 'react'
import Snackbar from 'material-ui/lib/snackbar'
import * as E from '../error'

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    componentWillReceiveProps(nextProps) {
        let readyStateChanged = this.props.connection.readyState !== nextProps.connection.readyState;
        let connectionErrorChanged = this.props.connection.error !== nextProps.connection.error;

        if(connectionErrorChanged || readyStateChanged) {
            this.setState({ open: true })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.open !== nextState.open;
    }

    getSnackbarMessage() {
        let message;

        switch(this.props.connection.readyState) {
            case 0: message = chrome.i18n.getMessage('connecting'); break;
            case 1: message = chrome.i18n.getMessage('connected'); break;
            case 2: message = chrome.i18n.getMessage('disconnecting'); break;
            case 3: message = chrome.i18n.getMessage('disconnected'); break;
            default: message = '';
        }

        if(!!this.props.connection.error) {
            switch(this.props.connection.error) {
                case E.CONNECTION_FAILED: message = chrome.i18n.getMessage('errorConnectionFailed'); break;
            }
        }

        return message;
    }

    render() {
        let stay = !this.props.connection.error && (this.props.connection.readyState === 0 || this.props.connection.readyState === 2);

        return (
            <Snackbar
              open={this.state.open}
              message={this.getSnackbarMessage()}
              autoHideDuration={stay ? 0 : 3000}
              onRequestClose={() => { this.setState({ open: false }) }}
            />
        )
    }

}