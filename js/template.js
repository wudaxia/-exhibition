/**
 * Created by Administrator on 2017/2/16 0016.
 */
var imgPath="******";
var baseUrl="******";
var basePath="******";//ajax访问路径
var basePath1="";
var imgPath2="******";
var appid="******";
function AjaxSubmit(_type, _data, _url, _method) {//调用ajax
    $.ajax({
        type: _type,
        url: _url,
        data:  _data,
        contenType: "application/json",
        dataType: "json",
        success: function (msg) {
                _method(msg);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            // alert(XMLHttpRequest.responseText);
        }
    });
}//AJAX
function AjaxSubmit2(_type, _url, _method) {//调用ajax
    $.ajax({
        type: _type,
        url: _url,
        contenType: "application/json",
        dataType: "json",
        success: function (msg) {
            _method(msg);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            // alert(XMLHttpRequest.responseText);
        }
    });
}//AJAX
function AjaxSubmit3(_type, _url, _method) {//调用ajax
    $.ajax({
        type: _type,
        url: _url,
        contenType: "application/json",
        dataType: "json",
        success: function (msg) {
            _method(msg);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            // alert(XMLHttpRequest.responseText);
        }
    });
}//AJAX
function phoneMath(phone){//验证手机号码
    if(phone.match(/^(((1[0-9][0-9]{1})|159|153)+\d{8})$/))//判断手机号的格式
    {
        return true;
    }
    else return false;
}//手机号判断
function name(name){
    if(name.match(/^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/))
    {
        return true
    }
    else
    {
        return false;
    }
}//判断姓名
//function wrong(msg){
//    //登录按钮不可点
//    $("html,body").animate({scrollTop:0}, 500);
//    $("input").attr("disabled",true);
//    $("header").animate({opacity:0.5},500);
//    $("section").animate({opacity:0.5},500);
//    $("footer").animate({opacity:0.5},500);
//    var promptDiv=$('<div class="mA wd60 texC av-wrong" style="opacity:1 !important;"><div class="av-wrongT" style="opacity:1 !important;z-index:5000">温馨提示</div><div>'+msg+'</div><div class="av-close">关闭</div></div>');
//    $("body").append(promptDiv);
//    $(".av-close").click(function () {
//        $("header").animate({opacity:1},500);
//        $("section").animate({opacity:1},500);
//        $("footer").animate({opacity:1},500);
//        $(".av-wrong").remove();
//        $("input").removeAttr("disabled");
//    })
//}//提示框提醒
function i_close(){
    window.open("","_self").close()
}//关闭当前页
function i_back(){
    if(history.length==0){
        openmodal("没有上一页");
    }
    else{history.go(-1); console.log(1)}
}//返回上一页
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return r[2];
    return null;
}//获取url参数
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}//判断是否用微信内置浏览器打开
function fixed(){
   $("input").on("click",function (){
       if($(this).attr("type")=='text'||$(this).attr("type")=="tel")
       {
           $('.av-other').addClass("hide");
           $(".m-footer").addClass("hide");
           $(".am-navbar").addClass("hide");
           $(".ac-footer").addClass("hide");
           $(".xiangxiatishi").addClass("hide");
           $(".ad-bm").addClass("hide");
           $(".container").removeAttr("style");
       }
    })
    $("input").on("blur",function(){
        $('.av-other').removeClass("hide");
        $(".m-footer").removeClass("hide");
        $(".am-navbar").removeClass("hide");
        $(".ac-footer").removeClass("hide");
        $(".xiangxiatishi").removeClass("hide");
        $(".ad-bm").removeClass("hide");
        $(".container").removeAttr("style");
    })
    //if($(input).attr("type")=='text'||$(input).attr("type")=="tel")
    //{
    //    $('.av-other').addClass("hide");
    //}
    //        //$('.av-other').css({'position':'static'})
    //if($(input).attr("type")=='text'||$(input).attr("type")=="tel")
    //{//$('.av-other').css({'position':'fixed'})
    //
    //}
}//手机端input的虚拟键盘和position：fixed冲突的解决方法
function fixedTextarea(){
    $("textarea").on("click",function (){
        $('.av-other').addClass("hide");
        $(".am-navbar").addClass("hide");
        $(".m-footer").addClass("hide");
        $(".ac-footer").addClass("hide");
        $(".xiangxiatishi").addClass("hide");
        $(".ad-bm").addClass("hide");
    })
    $("textarea").on("blur",function(){
        $('.av-other').removeClass("hide");
        $(".am-navbar").removeClass("hide");
        $(".m-footer").removeClass("hide");
        $(".ac-footer").removeClass("hide");
        $(".xiangxiatishi").removeClass("hide");
        $(".ad-bm").removeClass("hide");
    })}
