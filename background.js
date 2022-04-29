chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    button_handler(request.type,request.badge);
    return true;
});
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        button_handler("check");
    }
});

var button_handler = function(request_type, request_badge) {
    chrome.tabs.getSelected(null, function(tab){
        switch(request_type){
            case "update":
                chrome.tabs.sendMessage(tab.id, {type: "update", color: "#F00"});
            break;
            case "clear":
                chrome.tabs.sendMessage(tab.id, {type: "clear", color: "#F00"});
            break;
            case "check":
                chrome.tabs.sendMessage(tab.id, {type: "check", color: "#F00"});
            break;
            case "badge":
                chrome.browserAction.setBadgeText({text: request_badge});
            break;
        }
    });
}