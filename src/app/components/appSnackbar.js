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
        if(typeof this.currentConnectionState === 'undefined') {
            this.currentConnectionState = this.props.connection.isEstablished;
        }

        let previousConnectionState = this.currentConnectionState;
        this.currentConnectionState = this.props.connection.isEstablished;

        return previousConnectionState != this.props.connection.isEstablished;
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        let message = this.props.connection.isEstablished ? 'Verbunden mit ...' : 'Verbindung getrennt';

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