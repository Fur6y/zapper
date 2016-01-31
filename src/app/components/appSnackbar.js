import React, { PropTypes } from 'react'
import Snackbar from 'material-ui/lib/snackbar'
import * as E from '../error'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    connectionStateChanged(props) {
        if(typeof this.currentReadyState === 'undefined') {
            // it's app start, don't show snackbar
            this.currentReadyState = this.props.connection.readyState;
        }

        let previousReadyState = this.currentReadyState;
        this.currentReadyState = this.props.connection.readyState;

        return previousReadyState !== this.props.connection.readyState;
    }

    shouldComponentUpdate(props) {
        return !!props.connection.error || this.connectionStateChanged(props);
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
                case E.NO_CONNECTION: message = chrome.i18n.getMessage('errorNoConnection'); break;
            }
        }

        return message;
    }

    render() {
        let stay = !this.props.connection.error && (this.props.connection.readyState === 0 || this.props.connection.readyState === 2);

        return (
            <Snackbar
              open={this.connectionStateChanged(this.props) ? true : false}
              message={this.getSnackbarMessage()}
              autoHideDuration={stay ? 0 : 3000}
              onRequestClose={() => { this.setState({ open: false }) }}
            />
        )
    }

}