function loginUser(){
    openmodal("请重新登录");
    sessionStorage.removeItem("token");
    setTimeout(function(){
        self.location.href="login.html";
    },1500)
}
function inputChecked(input){
    if($(input).attr("checked")==true)
    {
        $(input).attr("checked",false)
    }
    else{
        $(input).attr("checked",true);
    }
}
function img_click(imgClick){

    var imgSrc=$(imgClick).attr("src");
    var bodyHeight=$(document.body).outerHeight(true);
    var imgHeight=document.documentElement.clientHeight;
    var imgWidth=document.documentElement.clientWidth;
    console.log(imgHeight);
    var bigImg=$('<div class="bigImg" style="background-color: #000000"> <div class="page"> ' +
        '<div id="slider"><ul> <li style="display:block"> <div class="pinch-zoom"><img style="display: none"  src="'+imgSrc+'" class="bigImgs"/></div></li> </ul></div></div></div>');
    //$("body").css("background-color","#000000");
    //$("body").css("opacity",0.3);
    $("body").css("height",$(window).height());
    $(".section").addClass("disn");
    $("body").append(bigImg);

    //长按扫二维码
    $('.bigImg').longPress(function(){

    });

    $('div.pinch-zoom').each(function () {
        new RTP.PinchZoom($(this), {});
    });
    var img = new Image();
    img.src =$(".bigImgs").attr("src");
    var ImgWidth = img.width;
    var ImgHeight = img.height;
    console.log(bodyHeight);
    //var minHeight=$("body").scrollTop();
    //console.log(ImgWidth)
    if(imgHeight<bodyHeight)
    {
        $(".bigImg").css("height",bodyHeight+'px');
    }
    else{
        $(".bigImg").css("height",imgHeight+'px');
    }
    $(".bigImg").css("width",imgWidth+'px');
    //console.log($(".bigImg").css("width").slice(0,length-2));
    //console.log(ImgWidth>$(".bigImg").css("width").slice(0,length-2))
    //console.log(ImgHeight>$(".bigImg").css("height").slice(0,length-2))
    //console.log(window.screen.availHeight)
    //$(".bigImg").css("top",minHeight+'px');
    if(ImgHeight>$(".bigImg").css("height").slice(0,length-2))//判断图片高度是否高于手机屏
    {
        $(".bigImgs").css("height",$(".bigImg").css("height"));
    }
    if(ImgWidth>$(".bigImg").css("width").slice(0,length-2))//判断图片宽度是否宽于手机屏
    {
        $(".bigImgs").css("width",$(".bigImg").css("width"));
    }
    //console.log($(".bigImg").height());
    //console.log($(".bigImgs"));
    var pageHeight=($(".bigImg").height()-$(".bigImg").width())/2;
    //console.log($(".bigImg").height()-$(".bigImgs").height());
    //console.log(pageHeight);
    if(pageHeight>0)
    {
        $(".pinch-zoom-container").css("margin-top",(pageHeight)+"px");
    }
    $(".bigImgs").css("width",$(".bigImg").width());
    $(".bigImgs").css("height",$(".bigImgs").width());
    $(".bigImgs").fadeIn(1000);
}//图片点击放大
function img_clickOut(imgClickOut){
    $(imgClickOut).fadeOut(1000);
    setTimeout(function(){
        $(imgClickOut).remove();
        $("html").removeAttr("style");
        $("body").removeAttr("style");
        $("body").css("min-height",$(window).height());
        $(".section").removeClass("disn");
    },1000)
}//图片点击还原
function tdCount(){
    var count=0;
    var length=$(".o-orderBtn").find("td").length;
    $(".o-orderBtn").find("td").each(function(i,td){
        if($(td).hasClass("disIB"))
        {
            count++
        }
    })
    var tdWidth=80/(count);
    $(".o-orderBtn").find("td").css("width",tdWidth+"%")
    console.log(count);
}//计算底部td宽度
function Android(){
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    //var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1)
    {
        return true;
    }
}//判断是否安卓手机
function banner(){
    var timer;
    $(".main_visual").hover(function(){
        $("#btn_prev,#btn_next").fadeIn();
    },function(){
        $("#btn_prev,#btn_next").fadeOut();
    });
    $dragBln = false;
    $(".main_image").touchSlider({
        flexible : true,
        speed : 200,
        btn_prev : $("#btn_prev"),
        btn_next : $("#btn_next"),
        paging : $(".flicking_con a"),
        counter : function (e){
            $(".flicking_con a").removeClass("on").eq(e.current-1).addClass("on");
        }
    });
    $(".main_image").bind("mousedown", function() {
        $dragBln = false;
    });
    $(".main_image").bind("dragstart", function() {
        $dragBln = true;
    });
    $(".main_image a").click(function(){
        if($dragBln) {
            return false;
        }
    });
    timer = setInterval(function(){
        $("#btn_next").click();
    }, 2000);
    $(".main_visual").hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(function(){
            $("#btn_next").click();
        },2000);
    });
    $(".main_image").bind("touchstart",function(){
        clearInterval(timer);
    }).bind("touchend", function(){
        timer = setInterval(function(){
            $("#btn_next").click();
        }, 2000);
    });
}//轮播图
function footerNav(){
    $(".i-navTdP").click(function(){
        $(".i-navLiP").toggle();
    });
}//底部导航条
function footerNavLi(data){
    var orderType=$(data).attr("data-id");
    sessionStorage.setItem("orderType",JSON.stringify(orderType));
    self.location.href="orderList.html"
}

