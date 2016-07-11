import React, { PropTypes } from 'react';
import Snackbar from 'material-ui/lib/snackbar';
import * as E from '../error';

const AppSnackbar = class AppSnackbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };

        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const readyStateChanged =
            this.props.connection.readyState !== nextProps.connection.readyState;
        const connectionErrorChanged =
            this.props.connection.error !== nextProps.connection.error;

        // if something changed open snackbar
        if (connectionErrorChanged || readyStateChanged) {
            this.setState({ open: true });
        }
    }

    getSnackbarMessage() {
        let message;

        switch (this.props.connection.readyState) {
        case 0: message = chrome.i18n.getMessage('connecting'); break;
        case 1: message = chrome.i18n.getMessage('connected'); break;
        case 2: message = chrome.i18n.getMessage('disconnecting'); break;
        case 3: message = chrome.i18n.getMessage('disconnected'); break;
        default: message = '';
        }

        if (!!this.props.connection.error) {
            /* eslint-disable */
            switch (this.props.connection.error) {
            case E.CONNECTION_FAILED:
                message = chrome.i18n.getMessage('errorConnectionFailed');
                break;
            case E.CONNECTION_DENIED:
                message = chrome.i18n.getMessage('errorAccessDenied');
                break;
            case E.CONNECTION_CONFIG_MISSING:
                message = chrome.i18n.getMessage('errorConnectionConfigMissing');
                break;
            }
            /*eslint-enable */
        }

        return message;
    }

    closeSnackbar() {
        this.setState({ open: false });
    }

    render() {
        const stay =
            !this.props.connection.error &&
            (this.props.connection.readyState === 0 || this.props.connection.readyState === 2);

        return (
            <Snackbar
              open={this.state.open}
              message={this.getSnackbarMessage()}
              autoHideDuration={stay ? 0 : 3000}
              onRequestClose={this.closeSnackbar}
            />
        );
    }
};

AppSnackbar.propTypes = {
    connection: PropTypes.object.isRequired,
};

export default AppSnackbar;
