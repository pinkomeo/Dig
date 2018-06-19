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

document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabUrl((url) => {

        var current_url = url;


        // <div class="panel panel-default">
        //     <div class="panel-heading">
        //         <h3 class="panel-title">Panel title</h3>
        //     </div>
        //     <div class="panel-body">
        //         Panel content
        //     </div>
        // </div>


        var bg = chrome.extension.getBackgroundPage();
        var showResult = bg.getShowResult();

        console.log(showResult);
        // var popup_url = document.getElementById('url');
        // popup_url.innerText = showResult.url;
        // var total_count = document.getElementById('total_count');
        // total_count.innerText = showResult.total_count;



        var total = document.getElementById('total');
        total.innerHTML = showResult.total;
        // total.innerHTML = '<button class="btn btn-info btn-md btn-block" type="button" id="res_head"><span class="label label-'+keyword+'" id="total_count">'+showResult.total_count+'</span><samp> <span id="url"> '+show_url+'</span></samp></button>';

        var res = document.getElementById('info');
        res.innerHTML = showResult.inner;

        // Ensure the background color is changed and saved when the dropdown
        // selection changes.
        // dropdown.addEventListener('change', () => {
        //     changeBackgroundColor(dropdown.value);
        //     saveBackgroundColor(url, dropdown.value);
        // });
    });

});
