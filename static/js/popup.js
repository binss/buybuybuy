var extension;

function init() {
    extension = chrome.extension.getBackgroundPage();
    if (extension.block_all) {
        $("#block_all").children().first().addClass("fa-check");
    }
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
//         //   console.log(winBackgroundPage);
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

function blockAll() {
    if (extension.block_all) {
        extension.block_all = false;
        Settings.setValue("block_all", false);
        $("#block_all").children().first().removeClass("fa-check");
    } else {
        extension.block_all = true;
        Settings.setValue("block_all", true);
        $("#block_all").children().first().addClass("fa-check");
    }
}

function openWarning() {
    if (extension.open_warning) {
        extension.open_warning = false;
        Settings.setValue("open_warning", false);
        $("#open_warning").children().first().removeClass("fa-check");
    } else {
        extension.open_warning = true;
        Settings.setValue("open_warning", true);
        $("#open_warning").children().first().addClass("fa-check");
    }
}

function openAbout() {
    $("#menu").css("display", "none");
    $("#about").css("display", "inline");
    // $("body").css("min-width", "250px");
}

$(document).ready(function() {
    init();
    $("#open_options").click(openOptions);
    $("#block_all").click(blockAll);
    $("#open_warning").click(openWarning);
    $("#open_about").click(openAbout);
    // $("#openMainWebsite").click(openMainWebsite);
    // $("#openPlusWebsite").click(openPlusWebsite);
    // $("#openSupportWebsite").click(openSupportWebsite);
    // $("#btnSave").click(addSwitchRule);
    // $("#btnCancel").click(closePopup);
});
