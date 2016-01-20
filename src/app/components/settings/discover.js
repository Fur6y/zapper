import React, { PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import LinearProgress from 'material-ui/lib/linear-progress';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

export default class App extends React.Component {

    render() {
        let content;
        if(!this.props.isDiscoveringTv) {
            content = (
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <RaisedButton label="discover tv" secondary={true} />
                    </div>
                </div>
            );
        } else {
            content = (
                <div>
                    <RaisedButton style={{ margin: '0 20px 10px 0' }} label="Abort" />
                    <span>Suche TV ...</span>
                    <LinearProgress mode="indeterminate"/>
                    <div style={{ textAlign: 'center', marginTop: '10' }}>
                        <FlatButton label="TV1" secondary={true} style={{ display: 'block', width: '100%' }} />
                    </div>
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