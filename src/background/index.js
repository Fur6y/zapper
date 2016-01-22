chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
        id: 'zapperAppId',
        width: 400,
        height: 750,
        minWidth: 150,
        minHeight: 300
    });
});