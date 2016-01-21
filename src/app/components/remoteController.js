import React, { Component, PropTypes } from 'react';
import FontIcon from 'material-ui/lib/font-icon';

let style = {
    margin: '0 auto',
    marginTop: 50,
    width: 200,
    height: 500,
    background: 'lightgrey'
};

let buttonStyle = {
    cursor: 'pointer',
    height: 40,
    width: 40,
    margin: 5,
    backgroundColor: 'grey'
}

export default class App extends Component {

    handleButtonClick(e) {
        console.log('do something')
    }

    render() {
        return (
            <div style={style}>
                <div>Remote Controller</div>
                <div style={buttonStyle} onClick={() => {this.handleButtonClick()}}>Volume Up</div>
            </div>
        );
    }

}