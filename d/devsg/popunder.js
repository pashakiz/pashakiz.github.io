// JavaScript Document
 
if (ip == 'local' ) {ipp = '127.0.0.1';}else{ipp = 'ads.cpmforce.com';}

			if (typeof ab_fixeds_loaded == "undefined") {
				ab_fixeds_loaded = true;
				
				for (var i=0; i < document.getElementsByTagName("script").length; i++){
					if (document.getElementsByTagName("script")[i].src.match(/fixed.js/)) {
						var width = (parseInt(jQuery(document.getElementsByTagName("script")[i]).getUrlParam("width")) || 500);
						var height = (parseInt(jQuery(document.getElementsByTagName("script")[i]).getUrlParam("height")) || 600);
						var section = (parseInt(jQuery(document.getElementsByTagName("script")[i]).getUrlParam("section")) || 0);
						var type = (parseInt(jQuery(document.getElementsByTagName("script")[i]).getUrlParam("type")) || 'pop');
						var close = (jQuery(document.getElementsByTagName("script")[i]).getUrlParam("close") || "true");
						
						
					}}}
 
 
if (1) {
//var urlToShow="http://"+ipp+"/script/iframe_pop.html?section="+section+"&width="+width+"&height="+height+"&type="+type+"&ipp="+ipp,popCookieName="rice_popunder";
var urlToShow="http://"+ipp+"/viewm_new.php?section="+section+"&width="+width+"&height="+height+"&type="+type+"&ipp="+ipp,popCookieName="rice_popunder";

"undefined"==typeof popTimes&&(popTimes=99999);

"undefined"==typeof intervalTimes&&(intervalTimes=hour);
var period=3600;
if (intervalTimes="hour") {
	period=3600;
}
if(intervalTimes="day") {
	period=864E5;
}



var expireHours=24,
	alreadyExecuted=!1,
	browserUserAgent=navigator.userAgent,
	time=(new Date).getTime(),
	config="width=1000,toolbar=1,menubar=1,resizable=1,scrollbars=1",
	/*config2="width="+screen.width+",height="+screen.height+",toolbar=1,menubar=1,resizable=1,scrollbars=1";*/
	config2="width="+screen.width+",height="+screen.height+",left=0, top=0, resizable=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, copyhistory=no";

function displayTheWindow() { 
	if(!0!=alreadyExecuted) {
		alreadyExecuted=!0;
		var b=Math.floor(1000001*Math.random()),
		d=Get_Cookie(popCookieName,expireHours),
		a=Number(d[0]),
		d=d[1];

		isNaN(a)&&(a=0);

		if(!(a>=popTimes)) {
			for(var f=!1,e=!1,c=12;20>=c;c++)
				if(-1<browserUserAgent.search("Firefox/"+c))
					{f=!0; break}
				for(c=21;40>=c;c++)
					if(-1<browserUserAgent.search("Chrome/"+c))
						{e=!0;break}
				if(!0==f||!0==e) {
					alert("if(!0==f||!0==e)");
					window.open(urlToShow,popCookieName+a+b,config2).blur();
					/*window.focus();*/
					/*if(b=window.open(urlToShow,popCookieName+a+b,config2).blur()) {
						alert("b=window.open(urlToShow,popCookieName+a+b,config2).blur()");
						(b=window.open("about:blank").blur())?(b.focus(),b.close()):window.showModalDialog("javascript:window.close()",null,"dialogtop:99999999;dialogleft:999999999;dialogWidth:1;dialogHeight:1")
					}*/

				}
				else
					alert("else!");
					-1<browserUserAgent.search("Firefox/3")||-1<browserUserAgent.search("Safari") ?
						(window.open(urlToShow,popCookieName+a+b,config2).blur(),window.focus()) :
							-1<browserUserAgent.search("Firefox") ?
								(b=window.open(urlToShow,popCookieName+a,config2).blur(),b.window.open("about:blank").close()) :
									-1<browserUserAgent.search("Opera") ?
										window.open(urlToShow,popCookieName+a,config).blur() :
											-1<browserUserAgent.search("Chrome") ?
												(window.open(urlToShow,popCookieName+a+b,config2).blur(),window.focus()) :
													-1<browserUserAgent.search("MSIE") ?
														(b=window.open(urlToShow,popCookieName+a,config2).blur(),window.setTimeout(window.focus,750),window.setTimeout(window.focus,850),b&&b.blur()) :
															window.open(urlToShow,popCookieName+a+b,config.blur());
					0<expireHours&&Set_Cookie(popCookieName,++a,d)
		}
	}
}

document.onclick=displayTheWindow;

function Set_Cookie(b,d,a)
	{document.cookie=b+"="+escape(d+"|"+a)+";expires="+a+";path=/"}
function Get_Cookie(b,d) {
	var a=new Date;
	a.setTime(a.getTime());
	var a=(new Date(a.getTime()+36E5*d)).toGMTString(),f=document.cookie.split(";"),e="",c="",g=[0,a];
	for(i=0; i<f.length; i++)
	if(e=f[i].split("="),c=e[0].replace(/^\s+|\s+$/g,""),c==b) {
		b_cookie_found=!0;
		1<e.length&&(g=unescape(e[1]).split("|"),1==g.length&&(g[1]=a));
		break
	}
	return g
};

}