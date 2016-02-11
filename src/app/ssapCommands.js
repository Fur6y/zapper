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
    SYSTEM_TURN_OFF: 'ssap://system/turnOff'
}