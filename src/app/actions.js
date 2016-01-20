import * as C from './constants'

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

export function discoverTv() {
    console.log('discovering')
    return {
        type: C.DISCOVER_TV
    }
}

export function foundTv(location) {
    console.log('found tv')
    return {
        type: C.FOUND_TV,
        location
    }
}

export function abortDiscoverTv() {
    console.log('abort discover tv')
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
    foundTv,
    abortDiscoverTv,
    uiShowSettings,
    uiCloseSettings
}