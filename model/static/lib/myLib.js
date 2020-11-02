var myLib={};

myLib.ajax={
	get:function(url){
		var xhrObj=new this._createXHR(url);
		xhrObj.xhr.open('get',url);
		xhrObj.xhr.send();
		return xhrObj;
	},
	post:function(url,option){
		var content=option.content;
		var contentType=option.contentType||'application/json';
		var xhrObj=new this._createXHR(url,option);
		xhrObj.xhr.open('post',url);
		xhrObj.xhr.setRequestHeader('Content-Type',contentType);
		xhrObj.xhr.send(JSON.stringify(content));
		return xhrObj;
	},
	_createXHR:function(url){
		this.sFn=null;
		this.fFn=function(status){
			alert('与服务器连接失败! '+status);
		};
		this.xhr=new XMLHttpRequest();
		this.xhr.onreadystatechange=function(){
			if (this.xhr.readyState===4){
				if (this.xhr.status>=200&&this.xhr.status<=304){
					this.sFn&&this.sFn(this.xhr.responseText);
				} else {
					this.fFn(this.xhr.status);
				}
			}
		}.bind(this);
	}
};
myLib.ajax._createXHR.prototype.then=function(sFn,fFn){
	this.sFn=sFn;
	fFn&&(this.fFn=fFn);
};

/**
 * 有效位数不能大于10,包含start,不包含end
 */
myLib.random=function(start,end,float){
	float=float||0;
	var length=Math.pow(10,float);
	return (~~(Math.random()*(end-start)*length)+start*length)/length;
};

myLib.deleteColumn=function(table,index){
	if (index==='last'){
		index=table.rows[0].children.length-1;
	}
	var len=table.rows.length;
	for (var i=0;i<len;i++){
		table.rows[i].deleteCell(index);
	}
};

myLib.getCookie=function(key){
	if (!key){
		var cookies={};
		document.cookie&&document.cookie.split(';').forEach(function(item){
			var kv=item.split('=');
			cookies[kv[0].trim()]=decodeURIComponent((kv[1]||'').trim());
		});
		return cookies;
	} else {
		var index=document.cookie.indexOf(key+'=');
		if (index>-1){
			var start=index+key.length+1;
			var lastIndex=document.cookie.indexOf(';',start);
			if (lastIndex===-1) lastIndex=undefined;
			return document.cookie.slice(start,lastIndex);
		} else {
			console.error('cannot find cookie: '+key);
		}
	}
}

myLib.requestFullScreen=(function(){
    var dom=document.createElement('div');
    var fn=dom.webkitRequestFullScreen||
           dom.requestFullScreen||
           dom.mozRequestFullScreen||
           dom.msRequestFullScreen||
           dom.msRequestFullscreen;
    return function(el){
        fn.apply(el);
    }
})();

myLib.isFullScreen=function(){
    return document.mozFullScreen||document.webkitIsFullScreen;
};

myLib.exitFullScreen=(function(){
    var fn=document.exitFullScreen||
           document.exitFullscreen||
           document.mozCancelFullScreen||
           document.webkitExitFullscreen||
           document.webkitExitFullScreen||
           document.msExitFullScreen||
           document.msExitFullscreen;
    return fn.bind(document);
})();

myLib.fullScreenChange=(function(){
    var a=1;
    return fn;
    function fn(){
        if (a){
            myLib.requestFullScreen(render);
            a=0;
        } else {
            a=1;
            myLib.exitFullScreen();
        }
    }
})();

myLib.copyToClipboard=function(node){
	var range=document.createRange();
	range.selectNode(node);
	var selection=window.getSelection();
	if (selection.rangeCount>0) selection.removeAllRanges();
	selection.addRange(range);
	document.execCommand('copy');
	selection.removeAllRanges();
};

/**
 * 支持数字,字符串,boolean,null,undefined
 * 引用类型不完全支持
 */
myLib.isSameArray=function(arr1,arr2){
	// 复制一份以防干扰原数组
	let array1=arr1.slice(0);
	let	array2=arr2.slice(0);
	return JSON.stringify(array1.sort())===JSON.stringify(array2.sort());
}