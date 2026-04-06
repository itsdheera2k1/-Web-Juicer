// Background script for Web Juicer
browser.runtime.onInstalled.addListener(() => {
    console.log('Web Juicer extension installed');
});

// Handle web request modifications for custom headers
browser.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
        // Here you can modify headers before sending
        return { requestHeaders: details.requestHeaders };
    },
    { urls: ['<all_urls>'] },
    ['blocking', 'requestHeaders']
);
