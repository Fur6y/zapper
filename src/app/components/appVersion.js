import React, { Component } from 'react';
import config from '../config';

const style = {
    position: 'absolute',
    right: 10,
    bottom: 10,
    color: '#c2bcbc',
};

export default class AppVersion extends Component {

    render() {
        return (
            <small style={style}>v{config.version}</small>
        );
    }

}
