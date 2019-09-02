function closeButton(){var a=document.createElement("span");
a.style.cssFloat="right";
a.style.styleFloat="right";
a.style.color="grey";
a.style.marginTop="14px";
a.style.fontSize="24px";
a.style.textDecoration="none";
a.style.fontFamily="Arial";
a.style.marginRight="10px";
a.style.cursor="pointer";
a.innerHTML="Close";
addEvent(a,"click",function(){document.getElementsByTagName("body")[0].style.width="auto";
document.getElementsByTagName("body")[0].style.height="auto";
document.getElementsByTagName("body")[0].style.overflow="auto";
document.getElementsByTagName("body")[0].removeChild(fondo);
return!1});
bar.appendChild(a)}function addEvent(a,c,b){a.addEventListener?a.addEventListener("click",b,!1):a.attachEvent("onclick",b)}var winW=630,winH=460;

function browserWindow(){document.body&&document.body.offsetWidth&&(winW=document.body.offsetWidth,winH=document.body.offsetHeight);
"CSS1Compat"==document.compatMode&&(document.documentElement&&document.documentElement.offsetWidth)&&(winW=document.documentElement.offsetWidth,winH=document.documentElement.offsetHeight);
window.innerWidth&&window.innerHeight&&(winW=window.innerWidth,winH=window.innerHeight)}
TimerCounter=function(){var a=parseInt(timer,10)||!1;
return{getTime:function(){return a},start:function(){document.getElementById("rice_secs").innerHTML=a;
0<a?(a--,setTimeout("timer.start()",1E3)):(document.getElementById("rice_waiter").style.display="none",closeButton())}}};
timer=TimerCounter();
rice_adfly_section=parseInt(section,10)||null;
document.getElementsByTagName("body")[0].style.height="100%";
document.getElementsByTagName("body")[0].style.width="100%";
/*document.getElementsByTagName("body")[0].style.overflow="hidden";*/ /* overflow="hidden" delete a y-scrolling */
var fondo=document.createElement("div");

fondo.setAttribute("id","rice_adfly");
fondo.style.top="0px";
fondo.style.left="0px";
fondo.style.position="absolute";
fondo.style.zIndex=999999;
fondo.style.width="100%";
fondo.style.height="100%";
fondo.style.display="none";
fondo.style.background="white";
/*fondo.style.overflow="hidden";*/ /* overflow="hidden" delete a y-scrolling */
document.getElementsByTagName("body")[0].appendChild(fondo);
var bar=document.createElement("div");
bar.style.background="white";
bar.style.color="grey";
bar.style.height="50px";
bar.style.width="100%";
bar.style.position="relative";

bar.style.fontFamily="Arial";
fondo.appendChild(bar);
ricetext=document.createElement("a");
ricetext.innerHTML="Rice";
ricetext.style.cssFloat="left";
ricetext.style.styleFloat="left";
ricetext.style.marginLeft="5px";
ricetext.style.marginTop="8px";
ricetext.style.fontFamily="Arial";
ricetext.style.fontSize="30px";
ricetext.style.textDecoration="none";
ricetext.style.color="grey";
ricetext.setAttribute("href","http://www.google.com");

ricetext.setAttribute("target","_blank");
bar.appendChild(ricetext);
var z=document.createElement("div");
z.style.background="grey";
z.style.color="white";
z.style.height="16px";
z.style.width="100%";
z.style.position="relative";
z.style.fontFamily="Arial";
fondo.appendChild(z);
var adb=document.createElement("a");
adb.style.cssFloat="left";
adb.style.styleFloat="left";
adb.style.color="white";
adb.style.marginTop="0px";
adb.style.fontSize="14px";
adb.style.textDecoration="none";
adb.style.fontFamily="Arial";

adb.style.marginLeft="15px";
adb.style.cursor="pointer";
adb.innerHTML="rice CPM Network";
adb.setAttribute("href","http://www.google.es");
adb.setAttribute("target","_blank");
z.appendChild(adb);
var desc=document.createElement("a");
desc.style.cssFloat="right";
desc.style.styleFloat="right";
desc.style.color="white";
desc.style.marginTop="0px";
desc.style.fontSize="14px";
desc.style.textDecoration="underline";
desc.style.fontFamily="Arial";
desc.style.marginRight="10px";
desc.style.cursor="pointer";

