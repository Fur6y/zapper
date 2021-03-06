import WS from 'browser-websocket';
import getPairing from './websocket.pairing';

export default {
    _config: {
        port: '3000',
        address: 'localhost',
        scheme: 'wss',
        pairingKey: null,
        onPairingKeyResponse: null,
        debug: false,
    },
    _socket: null,
    _currentCommandId: 0,
    _listener: {},
    _onOpen: function _onOpen() {
        const pairingMessage = getPairing(this._config.pairingKey);
        this._socket.emit(JSON.stringify(pairingMessage));
    },
    _onMessage: function _onMessage(e) {
        const response = JSON.parse(e.data);
        // console.log('websocket message', response);

        if (response.type === 'registered') { this._onRegisteredMessage(response); }
        if (response.type === 'response') { this._onResponseMessage(response); }
        if (response.type === 'error') { this._onErrorMessage(response); }
    },
    _onRegisteredMessage: function _onRegisteredMessage(response) {
        if (this._config.onOpen) { this._config.onOpen(response); }
        this._isOpen = true;

        if (
            response.payload['client-key'] &&
            this._config.pairingKey !== response.payload['client-key']
        ) {
            this._config.pairingKey = response.payload['client-key'];
            if (this._config.onPairingKeyResponse) {
                this._config.onPairingKeyResponse(this._config.pairingKey);
            }
        }
    },
    _onResponseMessage: function _onResponseMessage(response) {
        // check if listener exists
        if (this._listener[response.id]) {
            this._listener[response.id](response.payload);
            delete this._listener[response.id];
        }
    },
    _onErrorMessage: function _onErrorMessage(response) {
        // console.warn('tv error message', response);
        if (this._config.onError) { this._config.onError(response); }

        // close connection if pairing failed
        if (response.id === getPairing().id) {
            this.close();
        }
    },
    _onError: function _onError(e) {
        // console.warn('websocket error', e);
        if (this._config.onError) { this._config.onError(e); }
    },
    _onClose: function _onClose(e) {
        this._isOpen = false;
        if (this._config.onClose) { this._config.onClose(e); }
    },
    isOpen: function isOpen() {
        return this._isOpen;
    },
    open: function open(config) {
        if (this._socket) {
            this.close();
        }

        // merge configs
        this._config = Object.assign(this._config, config);

        // create websocket
        const { scheme, address, port, debug } = this._config;
        this._socket = new WS(`${scheme}://${address}:${port}`, debug);

        if (this._config.onInit) { this._config.onInit(); }

        // add listener
        this._socket.on('open', (e) => this._onOpen(e));
        this._socket.on('message', (e) => this._onMessage(e));
        this._socket.on('error', (e) => this._onError(e));
        this._socket.on('close', (e) => this._onClose(e));

        return this._socket;
    },
    reconnect: function reconnect() {
        this._socket.reconnect();
    },
    sendCommand: function sendCommand(SSAP_COMMAND, payload) {
        // create command message
        const id = `${this._currentCommandId++}`;
        const message = Object.assign({
            id,
            type: 'request',
            uri: SSAP_COMMAND,
        }, { payload });
        // send message
        this._socket.emit(JSON.stringify(message));
    },
    requestStatus: function requestStatus(SSAP_COMMAND, payload) {
        return new Promise((resolve) => {
            // create request message
            const id = `status_${this._currentCommandId++}`;
            const message = Object.assign({
                id,
                type: 'request',
                uri: SSAP_COMMAND,
            }, { payload });
            // send request message
            this._socket.emit(JSON.stringify(message));
            // add response event listener
            this._listener[id] = resolve;
        });
    },
    close: function close() {
        if (this._socket) {
            this._socket.close();
            this._socket = null;
        }
    },
};
