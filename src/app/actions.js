import * as C from './constants'
import * as E from './error'
import ssdp from './lib/ssdp'
import websocket from './lib/websocket'
import keychain from './lib/keychain'

export function openConnection() {
    return (dispatch, getState) => {
        let state = getState();

        // check smart tv address available
        if(!state.connection.location) {
            dispatch(connectionError(E.NO_CONNECTION_CONFIG));
            return;
        }

        let socketOptions = {
            scheme: state.connection.type,
            address: state.connection.location,
            port: state.connection.port,
            pairingKey: state.connection.pairingKey,
            debug: __DEV__
        }

        // add pairing key callback
        // to save pairing key from reponse
        if(!state.connection.pairingKey) {
            socketOptions.onPairingKeyReponse = function(pairingKey) {
                dispatch(savePairingKey(pairingKey));
            }
        }

        socketOptions.onInit = function() {
            dispatch(connecting());
        }
        socketOptions.onOpen = function(e) {
            dispatch(connected());
        }
        socketOptions.onClose = function(e) {
            dispatch(disconnected());
        }
        socketOptions.onError = function(error) {
            if(error.type === 'error') {
                console.debug('ACTION:', 'tv response error', error);
                dispatch(connectionError(E.CONNECTION_DENIED));
            } else {
                console.debug('ACTION:', 'websocket error', error);
                dispatch(connectionError(E.CONNECTION_FAILED));
            }
        }

        websocket.open(socketOptions);

    }
}

export function connectionError(error) {
    console.log('connection error', error)
    return {
        type: C.ADD_ERROR,
        error
    }
}

export function readPairingKey() {
    return (dispatch, getState) => {
        keychain.readDecrypted('pairingKey')
        .then(function(pairingKey) {
            dispatch(updatePairingKey(pairingKey));
        })
        .catch(function() {
            console.debug('no pairing key');
        })
    }
}

export function savePairingKey(pairingKey) {
    return (dispatch, getState) => {
        keychain.persistEncrypted('pairingKey', pairingKey);
        dispatch(updatePairingKey(pairingKey));
    }
}

export function updatePairingKey(pairingKey) {
    console.log('update pairing key', pairingKey)
    return {
        type: C.UPDATE_PAIRING_KEY,
        pairingKey
    }
}

export function closeConnection() {
    return (dispatch, getState) => {
        dispatch(disconnecting());
        websocket.close();
    }
}

export function connecting() {
    console.log('ACTION:', 'connecting')
    return {
        type: C.CONNECTING,
        readyState: 0
    }
}

export function connected() {
    console.log('ACTION:', 'connected')
    return {
        type: C.CONNECTED,
        readyState: 1
    }
}

export function disconnecting() {
    console.log('ACTION:', 'disconnecting')
    return {
        type: C.DISCONNECTING,
        readyState: 2
    }
}

export function disconnected() {
    console.log('ACTION:', 'disconnected')
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
        keychain.persist('address', location);
        dispatch(updateLocation(location));

        let state = getState();
        let isConnected = state.connection.readyState === 0 || state.connection.readyState === 1;
        if(isConnected) {
            dispatch(closeConnection());
        }
    }
}

export function readLocation() {
    return (dispatch, getState) => {
        keychain.read('address')
        .then(function(location) {
            dispatch(updateLocation(location));
        })
        .catch(function() {
            console.debug('no address');
        });
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
    abortDiscoverTv,

    saveLocation,
    readLocation,

    savePairingKey,
    readPairingKey,

    uiShowSettings,
    uiCloseSettings
}