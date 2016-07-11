/* eslint prefer-arrow-callback: 0 */
chrome.app.runtime.onLaunched.addListener(function listener() {
    chrome.app.window.create('index.html', {
        id: 'de.fabianfetting.zapper',
        width: 210,
        height: 800,
        minWidth: 200,
        minHeight: 760,
    });
});
