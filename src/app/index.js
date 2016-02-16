import '../style/main.sass';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import ControllerApp from './app';

render(
    <Provider store={store}>
        <ControllerApp />
    </Provider>,
    document.getElementById('root')
);
