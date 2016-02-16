/* global __DEV__ */
import * as C from './constants';
import * as E from './error';
import ssdp from './lib/ssdp';
import websocket from './lib/websocket';
import keychain from './lib/keychain';
import SSAP_COMMANDS from './ssapCommands';
import util from './util';
import icon from '../assets/img/app/128x128.png';

export function connectionError(error) {
    return {
        type: C.ADD_CONNECTION_ERROR,
        error,
    };
}

export function updatePairingKey(pairingKey) {
    return {
        type: C.UPDATE_PAIRING_KEY,
        pairingKey,
    };
}

export function connecting() {
    return {
        type: C.CONNECTING,
        readyState: 0,
    };
}

export function connected() {
    return {
        type: C.CONNECTED,
        readyState: 1,
    };
}

export function disconnecting() {
    return {
        type: C.DISCONNECTING,
        readyState: 2,
    };
}

export function disconnected() {
    return {
        type: C.DISCONNECTED,
        readyState: 3,
    };
}

export function startDiscover() {
    return {
        type: C.DISCOVER_TV,
    };
}

export function foundTv(device) {
    return {
        type: C.FOUND_TV,
        device,
    };
}

export function updateLocation(location) {
    return {
        type: C.UPDATE_LOCATION,
        location,
    };
}

export function abortDiscoverTv() {
    ssdp.abort();
    return {
        type: C.ABORT_DISCOVER_TV,
    };
}

export function uiShowSettings() {
    return {
        type: C.UI_SHOW_SETTINGS,
    };
}

export function uiCloseSettings() {
    return {
        type: C.UI_CLOSE_SETTINGS,
    };
}

export function readPairingKey() {
    return (dispatch) => {
        keychain.readDecrypted('pairingKey')
        .then((pairingKey) => {
            dispatch(updatePairingKey(pairingKey));
        })
        .catch(() => {
            // console.log('no pairing key');
        });
    };
}

export function savePairingKey(pairingKey) {
    return (dispatch) => {
        keychain.persistEncrypted('pairingKey', pairingKey);
        dispatch(updatePairingKey(pairingKey));
    };
}

export function openConnection(openCallback) {
    return (dispatch, getState) => {
        const state = getState();

        // check smart tv address available
        if (!state.connection.location) {
            dispatch(connectionError(E.CONNECTION_CONFIG_MISSING));
            return;
        }

        const socketOptions = {
            scheme: state.connection.type,
            address: state.connection.location,
            port: state.connection.port,
            pairingKey: state.connection.pairingKey,
            debug: __DEV__,
        };

        // save pairing key from reponse
        socketOptions.onPairingKeyResponse = function onPairingKeyResponse(pairingKey) {
            if (state.connection.pairingKey !== pairingKey) {
                dispatch(savePairingKey(pairingKey));
            }
        };
        socketOptions.onInit = function onInit() {
            dispatch(connecting());
        };
        socketOptions.onOpen = function onOpen() {
            dispatch(connected());
            if (!!openCallback) { openCallback(); }
        };
        socketOptions.onClose = function onClose() {
            dispatch(disconnected());
        };
        socketOptions.onError = function onError(error) {
            if (!!error.error) {
                dispatch(connectionError(E.CONNECTION_DENIED));
            } else {
                dispatch(connectionError(E.CONNECTION_FAILED));
            }
        };

        websocket.open(socketOptions);
    };
}

export function sendCommand(SSAP_COMMAND, payload) {
    return (dispatch, getState) => {
        const state = getState();
        if (state.connection.readyState !== WebSocket.OPEN) {
            dispatch(openConnection(() => { websocket.sendCommand(SSAP_COMMAND, payload); }));
        } else {
            websocket.sendCommand(SSAP_COMMAND, payload);
        }
    };
}

