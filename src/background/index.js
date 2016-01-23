chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
        id: 'zapperAppId',
        width: 210,
        height: 800,
        minWidth: 150,
        minHeight: 600
    });
});