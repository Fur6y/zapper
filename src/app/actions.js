import * as C from './constants'
import ssdp from './lib/ssdp'
import websocket from './lib/websocket'

export function openConnection() {
    return (dispatch, getState) => {
        let state = getState();

        let socket = websocket.open({
            scheme: state.connection.type,
            address: state.connection.location,
            port: state.connection.port
        });

        dispatch(connecting());

        socket.on('open', function() {
            dispatch(connected());
        });

        socket.on('close', function() {
            dispatch(disconnected());
            socket.off('open');
            socket.off('close');
        });
    }
}

export function closeConnection() {
    return (dispatch, getState) => {
        dispatch(disconnecting());
        websocket.close();
    }
}

export function connecting() {
    console.log('connecting')
    return {
        type: C.CONNECTING,
        readyState: 0
    }
}

export function connected() {
    console.log('connected')
    return {
        type: C.CONNECTED,
        readyState: 1
    }
}

export function disconnecting() {
    console.log('disconnected')
    return {
        type: C.DISCONNECTING,
        readyState: 2
    }
}

export function disconnected() {
    console.log('disconnected')
    return {
        type: C.DISCONNECTED,
        readyState: 3
    }
}

export function startDiscover() {
    console.log('discovering')
    return {
        type: C.DISCOVER_TV
    }
}

export function discoverTv() {
    return (dispatch, getState) => {
        if(chrome && chrome.runtime && chrome.runtime.onSuspend) {
            chrome.runtime.onSuspend.addListener(function() {
                ssdp.abort();
            });
        }

        ssdp.discover(function(device) {
            dispatch(foundTv(device));
        });

        dispatch(startDiscover());
    }
}

export function foundTv(device) {
    console.log('discovering', device)
    return {
        type: C.FOUND_TV,
        device
    }
}

export function saveLocation(location) {
    return (dispatch, getState) => {
        dispatch(updateLocation(location));

        let state = getState();
        let isConnected = state.connection.readyState === 0 || state.connection.readyState === 1;
        if(isConnected) {
            dispatch(closeConnection());
        }
    }
}

export function updateLocation(location) {
    console.log('update location', location)
    return {
        type: C.UPDATE_LOCATION,
        location
    }
}

export function abortDiscoverTv() {
    console.log('abort discover tv')
    ssdp.abort();
    return {
        type: C.ABORT_DISCOVER_TV
    }
}

export function uiShowSettings() {
    console.log('show settings')
    return {
        type: C.UI_SHOW_SETTINGS
    }
}

export function uiCloseSettings() {
    console.log('close settings')
    return {
        type: C.UI_CLOSE_SETTINGS
    }
}

export default {
    openConnection,
    closeConnection,
    discoverTv,
    saveLocation,
    abortDiscoverTv,
    uiShowSettings,
    uiCloseSettings
}