export function requestStatus(SSAP_COMMAND, payload, callback) {
    return (dispatch, getState) => {
        const state = getState();
        const request = () => {
            websocket.requestStatus(SSAP_COMMAND, payload)
            .then((response) => { callback(response); })
            .catch(() => { callback(); });
        };

        if (state.connection.readyState !== WebSocket.OPEN) {
            dispatch(openConnection(request));
        } else {
            request();
        }
    };
}

export function volumeUp() {
    return sendCommand(SSAP_COMMANDS.AUDIO_VOLUME_UP);
}
export function volumeDown() {
    return sendCommand(SSAP_COMMANDS.AUDIO_VOLUME_DOWN);
}
export function channelUp() {
    return sendCommand(SSAP_COMMANDS.TV_CHANNEL_UP);
}
export function channelDown() {
    return sendCommand(SSAP_COMMANDS.TV_CHANNEL_DOWN);
}
export function mediaPause() {
    return sendCommand(SSAP_COMMANDS.MEDIA_CONTROLS_PAUSE);
}
export function mediaStop() {
    return sendCommand(SSAP_COMMANDS.MEDIA_CONTROLS_STOP);
}
export function mediaPlay() {
    return sendCommand(SSAP_COMMANDS.MEDIA_CONTROLS_PLAY);
}
export function mediaForward() {
    return sendCommand(SSAP_COMMANDS.MEDIA_CONTROLS_FORWARD);
}
export function mediaRewind() {
    return sendCommand(SSAP_COMMANDS.MEDIA_CONTROLS_REWIND);
}
export function turnOffTv() {
    return sendCommand(SSAP_COMMANDS.SYSTEM_TURN_OFF);
}
export function toggleMute() {
    return (dispatch) => {
        dispatch(requestStatus(SSAP_COMMANDS.AUDIO_GET_MUTE, null, (response) => {
            dispatch(sendCommand(SSAP_COMMANDS.AUDIO_SET_MUTE, { mute: !response.mute }));
        }));
    };
}
export function toggle3d() {
    return (dispatch) => {
        dispatch(requestStatus(SSAP_COMMANDS.TV_GET_3D, null, (response) => {
            // console.log('3d status', response);
            if (response.status3D && response.status3D.status) {
                dispatch(sendCommand(SSAP_COMMANDS.TV_3D_OFF));
            } else {
                dispatch(sendCommand(SSAP_COMMANDS.TV_3D_ON));
            }
        }));
    };
}
export function toast(message) {
    return sendCommand(SSAP_COMMANDS.SYSTEM_TOAST, {
        message,
        iconData: util.getImg(icon),
        iconExtension: util.getExt(icon),
    });
}

export function closeConnection() {
    return (dispatch) => {
        dispatch(disconnecting());
        websocket.close();
    };
}

export function discoverTv() {
    return (dispatch) => {
        ssdp.discover((device) => {
            dispatch(foundTv(device));
        });

        dispatch(startDiscover());
    };
}

export function saveLocation(location) {
    return (dispatch, getState) => {
        keychain.persist('address', location);
        dispatch(updateLocation(location));

        const state = getState();
        const isConnected = state.connection.readyState === 0 || state.connection.readyState === 1;
        if (isConnected) {
            dispatch(closeConnection());
        }
    };
}

export function readLocation() {
    return (dispatch) => {
        keychain.read('address')
        .then((location) => {
            dispatch(updateLocation(location));
        })
        .catch(() => {
            // console.log('read location failed');
        });
    };
}

export default {
    volumeUp,
    volumeDown,
    channelUp,
    channelDown,
    mediaPause,
    mediaStop,
    mediaPlay,
    mediaForward,
    mediaRewind,
    toast,
    turnOffTv,
    toggleMute,
    toggle3d,

    openConnection,
    closeConnection,

    discoverTv,
    abortDiscoverTv,

    saveLocation,
    readLocation,

    savePairingKey,
    readPairingKey,

    uiShowSettings,
    uiCloseSettings,
};
