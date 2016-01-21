import CryptoJsAes from 'crypto-js/aes'
import CryptoJsEncUtf8 from 'crypto-js/enc-utf8'

const SECRET = 'tUUG9UmfK4u5xsoHApZC'

export default {
    _encrypt: function(text) {
        var ciphertext = CryptoJsAes.encrypt(text, SECRET);
        return ciphertext.toString();
    },
    _decrypt: function(text) {
        var bytes  = CryptoJsAes.decrypt(text, SECRET);
        var plaintext = bytes.toString(CryptoJsEncUtf8);
        return plaintext;
    },
    persistEncrypted: function(key, value) {
        // encrypted
        let encryptedValue = this._encrypt(value);
        // save
        let storageObj = {};
        storageObj[key] = encryptedValue;

        chrome.storage.local.set(storageObj, function() {
            console.debug('saved key to local:', value);
        });
    },
    persist: function(key, value) {
        return new Promise((resolve, reject) => {
            let storageObj = {};
            storageObj[key] = value;
            chrome.storage.local.set(storageObj, function() {
                resolve();
            });
        });
    },
    readDecrypted: function(key) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(key, (data) => {
                if(typeof data[key] !== 'undefined') {
                    // decrypt
                    var value = this._decrypt(data[key]);
                    resolve(value);
                } else {
                    reject();
                }
            });
        });
    },
    read: function(key) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(key, (data) => {
                if(typeof data[key] !== 'undefined') {
                    resolve(data[key]);
                } else {
                    reject();
                }
            });
        });
    },
    delete: function(key) {
        chrome.storage.local.remove(key);
    }
}