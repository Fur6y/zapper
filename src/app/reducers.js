import initialState from './initialState';
import * as C from './constants';

export default function (state = initialState, action) {
    function changeReadyState(currentState, newReadyState, resetErrorCode) {
        let newProps;
        if (resetErrorCode) {
            newProps = { readyState: newReadyState, error: null };
        } else {
            newProps = { readyState: newReadyState };
        }
        return Object.assign({}, currentState, {
            connection: Object.assign({}, currentState.connection, newProps),
        });
    }

    switch (action.type) {
    case C.CONNECTING:
        return changeReadyState(state, action.readyState, true);
    case C.CONNECTED:
        return changeReadyState(state, action.readyState);
    case C.DISCONNECTING:
        return changeReadyState(state, action.readyState);
    case C.DISCONNECTED:
        return changeReadyState(state, action.readyState);

    case C.ADD_CONNECTION_ERROR:
        return Object.assign({}, state, {
            connection: Object.assign({}, state.connection, {
                error: action.error,
            }),
        });

    case C.DISCOVER_TV:
        return Object.assign({}, state, {
            isDiscoveringTv: true,
            discoveredDevices: [],
        });

    case C.FOUND_TV:
        return Object.assign({}, state, {
            discoveredDevices: [...state.discoveredDevices, action.device],
        });

    case C.ABORT_DISCOVER_TV:
        return Object.assign({}, state, {
            isDiscoveringTv: false,
        });

    case C.UPDATE_LOCATION:
        if (state.connection.location === action.location) { return state; }
        return Object.assign({}, state, {
            connection: Object.assign({}, state.connection, {
                location: action.location,
            }),
        });

    case C.UPDATE_PAIRING_KEY:
        if (state.connection.pairingKey === action.pairingKey) { return state; }
        return Object.assign({}, state, {
            connection: Object.assign({}, state.connection, {
                pairingKey: action.pairingKey,
            }),
        });

    case C.UI_CLOSE_SETTINGS:
        return Object.assign({}, state, {
            ui: Object.assign({}, state.ui, {
                settings: false,
            }),
        });

    case C.UI_SHOW_SETTINGS:
        return Object.assign({}, state, {
            ui: Object.assign({}, state.ui, {
                settings: true,
            }),
        });

    default:
        return state;

    }
}
