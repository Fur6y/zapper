import WS from 'browser-websocket'
import getPairing from './websocket.pairing'

export default {
    _config: {
        port: '3000',
        address: 'localhost',
        scheme: 'wss'
    },
    _socket: null,
    _onOpen: function(e) {
        // let pairing = getPairing('key');
        // _this.socket.send(JSON.stringify(pairing));
    },
    _onMessage: function(e) {
        console.log('websocket message', JSON.parse(e.data));
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

        // add chrome app closing listener
        if(chrome && chrome.runtime && chrome.runtime.onSuspend) {
            chrome.runtime.onSuspend.addListener(() => function() {
                this._socket.close();
            });
        }

        return this._socket;
    },
    close: function() {
        if(this._socket) {
            this._socket.close();
        }
    }
}