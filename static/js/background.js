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
}

function requestCallback(details) {
    //如果加上/g参数，那么只返回$0匹配。也就是说arr.length = 0  
    LISTEN_LIST = ["taobao", "tmall"];
    var fullUrl = chrome.extension.getURL("block.html");
    var reg = new RegExp('^(https|http):\/\/(.+?)\\.(.+?)\\.(.+?)\/.+?\\?(.+)|.*');
    var block_words = ['闪之轨迹'];
    result = reg.exec(details.url);
    // console.log(result[6]);
    // console.log(details.url);

    if ($.inArray(result[3], block_list) != -1) {
        return {
            redirectUrl: fullUrl
        };

    } else if (result[5] && $.inArray(result[3], LISTEN_LIST) != -1) {

        // console.log(details.url);
        var key;
        switch (result[3]) {
            case "taobao":
                key = "q";
                break;
        }
        var val = getUrlParameter(result[5], key);
        console.log(val);
        if (val){
            if( $.inArray(val, block_words) != -1)
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
        var parameters_array = parameters.split("&");
        var value;
        $.each(parameters_array, function(index, val) {
            var sign = val.indexOf("=");
            if (val.substring(0, sign) == key) {
                value = val.substring(sign + 1);
            }
        });
        try{
            value = decodeURI(value);
        }
        catch (e) {
            value = $URL.decode(value);
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
        urls: ["*://*/*"]
    }, ["blocking"]);


    // var reg = new RegExp('^(https|http):\/\/(.+?)\\.(.+?)\\.(.+?)\/(.+?\\?(.+)|.*)');

    // var reg = new RegExp('^(https|http):\/\/(.+?)\\.(.+?)\\.(.+?)\/(.+?\\?([^,]+)|.*)');
    // var reg = new RegExp('^(https|http):\/\/(.+?)\\.(.+?)\\.(.+?)\/.+?\\?(.+)|.*');
    // result = reg.exec("http://s.taobao.com/search?q=%C9%C1%D6%AE%B9%EC%BC%A3&commend=all&ssid=s5-e&search_type=item&sourceId=tb.index&spm=1.7274553.1997520841.1&initiative_id=tbindexz_20150115");
    // console.log(result);

    // console.log($URL.decode("%C9%C1%D6%AE%B9%EC%BC%A3"));
    // console.log(getUrlParameter("keyword=%E9%97%AA%E4%B9%8B%E8%BD%A8%E8%BF%B9&enc=utf-8&suggest=0", "keyword"));

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
