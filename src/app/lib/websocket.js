import WS from 'browser-websocket'
import getPairing from './websocket.pairing'

export default {
    _config: {
        port: '3000',
        address: 'localhost',
        scheme: 'wss',
        pairingKey: null,
        pairingKeyCallback: null
    },
    _socket: null,
    _onOpen: function(e) {
        let pairingMessage = getPairing(this._config.pairingKey);
        this._socket.emit(JSON.stringify(pairingMessage));
    },
    _onMessage: function(e) {
        let response = JSON.parse(e.data);
        console.log('websocket message', response);

        if(response.type === 'registered' && response.payload['client-key'] && this._config.pairingKey !== response.payload['client-key']) {
            this._config.pairingKey = response.payload['client-key'];
            if(this._config.pairingKeyCallback) {
                this._config.pairingKeyCallback(this._config.pairingKey);
            }
        }

    },
    _onError: function(e) {
        console.warn('websocket error', e);
    },
    _onClose: function(e) {

    },
    open: function(config) {
        if(this._socket) {
            this.close();
        }

        // merge configs
        this._config = Object.assign(this._config, config);

        // create websocket
        let {scheme, address, port} = this._config;
        this._socket = new WS(`${scheme}://${address}:${port}`);

        // add listener
        this._socket.on('open', (e) => this._onOpen(e));
        this._socket.on('message', (e) => this._onMessage(e));
        this._socket.on('close', (e) => this._onClose(e));

        return this._socket;
    },
    reconnect: function() {
        this._socket.reconnect();
    },
    close: function() {
        if(this._socket) {
            this._socket.close();
            this._socket = null;
        }
    }
}