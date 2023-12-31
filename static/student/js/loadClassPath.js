var ClassPathLoader=function(name,src){
	this.path=null;
	this.name=name;
	if(!src||src==null||src==undefined)
		this.xml="./data/classPath.xml";
	else this.xml=src;
	this.xmlString=null;
	
	this.init();
}

ClassPathLoader.prototype.init = function() {
	var self = this;
	if (this.xml) {
		if(window.ActiveXObject) {
			var doc = new ActiveXObject("Microsoft.XMLDOM");
			doc.async = "false";
			doc.onreadystatechange = function() {
				if(doc.readyState == 4){
					self.xmlString = doc;
				}	
			}
			doc.load(this.xml);
		} else {
			var request = new XMLHttpRequest();
			request.open("get", this.xml, false);
			request.send(null);
			this.xmlString = request.responseXML;
		}
	}
}

ClassPathLoader.prototype.getClassPath=function(){
	try{
		this.path=this.xmlString.getElementsByTagName(this.name)[0].firstChild.nodeValue;
	}catch(e){
		window.alert("没有名为'"+this.name+"'的节点!");
	}
	return this.path;
}