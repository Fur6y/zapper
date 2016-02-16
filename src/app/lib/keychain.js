/* global chrome */
import CryptoJsAes from 'crypto-js/aes';
import CryptoJsEncUtf8 from 'crypto-js/enc-utf8';

const SECRET = 'tUUG9UmfK4u5xsoHApZC';

export default {
    _encrypt: function _encrypt(text) {
        const ciphertext = CryptoJsAes.encrypt(text, SECRET);
        return ciphertext.toString();
    },
    _decrypt: function _decrypt(text) {
        const bytes = CryptoJsAes.decrypt(text, SECRET);
        const plaintext = bytes.toString(CryptoJsEncUtf8);
        return plaintext;
    },
    persistEncrypted: function persistEncrypted(key, value) {
        // encrypted
        const encryptedValue = this._encrypt(value);
        // save
        const storageObj = {};
        storageObj[key] = encryptedValue;

        chrome.storage.local.set(storageObj, () => {
            // console.debug('saved key to local:', value);
        });
    },
    persist: function persist(key, value) {
        return new Promise((resolve) => {
            const storageObj = {};
            storageObj[key] = value;
            chrome.storage.local.set(storageObj, () => {
                resolve();
            });
        });
    },
    readDecrypted: function readDecrypted(key) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(key, (data) => {
                if (typeof data[key] !== 'undefined') {
                    // decrypt
                    const value = this._decrypt(data[key]);
                    resolve(value);
                } else {
                    reject();
                }
            });
        });
    },
    read: function read(key) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(key, (data) => {
                if (typeof data[key] !== 'undefined') {
                    resolve(data[key]);
                } else {
                    reject();
                }
            });
        });
    },
    delete: function deleteKey(key) {
        chrome.storage.local.remove(key);
    },
};
