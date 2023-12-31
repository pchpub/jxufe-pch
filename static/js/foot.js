var str='';
var strd="</a>";
//str=str+"Copyright &copy; 2000-"+new Date().getFullYear()+" By <a href=http://www.kingosoft.com target=_blank>";
//str=str+"湖南青果软件有限公司</a> 版权所有 All Rights Reserved";
str=str+"KINGOSOFT高校智慧校园&ensp;-&ensp;&copy;"+new Date().getFullYear();
try{
if(schoolcode!="10471"){//河南中医药大学去掉超链接
  str+="<a href=http://www.kingosoft.com target=_blank style='padding-left:8px;padding-right:8px;'>";
  strd="</a>";
}else{
  str+="<label style='padding-left:8px;padding-right:8px;'>";
  strd="</label>";
}
}catch(e){
  str+="<a href=http://www.kingosoft.com target=_blank style='padding-left:8px;padding-right:8px;'>";
  strd="</a>";
}
str=str+"青果软件集团有限公司"+strd+"版权所有";
try{
   if(schoolcode=="12827"){//陕西国防工业职业技术学院
       str+=" <a href='https://beian.miit.gov.cn' target='_blank' style='padding-left:8px;padding-right:8px;'>备案号：陕ICP备06002608号</a>";
   }
   else if(schoolcode=="14753"){//河南城建职业学院
       str+=" <a href='https://beian.miit.gov.cn' target='_blank' style='padding-left:8px;padding-right:8px;'>豫ICP备2021022007号</a>";
   }
}catch(e){
}
document.write(str);