function noClick(res){
    $(res).attr("disabled",true);
    setTimeout(function () {   $(res).attr("disabled",false);},1500);
}
function changeTime(timeStr) {
    var date = new Date(timeStr*1000);
    var dateYear = date.getFullYear();
    var dateMonth = date.getMonth() + 1;
    dateMonth=dateMonth>9?dateMonth:"0"+dateMonth;
    var dateDay = date.getDate();
    dateDay=dateDay>9?dateDay:"0"+dateDay;
    var hour = date.getHours();
    hour=hour>9?hour:"0"+hour;
    var min = date.getMinutes();
    min=min>9?min:"0"+min;
    var dateStr = dateYear + "." + dateMonth + "." + dateDay+"&nbsp;&nbsp;"+hour+":"+min;
    return dateStr;
}//转换时间

function changeTime2(timeStr) {
    var date = new Date(timeStr);
    var dateYear = date.getFullYear();
    var dateMonth = date.getMonth() + 1;
    var dateDay = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var dateStr = dateYear + "年" + dateMonth + "月" + dateDay+"日";
    return dateStr;
}//转换时间


//$(function(){
//    $(".footer").click(function(){
//        sessionStorage.removeItem("partyPartUser");
//        sessionStorage.removeItem("partyUserInfo");
//        sessionStorage.removeItem("partyWxInfo");
//        sessionStorage.removeItem("activeDetails");
//    })
//})

$(function () {
    $("body").css("min-height",$(window).height());
    var ydCss=$("<style>" +
        "#tlbstoolbar{display:none!important}</style>");
    $("head").append(ydCss);
    var wxUrl=GetQueryString("wx");
    if(wxUrl!=null&&wxUrl!=""&&wxUrl!=undefined)
    {

        if(wxUrl=="1")
        {
            sessionStorage.setItem("wxToken","1");
            var redirect_url="";
            var linkActId="";
            var linkPartId="";
            var linkTicketId="";
            var  redirect_urlLength=window.location.href.indexOf("?");
            redirect_url+=window.location.href.slice(0,redirect_urlLength);
            linkActId=GetQueryString("actId");
            linkPartId=GetQueryString("partId");
            linkTicketId=GetQueryString("ticketId");
            var actId;
            if(linkActId!=null&&linkActId!=undefined&&linkActId!="")
            {
                 actId=linkActId;
            }
            else{
                 actId="";
            }
            var partId;
            if(linkPartId!=null&&linkPartId!=undefined&&linkPartId!="")
            {
                 partId=linkPartId;
            }
            else{
                 partId="";
            }
            var ticketId;
            if(linkTicketId!=null&&linkTicketId!=undefined&&linkTicketId!="")
            {
                 ticketId=linkTicketId;
            }
            else{
                 ticketId="";
            }
            redirect_url=redirect_url+"?actId="+actId+"&partId="+partId+"&ticketId="+ticketId;
            sessionStorage.setItem("linkUrl",JSON.stringify(redirect_url));
            sessionStorage.setItem("linkUrls",JSON.stringify("1"));
            self.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri=http://qt.zgzbh.com/hzzx/html/wxUrl.html&response_type=code&scope=snsapi_login&state=1&connect_redirect=1#wechat_redirect";
            //self.location.href="wxUrl.html";
        }
        else{
            wxLogins();
        }
    }
    else{
        wxLogins();
    }
})



$.fn.longPress = function(fn) {
    var timeout = undefined;
    var $this = this;
    for(var i = 0;i<$this.length;i++){
        $this[i].addEventListener('touchstart', function(event) {
            timeout = setTimeout(fn, 300);  //长按时间超过800ms，则执行传入的方法
        }, false);
        $this[i].addEventListener('touchend', function(event) {
            clearTimeout(timeout);  //长按时间少于800ms，不会执行传入的方法
            var imgUrl=$(".bigImg")[0];
            img_clickOut(imgUrl);
        }, false);
    }
};


function wxBack(){
   var  wxRturn=JSON.parse(sessionStorage.getItem("wxRturn"));
    if(wxRturn=="0")
    {
    }
    else{
        var redirect_url2="";
        redirect_url2+=window.location.href;
        sessionStorage.removeItem("wxReturn");
        sessionStorage.setItem("linkUrl2",JSON.stringify(redirect_url2));
        
    }
    setTimeout(function () {
         sessionStorage.removeItem("wxReturn");
        self.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri=http://qt.zgzbh.com/hzzx/html/wxUrl.html&response_type=code&scope=snsapi_login&state=1&connect_redirect=1#wechat_redirect";
    },1000);
    //self.location.href="wxUrl.html";
}

//禁止浏览器拖动
function stopDefault(){
    window.ontouchmove = function(e){
        e.preventDefault && e.preventDefault();
        e.returnValue = false;
        e.stopPropagation && e.stopPropagation();
        return false;
    }
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
}
/*
 * 允许手机浏览器拖动
 */
function startDefault(){
    window.ontouchmove = function(e){
        e.preventDefault && e.preventDefault();
        e.returnValue = true;
        e.stopPropagation && e.stopPropagation();
        return true;
    }
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
}