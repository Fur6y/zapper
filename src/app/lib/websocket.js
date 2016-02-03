'use strict';

import WS from 'browser-websocket'
import getPairing from './websocket.pairing'

export default {
    _config: {
        port: '3000',
        address: 'localhost',
        scheme: 'wss',
        pairingKey: null,
        onPairingKeyReponse: null,
        debug: false
    },
    _socket: null,
    _currentCommandId: 0,
    _listener: {},
    _onOpen: function(e) {
        let pairingMessage = getPairing(this._config.pairingKey);
        this._socket.emit(JSON.stringify(pairingMessage));
    },
    _onMessage: function(e) {
        let response = JSON.parse(e.data);
        console.log('websocket message', response);

        if(response.type === 'registered') { this._onRegisteredMessage(response); }
        if(response.type === 'response') { this._onResponseMessage(response); }
        if(response.type === 'error') { this._onErrorMessage(response); }
    },
    _onRegisteredMessage: function(response) {
        if(this._config.onOpen) { this._config.onOpen(response); }

        if(response.payload['client-key'] && this._config.pairingKey !== response.payload['client-key']) {
            this._config.pairingKey = response.payload['client-key'];
            if(this._config.onPairingKeyReponse) {
                this._config.onPairingKeyReponse(this._config.pairingKey);
            }
        }
    },
    _onResponseMessage: function(response) {
        // check if listener exists
        if(this._listener[response.id]) {
            this._listener[response.id](response.payload)
            delete this._listener[response.id];
        }
    },
    _onErrorMessage: function(response) {
        console.warn('tv error message', response);
        if(this._config.onError) { this._config.onError(response); }

        // close connection if pairing failed
        if(response.id === getPairing().id) {
            this.close();
        }
    },
    _onError: function(e) {
        console.warn('websocket error', e);
        if(this._config.onError) { this._config.onError(e); }
    },
    _onClose: function(e) {
        if(this._config.onClose) { this._config.onClose(e); }
    },
    open: function(config) {
        if(this._socket) {
            this.close();
        }

        // merge configs
        this._config = Object.assign(this._config, config);

        // create websocket
        let {scheme, address, port, debug} = this._config;
        this._socket = new WS(`${scheme}://${address}:${port}`, debug);

        if(this._config.onInit) { this._config.onInit(); }

        // add listener
        this._socket.on('open', (e) => this._onOpen(e));
        this._socket.on('message', (e) => this._onMessage(e));
        this._socket.on('error', (e) => this._onError(e));
        this._socket.on('close', (e) => this._onClose(e));

        return this._socket;
    },
    reconnect: function() {
        this._socket.reconnect();
    },
    getVolume: function() {
        return new Promise((resolve, reject) => {
            let id = 'status_' + this._currentCommandId++;
            let message = {
                id,
                type: 'request',
                uri: 'ssap://audio/getVolume'
            };

            this._socket.off('message');
            this._socket.emit(JSON.stringify(message));

            // add to listener
            this._listener[id] = resolve;
        });
    },
    setVolume: function(volume) {
        // volume between 0-100
        let message = {
            id: '' + this._currentCommandId++,
            type: 'request',
            uri: 'ssap://audio/setVolume',
            payload: {
                volume
            }
        };

        console.debug('send command:', message);
        this._socket.emit(JSON.stringify(message));
    },
    volumeUp: function() {
        let message = {
            id: '' + this._currentCommandId++,
            type: 'request',
            uri: 'ssap://audio/volumeUp',
            payload: {}
        };

        console.debug('send command:', message);
        this._socket.emit(JSON.stringify(message));
    },
    volumeDown: function() {
        let message = {
            id: '' + this._currentCommandId++,
            type: 'request',
            uri: 'ssap://audio/volumeDown',
            payload: {}
        };

        console.debug('send command:', message);
        this._socket.emit(JSON.stringify(message));
    },
    channelUp: function() {
        let message = {
            id: '' + this._currentCommandId++,
            type: 'request',
            uri: 'ssap://tv/channelUp',
            payload: {}
        };

        console.debug('send command:', message);
        this._socket.emit(JSON.stringify(message));
    },
    channelDown: function() {
        let message = {
            id: '' + this._currentCommandId++,
            type: 'request',
            uri: 'ssap://tv/channelDown',
            payload: {}
        };

        console.debug('send command:', message);
        this._socket.emit(JSON.stringify(message));
    },
    close: function() {
        if(this._socket) {
            this._socket.close();
            this._socket = null;
        }
    }
}