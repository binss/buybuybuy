$(function() {
    chrome.extension.sendMessage({
        greeting: "check_enable"
    }, function(response) {
        if (response) {
            html = '<div id="cover" class="cover"><h1 id="buybuybuy_warning_title">BUYBUYBUY  WARNING</h1>';
            html += '<div id="buybuybuy_warning_content"><p>您即将提交订单，说好的剁手呢？</p><p>挣钱不易，花前三思</p></div>';
            html += '<button type="button" id="quit_button">我错了，我放弃</button>';
            html += '<button type="button" id="buy_button">我就是要买买买</button></div>';
            $("body").append(html);

            $("#cover").css({
                "position": "fixed",
                "top": "0px",
                "right": "0px",
                "bottom": "0px",
                "background-color": "rgba(119,119,119,0.8)",
                "z-index": "500000",
                "left": "0px",
                "display": "none",
                "text-align": "center",
                // "opacity":"0.5",
            });

            $("#buybuybuy_warning_title").css({
                "color": "red",
                "font-size": "80px",
                "margin-top": "10%",
            });
            $("#buybuybuy_warning_content").css({
                "color": "white",
                "font-size": "50px",
                "margin-top": "5%",
            });
            $("#quit_button").css({
                "padding": "20px 32px",
                "line-height": "1.33",
                "border-radius": "12px",
                "color": "#fff",
                "background-color": "#5cb85c",
                "border-color": "#4cae4c",
                "text-align": "center",
                "white-space": "nowrap",
                "vertical-align": "middle",
                "border": "1px solid transparent",
                "cursor": "pointer",
                "font-size": "25px",
                "margin-top": "5%",
            });

            $("#buy_button").css({
                "padding": "10px 16px",
                "line-height": "1.33",
                "border-radius": "6px",
                "color": "#fff",
                "background-color": "#d9534f",
                "border-color": " #d43f3a",
                "text-align": "center",
                "white-space": "nowrap",
                "vertical-align": "middle",
                "border": "1px solid transparent",
                "cursor": "pointer",
                "font-size": "10px",
                "margin-top": "5%",
                "margin-left": "5%",
            });

            $("#quit_button").click(function() {
                chrome.extension.sendMessage({
                    greeting: "close_tab"
                });
            });
            $("#buy_button").click(function() {
                $("#cover").remove();
                $('body').css("overflow", "scroll");
            });
            $('body').css("overflow", "hidden");
            $("#cover").show();
        }
    });
    // $("body").remove();

});
