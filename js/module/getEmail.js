
function getEmail(source) {
    var tes = {};
    var total_res = [];
    total_res.push(["#", "邮箱"]);

    var html_source = source.html[0];
    //console.log(html_source);
    //console.log(typeof(html_source));
    pattern = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/g;
    var listEmail = html_source.match(pattern);
    if (listEmail == null) {
        tes.count = 0;
        return JSON.stringify(tes)
    }
    listEmail = unique(listEmail);
    for (var i = 0; i < listEmail.length; i++) {
        var clsid_res = [];
        clsid_res.push(i);
        clsid_res.push(listEmail[i]);
        // /clsid_res.push();
        total_res.push(clsid_res);
    }

    //console.log(listEmail);

    tes.res = total_res;
    tes.desc = "所有的邮箱";
    tes.count = listEmail.length;

    return JSON.stringify(tes)
}
