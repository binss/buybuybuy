var block_list;
var block_words;
var block_all;
var enable_warning;
var enable_add_block_time;


function init() {
    loadSettings();
    enable_add_block_time = true;
}

// function alertWindow(info, tab) {
//     alert(info.selectionText);
// }

// chrome.contextMenus.create({
//     "title": "和谐选中： %s",
//     "contexts": ["selection"],
//     "onclick": alertWindow
// });


function addBlockTime() {
    if (enable_add_block_time) {
        var block_times = Settings.getObject("block_times", 0);
        Settings.setObject("block_times", block_times + 1);
        enable_add_block_time = false;
        setTimeout(function() {
            enable_add_block_time = true;
        }, 20000);
    }
}

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
    enable_warning = Settings.getObject("enable_warning", false);
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

    // block_all触发
    if (block_all && $.inArray(result[3], LISTEN_LIST) != -1) {
        addBlockTime();
        return {
            redirectUrl: fullUrl
        };
    }

    // block_list触发
    if ($.inArray(result[3], block_list) != -1) {
        addBlockTime();
        return {
            redirectUrl: fullUrl
        };

    } else if (result[6] && $.inArray(result[3], LISTEN_LIST) != -1) { //关键词触发

        // console.log(result[6]);
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

        if (val) {
            if ($.inArray(val, block_words) != -1) {
                addBlockTime();
                return {
                    redirectUrl: fullUrl
                };
            }

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


$(document).ready(function() {
    init();
    // console.log("test");

    chrome.webRequest.onBeforeRequest.addListener(requestCallback, {
        urls: ["<all_urls>"]
    }, ["blocking"]);

    // 处理content scripts传来的消息
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
        console.log("Request comes from content script " + sender.tab.id);
        if (request.greeting === "close_tab") {
            chrome.tabs.remove(sender.tab.id);
        } else if (request.greeting === "check_enable") {
            sendResponse(enable_warning);
        }
    });

    // chrome.webRequest.onBeforeSendHeaders.addListener(raiseWarnging, {
    //     urls: ["http://buy.taobao.com/auction/buy_now.jhtml"]
    // }, ["blocking", "requestHeaders"]);


    // var reg = new RegExp('^(https|http):\/\/(.+?)\\.(.+?)\\.(.+?)\/(.*?\\?(.+)|.*)');

    // var reg = new RegExp('^(https|http):\/\/(.+?)\\.(.+?)\\.(.+?)\/(.+?\\?([^,]+)|.*)');
    // var reg = new RegExp('^(https|http):\/\/(.+?)\\.(.+?)\\.(.+?)\/(.+?\\?(.+)|.*)');
    // result = reg.exec("http://search.dangdang.com/?key=%C9%C1%D6%AE%B9%EC%BC%A3");
    // console.log(result);
});
