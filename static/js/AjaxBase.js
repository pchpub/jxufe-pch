var Ajax = {
	requests : {},
	doCreate : function(rid) {
		if (window.XMLHttpRequest) {
			this.requests[rid] = new XMLHttpRequest();
		} else {
			var prefixes = ["MSXML2", "Microsoft", "MSXML", "MSXML3"];
			for (var i = 0; i < prefixes.length; i = i + 1) {
				try {
					this.requests[rid] = new ActiveXObject(prefixes[i] + ".XmlHttp");
				} catch (ex) {
				}
			}
		}
		
		return rid;
	},
	doGet : function(url, param, fun) {
		var rid = this.doCreate(new Date().getTime());
		var o = this.requests[rid];
		if (param && param !== "") {
			url = url + "?" + param;
		}
		o.open("GET", url.replace(/\+/g,"%2B"), true);//替换+号
		if (fun) {
			this.doBind(rid, fun);
		}
		o.send(null);
		return rid;
	},
	doPost : function(url, param, fun) {
		url=url.replace(/\+/g,"%2B");//替换+号
		if(param&&param!=null&&param!=""){
			param=param.replace(/\+/g,"%2B");//替换+号
		}
		var rid = this.doCreate(new Date().getTime());
		var o = this.requests[rid];
		o.open("POST", url, true);
		if (fun) {
			this.doBind(rid, fun);
		}
		o.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		if (!param || param === "") {
			param = null;
		}
		o.send(param);//替换+号
		return rid;
	},
	doBind : function(rid, fun) {
		var r = this.requests[rid];
		r.onreadystatechange = (function(o) {
			return function() {
				if (o.readyState == 4 && o.status == 200) {
					fun.call(o);
				}
			};
		})(r);
	},
	abort : function(rid) {
		if(this.requests[rid]) {
			this.requests[rid].abort();
		}
	},
	clear : function(rid) {
		if(rid) {
			if(this.requests[rid]) {
				delete this.requests[rid];
			}
		} else {
			for(var o in this.requests) {
				delete this.requests[o];
			}
		}
	},
	get : function(rid) {
		return this.requests[rid];
	}
};