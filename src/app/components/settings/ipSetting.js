/* global chrome */
import React, { PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import TextField from 'material-ui/lib/text-field';

const IpSetting = class IpSetting extends React.Component {

    getValue() {
        return this.refs.input.getValue();
    }

    render() {
        return (
            <Card style={this.props.style}>
                <TextField
                  ref="input"
                  hintText="000.000.000.000"
                  floatingLabelText={chrome.i18n.getMessage('networkAddressInput')}
                  defaultValue={this.props.location}
                />
            </Card>
        );
    }
};

IpSetting.propTypes = {
    location: PropTypes.string,
    style: PropTypes.object.isRequired,
};

export default IpSetting;
