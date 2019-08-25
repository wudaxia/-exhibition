//var basePath="http://nb.3renhe.net/api/";//url地址
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
function AjaxGetSubmit(_type,   _url, _method) {//调用ajax
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
function emailif(email) {
    if (email != null && email != undefined && email != "")
    {
        if (email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return true;
    }
   
}//判断邮箱正确
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
           $('.footerNav').addClass("hide");
       }
    })
    $("input").on("blur",function(){
        $('.footerNav').removeClass("hide");
    })
}//手机端input的虚拟键盘和position：fixed冲突的解决方法
function fixedTextarea(){
    $("textarea").on("click",function (){
        $('.footerNav').addClass("hide");
    })
    $("textarea").on("blur",function(){
        $('.footerNav').removeClass("hide");
    })}

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
}//底部导航条点击效果

function changeTime(timeStr) {

    var date = new Date(timeStr);

    var dateYear = date.getFullYear();

    var dateMonth = date.getMonth() + 1;
    var dateHour = date.getHours();
    var dateMin = date.getMinutes();
    var dateSen = date.getSeconds();
    var dateDay = date.getDate();
    var dateStr = dateYear + "-" + dateMonth + "-" + dateDay + " " + dateHour + ":" + dateMin + ":" + dateSen;
    return dateStr;
}//时间戳转换为年月日


function strEllipsis(str, leng) {
    if (str.length > parseInt(leng)) {
        str = str.substring(0, parseInt(leng));
        str += "...";
    }
    return str;
}//字符串省略



//打开消息提示模态框
function openmodal(msg) {
    var modalhtml = "<div class=\"am-modal am-modal-prompt\" tabindex=\"-1\" id=\"mymodal\"><div class=\"am-modal-dialog\"><div class=\"am-modal-hd\">温馨提示</div><div class=\"am-modal-bd\" id=\"errormsg\"></div><div class=\"am-modal-footer\"><span class=\"am-modal-btn\">关闭</span></div></div></div>";
    $("body").append(modalhtml);
    $("#errormsg").html(msg);
    var $modal = $('#mymodal');
    $modal.modal({
        closeViaDimmer: false
    });
    $modal.modal('open');
}

//打开加载提示模态框
function openloadmodal() {
    var modalhtml = "<div class=\"am-modal am-modal-loading am-modal-no-btn\" tabindex=\"-1\" id=\"my-modal-loading\"><div class=\"am-modal-dialog\" style=\"border-radius:20px;\"><div class=\"am-modal-hd\"></div><div class=\"am-modal-bd\"> <span class=\"am-icon-spinner am-icon-spin\"></span></div> </div></div>";
    $("body").append(modalhtml);
    var $modal = $('#my-modal-loading');
    $modal.modal({
        closeViaDimmer: false,
        height: "80px",
        width: "150px"
    });
    $modal.modal('open');
    console.log(45)
}
//关闭加载提示模态框
function closeloadmodal() {
    var $modal = $('#my-modal-loading');
    $modal.modal('close');
}
function closeloadmodal1() {
    var $modal = $('#my-modal-loading');
    setTimeout(function(){
        $modal.modal('close');
    },1000)
}
//关闭加载提示模态框
function closeloadmodal2() {
    var $modal = $('#my-modal-loading');
    $modal.remove();
}
//打开消息提示模态框
function openmodal_onlythree(msg) {
    var modalhtml = "<div class=\"am-modal am-modal-prompt\" tabindex=\"-1\" id=\"mymodal\"><div class=\"am-modal-dialog\"><div class=\"am-modal-hd\">温馨提示</div><div class=\"am-modal-bd\" id=\"errormsg\"></div><div class=\"am-modal-footer\"><span class=\"am-modal-btn\">关闭</span></div></div></div>";
    $("body").append(modalhtml);
    $("#errormsg").html(msg);
    var $modal = $('#mymodal');
    $modal.modal('open');
    var n = 3;
    closeModelbyTime();
}
//延迟关闭model
function closeModelbyTime(model, time) {
    t = setTimeout("closeloadmodel('" + model + "')", 2000);
}

function getConfirm2() {
    var conHtml = "<div class=\"am-modal am-modal-confirm\" tabindex=\"-1\" id=\"my-confirm\"><div class=\"am-modal-dialog\"><div class=\"am-modal-hd\"></div><div class=\"am-modal-bd\">确定取消该订单吗？</div><div class=\"am-modal-footer\"><span class=\"am-modal-btn cencel\" data-am-modal-cancel>取消</span><span class=\"am-modal-btn enter\" data-am-modal-confirm>确定</span></div> </div></div>"
    $("body").append(conHtml);
    var $modal = $('#my-confirm');
    $modal.modal('open');
}//确定删除

function noClick(res){
    var click=$(res).attr("onclick");
    $(res).attr("onclick","");
    setTimeout(function () {
        $(res).attr("onclick",click);
    },1000);
}//禁止重复点击

function ensure(btn){
$(btn).bind("keypress",function(){
    if(window.event.keyCode == "13")
    {
        $(".enter").trigger("click");
        window.event.keyCode=0;
    }
})

}//键盘回车事件