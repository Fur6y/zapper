import React, { PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import LinearProgress from 'material-ui/lib/linear-progress';
import RaisedButton from 'material-ui/lib/raised-button';

import DeviceList from './deviceList';

const Discover = class Discover extends React.Component {

    constructor(props) {
        super(props);
        this.handleDiscoverButtonClick = this.handleDiscoverButtonClick.bind(this);
        this.abortDiscoverTv = this.abortDiscoverTv.bind(this);
    }

    handleDiscoverButtonClick() {
        this.props.actions.discoverTv();
    }

    abortDiscoverTv() {
        this.props.actions.abortDiscoverTv();
    }

    render() {
        let content;
        if (!this.props.isDiscoveringTv) {
            content = (
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <RaisedButton
                          onClick={this.handleDiscoverButtonClick}
                          label={chrome.i18n.getMessage('discoverButton')}
                          secondary
                        />
                    </div>
                </div>
            );
        } else {
            content = (
                <div>
                    <RaisedButton
                      fullWidth
                      style={{ margin: '0 20px 10px 0' }}
                      label={chrome.i18n.getMessage('discoverCancelButton')}
                      onClick={this.abortDiscoverTv}
                    />
                    <div>{chrome.i18n.getMessage('discovering')}</div>
                    <LinearProgress mode="indeterminate" />
                    <DeviceList
                      discoveredDevices={this.props.discoveredDevices}
                      actions={this.props.actions}
                    />
                </div>
            );
        }

        return (
            <Card style={this.props.style}>
                {content}
            </Card>
        );
    }
};

Discover.propTypes = {
    actions: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired,
    isDiscoveringTv: PropTypes.bool.isRequired,
    discoveredDevices: PropTypes.array.isRequired,
};

export default Discover;
