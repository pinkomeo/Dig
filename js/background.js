document.write("<script language=javascript src='js/core.js'></script>");

var handleFuncs = ["getEmail", "findclsid", "test"];
var showResult = {};

function unique(arr) {
    return Array.from(new Set(arr));
}

function getCurrentTabUrl(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(queryInfo, (tabs) => {

        var tab = tabs[0];
        var url = tab.url;

        console.assert(typeof url == 'string', 'tab.url should be a string');

        callback(url);
    });
}

function getSavedBackgroundColor(url, callback) {
    chrome.storage.local.get(url, (items) => {
        callback(chrome.runtime.lastError ? null : items[url]);
    });
}

function saveAnalyzeResult(url, result) {
    var items = {};
    items[url] = result;
    chrome.storage.local.set(items);
}


function getShowResult() {


    var keyword = "success";
    if (showResult.total_count > 50) {
        keyword = "danger";
    } else if (showResult.total_count > 20) {
        keyword = "warning";
    }

    var show_url = showResult.url;
    if (showResult.url.length > 58) {
        show_url = showResult.url.slice(0, 58) + "...";
    }


    var total = '<button class="btn btn-info btn-md btn-block" type="button" id="res_head"><span class="label label-'+keyword+'" id="total_count">'+showResult.total_count+'</span><samp> <span id="url"> '+show_url+'</span></samp></button>';

    var inner = "";
    for (var i = 0; i < showResult.info.length; i++) {
        var add = "";
        if (showResult.info[i].count > 0) {
            add += '<div class="panel panel-' + keyword + '"><div class="panel-heading"><samp><small><a class="text-' + keyword + '" data-toggle="collapse" href="#info' + i + '">' + showResult.info[i].name + '</a>  <span class="badge">' + showResult.info[i].count + '</span></small></samp></div><div class="panel-collapse collapse" id="info' + i + '">';
            if (showResult.info[i].desc !== "") {
                add += '<div class="panel-body"><small>' + showResult.info[i].desc + '</small></div>';
            }
            if (showResult.info[i].result.length > 1) {
                add += '<table class="table">'
                for (var j = 0; j < showResult.info[i].result.length; j++) {
                    add += '<tr>';
                    for (var k = 0; k < showResult.info[i].result[j].length; k++) {
                        if (j === 0) {
                            add += '<th>';
                        } else {
                            add += '<td>';
                        }
                        add += showResult.info[i].result[j][k];
                        if (j === 0) {
                            add += '</th>';
                        } else {
                            add += '</td>';
                        }
                    }
                    add += '</tr>';
                }
                add += '</table>';
            }

            add += '</div></div>';
        }
        inner = inner + add;

    }
    var res = {}
    res.total = total;
    res.inner = inner;
    return res
}



chrome.webNavigation.onCompleted.addListener(function(details) {
    chrome.tabs.executeScript(details.tabId, {
        //code: 'console.log(1);'
        file: 'lib/jquery.js'
    });
    chrome.tabs.executeScript(details.tabId, {
        //code: 'console.log(1);'
        file: 'js/myscript.js'
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
    //console.log("onupdate");
    var source;
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        //console.log('收到来自content-script的消息：');
        //console.log(request, sender, sendResponse);
        sendResponse(sender.url); //JSON.stringify(request));
        //console.log(request);
        source = request;

        var result = [];
        var count = 0;

        for (var i = 0; i < handleFuncs.length; i++) {
            var fn = window[handleFuncs[i]];
            var funcRes = "";
            if (typeof fn === "function") {
                funcRes = fn(source);
            }
            //var funcRes = eval(handleFuncs[i] + "(source)"); //funcRes is also JSON.

            var func = '{\"id\":' + i + ',\"name\":\"' + handleFuncs[i] + '\",\"result\":' + funcRes + '}';
            // console.log(funcRes);
            count = count + JSON.parse(funcRes).count;

            result.push(JSON.parse(func));
        }



        chrome.browserAction.setBadgeText({ text: count + "" });
        var badge_color = [92, 184, 92, 255];
        if (count > 50) {
            badge_color = [217, 83, 79, 255];
        } else if (count > 20) {
            badge_color = [236, 151, 31, 255];
        }
        chrome.browserAction.setBadgeBackgroundColor({ color: badge_color });

        showResult.url = sender.url;
        showResult.total_count = count;

        //console.log(result);

        var showInfo = [];

        for (var i = 0; i < result.length; i++) {
            var info = {};
            info.name = result[i].name;
            info.desc = result[i].result.desc;
            info.count = result[i].result.count;
            info.result = result[i].result.res;
            showInfo.push(info);
        }


        showResult.info = showInfo;
        //console.log(showResult);

        saveAnalyzeResult(sender.url, showResult);

    });

});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
    //console.log("onselection");

    getCurrentTabUrl((url) => {

        getSavedBackgroundColor(url, (savedColor) => {
            if (savedColor) {
                console.log(savedColor);
                chrome.browserAction.setBadgeText({ text: "" + savedColor.total_count });

                var badge_color = [92, 184, 92, 255];
                if (savedColor.total_count > 50) {
                    badge_color = [217, 83, 79, 255];
                } else if (savedColor.total_count > 20) {
                    badge_color = [236, 151, 31, 255];
                }
                chrome.browserAction.setBadgeBackgroundColor({ color: badge_color });
                showResult = savedColor;
            }
        });

    });

});

// Ensure the current selected tab is set up.
// chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     console.log("query");
//     // updateAddress(tabs[0].id);
// });
