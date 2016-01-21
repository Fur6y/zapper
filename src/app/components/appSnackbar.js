import React, { PropTypes } from 'react';
import Snackbar from 'material-ui/lib/snackbar';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleRequestClose() {
        this.setState({ open: false });
    }

    connectionStateChanged() {
        if(typeof this.currentReadyState === 'undefined') {
            // it's app start, don't show snackbar
            this.currentReadyState = this.props.connection.readyState;
        }

        let previousReadyState = this.currentReadyState;
        this.currentReadyState = this.props.connection.readyState;

        return previousReadyState !== this.props.connection.readyState;
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        let message;
        switch(this.props.connection.readyState) {
            case 0: message = 'Connecting ...'; break;
            case 1: message = 'Connected'; break;
            case 2: message = 'Disconnecting ...'; break;
            case 3: message = 'Disconnected'; break;
            default: message = 'Error';
        }

        return (
            <Snackbar
              open={this.connectionStateChanged()}
              message={message}
              autoHideDuration={3000}
              onRequestClose={this.handleRequestClose.bind(this)}
            />
        )
    }

}