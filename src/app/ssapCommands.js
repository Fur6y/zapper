export default {
    AUDIO_GET_VOLUME: 'ssap://audio/getVolume', // response: { returnValue: true, scenario: 'mastervolume_tv_speaker', volume: 100, muted: false }
    AUDIO_VOLUME_UP: 'ssap://audio/volumeUp',
    AUDIO_VOLUME_DOWN: 'ssap://audio/volumeDown',
    AUDIO_SET_MUTE: 'ssap://audio/setMute', // payload: { mute: true }
    AUDIO_GET_MUTE: 'ssap://audio/getMute', // response: { mute: false, returnValue: true }
    TV_CHANNEL_UP: 'ssap://tv/channelUp',
    TV_CHANNEL_DOWN: 'ssap://tv/channelDown',
    MEDIA_CONTROLS_PLAY: 'ssap://media.controls/play',
    MEDIA_CONTROLS_STOP: 'ssap://media.controls/stop',
    MEDIA_CONTROLS_PAUSE: 'ssap://media.controls/pause',
    MEDIA_CONTROLS_REWIND: 'ssap://media.controls/rewind',
    MEDIA_CONTROLS_FORWARD: 'ssap://media.controls/fastForward',
    TV_3D_ON: 'ssap://com.webos.service.tv.display/set3DOn',
    TV_3D_OFF: 'ssap://com.webos.service.tv.display/set3DOff',
    TV_GET_3D: 'ssap://com.webos.service.tv.display/get3DStatus', // { status3D: { status: true, pattern: '2dto3d' } } // { status3D: { status: false, pattern: '2d' } }
    SYSTEM_TURN_OFF: 'ssap://system/turnOff',
    SUBSCRIBE_KEYBOARD: 'ssap://com.webos.service.ime/registerRemoteKeyboard', // { subscribed: true }
    SYSTEM_TOAST: 'palm://system.notifications/createToast',
    ENTER_KEY: 'ssap://com.webos.service.ime/sendEnterKey',
    DELETE_CHARS: 'ssap://com.webos.service.ime/deleteCharacters', // payload { count: 10 }
    INSERT_TEXT: 'ssap://com.webos.service.ime/insertText', // payload { text: 'string', replace: 0 }
};
