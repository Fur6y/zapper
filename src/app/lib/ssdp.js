import dgram from 'chrome-dgram'

export default {
    _config: {
        port: '1900',
        address: '239.255.255.250',
        type: 'udp4'
    },
    _socket: null,
    _listener: null,
    _createRequestHeader: function(address, port) {
        let host = `${address}:${port}`
        let header =
        'M-SEARCH * HTTP/1.1\r\n' +
        'HOST: ' + host + '\r\n' +
        'MAN: "ssdp:discover"\r\n' +
        'MX: 5\r\n' +
        'ST: urn:dial-multiscreen-org:service:dial:1\r\n' +
        'USER-AGENT: UDAP/2.0\r\n' +
        '\r\n'

        return header;
    },
    _sendMessage: function() {
        let port = this._config.port;
        let address = this._config.address;
        let message = this._createRequestHeader(address, port);
        let messageStart = 0;
        let messageEnd = message.length;

        let doneCallback = (function(error) {
            if (error) {
                console.error('Sending SSDP message failed:', error);
                this._sendMessage();
            }
        }).bind(this);

        // send discover message
        this._socket.send(message, messageStart, messageEnd, port, address, doneCallback);
    },
    _fetchXML: function(url) {
        const ERROR = 'no response';
        const ERROR_EMPTY = 'empty url';

        return new Promise((function(resolve, reject) {
            if(!url) { reject(ERROR_EMPTY); }

            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == xhr.DONE && xhr.status === 200) {
                    let content = xhr.responseText;
                    // check content
                    if(!content) {
                        reject(ERROR);
                        return;
                    }
                    // parse xml file
                    var parser = new DOMParser();
                    var xmlDoc = parser.parseFromString(xhr.responseText, 'text/xml');
                    // find tv name
                    var name = xmlDoc.getElementsByTagName('friendlyName')[0].childNodes[0].nodeValue;
                    resolve(name);
                } else if(xhr.readyState == xhr.DONE && xhr.status !== 200) {
                    reject('http status', ERROR, xhr.status);
                }
            };
            xhr.send();

        }).bind(this));
    },
    _onMessage: function(message, settings) {
        if (message.indexOf('LG Smart TV')) {
            message = message.toString();
            let descriptionXmlLocation = this._extractDescriptionLocation(message);
            if(descriptionXmlLocation) {
                console.debug('URL of description.xml:', descriptionXmlLocation);
                this._fetchXML(descriptionXmlLocation)
                    .then((function(name) {
                        this._listener({
                            name,
                            address: settings.address,
                            port: settings.port
                        });
                    }).bind(this))
                    .catch(function(error) {
                        console.log('error', error, arguments);
                    });
            } else {
                console.warn('description.xml location not found');
            }
            this.abort();
        } else {
            console.log('other device:', message, settings.address)
        }
    },
    _extractDescriptionLocation: function(message) {
        var result = message.match(/location: (http:[\/]{2}[\S]+description\.xml)/i);
        return !!result && result.length ? result[1] : null;
    },
    discover: function(listener) {
        if(this._socket) {
            this.abort();
        }

        this._listener = listener;

        let socket = this._socket = dgram.createSocket(this._config.type);
        socket.on('listening', this._sendMessage.bind(this));
        socket.on('message', this._onMessage.bind(this));
        // start listening for datagram messages
        socket.bind();
    },
    abort: function() {
        if(this._socket) {
            this._socket.close();
        }
    }
}