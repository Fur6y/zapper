import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/lib/flat-button';

const containerStyle = { textAlign: 'center', marginTop: '10' };
const itemStyle = { display: 'block', width: '100%' };

const DeviceList = class DeviceList extends React.Component {

    constructor(props) {
        super(props);
        this.handleDeviceClick = this.handleDeviceClick.bind(this);
    }

    handleDeviceClick(e, device) {
        this.props.actions.saveLocation(device.address);
        this.props.actions.abortDiscoverTv();
    }

    render() {
        const self = this;
        return (
            <div style={containerStyle}>
                {
                    this.props.discoveredDevices.map((device, i) =>
                        <FlatButton
                          onClick={function handleClick(e) { self.handleDeviceClick(e, device); }}
                          key={i}
                          label={device.name}
                          secondary
                          style={itemStyle}
                        />
                    )
                }
            </div>
        );
    }
};

DeviceList.propTypes = {
    actions: PropTypes.object.isRequired,
    discoveredDevices: PropTypes.array.isRequired,
};

export default DeviceList;
