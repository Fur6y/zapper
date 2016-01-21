import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/lib/flat-button';

let containerStyle = { textAlign: 'center', marginTop: '10' };
let itemStyle = { display: 'block', width: '100%' };

export default class App extends React.Component {

    handleDeviceClick(e, device) {
        this.props.actions.saveLocation(device.address);
        this.props.actions.abortDiscoverTv();
    }

    render() {
        return (
            <div style={containerStyle}>
                {this.props.discoveredDevices.map((device, i) => {
                    return <FlatButton onClick={(e) => { this.handleDeviceClick(e, device) }} key={i} label={device.name} secondary={true} style={itemStyle} />;
                })}
            </div>
        );
    }
}