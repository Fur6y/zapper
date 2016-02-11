import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import actions from './actions'
import reducers from './reducers'
import * as C from './constants'

// applyMiddleware supercharges createStore with middleware:
let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default createStoreWithMiddleware(reducers)