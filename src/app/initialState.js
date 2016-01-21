export default {
    connection: {
        type: 'ws',
        location: 'lgsmarttv.lan',
        port: '3000',
        pairingKey: null,
        deviceName: '',
        readyState: 3 // connecting=0, open=1, closing=2, closed=3
    },
    isDiscoveringTv: false,
    discoveredDevices: [],
    ui: {
        settings: false
    }
}