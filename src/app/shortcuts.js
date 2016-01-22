const KEYS = {
    '32': 'space',
    '37': 'left',
    '38': 'up',
    '39': 'right',
    '40': 'down',
    '65': 'a',
    '66': 'b',
    '67': 'c',
    '68': 'd',
    '69': 'e',
    '70': 'f',
    '71': 'g',
    '72': 'h'
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

