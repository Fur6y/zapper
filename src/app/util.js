export default {
    getExt: base64 => base64.substring(base64.indexOf('/') + 1, base64.indexOf(';')),
    getImg: base64 => base64.split(',')[1],
};
