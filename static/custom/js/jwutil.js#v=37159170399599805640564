/**
 * 教务系统通用处理工具类
 * @since 2012-04-06
 */
var jwutil = (function(jw, $){

	
	/**
	 * 页面初始化方法
	 */
	jw.init = function(json){
		var yearTerms    = json["yearTerms"];    // 初始化并设置学年学期
		var gradeItems   = json["gradeItems"];   // 设定年级:年级输入项构建,多个年级？
		var inputForms   = json["inputForms"];   // 需要回车键转TAB键的表单集合,如:theSearchArea,theEditArea
		var firstItem    = json["firstItem"];    // 页面初始化时焦点定位项
		var notNullItems = json["notNullItems"]; // 非空项集合:绑定控制按钮事件,如：yxb,zy,xq,bjmc,bjjc,xz,yhdm
		var bindButtons  = json["bindButtons"];  // 需要绑定的控制按钮, 缺省为btnSave
		var dropLists    = json["dropLists"];    // 非级联下拉列表项集合
		var dropLists4Cascade = json["dropLists4Cascade"]; //级联下拉列表集合
		var validate = json["validate"];         // 初始化验证规则	
		
		if ((typeof yearTerms == "undefined") || (yearTerms == null)) { yearTerms = ""; }
		if ((typeof gradeItems == "undefined") || (gradeItems == null)) { gradeItems = ""; }
		if ((typeof inputForms == "undefined") || (inputForms == null)) { inputForms = ""; }
		if ((typeof firstItem == "undefined") || (firstItem == null)) { firstItem = ""; }
		if ((typeof notNullItems == "undefined") || (notNullItems == null)) { notNullItems = ""; }
		if ((typeof bindButtons == "undefined") || (bindButtons == null)) { bindButtons = "btnSave"; }
		if ((typeof dropLists == "undefined") || (dropLists == null)) { dropLists = ""; }
		if ((typeof dropLists4Cascade == "undefined") || (dropLists4Cascade == null)) { dropLists4Cascade = ""; }
		if ((typeof validate == "undefined") || (validate == null)) { validate = ""; }
		
		//0. 动态加载样式文件
		//kutil.loadingCSS();
		//1. 初始化并设置学年学期
		if (!kutil.isNull(yearTerms)) {
			var divId = yearTerms["divId"] ;
			var inputIds = yearTerms["inputIds"] ;
			var readonly = yearTerms["readonly"];
			var callback = yearTerms["callback"];
			if ((typeof readonly == "undefined") || (readonly == null)) { readonly = "0"; }
			if (readonly == "0") {
				jwutil.initYearTerm(divId,inputIds, callback);
			} else {
				jwutil.setYearTerm(inputIds, callback); // 只读显示
			}
		}
		//2. 构建年级输入项
		if (!kutil.isNull(gradeItems)) {
			var divId = gradeItems["divId"] ;
			var inputId = gradeItems["inputId"];
			var initValue = gradeItems["initValue"];
			var callback = gradeItems["callback"];
			//alert("divId:" + divId + "/" + inputId + "/" + initValue);
			//alert("callback:" + callback);
			jwutil.setGrade(divId, inputId, initValue, callback);
		}
		//3. 绑定控制按钮事件 
		if (!kutil.isNull(notNullItems)) {
			kutil.bindShowButton(notNullItems, bindButtons);
		}
		//4. 输入项绑定回车键转Tab键功能
		if (!kutil.isNull(inputForms)) {
			kutil.enter2tab(inputForms);
		}
		//5. 定位到第一个输入项
		if (!kutil.isNull(firstItem)) {
			kutil.toFirstItem(firstItem);
		}
		//6.1 非级联下拉列表项集合迭代加载
		if (!kutil.isNull(dropLists)) {
			$.each(dropLists, function(i) {
				var oParam = dropLists[i];
				kutil.loadDropList4Single(oParam);
			})
		}
		//6.2 级联下拉列表处理
		if (!kutil.isNull(dropLists4Cascade)) {
			setTimeout(
						function(){
							kutil.loadDropLists3(dropLists4Cascade)
						}, 
						50
					);
		}		
		//7 初始化验证规则, 参数示例：{documentId:"xsxj.xjjd.lsluruxsxx", formId:"ActionForm"} 
		var validate = json["validate"];  
		if (!kutil.isNull(validate)) {
			var documentId = validate["documentId"];
			var formId = validate["formId"];
			kutil.initValidate(documentId,formId);
		}		
		
	}	
		
	/**
	 * 初始化查询
	 * @param inputId 取值判断的表单项ID
	 * @param fun 初始执行的函数
	 */
	jw.initQuery = function(inputId, initFun){
		var value = j$("#"+inputId).val();
		if (typeof value == "undefined" || kutil.isNull(value)) {
			//alert(inputId + ":" + value);
	 		setTimeout(arguments.callee, 10);  // 10s后执行当前调用函数(如何带参数) 
		} else {
			//alert("initFun:" + initFun);
			eval(initFun + "()");
		}
	}
	
	/**
	 * 设置用户学年学期：
	 * 以同步方式设置, 以方便学年、学期参数值供后续方法读取使用
	 * @param inputIds 学年学期的ID标识组合，缺省为: xn|xn1|xq|_xq
	 */
	jw.setYearTerm = function(inputIds, callback){
		
		// 参数初始化
		var xn_id = "xn";
		var xn1_id = "xn1";
		var xq_id = "xq";
		var xqmc_id = "_xq";
        var lx = "0";
		if ( !kutil.isNull(inputIds) ) {
			var aInputIds = new String(inputIds).split("|");
			xn_id  = aInputIds[0];
			xn1_id = aInputIds[1];
			xq_id  = aInputIds[2];
			xqmc_id  = aInputIds[3];
            try{lx  = aInputIds[4];}catch (e) {
				lx="";
            }
		}

		// 依据用户学年学期值设值
		var url = _webRootPath + "jw/common/showYearTerm.action" ;
		if(lx=="1") {
            url = _webRootPath + "jw/common/bookYearTerm.action";
        }
		kutil.doAjax(url, null, function (data) {
				setYearTermInfo(data, xn_id, xn1_id, xq_id, xqmc_id, callback);
			},
			false);

					 
	}
	
	/**
	 * 设置学生学籍学年学期：
	 * 以同步方式设置, 以方便学年、学期参数值供后续方法读取使用
	 * @param inputIds 学年学期的ID标识组合，缺省为: xn|xn1|xq|_xq
	 */
	jw.setYearTerm4Xsxj = function(inputIds){
		
		// 参数初始化
		var xn_id = "xn";
		var xn1_id = "xn1";
		var xq_id = "xq";
		var xqmc_id = "_xq";
		if ( !kutil.isNull(inputIds) ) {
			var aInputIds = new String(inputIds).split("|");
			xn_id  = aInputIds[0];
			xn1_id = aInputIds[1];
			xq_id  = aInputIds[2];
			xqmc_id  = aInputIds[3];
		}
		
		// 依据学籍学年学期值设值
		// Ajax.doPost("../SetAcademicYearAction.do","hidOption=GET",doResponse);
		kutil.doAjax(_webRootPath + "SetAcademicYearAction.do", "hidOption=GET", 
					function(data) { 
						setYearTermInfo4Xsxj(data, xn_id, xn1_id, xq_id, xqmc_id); 
					}, 
					false);
	}
		
	/**
	 * 设置学年学期(for专业分流)：
	 * 以同步方式设置, 以方便学年、学期参数值供后续方法读取使用
	 * @param inputIds 学年学期的ID标识组合，缺省为: nj|xn|xn1|xq|_xq
	 */ 
	jw.setYearTerm4Zyfl = function(inputIds, callback){
		
		// 参数初始化
		var nj_id = "nj";
		var xn_id = "xn";
		var xn1_id = "xn1";
		var xq_id = "xq";
		var xqmc_id = "_xq";
		if ( !kutil.isNull(inputIds) ) {
			var aInputIds = new String(inputIds).split("|");
			nj_id  = aInputIds[0];
			xn_id  = aInputIds[1];
			xn1_id = aInputIds[2];
			xq_id  = aInputIds[3];
			xqmc_id  = aInputIds[4];
		}
		
		// 依据专业分流学年学期值设值
		kutil.doAjax(_webRootPath + "SetDiffluenceSpecialityAcademicYearAction.do", "hidOption=GET", 
					function(data) { 
						setYearTerm4Zyfl(data, nj_id, xn_id, xn1_id, xq_id, xqmc_id, callback); 
					}, 
					false);
	}	
	
	/**
	 * 设置教学计划/制定开课计划学年学期：
	 * 以同步方式设置, 以方便学年、学期参数值供后续方法读取使用
	 * @param inputIds 学年学期的ID标识组合，缺省为: xn|xn1|xq|_xq
	 */
	jw.setYearTerm4Jxjh = function(inputIds){
		// 参数初始化
		var xn_id = "xn";
		var xn1_id = "xn1";
		var xq_id = "xq";
		var xqmc_id = "_xq";
		if ( !kutil.isNull(inputIds) ) {
			var aInputIds = new String(inputIds).split("|");
			xn_id  = aInputIds[0];
			xn1_id = aInputIds[1];
			xq_id  = aInputIds[2];
			xqmc_id  = aInputIds[3];
		}
		// 依据学年学期值设值
		var url = _webRootPath + "frame/desk/showYearTerm4Jxjh.action";
		kutil.doAjax(url, null, 
					function(data) { 
						setYearTerm4Jxjh(data, xn_id, xn1_id, xq_id, xqmc_id); 
					}, 
					false);
	}	
	
	/**
	 * 设置年级或学年下拉列表
	 */
	jw.setYear = function(divId) {
		var seloption = $id(divId);
	    seloption.empty();
	    seloption.append("<option value=''></option>"); // 加上空行
	    var nowYear = kutil.getCurrentYear();
		for (var year = nowYear - 15; year < nowYear + 3; year++) {
    	    seloption.append("<option value=\"" + year + "\">" + year + "</option>"); 
    	}						
	}
	
	/**
	 * 初始化并设置用户学年学期：(学期为可下拉选择列表)
	 * 以同步方式设置, 以方便学年、学期参数值供后续方法读取使用
	 * @param divId 包含学年的DIV标识,缺省为: textgroupware
	 * @param inputIds 学年学期的ID标识，缺省为: xn|xn1|xq
	 */  
	jw.initYearTerm = function(divId, inputIds, callback){
		// 参数初始化
		var xn_id = "xn";
		var xn1_id = "xn1";
		var xq_id = "xq";
        var lx = "";
		if ((typeof divId == "undefined") || kutil.isNull(divId)) {
			divId = "textgroupware";
		}
		if ( !kutil.isNull(inputIds) ) {
			var aInputIds = new String(inputIds).split("|");
			xn_id  = aInputIds[0];
			xn1_id = aInputIds[1];
			xq_id  = aInputIds[2];
            try{lx = aInputIds[3];}catch (e) {
				lx = "";
            }
		}

		// 依据用户学年学期值设值
		var url = _webRootPath + "jw/common/showYearTerm.action";
        if(lx=="1") //收订
        {
            url = _webRootPath + "jw/common/bookYearTerm.action";
            kutil.doAjax(url, null, function (data) { // 此处回调
                    initYearTerm(data, xn_id, xn1_id, xq_id, divId, callback);
                },
                false);
        }
        else
		{
            kutil.doAjax(url, null, function (data) { // 此处回调
                    initYearTerm(data, xn_id, xn1_id, xq_id, divId, callback);
                },
                false);
		}
	}	
	/**
	 * 初始化并设置用户学年学期：(学期为可下拉选择列表)
	 * 以同步方式设置, 以方便学年、学期参数值供后续方法读取使用
	 * @param divId 包含学年的DIV标识,缺省为: textgroupware
	 * @param inputIds 学年学期的ID标识，缺省为: xn|xn1|xq
	 * @param path button图片路径
	 */  
	jw.initYearTerm = function(divId, inputIds, callback,path){
		// 参数初始化
		var xn_id = "xn";
		var xn1_id = "xn1";
		var xq_id = "xq";
        var lx = "";
		if ((typeof divId == "undefined") || kutil.isNull(divId)) {
			divId = "textgroupware";
		}
		if ( !kutil.isNull(inputIds) ) {
			var aInputIds = new String(inputIds).split("|");
			xn_id  = aInputIds[0];
			xn1_id = aInputIds[1];
			xq_id  = aInputIds[2];
            try{lx  = aInputIds[3];}catch (e) {
				lx="";
            }
		}

		// 依据用户学年学期值设值
		var url = _webRootPath + "jw/common/showYearTerm.action";
		if(lx=="1")
		{
            url = _webRootPath + "jw/common/bookYearTerm.action";
		}
		kutil.doAjax(url, null, function(data){ // 此处回调
									initYearTerm_path(data, xn_id, xn1_id, xq_id, divId, callback, path);
								 }, 
					 false);
	}	
	/**
	* 设置用户学年学期的回调方法
	 * @param path button图片路径
	*/
	function initYearTerm_path(response, xn_id, xn1_id, xq_id, divId, callback,path){
		//alert("initYearTerm()::response = " + response);
		var data = JSON.parse(response); // 响应消息转化为JSON, 由json2.js提供此方法
		var xn = data.xn ;
		var xq = data.xqM ;
		var istop="1";
		try{
		    istop=data.istop;
		}catch(e){}
		// 初始化学年标签
		var textgroupware = new TextGroupWare(divId , '50' , xn_id , xn , divId,path);
		// 设定学期
		var oParam = {selId:xq_id, cbName:"MsCodeset", paramValue:"DM-XQ", initValue:xq, isAsync:false, selNull:false};
		kutil.loadDropList4Single(oParam);
		// 设定学年初值
		$("#" + xn_id).val(xn);
		$("#" + xn1_id).val(parseInt(xn)+1);
		if(istop=="0"){
		   try{
		      $id("chk_xc").attr("checked",true);
		   }catch(e){}
		}else{
		   try{
		      $id("chk_xc").attr("checked",false);
		   }catch(e){}
		}
		// 学年添加事件
		textgroupware.ONCLICK = function () { 
			$id(xn1_id).val(parseInt($id(xn_id).val())+1);
			// 如果传入了回调函数,则执行回调函数
			//alert("textgroupware.callback = " + callback);
			if (callback) {
				callback();
			}
		};
		// 执行初始回调
		if (callback) {
			callback();
		}
	}
	/**
	 * 初始化并设置学生学籍学年学期：(学期为可下拉选择列表)
	 * 以同步方式设置, 以方便学年、学期参数值供后续方法读取使用
	 * @param divId 包含学年的DIV标识,缺省为: textgroupware
	 * @param inputIds 学年学期的ID标识，缺省为: xn|xn1|xq
	 */  
	jw.initYearTerm4Xsxj = function(divId, inputIds){
		
		// 参数初始化
		var xn_id = "xn";
		var xn1_id = "xn1";
		var xq_id = "xq";
		if ((typeof divId == "undefined") || kutil.isNull(divId)) {
			divId = "textgroupware";
		}
		if ( !kutil.isNull(inputIds) ) {
			var aInputIds = new String(inputIds).split("|");
			xn_id  = aInputIds[0];
			xn1_id = aInputIds[1];
			xq_id  = aInputIds[2];
		}
		
		// 初始化学年标签
		//var textgroupware = new TextGroupWare('textgroupware' , '50' , 'xn' , '2005' , 'textgroupware');
		//textgroupware.ONCLICK = function () {$("xn1").value=parseInt($("xn").value)+1;};
		//var textgroupware = new TextGroupWare(divId , '50' , xn_id , kutil.getCurrentYear() , divId);
		//textgroupware.ONCLICK = function () { $("#" + xn1_id).val(kutil.getCurrentYear() + 1); };
		
		// 依据学籍学年学期值设值
		kutil.doAjax(_webRootPath + "SetAcademicYearAction.do", "hidOption=GET", 
					 function(data){ // 此处回调
						initYearTerm4Xsxj(data, xn_id, xn1_id, xq_id, divId);
					 }, 
					 false);
	}
	
	/**
	 * 初始化并设置专业分流学年学期：(学期为可下拉选择列表)
	 * 以同步方式设置, 以方便学年、学期参数值供后续方法读取使用
	 * @param divId 包含学年的DIV标识,缺省为: textgroupware
	 * @param inputIds 学年学期的ID标识，缺省为: flxn|flxn1|flxq
	 * @param callback 回调函数
	 */  
	jw.initYearTerm4Zyfl = function(divId, inputIds, callback){
		// 参数初始化
		var xn_id = "flxn";
		var xn1_id = "flxn1";
		var xq_id = "flxq";
		if ((typeof divId == "undefined") || kutil.isNull(divId)) {
			divId = "textgroupware";
		}
		if ( !kutil.isNull(inputIds) ) {
			var aInputIds = new String(inputIds).split("|");
			xn_id  = aInputIds[0];
			xn1_id = aInputIds[1];
			xq_id  = aInputIds[2];
		}
		// 依据学籍学年学期值设值
		kutil.doAjax(_webRootPath + "SetDiffluenceSpecialityAcademicYearAction.do", "hidOption=GET", 
					 function(data){ // 此处回调
						initYearTerm4Zyfl(data, xn_id, xn1_id, xq_id, "nj", divId, callback);
					 }, 
					 false);
	}	

	/**
	 * 初始化并设置(教学计划/制定开课计划)学年学期：(学期为可下拉选择列表)
	 * 以同步方式设置, 以方便学年、学期参数值供后续方法读取使用
	 * @param divId 包含学年的DIV标识,缺省为: textgroupware
	 * @param inputIds 学年学期的ID标识，缺省为: xn|xn1|xq
	 */  
	jw.initYearTerm4jxjh = function(divId, inputIds){
		// 参数初始化
		var xn_id = "xn";
		var xn1_id = "xn1";
		var xq_id = "xq";
		if ((typeof divId == "undefined") || kutil.isNull(divId)) {
			divId = "textgroupware";
		}
		if ( !kutil.isNull(inputIds) ) {
			var aInputIds = new String(inputIds).split("|");
			xn_id  = aInputIds[0];
			xn1_id = aInputIds[1];
			xq_id  = aInputIds[2];
		}
		// 依据学年学期值设值
		var url = _webRootPath + "frame/desk/showYearTerm4Jxjh.action";
		kutil.doAjax(url, null, 
					function(data){ 
						initYearTerm4Jxjh(data, xn_id, xn1_id, xq_id, divId);
			 		}, 
		 		false);
	}	
	
	function showYearTerm4Jxjh(response){
		//alert("response:" + response);
		var data = JSON.parse(response); // 响应消息转化为JSON, 由json2.js提供此方法
		var xn = data.xn ;
		var xq = data.xq ;
		// 设定学期
		var oParam = {selId:xq_id, cbName:"MsCodeset", paramValue:"DM-XQ", initValue:xq, isAsync:false};
		kutil.loadDropList4Single(oParam);				
	}
	
	/**
	 * 设定年级
	 * @param divId 年级DIV容器
	 * @param inputId 年级值输入项ID
	 * @param initValue 年级初始值
	 * @param callback onclick事件的回调方法,以字符串或function标识
	 */
	jw.setGrade = function(divId, inputId, initValue, callback) {
		var _textgroupware = new TextGroupWare(divId, '50', inputId, initValue, divId);
		var _type = typeof callback ;
		//alert("_type:" + _type);
		// 注册年级值改变的回调事件
		if (_type == "string") {
			eval(callback + "()");  // 初始运行
			_textgroupware.ONCLICK = function() {
				eval(callback + "()"); // 点击事件运行
			}  
		} else if (_type == "function"){
			callback();
			_textgroupware.ONCLICK = function() {
				callback();
			} 
		} else {
			// null to-do
		}
		return _textgroupware ;
	}
	/**
	 * 设定年级
	 * @param divId 年级DIV容器
	 * @param inputId 年级值输入项ID
	 * @param initValue 年级初始值
	 * @param callback onclick事件的回调方法,以字符串或function标识
	 * @param path button图片路径
	 */
	jw.setGrade = function(divId, inputId, initValue, callback, path) {
		var _textgroupware = new TextGroupWare(divId, '50', inputId, initValue, divId, path);
		var _type = typeof callback ;
		//alert("_type:" + _type);
		// 注册年级值改变的回调事件
		if (_type == "string" && callback != "") {
			eval(callback + "()");  // 初始运行
			_textgroupware.ONCLICK = function() {
				eval(callback + "()"); // 点击事件运行
			}  
		} else if (_type == "function"){
			callback();
			_textgroupware.ONCLICK = function() {
				callback();
			} 
		} else {
			// null to-do
		}
		return _textgroupware ;
	}
	/**
	 * 年级对象绑定点击事件
	 * @param textgroupware 年级对象
	 * @param callback onclick事件的回调方法,以字符串或function标识
	 */
	jw.bindGrade = function(textgroupware, callback) {
		var _type = typeof callback ;
		// 注册年级值改变的回调事件
		if (_type == "string") {
			eval(callback + "()");  // 初始运行
			textgroupware.ONCLICK = function() {
				eval(callback + "()"); // 点击事件运行
			}  
		} else if (_type == "function"){
			callback();
			textgroupware.ONCLICK = function() {
				callback();
			} 
		} else {
			// null to-do
		}
	}
	
	/**
	 * 年级对象取消点击事件
	 * @param textgroupware 年级对象
	 */
	jw.unbindGrade = function(textgroupware) {
		textgroupware.ONCLICK = function() {
		}
	}
	
	/**
	 * 初始化院(系)/部-专业-班级下拉列表(默认带权限控制)
	 * @param selIds 下拉列表项id组合, 以逗号,分隔, 如: dwh,zydm,bj 
	 * @param SetRight 控制权限，true 控制(默认)，false 不控制
	 */
	jw.loading_Dept_Spe_Class = function(selIds,SetRight) {
		var selId1 = "dwh";
		var selId2 = "zydm";
		var selId3 = "bj";
		var selId4 = "nj";
		var selId5 = "chkNj";
		var right="1";
		if ( !(typeof selIds == "undefined" || kutil.isNull(selIds)) ) {
			var aSelId = new String(selIds).split(",");
			selId1 = aSelId[0];
			selId2 = aSelId[1];
			selId3 = aSelId[2];
			if(aSelId.size()>3) selId4=aSelId[3];
			if(aSelId.size()>4) selId5=aSelId[4];
		}
		if ( !(typeof SetRight == "undefined" || kutil.isNull(SetRight)) && SetRight==false ) {
			right="0";
		}
		var nj="%";
		if(!(typeof j$("#"+selId5).attr("checked") == "undefined")){
			if (j$("#"+selId5).attr("checked")){
				nj=j$("#"+selId4).val();
			}
		}else{
			if(!(typeof j$("#"+selId4).val() == "undefined" )) nj=j$("#"+selId4).val();
		}
        var aParam = "";
        if(!(typeof j$("#sel_xzbjxq").val() == "undefined" ))
		{
            var xqdm = j$("#sel_xzbjxq").val();
            if(xqdm=="") xqdm="%"
            aParam = [
                {selId: selId1, cbName: "MsYXB", paramValue: "nj=" + nj, dbItem: "dwh", isYXB: right},
                {selId: selId2, cbName: "MsYXB_Specialty", dbItem: "zydm", isZY: right},
                {selId: selId3, cbName: "MsXYXB_Specialty_Class_ByXQ",paramValue:"xqdm="+xqdm, dbItem: "bjdm"}
            ];
		}
		else {
            aParam = [
                {selId: selId1, cbName: "MsYXB", paramValue: "nj=" + nj, dbItem: "dwh", isYXB: right},
                {selId: selId2, cbName: "MsYXB_Specialty", dbItem: "zydm", isZY: right},
                {selId: selId3, cbName: "MsYXB_Specialty_Class", dbItem: "bjdm"}
            ];
        }
		kutil.loadDropLists3(aParam);
		/**
		 * 原有方式	 			
		var sels=Array();
		sels[0]="dwh|";
		sels[1]="zydm|";
		sels[2]="bj|";
		new CKDList().IKInitDropList(sels,"department_zy_bj_xsxj");
		*/
	}
	jw.loading_Dept_Pycc_Spe_Class = function(selIds,SetRight) {
		var selId1 = "dwh";
		var selId2 = "zydm";
		var selId3 = "bj";
		var selId4 = "nj";
		var selId5 = "chkNj";
		var selId6 = "pycc";
		var right="1";
		if ( !(typeof selIds == "undefined" || kutil.isNull(selIds)) ) {
			var aSelId = new String(selIds).split(",");
			selId1 = aSelId[0];
			selId2 = aSelId[1];
			selId3 = aSelId[2];
			if(aSelId.size()>3) selId4=aSelId[3];
			if(aSelId.size()>4) selId5=aSelId[4];
		}
		if ( !(typeof SetRight == "undefined" || kutil.isNull(SetRight)) && SetRight==false ) {
			right="0";
		}
		var nj="%";
		var pycc="%";
		if(!(typeof j$("#"+selId5).attr("checked") == "undefined")){
			if (j$("#"+selId5).attr("checked")){
				nj="";
			}
		}else{
			if(!(typeof j$("#"+selId4).val() == "undefined" )) nj=j$("#"+selId4).val();
		}
		pycc=(j$("#"+selId6).val()==""||j$("#"+selId6).val()==undefined||j$("#"+selId6).val()=="null"||j$("#"+selId6).val()==null)?"%":j$("#"+selId6).val();
		var aParam = [
	              		{selId: selId1, cbName:"MsYXB", paramValue:"nj="+nj, dbItem: "dwh",isYXB:right },
	              		{selId: selId2, cbName:"MsYXB_Pycc_Specialty", paramValue:"pycc="+pycc, dbItem: "zydm" },
	              		{selId: selId3, cbName:"MsYXB_Specialty_Class",  dbItem: "bjdm" }
     	 			 ];
		kutil.loadDropLists3(aParam);
	}	
	/**
	 *初始化校区-库房下拉列表
	 *@param selIds 下拉列表项id组合, 以逗号,分隔, 如: xq,kf 
	 *
	 */
	jw.JCGL_XQ_KF = function(selIds){
		var selId1 = "xq";
		var selId2 = "kf";
		if ( !(typeof selIds == "undefined" || kutil.isNull(selIds)) ) {
			var aSelId = new String(selIds).split(",");
			selId1 = aSelId[0];
			selId2 = aSelId[1];
		}
		var aParam = [
	              		{selId: selId1, cbName:"MsSchoolArea",dbItem:"SZXQ_M"},
	              		{selId: selId2, cbName:"JCGL_XQ_KF"}
     	 			 ];
     	kutil.loadDropLists3(aParam);
	}
	
	/**
	 *初始化校区-库房-书架下拉列表
	 *@param selIds 下拉列表项id组合, 以逗号,分隔, 如: xq,kf,sj
	 */
	jw.jcgl_xq_kf_sj = function(){
		var selId1 = "xq";
		var selId2 = "kf";
		var selId3 = "sj";
		if ( !(typeof selIds == "undefined" || kutil.isNull(selIds)) ) {
			var aSelId = new String(selIds).split(",");
			selId1 = aSelId[0];
			selId2 = aSelId[1];
			selId3 = aSelId[2];
		}
		var aParam = [
	              		{selId: selId1, cbName:"MsSchoolArea", dbItem: "SZXQ_M" },
	              		{selId: selId2, cbName:"JCGL_XQ_KF", dbItem: "SZKF" },
	              		{selId: selId3, cbName:"JCGL_XQ_KF_SJ" }
     	 			 ];
     	kutil.loadDropLists3(aParam);
	}
	
	/**
	 * 初始化校区-楼房下拉列表
	 * @param selIds 下拉列表项id组合, 以逗号,分隔, 如: xq,lf 
	 * 
	 */
	jw.loading_SchoolArea_LF = function(selIds) {
		var selId1 = "xq";
		var selId2 = "lf";
		if ( !(typeof selIds == "undefined" || kutil.isNull(selIds)) ) {
			var aSelId = new String(selIds).split(",");
			selId1 = aSelId[0];
			selId2 = aSelId[1];
		}
		var aParam = [
	              		{selId: selId1, cbName:"MsSchoolArea", dbItem: "ssxq",isAsync:false},
	              		{selId: selId2, cbName:"MsSchoolArea_LF", dbItem: "ssjzw_m",isAsync:false}
     	 			 ];
     	kutil.loadDropLists3(aParam);
	}	
	
	/**
	 * 初始化校区-楼房-教室下拉列表
	 * @param selIds 下拉列表项id组合, 以逗号,分隔, 如: xq,lf,jslx,js 
	 * 
	 */
	jw.loading_SchoolArea_LF_JS = function(selIds) {
		var selId1 = "xq";
		var selId2 = "lf";
		var selId3 = "js";
		if ( !(typeof selIds == "undefined" || kutil.isNull(selIds)) ) {
			var aSelId = new String(selIds).split(",");
			selId1 = aSelId[0];
			selId2 = aSelId[1];
			selId3 = aSelId[2];
		}
		var param="";
		if(typeof j$("#jslx").val()=="undefined" ||kutil.isNull(j$("#jslx").val())) param="";
		else param="jslx_m=" + j$("#jslx").val();
		var aParam = [
	              		{selId: selId1, cbName:"MsSchoolArea", dbItem: "ssxq" },
	              		{selId: selId2, cbName:"MsSchoolArea_LF", dbItem: "ssjzw_m" },
	              		{selId: selId3, cbName:"MsSchoolArea_LF_JS", paramValue:param, dbItem: "fjbh" }
     	 			 ];
     	kutil.loadDropLists3(aParam);
	}	
	
	/**
	 * 部门－专业-班级下拉列表
	 * DepartmentSpecClassDAO 未考虑权限
	 * @deprecated
	 */
	function loadList_department_zy_bj(){
		var sels=new Array(2);
		sels[0]='yxb';
		sels[1]='zy| ';
		sels[2]='bj| ';
		var ck_department_zy_bj=new CKDList();
	    ck_department_zy_bj.IKInitDropList(sels,'department_zy_bj_xsxj');
	}	
	
	/**
	 * 初始化院(系)/部-专业下拉列表(带权限控制)
	 * @param selIds 下拉列表项id组合, 以逗号,分隔, 如: yxb,zy
	 * @param setNull 专业选择可否为空，缺省为true 
	  * @param setRight 控制权限，缺省为true，控制；false 不控制 
	 */
	jw.loading_Dept_Spe = function(selIds,setNull,setRight) {
		var selId1 = "yxb";
		var selId2 = "zy";
		var selId3 = "nj";
		var selId4 = "chkNj";
		if ( !(typeof selIds == "undefined" || kutil.isNull(selIds)) ) {
			var aSelId = new String(selIds).split(",");
			selId1 = aSelId[0];
			selId2 = aSelId[1];
			if(aSelId.size()>2) selId3=aSelId[2];
			if(aSelId.size()>3) selId4=aSelId[3];
		}
		if ( typeof setNull == "undefined" || kutil.isNull(setNull) ) {
			setNull = true;
		}	
		if ( typeof setRight == "undefined" || kutil.isNull(setRight) ) {
			setRight = true;
		}
		var nj="%";
		if(!(typeof j$("#"+selId4).attr("checked") == "undefined")){
			if (j$("#"+selId4).attr("checked")){
				nj=j$("#"+selId3).val();
			}
		}else{
			if(!(typeof j$("#"+selId3).val() == "undefined" )) nj=j$("#"+selId3).val();
		}		
		var isYXB="1";
		if (!setRight) isYXB="0";
		var aParam = 
	    	[
		     	{selId:selId1, cbName:"MsYXB", isYXB:isYXB, paramValue:"nj=" + nj, dbItem:"dwh" },
		     	{selId:selId2, cbName:"MsYXB_Specialty", dbItem:"zydm", isZY:isYXB, selNull:setNull }
			]					
     	kutil.loadDropLists3(aParam);
	}	
	
	/**
	 * 初始化院(系)/部-专业下拉列表(带权限控制)
	 * @param selIds 下拉列表项id组合, 以逗号,分隔, 如: yxb,zy
	 * @param setNull 专业选择可否为空，缺省为true 
	  * @param setRight 控制权限，缺省为true，控制；false 不控制 
	 */
	jw.loading_Dept_Pycc_Spe = function(selIds,setNull,setRight) {
		var selId1 = "yxb";
		var selId2 = "zy";
		var selId3 = "nj";
		var selId4 = "chkNj";
		var selId5 = "pycc";
		if ( !(typeof selIds == "undefined" || kutil.isNull(selIds)) ) {
			var aSelId = new String(selIds).split(",");
			selId1 = aSelId[0];
			selId2 = aSelId[1];
			if(aSelId.size()>2) selId3=aSelId[2];
			if(aSelId.size()>3) selId4=aSelId[3];
			if(aSelId.size()>4) selId5=aSelId[4];
		}
		if ( typeof setNull == "undefined" || kutil.isNull(setNull) ) {
			setNull = true;
		}	
		if ( typeof setRight == "undefined" || kutil.isNull(setRight) ) {
			setRight = true;
		}
		var nj="%";
		if(!(typeof j$("#"+selId4).attr("checked") == "undefined")){
			if (j$("#"+selId4).attr("checked")){
				nj=j$("#"+selId3).val();
			}
		}else{
			if(!(typeof j$("#"+selId3).val() == "undefined" )) nj=j$("#"+selId3).val();
		}		
		var isYXB="1";
		if (!setRight) isYXB="0";
		var pycc = "%";
		pycc=(j$("#"+selId5).val()==""||j$("#"+selId5).val()==undefined||j$("#"+selId5).val()=="null"||j$("#"+selId5).val()==null)?"%":j$("#"+selId5).val();		
		var aParam = 
	    	[
		     	{selId:selId1, cbName:"MsYXB", isYXB:isYXB, paramValue:"nj="+nj+"&pycc="+pycc, dbItem:"dwh" },
		     	{selId:selId2, cbName:"MsYXB_Pycc_Specialty", dbItem:"zydm", selNull:setNull }
			]					
     	kutil.loadDropLists3(aParam);
	}	
	
	/**
	 * 初始化院(系)部/ 原专业/ 新专业下拉列表(用于处理专业分流,待改进)
	 */
	jw.loading_xj_diffluence_depart = function(){
 		var sels=Array();
		sels[0]="yxb|";
		sels[1]="yzy|";
		sels[2]="xzy|";
		sels[3]="xbj|";
		new CKDList().IKInitDropList(sels,"xj_diffluence_depart");
	}
	//南京师范大学专用   专业分流
	jw.loading_xj_diffluence_depart_nnu = function(){
 		var sels=new Array(3);
		sels[0]="yxb|";
		sels[1]="yzy| ";
		sels[2]="ybj| ";
		sels[3]="xzy| ";
		new CKDList().IKInitDropList(sels,"xj_diffluence_depart_nnu");
	}
	/**
	 * 初始化部门/科室、教研室
	 * @param SetRight 控制权限，true 控制(默认)，false 不控制
	 */			
	jw.loading_Dept_JYS = function(selIds,SetRight) {
		var selId1 = "selBM";
		var selId2 = "selJYS";
		var right="1";
		if ( !(typeof selIds == "undefined" || kutil.isNull(selIds)) ) {
			var aSelId = new String(selIds).split(",");
			selId1 = aSelId[0];
			selId2 = aSelId[1];
		}
		if ( !(typeof SetRight == "undefined" || kutil.isNull(SetRight)) && SetRight==false ) {
			right="0";
		}
		var aParam = [
	              		{selId: selId1, cbName:"MsDepartment", dbItem: "param",isYXB:right },
	              		{selId: selId2, cbName:"MsDepartmentYXB_CS_KS"}
     	 			 ];			
     	kutil.loadDropLists3(aParam);
	}	
	/**
	* 设置用户学年学期的回调方法
	*/
	function setYearTermInfo(response, xn_id, xn1_id, xq_id, xqmc_id, callback){
		var data = JSON.parse(response); // 响应消息转化为JSON, 由json2.js提供此方法
		var xn = data.xn ;
		var xq = data.xqM ;
		var xqmc = data.xqName ;
		// 设定学年
		$("#" + xn_id).val(xn);
		$("#" + xn1_id).val(parseInt(xn)+1);
		// 设定学期
		$("#" + xq_id).val(xq);
		$("#" + xqmc_id).val(xqmc);
		// 执行初始回调
		if (callback) {
			callback();
		}		
	}
	
	/**
	* 设置学生学籍学年学期的回调方法
	* data : xq=1, xn=2008, xqmc=春季学期, startVersion=2002
	*/
	function setYearTerm4Xsxj(data, xn_id, xn1_id, xq_id, xqmc_id){
		var json=new Object();
		var options=data.split(", ");
		for(var i=0;i<options.length;i++){
			var arr=options[i].split("=");
			json[Trim(arr[0])]=Trim(arr[1]);
		};
		var xn = Trim(json["xn"]);
		var xq = Trim(json["xq"]);
		var xqmc = Trim(json["xqmc"]);
		// 设定学年
		$("#" + xn_id).val(xn);
		$("#" + xn1_id).val(parseInt(xn)+1);
		// 设定学期
		$("#" + xq_id).val(xq);
		$("#" + xqmc_id).val(xqmc);
	}

	/**
	* 设置专业分流学年学期的回调方法
	* data : nj=2008, xq=1, xn=2008, xqmc=春季学期, startVersion=2002
	*/
	function setYearTerm4Zyfl(data, nj_id, xn_id, xn1_id, xq_id, xqmc_id, callback){
		var json=new Object();
		var options=data.split(", ");
		for(var i=0;i<options.length;i++){
			var arr=options[i].split("=");
			json[Trim(arr[0])]=Trim(arr[1]);
		};
		var nj = Trim(json["nj"]);
		var xn = Trim(json["xn"]);
		var xq = Trim(json["xq"]);
		var xqmc = Trim(json["xqmc"]);
		// 设定年级
		$("#" + nj_id).val(nj);
		// 设定学年
		$("#" + xn_id).val(xn);
		$("#" + xn1_id).val(parseInt(xn)+1);
		// 设定学期
		$("#" + xq_id).val(xq);
		$("#" + xqmc_id).val(xqmc);
		// 执行初始回调
		if (callback) {
			callback();
		}
	}
	
	/**
	* 设置教学计划/制定开课计划学年学期的回调方法
	* data : json
	*/
	function setYearTerm4Jxjh(response, xn_id, xn1_id, xq_id, xqmc_id){
		var data = JSON.parse(response); // 响应消息转化为JSON, 由json2.js提供此方法
		var xn = data.xn ;
		var xq = data.xq ;
		var xqmc = data.xqmc ;
		// 设定学年
		$("#" + xn_id).val(xn);
		$("#" + xn1_id).val(parseInt(xn)+1);
		// 设定学期
		$("#" + xq_id).val(xq);
		$("#" + xqmc_id).val(xqmc);
	}
	
	/**
	* 设置用户学年学期的回调方法
	*/
	function initYearTerm(response, xn_id, xn1_id, xq_id, divId, callback){
		//alert("initYearTerm()::response = " + response);
		var data = JSON.parse(response); // 响应消息转化为JSON, 由json2.js提供此方法
		var xn = data.xn ;
		var xq = data.xqM ;
		// 初始化学年标签
		var textgroupware = new TextGroupWare(divId , '50' , xn_id , xn , divId);
		// 设定学期
		var oParam = {selId:xq_id, cbName:"MsCodeset", paramValue:"DM-XQ", initValue:xq, isAsync:false, selNull:false};
		kutil.loadDropList4Single(oParam);
		// 设定学年初值
		$("#" + xn_id).val(xn);
		$("#" + xn1_id).val(parseInt(xn)+1);
		// 学年添加事件
		textgroupware.ONCLICK = function () { 
			$id(xn1_id).val(parseInt($id(xn_id).val())+1);
			// 如果传入了回调函数,则执行回调函数
			//alert("textgroupware.callback = " + callback);
			if (callback) {
				callback();
			}
		};
		// 执行初始回调
		if (callback) {
			callback();
		}
	}	
	
	/**
	* 设置学生学籍学年学期的回调方法
	* data : xq=1, xn=2008, xqmc=春季学期, startVersion=2002
	*/
	function initYearTerm4Xsxj(data, xn_id, xn1_id, xq_id, divId){
		//alert(data + "/" + xn_id + "/" + xn1_id + "/"  + xq_id);
		var json=new Object();
		var options=data.split(", ");
		for(var i=0;i<options.length;i++){
			var arr=options[i].split("=");
			json[Trim(arr[0])]=Trim(arr[1]);
		};
		var xn = Trim(json["xn"]);
		var xq = Trim(json["xq"]);
		
		// 初始化学年标签
		//var textgroupware = new TextGroupWare('textgroupware' , '50' , 'xn' , '2005' , 'textgroupware');
		//textgroupware.ONCLICK = function () {$("xn1").value=parseInt($("xn").value)+1;};
		var textgroupware = new TextGroupWare(divId , '50' , xn_id , xn , divId);
		textgroupware.ONCLICK = function () { $("#" + xn1_id).val(parseInt($("#" + xn_id).val())+1); };
		// 设定学年初值
		$("#" + xn_id).val(xn);
		$("#" + xn1_id).val(parseInt(xn)+1);
		// 设定学期
		var aParam = [{selId:xq_id, cbName:"MsCodeset", paramValue:"DM-XQ", initValue:xq, isAsync:false}];
		kutil.loadDropLists3(aParam);
	}
	
	/**
	* 设置专业分流学年学期的回调方法
	* data : nj=2011, xq=1, xn=2008, xqmc=春季学期, startVersion=2002
	*/
	function initYearTerm4Zyfl(data, xn_id, xn1_id, xq_id, nj_id, divId,callback){
		var json=new Object();
		var options=data.split(", ");
		for(var i=0;i<options.length;i++){
			var arr=options[i].split("=");
			json[Trim(arr[0])]=Trim(arr[1]);
		};
		var startVersion=json["startVersion"];
		//var nj=Trim(json["nj"]);
		var xn=(json["xn"]==undefined||json["xn"]=="")?startVersion:json["xn"];
 		var xq=(json["xq"]==undefined||json["xq"]=="")?"0":json["xq"];
		// 初始化学年标签
		var textgroupware = new TextGroupWare(divId , '50' , xn_id , xn , divId);
		textgroupware.ONCLICK = function () { 
			//$("#" + xn1_id).val(parseInt($("#" + xn_id).val())+1); 
			$id(xn1_id).val(parseInt($id(xn_id).val())+1); 
		};
		// 设定学年初值
		$("#" + xn_id).val(xn);
		$("#" + xn1_id).val(parseInt(xn)+1);
		// 设定年级初值
 		//$("#" + nj_id).val(nj); 
		// 设定学期
		var aParam = [{selId:xq_id, cbName:"MsCodeset", paramValue:"DM-XQ", initValue:xq, isAsync:false}];
		kutil.loadDropLists3(aParam);
		if(callback)	callback();
	}	
		
	jw.changeXnxq = function(obj, xnid, xqid, callback4Xnxq) {
			var value = j$(obj).val();  // e.g: 2012-2-1
			var name = j$(obj).find("option:selected").text();
			var aXnxq = new String(value).split("-");
			if (typeof xnid != "undefined" && !kutil.isNull(xnid)) {
				j$("#"+xnid).val(aXnxq[0]);
			}
			if (typeof xqid != "undefined" && !kutil.isNull(xqid)) {
				j$("#" +xqid).val(aXnxq[1]);
			}
			if (callback4Xnxq) {
				callback4Xnxq();
			} else {
				//alert("no callback");
			}
	}
	/**
	* 设置教学计划/设置开课计划学年学期的回调方法
	* data : nj=2011, xq=1, xn=2008, xqmc=春季学期, startVersion=2002
	*/
	function initYearTerm4Jxjh(response, xn_id, xn1_id, xq_id, divId){
		var data = JSON.parse(response); // 响应消息转化为JSON, 由json2.js提供此方法
		var xn = data.xn ;
		var xq = data.xq ;
		// 初始化学年标签
		var textgroupware = new TextGroupWare(divId , '50' , xn_id , xn , divId);
		textgroupware.ONCLICK = function () { 
			$id(xn1_id).val(parseInt($id(xn_id).val())+1); 
		};
		// 设定学年初值
		$("#" + xn_id).val(xn);
		$("#" + xn1_id).val(parseInt(xn)+1);
		// 设定学期
		var oParam = {selId:xq_id, cbName:"MsCodeset", paramValue:"DM-XQ", initValue:xq, isAsync:false, selNull:false};
		kutil.loadDropList4Single(oParam);				
	}	
	
	
	/**
	 * 初始化并设置用户学年学期考试轮次：(学期为可下拉选择列表)
	 * 以同步方式设置, 以方便学年、学期、考试轮次参数值供后续方法读取使用
	 * @param divId 包含学年的DIV标识,缺省为: textgroupware
	 * @param inputIds 学年学期考试轮次的ID标识，缺省为: xn|xn1|xq|xxlc|ksxz|kslcmc
	 */  
	jw.initYearTermEaxm = function(yearTermEaxms){
		var divId = yearTermEaxms["divId"];
		var inputIds = yearTermEaxms["inputIds"];
		var readonly = yearTermEaxms["readonly"];
		var callback = yearTermEaxms["callback"];
		var disable =  yearTermEaxms["xnxqDisable"];
		if ((typeof disable == "undefined") || kutil.isNull(disable)) {
			disable=false;
		}
		// 参数初始化
		var xn_id = "xn";
		var xn1_id = "xn1";
		var xq_id = "xq";
		var xxlc_id = "xxlc";
		var ksxz_id = "ksxz";
		var kslcmc = "";
		if ((typeof divId == "undefined") || kutil.isNull(divId)) {
			//divId = "textgroupware";
			divId = "";
		}
		if ( !kutil.isNull(inputIds) ){
			var aInputIds = new String(inputIds).split("|");
			xn_id  = aInputIds[0];
			xn1_id = aInputIds[1];
			xq_id  = aInputIds[2];
			xxlc_id  = aInputIds[3];
			ksxz_id  = aInputIds[4];
			if(aInputIds.lenth>5){kslcmc=aInputIds[5];}
		}
		// 依据用户学年学期值设值
		var url = _webRootPath + "jw/common/showYearTermExam.action?time="+new Date().getTime() ;
		kutil.doAjax(url, null, function(data){ // 此处回调
									initYearTermEaxm(data, xn_id, xn1_id, xq_id, divId,xxlc_id,ksxz_id,kslcmc, callback,disable);
								 }, 
					 false);
	}	
	/**
	* 设置用户学年学期的回调方法
	*/
	function initYearTermEaxm(response, xn_id, xn1_id, xq_id, divId,xxlc_id,ksxz_id,kslcmc, callback,xnxqDisable){
		//alert("initYearTerm()::response = " + response);
		var data = JSON.parse(response); // 响应消息转化为JSON, 由json2.js提供此方法
		var xn = data.xn ;
		var xq = data.xq ;
		var xxlc=data.kslcdm;
		var ksxz=data.ksxz;
        var istop="1";
        try{
            istop=data.istop;
        }catch(e){}
		// 初始化学年标签
		if(divId!=""){
			if(divId=="kslc"){
				$("#" + xq_id).val(xq);
				//设置考试轮次
				var oParam = {selId:xxlc_id, cbName:"MsKSSW_KSLC",paramValue:"xn=" +xn+"&xq_m="+xq+"&ksxz_m=%", initValue:xxlc, isAsync:false};
				kutil.loadDropList4Single(oParam);
			}else if(divId=="xxlc"){
				$("#" + xq_id).val(xq);
				//设置考试轮次
				var oParam = {selId:xxlc_id, cbName:"MsKSSW_KSLC",paramValue:"xn=" +xn+"&xq_m="+xq+"&ksxz_m=%", initValue:xxlc, isAsync:false,selNull:false};
				kutil.loadDropList4Single(oParam);
			}else{
				var textgroupware = new TextGroupWare(divId , '50' , xn_id , xn , divId);
				if(!xnxqDisable){
					//textgroupware.disable();
					textgroupware.setValuePer(0);
					$("#" + xn_id).attr("disabled","disabled");
					$("#" + xq_id).attr("disabled","disabled");
				}
                $("#" + xn1_id).val(parseInt(xn)+1);
				// 设定学期
				var oParam = {selId:xq_id, cbName:"MsCodeset", paramValue:"DM-XQ", initValue:xq, isAsync:false, selNull:false};
				kutil.loadDropList4Single(oParam);
				//设置考试轮次
				var oParam = {selId:xxlc_id, cbName:"MsKSSW_KSLC",paramValue:"xn=" +xn+"&xq_m="+xq+"&ksxz_m=%", initValue:xxlc, isAsync:false};
				kutil.loadDropList4Single(oParam);
				
				textgroupware.ONCLICK = function () { 
					$id(xn1_id).val(parseInt($id(xn_id).val())+1);
					if(xnxqDisable){
                        chklc();
					}
					// 如果传入了回调函数,则执行回调函数
					//alert("textgroupware.callback = " + callback);
					if (callback) {
						callback();
					}
				}
			}
		}else{
			$("#" + xq_id).val(xq);
			$("#" + xxlc_id).val(xxlc);
		}
        if(istop=="0"){
            try{
                $id("chk_xc").attr("checked",true);
            }catch(e){}
        }else{
            try{
                $id("chk_xc").attr("checked",false);
            }catch(e){}
        }
		// 设定学年初值
		$("#" + xn_id).val(xn);
		$("#" + ksxz_id).val(ksxz);
		if(kslcmc!="")$("#" + kslcmc).val(data.kslcmc);
		// 执行初始回调
		if (callback) {
			callback();
		}
	}	
	
	/**
	 * 设置学年学期的回调方法, 对应Ajax.doPost的调用
	 * @deprecated
	 */
	function doResponse(){
		var json=new Object();
		var options=this.responseText.split(", ");
		for(var i=0;i<options.length;i++){
			var arr=options[i].split("=");
			json[Trim(arr[0])]=Trim(arr[1]);
		};
		// 设定学年
		$("xn").value=Trim(json["xn"]);
		$("xn1").value=parseInt($("xn").value)+1;
		// 设定学期
		if(json["xq"]==undefined||Trim(json["xq"])==""){
			return;
		}else{
			$("xq").value=Trim(json["xq"]);
			$("_xq").value=Trim(json["xqmc"]);
		}
	}	
	/**
	*资格考试类别加载考试等级和考试时间
	*资格考试加载考试时间
	*/
	jw.loadList_lb_data = function(selIds,SetRight){ 
		var selId1 = "lb";
		var selId2 = "dj";
		var selId3 = "ksnf";
		var selId4 = "ksyf";
		var selId5 = "chkNj";
		var right="1";
		if ( !(typeof selIds == "undefined" || kutil.isNull(selIds)) ) {
			var aSelId = new String(selIds).split(",");
			selId1 = aSelId[0];
			selId2 = aSelId[1];
			selId3 = aSelId[2];
			if(aSelId.size()>3) {selId4=aSelId[3];}
			if(aSelId.size()>4) {selId5=aSelId[4];}
		}
		if ( !(typeof SetRight == "undefined" || kutil.isNull(SetRight)) && SetRight==false ) {
			right="0";
		}
		var aParam = [
	              		{selId: selId1, cbName:"loadList_lb", dbItem: "lb" }
     	 			 ];
		kutil.loadDropLists3(aParam);//加载selId1下拉框
		
		//给selId1绑定事件,给selId2,selId3添加数据
		jQuery("#" + selId1).unbind("change"); // 解除原有的绑定事件,如果有的话
		jQuery("#" + selId1).change(function(){
			param="lbdm="+jQuery("#"+selId1).val()+"&djdm="+jQuery("#"+selId2).val();
			Ajax.doPost("../Zgkslb_DataAction.do?flag=dj_data",param,function(){
				var arr=eval(this.responseText);
				document.getElementById(selId2).length=0;
				document.getElementById(selId2).options.add(new Option("",""));
				for(var i=0;i<arr.length;i++)
				{
					var obj=arr[i];
					document.getElementById(selId2).options.add(new Option(obj.djmc,obj.djdm));
					obj=null;
				}
			});
			Ajax.doPost("../Zgkslb_DataAction.do?flag=nf_data",param,function(){
				var arr=eval(this.responseText);
				document.getElementById(selId3).length=0;
				document.getElementById(selId3).options.add(new Option("",""));
				for(var i=0;i<arr.length;i++)
				{
					var obj=arr[i];
					document.getElementById(selId3).options.add(new Option(obj.name,obj.value));
					obj=null;
				}
			});
		});
		//给selId2绑定事件,给selId3添加数据
		jQuery("#" + selId2).unbind("change"); // 解除原有的绑定事件,如果有的话
		jQuery("#" + selId2).change(function(){
			param="lbdm="+jQuery("#"+selId1).val()+"&djdm="+jQuery("#"+selId2).val();
			Ajax.doPost("../Zgkslb_DataAction.do?flag=nf_data",param,function(){
				var arr=eval(this.responseText);
				document.getElementById(selId3).length=0;
				document.getElementById(selId3).options.add(new Option("",""));
				for(var i=0;i<arr.length;i++)
				{
					var obj=arr[i];
					document.getElementById(selId3).options.add(new Option(obj.name,obj.value));
					obj=null;
				}
			});
		});
		//给selId3绑定事件,给selId4添加数据
		jQuery("#" + selId3).unbind("change"); // 解除原有的绑定事件,如果有的话
		jQuery("#" + selId3).change(function(){
			param="lbdm="+jQuery("#"+selId1).val()+"&djdm="+jQuery("#"+selId2).val();
			Ajax.doPost("../Zgkslb_DataAction.do?flag=yf_data","ksnf="+jQuery("#"+selId3).val(),function(){
				var arr=eval(this.responseText);
				document.getElementById(selId4).length=0;
				document.getElementById(selId4).options.add(new Option("",""));
				for(var i=0;i<arr.length;i++)
				{
					var obj=arr[i];
					document.getElementById(selId4).options.add(new Option(obj.ksyf,obj.ksyf));
					obj=null;
				}
			});
		});
	}
	/**
	*社会实践  加载轮次  实现当前轮次默认被选中
	* @param selIds 下拉列表项id组合, 以逗号,分隔, 如: yxb,zy
	*/
	jw.loadList_lc = function(selIds,fmkdm,loadHd){ 
		var selId1 = "lc_m";
		var selId2 = "hd_m";
		var selId3 = "";
		var selId4 = "";
		var selId5 = "";
		var right="1";
		if ( !(typeof selIds == "undefined" || kutil.isNull(selIds)) ) {
			var aSelId = new String(selIds).split(",");
			selId1 = aSelId[0];
			selId2 = aSelId[1];
			selId3 = aSelId[2];
			if(aSelId.size()>3) {selId4=aSelId[3];}
			if(aSelId.size()>4) {selId5=aSelId[4];}
		}
		Ajax.doPost("../../checkapplyprojectAction1.do?flag=forlc",fmkdm,function(){
				var xxlc="";
				try{xxlc =eval(this.responseText)[0].dm;}catch(e){}//现行轮次代码
				kutil.loadDropList4Single({selId:selId1, cbName:"Shbmxs_LC", paramValue:fmkdm,isAsync:false,selNull:false,initValue:xxlc});
				if (loadHd!=undefined && loadHd!=null)
					loadHd(xxlc);
			});
	}
	
	/**
	*满意度调查根据轮次题型加载问题和答案
	*/
	jw.loadList_wt_da_data = function(selIds,SetRight){ 
		var selId1 = "dclc";
		var selId2 = "tmlx";
		var selId3 = "sel_wt";
		var selId4 = "sel_da";
		var right="1";
		if ( !(typeof selIds == "undefined" || kutil.isNull(selIds)) ) {
			var aSelId = new String(selIds).split(",");
			selId1 = aSelId[0];
			selId2 = aSelId[1];
			selId3 = aSelId[2];
			if(aSelId.size()>3) {selId4=aSelId[3];}
			if(aSelId.size()>4) {selId5=aSelId[4];}
		}
		if ( !(typeof SetRight == "undefined" || kutil.isNull(SetRight)) && SetRight==false ) {
			right="0";
		}
		//给selId2绑定事件,给selId3添加数据
		jQuery("#" + selId2).unbind("change"); // 解除原有的绑定事件,如果有的话
		jQuery("#" + selId2).change(function(){
			param="lcdm="+jQuery("#"+selId1).val()+"&tmlx="+jQuery("#"+selId2).val();
			Ajax.doPost("../Zgkslb_DataAction.do?flag=wt_data",param,function(){
				var arr=eval(this.responseText);
				document.getElementById(selId3).length=0;
				document.getElementById(selId3).options.add(new Option("",""));
				for(var i=0;i<arr.length;i++)
				{
					var obj=arr[i];
					document.getElementById(selId3).options.add(new Option(obj.name,obj.value));
					obj=null;
				}
			});
		});
		//给selId3绑定事件,给selId4添加数据
		jQuery("#" + selId3).unbind("change"); // 解除原有的绑定事件,如果有的话
		jQuery("#" + selId3).change(function(){
			param="lcdm="+jQuery("#"+selId1).val()+"&tmlx="+jQuery("#"+selId2).val()+"&tm="+jQuery("#"+selId3).val();
			Ajax.doPost("../Zgkslb_DataAction.do?flag=da_data",param,function(){
				var arr=eval(this.responseText);
				document.getElementById(selId4).length=0;
				document.getElementById(selId4).options.add(new Option("",""));
				for(var i=0;i<arr.length;i++)
				{
					var obj=arr[i];
					document.getElementById(selId4).options.add(new Option(obj.name,obj.value));
					obj=null;
				}
			});
		});
	}
	
	/**
	 * 按单个学生查询控制
	
	jw.OneStudent = function(args){
		switch(args.id){
			case "cbx":	{
				$("#xh").val();
				$("#xm").val();
				if(args.checked){
					$("#rxm").attr("disabled",false);
					$("#rxh").attr("disabled",false);
				  　    $("#xh").removeAttr("readonly");
				  　    $("#xm").removeAttr("readonly");
					$("#xh")[0].className="input";
					$("#xm")[0].className="input";
					$("#xh").focus();
				}else{
					$("#rxm").attr("disabled",true);
					$("#rxh").attr("disabled",true);
				  　    $("#xh").attr("readonly","readonly");
					$("#xm").attr("readonly","readonly");
					$("#xh")[0].className="input readonly";
					$("#xm")[0].className="input readonly";								
				}
				break;
			}
			
			case "rxh":{
				var xh=$("#xh")[0];
				var xm=$("#xm")[0];
				xh.disabled=false;
				xh.style.display="";
				xm.style.display="none";
				$("#xm").val("");
				$("#xh").focus();
				break;
			}
			case "rxm":{
				var xh=$("#xh")[0];
				var xm=$("#xm")[0];
				xm.disabled=false;
				xm.style.display="";
				xh.style.display="none";
				$("#xh").val("");
				$("#xm").focus();
				break;
			}
		}
	}	
	 */
	return jw ;
	
}(jwutil||{}, jQuery));

/**
 * 刷新验证码
 */
function refreshImg(){
    var url = _webRootPath + "cas/genValidateCode?dateTime="+Math.floor(Math.random()*100+1);
    document.getElementById("randpic").src = url ;
}