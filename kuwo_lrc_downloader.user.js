// ==UserScript==
// @name         kuwo_lrc_downloader
// @namespace    https://github.com/jjm2473/
// @version      0.1
// @description  下载酷我的lrc歌词
// @author       jjm2473
// @match        http://www.kuwo.cn/yinyue/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var getLrcContent=function(title,album,artist){
        var lrcContent='';
        lrcContent='[ti:'+title+']\n'+
            '[ar:'+artist+']\n'+
            '[al:'+album+']\n\n';

        var container=document.getElementById('mCSB_1_container');
        var child = container.children;
        var lrclen = child.length;
        for(var i=0;i<lrclen;++i){
            var sec=child[i].attributes.getNamedItem('data-time').value;
            var hsec=parseInt(sec*100);
            var min=parseInt(hsec/6000);
            sec = (hsec%6000)/100;
            var text=child[i].innerText;
            lrcContent+=('['+min+':'+sec+']'+text+'\n');
        }
        console.log(lrcContent);
        return lrcContent;
    };

    var exportString2File = function ( output , filename) {
		var blob = new Blob( [ output ], { type: 'text/plain' } );
		var objectURL = URL.createObjectURL( blob );
        var a=document.createElement('a');
        a.href=objectURL;
        a.download=filename||'Untitled';
        a.click();
	};
    var onClickListener = function(){
        var title = document.getElementById('lrcName').innerText;
        var album=document.querySelector('#musiclrc .album a').innerText;
        var artist=document.querySelector('#musiclrc .artist a').innerText;

        exportString2File(getLrcContent(title,album,artist), artist+' - '+title+'.lrc');
    };
    var createDownloadLink = function(){
    	var aa=document.createElement("a");
    	aa.addEventListener("click",onClickListener);
    	aa.href="javascript:void(0);";

        var span=document.createElement('span');
        span.style='width: 100%;text-align: center;';
    	span.innerHTML='&nbsp;下载LRC&nbsp;';
        aa.appendChild(span);

    	var down = document.getElementsByClassName('down')[0];
        down.insertBefore(aa,down.children[0]);
    };

    createDownloadLink();
})();