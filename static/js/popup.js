var extension;

function init() {
    extension = chrome.extension.getBackgroundPage();
    // App = extension.App;
    // ProfileManager = extension.ProfileManager;
    // RuleManager = extension.RuleManager;
    // Settings = extension.Settings;
    // Utils = extension.Utils;
    // I18n = extension.I18n;
    // autoEnabled = RuleManager.isEnabled();
    // I18n.process(document);
    // document.body.style.visibility = "visible";

    // buildMenuItems();
    // initUI();
}

// $(function() {
//     $("#stopFilter").click(function() {
//         $(this).children().first().attr("class", "fa fa-play");
//         var winBackgroundPage = chrome.extension.getBackgroundPage();
//         // alert("fuck");
//         // var winBackgroundPage = chrome.extension.getBackgroundPage();
//         // winBackgroundPage.alert("fuck");
//         // if (winBackgroundPage)
//         // {
//         // 	console.log(winBackgroundPage);
//         //     winBackgroundPage.alert("fuck");
//         // }


//     });
// });
function openOptions() {
    closePopup();
    extension.openOptions();
}

function closePopup() {
    window.close();
}

$(document).ready(function(){
    init();
    $("#openOptions").click(openOptions);
    // $("#divDomain").click(showTempRule);
    // $("#menuOptions").click(openOptions);
    // $("#menuAbout").click(showAbout);
    // $("#openMainWebsite").click(openMainWebsite);
    // $("#openPlusWebsite").click(openPlusWebsite);
    // $("#openSupportWebsite").click(openSupportWebsite);
    // $("#btnSave").click(addSwitchRule);
    // $("#btnCancel").click(closePopup);
});