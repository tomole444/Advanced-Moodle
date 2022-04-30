chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.url.includes("https://elearning.fhws.de/course/view.php?")) {
        chrome.tabs.sendMessage(tabId, {type: "check", color: "#F00"});
    }
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == "badge")
        chrome.action.setBadgeText({text: request.number});
    
    sendResponse();
});
