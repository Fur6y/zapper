import initialState from './initialState'
import * as C from './constants'

export default function (state = initialState, action) {
    switch(action.type) {

        case C.CONNECT:
            return Object.assign({}, state, {
                connection: Object.assign({}, state.connection, {
                    isEstablished: true
                })
            });

        case C.DISCONNECT:
            return Object.assign({}, state, {
                connection: Object.assign({}, state.connection, {
                    isEstablished: false
                })
            });

        case C.DISCOVER_TV:
            return Object.assign({}, state, {
                isDiscoveringTv: true
            });

        case C.ABORT_DISCOVER_TV:
            return Object.assign({}, state, {
                isDiscoveringTv: false
            });

        case C.UPDATE_LOCATION:
            if(state.connection.location === action.location) { return; }
            return Object.assign({}, state, {
                isDiscoveringTv: false,
                connection: Object.assign({}, state.connection, {
                    location: action.location
                })
            });

        case C.UI_CLOSE_SETTINGS:
            return Object.assign({}, state, {
                ui: Object.assign({}, state.ui, {
                    settings: false
                })
            });

        case C.UI_SHOW_SETTINGS:
            return Object.assign({}, state, {
                ui: Object.assign({}, state.ui, {
                    settings: true
                })
            });

        default:
            return state;

    }
}