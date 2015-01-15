var block_list;
var filter = {
    urls: []
};

function init() {
    loadSettings();
}

function alertWindow(info, tab) {
    // alert("fuck");
    alert(info.selectionText);
}

chrome.contextMenus.create({
    "title": "和谐选中： %s",
    "contexts": ["selection"],
    "onclick": alertWindow
});
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     // if ("complete" == tab.status) {
//     //     alert(tab.url);
//     // }
//          chrome.tabs.executeScript(null, {file: "static/js/block_injected.js"});

//     if ("loading" == tab.status) {
//      // chrome.tabs.executeScript(null, {file: "static/js/block_injected.js"});
// // chrome.tabs.executeScript(null, {code:"document.body.style.backgroundColor=blue"});

//         // alert(tab.url);
//     }
// });
function openOptions(firstTime) {
    var url = "options.html";
    if (firstTime)
        url += "?firstTime=true";

    var fullUrl = chrome.extension.getURL(url);
    chrome.tabs.getAllInWindow(null, function(tabs) {
        for (var i in tabs) { // check if Options page is open already
            if (tabs.hasOwnProperty(i)) {
                var tab = tabs[i];
                if (tab.url == fullUrl) {
                    chrome.tabs.update(tab.id, {
                        selected: true
                    }); // select the tab
                    return;
                }
            }
        }
        chrome.tabs.getSelected(null, function(tab) { // open a new tab next to currently selected tab
            chrome.tabs.create({
                url: url,
                index: tab.index + 1
            });
        });
    });
}

function loadSettings() {
    block_list = Settings.getObject("block_list", []);
    filter.urls = [];
    $.each(block_list, function(index, val) {
        filter.urls.push("*://*." + val + ".com/*");
    });
    if (filter.urls.length === 0) {
        filter.urls.push("");
    }
    // alert(filter.urls);
}

function requestCallback(details) {
    // $.each(array, function(index, val) {
    //     switch (val) {
    //         case "taobao":
    //     }

    // })
    var fullUrl = chrome.extension.getURL("block.html");
    console.log(window.location);
    return {
        redirectUrl: fullUrl
    };
}


function changeListener() {
    // alert(chrome.webRequest.onBeforeRequest.hasListeners());
    chrome.webRequest.onBeforeRequest.removeListener(requestCallback);
    loadSettings();
    chrome.webRequest.onBeforeRequest.addListener(requestCallback, filter, ["blocking"]);

}


// chrome.webRequest.onBeforeRequest.addListener(
//     function(details) {
//         // return {
//         //     cancel: true
//         // };
//         var fullUrl = chrome.extension.getURL("block.html");
//         return {
//             redirectUrl: fullUrl
//         };
//     }, {
//         urls: ["http://*/*"]
//     }, ["blocking"]);

$(document).ready(function() {
    init();
    chrome.webRequest.onBeforeRequest.addListener(requestCallback, filter, ["blocking"]);

    // $("#openOptions").click(openOptions);
    // $("#divDomain").click(showTempRule);
    // $("#menuOptions").click(openOptions);
    // $("#menuAbout").click(showAbout);
    // $("#openMainWebsite").click(openMainWebsite);
    // $("#openPlusWebsite").click(openPlusWebsite);
    // $("#openSupportWebsite").click(openSupportWebsite);
    // $("#btnSave").click(addSwitchRule);
    // $("#btnCancel").click(closePopup);
});
