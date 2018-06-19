console.log("[-] Author @Pinko & Github @https://github.com/pinkomeo");


function getSource(href) {

    var js_s = [];
    var html_s = [];

    $.ajaxSetup({
        async: false
    });

    var text = window.document;
    html_s.push(text.getElementsByTagName('html')[0].innerHTML);

    var script_child = document.getElementsByTagName('script');
    var loop_count = script_child.length;
    for (var i = 0; i < loop_count; i++) {
        var src = script_child[i].src;
        if (src) {
            $.ajax({
                url: src,
                success: function(content) {
                    // var mask = document.getElementsByTagName('script')[i];
                    // mask.src = '';
                    // mask.innerText = content;
                    var js_res = {};
                    js_res.src = src;
                    js_res.code = content;
                    js_s.push(js_res);
                },
                timeout: 5000 //5 second timeout
            });
        } else {
            var js_res = {};
            js_res.src = "js@" + i;
            js_res.code = script_child[i].innerText;
            js_s.push(js_res);
        }
    }
    //console.log(js_s);
    //console.log(html_s);

    var source = {};
    source.js = js_s;
    source.html = html_s;
    //console.log(source);
    return source;
}

//document.addEventListener('Completed', () => {

    //var result = analyzeWebContent();
    var source;
    source = getSource(window.location.href);

    //console.log(source);
    // console.log(JSON.stringify(result));

    chrome.runtime.sendMessage(source, function(url) {
        console.log('[-] "Got!" said from Background to ' + url);
        //saveAnalyzeResult(url, count);
    });

//});
