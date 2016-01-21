import * as C from './constants'
import ssdp from './lib/ssdp'

export function connect() {
    console.log('connecting')
    return {
        type: C.CONNECT
    }
}

export function disconnect() {
    console.log('disconnecting')
    return {
        type: C.DISCONNECT
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
    connect,
    disconnect,
    discoverTv,
    updateLocation,
    abortDiscoverTv,
    uiShowSettings,
    uiCloseSettings
}