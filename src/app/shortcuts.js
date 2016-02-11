const KEYS = {
    '32': 'space',
    '37': 'left',
    '38': 'up',
    '39': 'right',
    '40': 'down',
    '48': '0',
    '49': '1',
    '50': '2',
    '51': '3',
    '52': '4',
    '53': '5',
    '54': '6',
    '55': '7',
    '56': '8',
    '57': '9',
    '65': 'a',
    '66': 'b',
    '67': 'c',
    '68': 'd',
    '69': 'e',
    '70': 'f',
    '71': 'g',
    '72': 'h',
    '73': 'i',
    '74': 'j',
    '75': 'k',
    '76': 'l',
    '77': 'm',
    '78': 'n',
    '79': 'o',
    '80': 'p',
    '81': 'q',
    '82': 'r',
    '83': 's',
    '84': 't',
    '85': 'u',
    '86': 'v',
    '87': 'w',
    '88': 'x',
    '89': 'y',
    '90': 'z',
    '96': 'num0',
    '97': 'num1',
    '98': 'num2',
    '99': 'num3',
    '100': 'num4',
    '101': 'num5',
    '102': 'num6',
    '103': 'num7',
    '104': 'num8',
    '105': 'num9'
}

export default class Keys {

    constructor(options) {
        this._keyMap = options || {};

        this._onKeyDown = this._onKeyDown.bind(this);
        this.remove = this.remove.bind(this);

        this._addKeyListener();
    }

    remove() {
        this._removeKeyListener();
    }

    _addKeyListener() {
        document.body.addEventListener('keydown', this._onKeyDown);
    }

    _removeKeyListener() {
        document.body.removeEventListener('keydown', this._onKeyDown);
    }

    _onKeyDown(e) {
        if(KEYS[e.keyCode] && this._keyMap[KEYS[e.keyCode]]) {
            console.debug('key:', KEYS[e.keyCode]);
            this._keyMap[KEYS[e.keyCode]]();
        }
    }

}

