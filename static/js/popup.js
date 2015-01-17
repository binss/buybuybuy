var extension;

function init() {
    extension = chrome.extension.getBackgroundPage();
    if (extension.enable_warning) {
        $("#enable_warning").children().first().addClass("fa-check");
    }
    if (extension.block_all) {
        $("#block_all").children().first().addClass("fa-check");
    }
    block_times = Settings.getObject("block_times", 0);
    $("#block_times").text(block_times);
}

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

function enableWarning() {
    if (extension.enable_warning) {
        extension.enable_warning = false;
        Settings.setValue("enable_warning", false);
        $("#enable_warning").children().first().removeClass("fa-check");
    } else {
        extension.enable_warning = true;
        Settings.setValue("enable_warning", true);
        $("#enable_warning").children().first().addClass("fa-check");
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
    $("#enable_warning").click(enableWarning);
    $("#open_about").click(openAbout);
});
