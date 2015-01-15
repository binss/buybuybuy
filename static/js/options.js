var extension;
var block_list;

function init() {
    extension = chrome.extension.getBackgroundPage();
    loadSettings();
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

function loadSettings() {
    block_list = Settings.getObject("block_list", []);
    $.each(block_list, function(index, val) {
        switch (val) {
            case "taobao":
                $("#block_taobao_checkbox").attr("checked", "checked");
                break;
            case "tmall":
                $("#block_tmall_checkbox").attr("checked", "checked");
                break;
        }

    });

}

function saveBlock() {
    block_list = [];
    if ($("#block_taobao_checkbox").is(':checked'))
        block_list.push("taobao");
    if ($("#block_tmall_checkbox").is(':checked'))
        block_list.push("tmall");

    Settings.setObject("block_list", block_list);

    extension.changeListener();

}

$(document).ready(function() {
    init();

    $("#block_save_button").click(saveBlock);
    // $("#divDomain").click(showTempRule);
    // $("#menuOptions").click(openOptions);
    // $("#menuAbout").click(showAbout);
    // $("#openMainWebsite").click(openMainWebsite);
    // $("#openPlusWebsite").click(openPlusWebsite);
    // $("#openSupportWebsite").click(openSupportWebsite);
    // $("#btnSave").click(addSwitchRule);
    // $("#btnCancel").click(closePopup);
});