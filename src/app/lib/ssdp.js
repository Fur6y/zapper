import dgram from 'chrome-dgram';

export default {
    _config: {
        port: '1900',
        address: '239.255.255.250',
        type: 'udp4',
    },
    _socket: null,
    _listener: null,
    _createRequestHeader: function _createRequestHeader(address, port) {
        const host = `${address}:${port}`;
        const header =
        'M-SEARCH * HTTP/1.1\r\n' +
        'HOST: ' + host + '\r\n' +
        'MAN: "ssdp:discover"\r\n' +
        'MX: 5\r\n' +
        'ST: urn:dial-multiscreen-org:service:dial:1\r\n' +
        'USER-AGENT: UDAP/2.0\r\n' +
        '\r\n';

        return header;
    },
    _sendMessage: function _sendMessage() {
        const port = this._config.port;
        const address = this._config.address;
        const message = this._createRequestHeader(address, port);
        const messageStart = 0;
        const messageEnd = message.length;

        const doneCallback = (error) => {
            if (error) {
                // console.error('Sending SSDP message failed:', error);
                this._sendMessage();
            }
        };

        // send discover message
        this._socket.send(message, messageStart, messageEnd, port, address, doneCallback);
    },
    _fetchXML: function _fetchXML(url) {
        const ERROR = 'no response';
        const ERROR_EMPTY = 'empty url';

        return new Promise((resolve, reject) => {
            if (!url) { reject(ERROR_EMPTY); }

            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function onreadystatechange() {
                if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                    const content = xhr.responseText;
                    // check content
                    if (!content) {
                        reject(ERROR);
                        return;
                    }
                    // parse xml file
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(xhr.responseText, 'text/xml');
                    // find tv name
                    const name = xmlDoc
                                    .getElementsByTagName('friendlyName')[0]
                                    .childNodes[0]
                                    .nodeValue;
                    resolve(name);
                } else if (xhr.readyState === xhr.DONE && xhr.status !== 200) {
                    reject('http status', ERROR, xhr.status);
                }
            };
            xhr.send();
        });
    },
    _onMessage: function _onMessage(messageData, settings) {
        if (messageData.indexOf('LG Smart TV')) {
            const message = messageData.toString();
            const descriptionXmlLocation = this._extractDescriptionLocation(message);
            if (descriptionXmlLocation) {
                // console.debug('URL of description.xml:', descriptionXmlLocation);
                this._fetchXML(descriptionXmlLocation)
                    .then((name) => {
                        this._listener({
                            name,
                            address: settings.address,
                            port: settings.port,
                        });
                    })
                    .catch(() => {
                        // console.log('error', error, arguments);
                    });
            } else {
                // console.warn('description.xml location not found');
            }
            this.abort();
        } else {
            // console.log('other device:', message, settings.address)
        }
    },
    _extractDescriptionLocation: function _extractDescriptionLocation(message) {
        const result = message.match(/location: (http:[\/]{2}[\S]+description\.xml)/i);
        return !!result && result.length ? result[1] : null;
    },
    discover: function discover(listener) {
        if (this._socket) {
            this.abort();
        }

        this._listener = listener;

        const socket = this._socket = dgram.createSocket(this._config.type);
        socket.on('listening', this._sendMessage.bind(this));
        socket.on('message', this._onMessage.bind(this));
        // start listening for datagram messages
        socket.bind();
    },
    abort: function abort() {
        if (this._socket) {
            this._socket.close();
        }
    },
};