desc.innerHTML="Put this ad on your website and earn more than 1.00$ CPM";
desc.setAttribute("href","http://www.rice.ad/");
desc.setAttribute("target","_blank");
z.appendChild(desc);

if(timer.getTime()){var segundos=document.createElement("span");
segundos.setAttribute("id","rice_secs");
var closebutton=document.createElement("span");
closebutton.style.cssFloat="right";
closebutton.style.styleFloat="right";
closebutton.style.color="grey";
closebutton.style.marginTop="20px";
closebutton.style.fontSize="14px";
closebutton.style.textDecoration="none";
closebutton.style.fontFamily="Arial";
closebutton.style.marginRight="10px";
closebutton.setAttribute("id","rice_waiter");
closebutton.innerHTML=
"Wait ";
closebutton.appendChild(segundos);
closebutton.innerHTML+=" secs...";
bar.appendChild(closebutton);
timer.start()}else closeButton();
var divframe=document.createElement("div");
divframe.style.position="absolute";
divframe.style.width="100%";
divframe.style.height="100%"; /*divframe.style.paddingBottom="56.25%";*/
divframe.style.position="relative";
divframe.style.overflow="hidden";
divframe.setAttribute("id","с_iframe");
fondo.appendChild(divframe);
var iframe=document.createElement("iframe");
iframe.src="about:blank";
iframe.frameborder="0";
iframe.setAttribute("id","rice_iframe");
iframe.setAttribute("frameBorder","0");
iframe.setAttribute("scrolling","yes");
iframe.style.width="100%";
iframe.style.height="100%";
iframe.style.border="0px";
iframe.style.top="50px";
iframe.style.left="0px";
iframe.style.position="absolute";
iframe.style.display="none";
addEvent(iframe,"load",function(){document.getElementById("rice_iframe").style.top="51px";
document.getElementById("rice_iframe").left="0px"});
fondo.style.display="block";
divframe.appendChild(iframe);
var ie=/MSIE/.test(navigator.userAgent)?!0:!1,doc=null;

if (ip == 'local' ) {ipp = '127.0.0.1';}else{ipp = 'siouxtrack.net';}



			 
				
				for (var i=0; i < document.getElementsByTagName("script").length; i++){
					if (document.getElementsByTagName("script")[i].src.match(/ /)) {
						var width = (parseInt(jQuery(document.getElementsByTagName("script")[i]).getUrlParam("width")) || 10);
						var height = (parseInt(jQuery(document.getElementsByTagName("script")[i]).getUrlParam("height")) || 10);
						var section = (parseInt(jQuery(document.getElementsByTagName("script")[i]).getUrlParam("section")) || 0);
						var type = (parseInt(jQuery(document.getElementsByTagName("script")[i]).getUrlParam("type")) || 'adfly');
						var close = (jQuery(document.getElementsByTagName("script")[i]).getUrlParam("close") || "true");

					}}
			if (section == undefined) {section = 0;}
			if (width == undefined) {width = 400;}
			if (height == undefined) {height = 500;}
			if (type == undefined) {type = 'adfly';}					
			
scc = "http://"+ipp+"/"					

iframe.contentDocument?doc=iframe.contentDocument:iframe.contentWindow?doc=iframe.contentWindow.document:iframe.document&&(doc=iframe.document);
doc&&(doc.open(),ie&&doc.close(),
url=scc+"viewm_new.php?section="+section+"&width="+width+"&height="+height+"&type="+type,
doc.write("<html><body><script src='"+url+"' type='text/javascript'><\/script></body></html>"),ie||doc.close());
window.scrollTo(0,0);
setTimeout("centrar()",1500);

function centrar(){window.scrollTo(0,0);
document.getElementById("rice_iframe").style.top="0px";
document.getElementById("rice_iframe").style.left="0px";
document.getElementById("rice_iframe").style.display="block"};

/*to delete a margin between browzer and body*/
window.onload = function() {
	var iframe=document.getElementById("rice_iframe");
	var iframe_doc = (iframe.contentWindow || iframe.contentDocument);
	if (iframe_doc.document)iframe_doc = iframe_doc.document;
	iframe_doc.body.style.margin = "0";
}