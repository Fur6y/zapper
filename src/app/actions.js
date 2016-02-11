import * as C from './constants'
import * as E from './error'
import ssdp from './lib/ssdp'
import websocket from './lib/websocket'
import keychain from './lib/keychain'
import SSAP_COMMANDS from './ssapCommands'

export function volumeUp() {
    return (dispatch, getState) => {
        let state = getState();
        if(state.connection.readyState !== WebSocket.OPEN) {
            dispatch(openConnection(() => { websocket.sendCommand(SSAP_COMMANDS.AUDIO_VOLUME_UP); }));
        } else {
            websocket.sendCommand(SSAP_COMMANDS.AUDIO_VOLUME_UP);
        }
    }
}

export function volumeDown() {
    return (dispatch, getState) => {
        let state = getState();
        if(state.connection.readyState !== WebSocket.OPEN) {
            dispatch(openConnection(() => { websocket.sendCommand(SSAP_COMMANDS.AUDIO_VOLUME_DOWN); }));
        } else {
            websocket.sendCommand(SSAP_COMMANDS.AUDIO_VOLUME_DOWN);
        }
    }
}

export function openConnection(openCallback) {
    return (dispatch, getState) => {
        let state = getState();

        // check smart tv address available
        if(!state.connection.location) {
            dispatch(connectionError(E.CONNECTION_CONFIG_MISSING));
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
            if(!!openCallback) { openCallback(); }
        }
        socketOptions.onClose = function(e) {
            dispatch(disconnected());
        }
        socketOptions.onError = function(error) {
            if(!!error.error) {
                dispatch(connectionError(E.CONNECTION_DENIED));
            } else {
                dispatch(connectionError(E.CONNECTION_FAILED));
            }
        }

        websocket.open(socketOptions);

    }
}

export function connectionError(error) {
    return {
        type: C.ADD_CONNECTION_ERROR,
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
            console.log('no pairing key');
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
    return {
        type: C.CONNECTING,
        readyState: 0
    }
}

export function connected() {
    return {
        type: C.CONNECTED,
        readyState: 1
    }
}

export function disconnecting() {
    return {
        type: C.DISCONNECTING,
        readyState: 2
    }
}

export function disconnected() {
    return {
        type: C.DISCONNECTED,
        readyState: 3
    }
}

export function startDiscover() {
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
        .catch(function() { });
    }
}

export function updateLocation(location) {
    return {
        type: C.UPDATE_LOCATION,
        location
    }
}

export function abortDiscoverTv() {
    ssdp.abort();
    return {
        type: C.ABORT_DISCOVER_TV
    }
}

export function uiShowSettings() {
    return {
        type: C.UI_SHOW_SETTINGS
    }
}

export function uiCloseSettings() {
    return {
        type: C.UI_CLOSE_SETTINGS
    }
}

export default {
    volumeUp,
    volumeDown,

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