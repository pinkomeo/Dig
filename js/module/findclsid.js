function findclsid(source) {


    var co = 0;
    var res = [];

    //console.log(source);
    //console.log(source.html);
    //var html_s = source.html[0];

    var total_res = [];
    total_res.push(["#", "clsid", "位置"]);

    for (var i = 0; i < source.js.length; i++) {

        var text = source.js[i].code;

        if (text.match(/clsid/)) {
            co = co + 1;
            //console.log("hooray");
            st = text.match(/clsid/).index;
            en = text.match(/clsid/).index + 40;
            //console.log("[!] " + " @ " + source.js[i].src);
            //console.log(st);
            //console.log(text.slice(st, en));
            //console.log(text.match(/clsid/i|/\.exe/i));

            var clsid_res = [];
            clsid_res.push(i);
            clsid_res.push(text.slice(st, en));
            clsid_res.push(st);
            // /clsid_res.push();
            total_res.push(clsid_res);

        }
        //console.log(test);
    }
    //console.log(total_res);
    var tes = {};
    tes.res = total_res;
    tes.desc = "";
    //tes.desc = "获取js代码中的全部clsid";
    tes.count = co;
    //var tes = '{\"res\":\"' + JSON.stringify(total_res) + '\",\"count\":' + co + '}';
    //console.log(tes);
    return JSON.stringify(tes)
}
