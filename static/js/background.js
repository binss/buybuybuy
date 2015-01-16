var block_list;
var block_words;
var block_all;
var open_warning;

function init() {
    loadSettings();
}

function alertWindow(info, tab) {
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
    block_all = Settings.getObject("block_all", false);
    block_all = Settings.getObject("open_warning", false);
    block_list = Settings.getObject("block_list", []);
    block_words = Settings.getObject("block_words", []);
}

function requestCallback(details) {
    LISTEN_LIST = ["taobao", "tmall", "jd", "yixun", "amazon", "dangdang"];
    var fullUrl = chrome.extension.getURL("block.html");
    var reg = new RegExp('^(https|http):\/\/(.+?)\\.(.+?)\\.(.+?)\/(.*?\\?(.+)|.*)');
    result = reg.exec(details.url);
    // console.log(result.length);
    // console.log(result);
    if (!result)
        return;
    if (block_all && $.inArray(result[3], LISTEN_LIST) != -1) {
        return {
            redirectUrl: fullUrl
        };
    }

    if ($.inArray(result[3], block_list) != -1) {
        // console.log(details.url);
        return {
            redirectUrl: fullUrl
        };

    } else if (result[6] && $.inArray(result[3], LISTEN_LIST) != -1) {

        console.log(result[6]);
        var key;
        switch (result[3]) {
            case "taobao":
                key = "q";
                break;
            case "tmall":
                key = "q";
                break;
            case "jd":
                key = "keyword";
                break;
            case "yixun":
                key = "key";
                break;
            case "amazon":
                key = "field-keywords";
                break;
            case "dangdang":
                key = "key";
                break;
        }
        var val = getUrlParameter(result[6], key);
        // console.log(val);
        if (val) {
            if ($.inArray(val, block_words) != -1)
                return {
                    redirectUrl: fullUrl
                };
        } else {
            return;
        }
    } else {
        return;
    }
}

function getUrlParameter(parameters, key) {
        var value;
        // if(parameters[0] == "?"){
        //     return value;
        // }
        // console.log(parameters);
        var parameters_array = parameters.split("&");
        $.each(parameters_array, function(index, val) {
            var sign = val.indexOf("=");
            if (val.substring(0, sign) == key) {
                value = val.substring(sign + 1);
            }
        });
        try {
            value = decodeURI(value);
        } catch (e) {
            try {
                value = $URL.decode(value);
            } catch (e2) {
                return value;
            }
        }
        return value;
    }
    // function requestCallback(details) {
    //     var fullUrl = chrome.extension.getURL("block.html");
    //     return {
    //         redirectUrl: fullUrl
    //     };
    // }

$(document).ready(function() {
    init();
    // chrome.webRequest.onBeforeRequest.addListener(requestCallback2, filter, ["blocking"]);
    chrome.webRequest.onBeforeRequest.addListener(requestCallback, {
        urls: ["<all_urls>"]
    }, ["blocking"]);
    console.log("test");


    // var reg = new RegExp('^(https|http):\/\/(.+?)\\.(.+?)\\.(.+?)\/(.*?\\?(.+)|.*)');

    // var reg = new RegExp('^(https|http):\/\/(.+?)\\.(.+?)\\.(.+?)\/(.+?\\?([^,]+)|.*)');
    // var reg = new RegExp('^(https|http):\/\/(.+?)\\.(.+?)\\.(.+?)\/(.+?\\?(.+)|.*)');
    // result = reg.exec("http://search.dangdang.com/?key=%C9%C1%D6%AE%B9%EC%BC%A3");
    // console.log(result);

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
