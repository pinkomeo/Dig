
function test(source) {

    var total_res = [];
    total_res.push(["#", "js脚本地址", "js代码的字符数"]);

    for (var i = 0; i < source.js.length; i++) {

        var show_url = source.js[i].src;
        if (show_url.length > 6) {
            show_url = show_url.split('//')[1];
            if (show_url.length > 60) {
                show_url = show_url.slice(0, 60) + "...";
            }
        }

        var clsid_res = [];
        clsid_res.push(i);
        clsid_res.push(show_url);
        clsid_res.push(source.js[i].code.length);
        // /clsid_res.push();
        total_res.push(clsid_res);
    }

    var tes = {};
    tes.res = total_res;
    tes.desc = "这个测试函数只会收集源代码中的js脚本个数并展示出来，其中内嵌js脚本展示为<code>js@1</code>的形式。";
    tes.count = source.js.length;
    //var tes = '{\"res\":\"' + JSON.stringify(total_res) + '\",\"count\":' + co + '}';
    //console.log(tes);
    return JSON.stringify(tes)
}
