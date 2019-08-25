/**/
var areaId = getareaId();
function getareaId() {
    var id = sessionStorage.getItem("areaId");
    if (id == null)
        return 47;
    else
        return id;
}

/*接口路径*/
//var hostIp = "http://43.254.55.220:8080/RedCross/rest/";  //外网
// var hostIp = "http://10.221.204.100:8080/RedCross/rest/";//内网
//var basePath="http://nb.3renhe.net/api/";
var basePath="http://106.14.41.189:1919/api/";
var addressBasePath="address.txt";

/*图片路径*/
var imgIp = "http://43.254.55.220:8080/";//外网
// var imgIp = "http://10.221.204.100:8080/";//内网
//Js 获取URL参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return r[2];
    return null;
}
//验证手机号码
function VerificationPhone(phone) {
    var reg = /^0?1[3|4|5|6|7|8|9|0][0-9]\d{8}$/;
    if (reg.test(phone)) {
        return true;
    } else {
        return false;
    }
}
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
function closeloadmodel() {
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
/*function closeloadmodal(model) {
 var $modal = $('"+model+"');
 $modal.modal('close');
 }*/
//获取浏览器端token值
function getToken() {
    return sessionStorage.getItem("token");
}
//获取更多
//confirm 弹窗
function getConfirm() {
    var conHtml = "<div class=\"am-modal am-modal-confirm\" tabindex=\"-1\" id=\"my-confirm\"><div class=\"am-modal-dialog\"><div class=\"am-modal-hd\"></div><div class=\"am-modal-bd\">确定删除吗？</div><div class=\"am-modal-footer\"><span class=\"am-modal-btn cencel\" data-am-modal-cancel>取消</span><span class=\"am-modal-btn enter\" data-am-modal-confirm>确定</span></div> </div></div>"
    $("body").append(conHtml);
    var $modal = $('#my-confirm');
    $modal.modal('open');
}
//填写报名信息
function getPrompt(msg) {
    var modalhtml = "<div class=\"am-modal am-modal-prompt\" tabindex=\"-1\" id=\"mymodal\">" +
        "<div class=\"am-modal-dialog\">" +
        "<div class=\"am-modal-hd\">填写报名信息<a href=\"javascript: void(0)\" class=\"am-clos am-close1\" data-am-modal-close><img src='../img/x.png'></a></div>" +
        "<div class=\"am-modal-bd\" id=\"msg\">" +
        "<div class=\"ac-per ac-fill\"><div class=\"ac-fillimg\"><img src=\"../img/person.png\"></div><input type=\"text\" placeholder='姓名' maxlength='12' class=\"am-modal-prompt-input\"></div>" +
        "<div class=\"ac-phone2 ac-fill\"><div class=\"ac-fillimg\"><img src=\"../img/phone2.png\"></div><input type=\"text\" placeholder='手机号' class=\"am-modal-prompt-input\"></div>" +
        "<div class=\"ac-val ac-fill\"><div class=\"ac-fillimg\"><img src=\"../img/val.png\"></div><input type=\"text\" placeholder='验证码' class=\"am-modal-prompt-input\"><input type='button' class='ac-code' onclick='getPhoneCode()'value='获取验证码' ></div>" +
        "</div>" +
        "<div class=\"am-modal-footer\">" +
        "<span class=\"am-btnb\">确定</span></div></div></div>";
    $("body").append(modalhtml);
    $("#msg").html(msg);
    var $modal = $('#mymodal');
    $modal.modal('open');
    var n = 3;
    closeModelbyTime();
}

//字符串省略
function strEllipsis(str, leng) {
    if (str.length > parseInt(leng)) {
        str = str.substring(0, parseInt(leng));
        str += "...";
    }
    return str;
}
//jquery 时间戳与日期转换
(function ($) {
    $.extend({
        myTime: {
            /**

             * 当前时间戳

             * @return <int>        unix时间戳(秒)

             */

            CurTime: function () {
                return Date.parse(new Date()) / 1000;
            },
            CurTime2: function () {
                return (new Date()).valueOf();
            },
            /**

             * 日期 转换为 Unix时间戳

             * @param <string> 2014-01-01 20:20:20  日期格式

             * @return <int>        unix时间戳(秒)

             */

            DateToUnix: function (string) {
                var f = string.split(' ', 2);
                var d = (f[0] ? f[0] : '').split('-', 3);
                var t = (f[1] ? f[1] : '').split(':', 3);
                return (new Date(
                        parseInt(d[0], 10) || null,
                        (parseInt(d[1], 10) || 1) - 1,
                        parseInt(d[2], 10) || null,
                        parseInt(t[0], 10) || null,
                        parseInt(t[1], 10) || null,
                        parseInt(t[2], 10) || null
                    )).getTime() / 1000;
            },
            /**

             * 时间戳转换日期

             * @param <int> unixTime    待时间戳(秒)

             * @param <bool> isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)

             * @param <int>  timeZone   时区

             */

            UnixToDate: function (unixTime, isFull, timeZone) {
                if (typeof (timeZone) == 'number') {
                    unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
                }
                var time = new Date(unixTime * 1000);
                var ymdhis = "";
                ymdhis += time.getUTCFullYear() + "-";
                ymdhis += "" + whereone(time.getUTCMonth() + 1) + "" + "-";
                if (time.getUTCHours() < 16)
                    ymdhis += "" + whereone(time.getUTCDate()) + "";
                else
                    ymdhis += "" + whereone(time.getUTCDate() + 1) + "";
                if (isFull === true) {
                    if (time.getUTCHours() < 16)
                        ymdhis += " " + whereone(time.getUTCHours() + 8) + ":";
                    else
                        ymdhis += " " + whereone(time.getUTCHours() + 8 - 24) + ":";
                    ymdhis += whereone(time.getUTCMinutes())
                }
                return ymdhis;
            }
            ,
            /**

             * 时间戳转换日期

             * @param <int> unixTime    待时间戳(秒)

             * @param <bool> isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)

             * @param <int>  timeZone   时区

             */

            UnixToDay: function (unixTime, isFull, timeZone) {
                if (typeof (timeZone) == 'number') {
                    unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
                }
                var time = new Date(unixTime * 1000);
                var ymdhis = "";
                ymdhis += time.getUTCFullYear() + "-";
                ymdhis += "" + whereone(time.getUTCMonth() + 1) + "" + "-";
                ymdhis += "" + whereone(time.getUTCDate());
                return ymdhis;
            }
            , /**

             * 时间戳转换时间点

             * @param <int> unixTime    待时间戳(秒)

             * @param <bool> isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)

             * @param <int>  timeZone   时区

             */

            UnixToYYYYMM: function (unixTime, isFull, timeZone) {
                if (typeof (timeZone) == 'number') {
                    unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
                }
                var time = new Date(unixTime * 1000);
                var ymdhis = "";
                ymdhis += time.getUTCFullYear() + "-";
                ymdhis += whereone(time.getUTCMonth() + 1);
                return ymdhis;
            }
            , /**

             * 时间戳转换年月

             * @param <int> unixTime    待时间戳(秒)

             * @param <bool> isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)

             * @param <int>  timeZone   时区

             */

            UnixToTime: function (unixTime, isFull, timeZone) {
                if (typeof (timeZone) == 'number') {
                    unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
                }
                var time = new Date(unixTime * 1000);
                var ymdhis = "";
                if (isFull === true) {
                    ymdhis += whereone(time.getUTCHours() + 8) + ":";
                    ymdhis += whereone(time.getUTCMinutes())
                }
                return ymdhis;
            }
        }
    });
})(jQuery);
//时间填充位数
function whereone(time) {
    time = JSON.stringify(time)
    if (time.length == 1)
        time = "0" + time;
    return time;
}
/*列表省略号
 *str:字符串,picWidth:图片宽度,size:字体大小,line:行数
 * */
function listEllipsis(str, picWidth, size, line) {
    var windowWidth = $(window).width();
    /*fontWidth：字体可以占据的宽度，picWidth+30表示在总宽度中被占的宽度*/
    var fontWidth = windowWidth - (picWidth + 30);
    /*fontNum: 总共可以占据多少字-2  -2是给省略号的*/
    var fontNum = parseInt((fontWidth / size) * line - 2);
    /*结果字符串*/
    var res;
    if (str.length > fontNum) {
        res = str.substring(0, fontNum);
        res += "...";
    } else {
        res = str;
    }
    return res;
}
/*时间戳转换为年月日*/
function changeTime(timeStr) {
    var date = new Date(timeStr);
    var dateYear = date.getFullYear();
    var dateMonth = date.getMonth() + 1;
    var dateDay = date.getDate();
    var dateStr = dateYear + "-" + dateMonth + "-" + dateDay;
    return dateStr;
}
/*用户模型*/
var user = {
    //用户ID
    userId: 0,
   
    /*存用户ID*/
    saveUserId: function () {
        localStorage.setItem("userId", this.userId);
      
    },
    /*读取用户ID*/
    readUserId: function () {
        return localStorage.getItem("userId");
    } ,
    /*注销*/
    loginOut: function () {
        localStorage.removeItem("userId");
    }
};
//alert弹窗

function getalert(str) {
    var alerthtml = "";
    alerthtml += "<div class=\"am-modal am-modal-alert\" tabindex=\"-1\" id=\"hsz-alert\">";
    alerthtml += "<div class=\"am-modal-dialog\">";
    alerthtml += "<div class=\"am-modal-bd\" >" + str + "</div>";

    alerthtml += "</div>";
    alerthtml += "</div>";
    $("body").append(alerthtml);
    $("#hsz-alert").modal('open');
}
//多少时间后自动关闭， modal： id名称，time ： 毫秒    1秒等于1000毫秒
function closeByTime(modal, time) {
    setTimeout(function () {
        $("#" + modal + "").modal('close');
    }, time)
}
/*文章元素初始化*/
function initElements() {
    $(".pageContent table").css({"border-right": "1px solid #000", "border-bottom": "1px solid #000", "width": "100%"});
    $(".pageContent table td").css({
        "border-left": "1px solid #000",
        "border-top": "1px solid #000",
        "vertical-align": "middle"
    });
    $(".pageContent p").css({"text-indent": "2em", "line-height": "24px", "font-family": "微软雅黑"});
    $(".pageContent img").css("width", "100%").parent().css("text-indent", "0px");
    $(".pageContent div").css("width", "100%");
}
//插入加载更多提示
function addGetMoreInfo() {
    var html = "<div style=\"margin:20px auto; display:block\" id=\"loadmore\">\
                    <div style=\"text-align:center; margin-top:20px\">\
                        <span class=\"am-icon-spinner am-icon-spin  am-icon-lg\"></span>\
                        <span style=\"display:block;margin-top:20px\">正在加载..</span>\
                    </div>\
                </div>\
                <div style=\"margin:20px auto; display:none \" id=\"over\">\
                    <div style=\"text-align:center; margin-top:20px\">\
                        <span style=\"display:block;margin-top:20px\">已经没有更多了</span>\
                 </div>";
    return html;
}
//开启加载更多
function openGetMore() {
    $("#loadmore").css("display", "block");
    $("#over").css("display", "none");
}
//关闭加载更多
function closeGetMore() {
    $("#loadmore").css("display", "none");
    $("#over").css("display", "none");
}
//完成加载
function GetMoreOver() {
    $("#loadmore").css("display", "none");
    $("#over").css("display", "block");
}

//验证表单数据
function validatform1(_form) {
    var $input = $("#" + _form + " :input"), isvalidat = true;
    console.log(_form);
    $input.each(function (i, value) {
        //判断是否为需要验证的域
        var $obj = $(this), $msg = $obj.attr("nullmsg"), $val = $obj.val();
        $required = $obj.attr("required");
        if ($required) {
            //获取该域的验证方式
            var $pattern = $obj.attr("pattern");
            console.log($pattern);
            if($pattern!=null&&$pattern!=""&&$pattern!=undefined&&$pattern!="null")
            {
                var myReg = new RegExp($pattern, 'g');
                console.log(myReg);
                if (!myReg.test($val)) {
                    openmodal($msg);
                    //var $modal = $('#myformmodal');
                    //$modal.modal({
                    //    closeViaDimmer: false
                    //});
                    //$modal.modal('open');
                    isvalidat = false;
                    return false;
                }
            }
            else{
                var myReg = new RegExp(/\S/);
                console.log(myReg);
                if (!myReg.test($val)) {
                    console.log(!myReg.test($val));
                    openmodal($msg);
                    //var $modal = $('#myformmodal');
                    //$modal.modal({
                    //    closeViaDimmer: false
                    //});
                    //$modal.modal('open');
                    isvalidat = false;
                    return false;
                }
            }
        }
    });
    return isvalidat;
}

/*图片懒加载*/
function imgLazyLoad() {
    $("img.lazy").lazyload({
        effect: "fadeIn",
        threshold: 100
    });
}

/*暂无数据 html*/
function noData() {
    var str =   "<p>暂无数据</p>" +
                "<div class=\"imgBox\">" +
                    "<img src=\"../../img/wushuju.png\"/>" +
                "</div>";
    $(".noData").html(str);
}
function noClick(res){
    $(res).attr("disabled",true);
    setTimeout(function () {   $(res).attr("disabled",false);},1500);
}



