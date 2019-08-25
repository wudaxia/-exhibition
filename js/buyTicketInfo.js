var countdown =60;
var listfield="";
function wxLogins(){
    AjaxActive();
}
//获取与门票相关活动的相关信息
function AjaxActive(){
    $("body").css("min-height",$(window).height());
    var ticketId=GetQueryString("ticketId");
    var partId=GetQueryString("partId");
    if(token==null||token==undefined||token=="")
    {
        $(".bti-clickQeCode").remove();
        $(".bti-userInfoT").removeAttr("onclick");
        $(".bti-userInfoPhoneCode").remove();
    }
    if(ticketId!=""&&ticketId!=null&&ticketId!=undefined&&ticketId!=""&&partId!=null&&partId!=undefined&&partId!="")
    {
        data='{"ticketId":'+ticketId+',"partId":'+partId+'}';
        AjaxSubmit("get", JSON.parse(data), basePath + "Ticket/getTicketInfo", getTicketInfo_fun);
        var token=JSON.parse(sessionStorage.getItem("token"));
    }
    else{
        openmodal("请重新联系售卡人");
    }
}
function getTicketInfo_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        var active=res.dataPacket.activity;
        var ticket=res.dataPacket.ticket;
        var user=res.dataPacket.user;
        var wxinfo=res.dataPacket.wxinfo;
        var partuser=res.dataPacket.partuser;
        if(active==null||active==""||active==undefined)
        {
            openmodal("没有这场活动");
            setTimeout(function(){
                self.location.href="index1.html";
            },1500)
        }
        else{
            $(".bti-enter").attr("data-actId",active.id);
            sessionStorage.setItem("bitActId",active.id);
            //活动名称
            $(".bti-activeName").text(active.title);
            //活动时间
            var activeTime;
            if(active.startTime==null||active.startTime==""||active.startTime==undefined||active.endTime==""||active.endTime==undefined||active.endTime==null)
            {
                activeTime="未确定"
            }
            else{
                activeTime=changeTime(active.startTime)+'&nbsp;~&nbsp;'+changeTime(active.endTime);
                console.log(activeTime);
            }
            $(".bti-activeTime").html(activeTime);
            //活动地点
            $(".bti-activeAddress").text(active.tags);
        }
        if(ticket==null||ticket==""||ticket==undefined)
        {
            openmodal("没有这张门票相关信息");
        }
        else{
            //实体卡号
            $(".bti-TicketNo").text(ticket.ticket_no);
            $(".bti-enter").attr("data-ticketId",ticket.ticket_id);
        }
        if(partuser!=null&partuser!=undefined&&partuser!="")
        {
            $(".bti-userInfoName").text(partuser.apply_name);
        }
        else{
            $(".bti-userInfoPLast").remove();
        }
    }
    else if(res.result.code=="300")
    {
        openmodal(res.result.detail);
        setTimeout(function () {
            self.location.href="index1.html";
        },1500);
    }
    else{
        openmodal("请重新联系售卡人");
    }
}
//获取验证码
function getPhoneCode(){

    var userName=$(".bti-getName").val();
    var phone=$(".bti-getPhone").val();
    if(name(userName))
    {
        if(phoneMath(phone)){
            var data='{"phone":"'+phone+'"}';
            AjaxSubmit("get", JSON.parse(data), basePath + "Login/getPhoneCode", getPhoneCode_fun);
        }
        else{
            openmodal("请输入正确的手机号码");
        }
    }
    else{
        openmodal("请输入正确的姓名");
    }
}
function getPhoneCode_fun(res){
    if(res.result.code=="200")
    {
        setTime();
    }
    else if(res.result.code=="300"){
        openmodal(res.result.detail);
    }
    else if(res.result.code=="3202")
    {
        openmodal("短信发送失败")
    }
    else{
        openmodal("获取验证码失败!");
    }
}
function setTime() {
    if (countdown == 0) {
        countdown = 60;
        $(".bti-code").removeAttr("disabled");
        $(".bti-getPhone").removeAttr("disabled");
        $(".bti-code").val("重新获取");
        clearInterval(setTime);
    } else {
        countdown--;
        $(".bti-code").attr("disabled",true);
        $(".bti-getPhone").attr("disabled",true);
        $(".bti-code").val(countdown+"s");
        setTimeout(setTime,1000);
    }
}//验证码倒计时

//点击提交
function buyTicket(btn){
    var userName=$(".bti-getName").val();
    var phone=$(".bti-getPhone").val();
    var code=$(".bti-inputCode").val();
    var ticketId=$(btn).attr("data-ticketId");
    var partId=GetQueryString("partId");
    var token=JSON.parse(sessionStorage.getItem("token"));
    if(token!=null&&token!=undefined&&token!="")
    {
        if(name(userName))
        {
            if(phoneMath(phone)){
                if(ticketId!=null&&ticketId!=undefined&&ticketId!=""){
                    var data='{"phone":"'+phone+'","name":"'+userName+'","token":"'+token+'","ticketId":'+ticketId+'}';
                    AjaxSubmit("get", JSON.parse(data), basePath + "Ticket/ticketSaleByBelonging", ticketSaleByBelonging_fun);
                }
            }
            else{
                openmodal("请输入正确的手机号码");
            }
        }
        else{
            openmodal("请输入正确的姓名");
        }
    }
    else{
        if(name(userName))
        {
            if(phoneMath(phone)){
                if(code!=null&&code!=undefined&&code!="")
                {
                    if(ticketId!=null&&ticketId!=undefined&&ticketId!="")
                    {
                        var data='{"phone":"'+phone+'","name":"'+userName+'","code":"'+code+'","ticketId":'+ticketId+'}';
                        //console.log(data);
                        AjaxSubmit("get", JSON.parse(data), basePath + "Ticket/ticketSaleByOrdinaryUser", ticketSaleByOrdinaryUser_fun);
                    }
                    else{
                        openmodal("卡号失效，请联系售卡人");

                    }
                }
                else{
                    openmodal("请输入手机验证码");
                }
            }
            else{
                openmodal("请输入正确的手机号码");
            }
        }
        else{
            openmodal("请输入正确的姓名");
        }
    }
}



function ticketSaleByOrdinaryUser_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        GobuyTicketInfo2();
    }
    else if(res.result.code=="300")
    {
        openmodal(res.result.detail);
    }
    else{
        openmodal("完善失败，请联系相关业务员");
        setTimeout(function(){$(".closeWX").trigger("click")},1000);
    }
}
//管理员说售票
function ticketSaleByBelonging_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        GobuyTicketInfo2();
    }
    else if(res.result.code=="300")
    {
        openmodal(res.result.detail);
    }
    else if(res.result.code=="3200")
    {
        openmodal("登录失效");
        sessionStorage.removeItem("token");
        sessionStorage.setItem("wxToken","0");
        wxBack();
    }
    else{
        openmodal("卖票失败");
    }
}
////转换成图片
//function convertCanvasToImage(canvas) {
//    //新Image对象，可以理解为DOM
//    var image = new Image();
//    // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
//    // 指定格式 PNG
//    image.src = canvas.toDataURL("image/png");
//    return image;
//
//}

//查看门票二维码
function clickQeCode(btn){
    var token=JSON.parse(sessionStorage.getItem("token"));
    var ticketId=GetQueryString("ticketId");
    var data='{"token":"'+token+'","ticketId":'+ticketId+'}';
    if(ticketId!=null&&ticketId!=""&&ticketId!=undefined)
    {
        AjaxSubmit("get", JSON.parse(data), basePath + "Ticket/getTicketQrcode", getTicketQrcode_fun);
    }
    else{
        openmodal("没有相关门票信息");
    }
}
function getTicketQrcode_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        $(".bti-userInfoP2").addClass("disn");
        var ticketUrl=res.dataPacket.url;
        if(ticketUrl!=null&&ticketUrl!=""&&ticketUrl!=undefined)
        {
            $(".in-code").find("img").remove();
            $(".in-code").find("p").remove();
            var imgs=$('<img width="120px" height="120px" src="'+ticketUrl+'"/><p onclick="bti_back(this)">返回</p>');
            $(".in-code").append(imgs);
            //imgs.trigger("click");
            //$qr = $('.in-code');
            //function makeCode(text) {
            //    $qr.empty().qrcode(text);
            //    var mycanvas1=document.getElementsByTagName('canvas')[0];
            //    var img=convertCanvasToImage(mycanvas1);
            //    $('.in-code').hide();
            //    var wxImg=$('<div class="in-code wxImg disn"></div>');
            //    $('.in-code').after(wxImg);
            //    $('.wxImg').append(img);
            //    $(img).attr("onclick","img_click(this)");
            //    $(img).trigger("click");
            //}
            //makeCode(ticketUrl);
        }
        else{
            openmodal("获取二维码失败,请联系管理员");
        }
    }
    else if(res.result.code=="300")
    {
        openmodal(res.result.detail);
    }
    else{
        openmodal("获取二维码失败");
    }
}
function bti_back(btn)
{
    $(".in-code").find("img").remove();
    $(".in-code").find("p").remove();
    $(".bti-userInfoP2").removeClass("disn");
}
//验证拓展属性
function GobuyTicketInfo2(){
    var token=JSON.parse(sessionStorage.getItem("token"));
    var actId=$(".bti-enter").attr("data-actId");
    var data = '{"token": "'+token+'", "actId":'+actId+'}';
    if(actId!=null&&actId!=undefined&&actId!="")
    {
        var data = '{"token": "'+token+'", "actId":'+actId+'}';
        console.log(data);
        AjaxSubmit("get", JSON.parse(data), basePath + "Ticket/getTicketSaleAttribute", getTicketSaleAttribute_fun)
    }
    else{
        openmodal("信息获取失败");
    }
}
function getTicketSaleAttribute_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        if(res.dataPacket.fieldList!=null&&res.dataPacket.fieldList!=""&&res.dataPacket.fieldList!=undefined)
        {
            if(res.dataPacket.fieldList.length>0)
            {
                var partId=GetQueryString("partId");
                var  actId=$(".bti-enter").attr("data-actId");
                var ticketId=JSON.parse(sessionStorage.getItem("ticketId"));
                openmodal("第一步完善成功，请继续填写相关拓展表，以完成最终信息!");
                if(actId!=null&&actId!=""&&actId!=undefined&&ticketId!=null&&ticketId!=undefined&&ticketId!=""&&partId!=null&partId!=undefined&&partId!="")
                {
                    setTimeout(function(){
                        //到时候改
                        self.location.href="buyTicketInfo2.html?actId="+actId+"&ticketId="+ticketId+"&partId="+partId+"";
                    },1000)
                }
                else{
                    openmodal("获取相关信息失败");
                    setTimeout(function () {
                        setTimeout(function(){$(".closeWX").trigger("click")},1000);
                    },1500);
                }
            }
            else{
                openmodal("信息完善成功");
                setTimeout(function(){$(".closeWX").trigger("click")},1000);
            }
        }
        else{
            openmodal("信息完善成功");
            setTimeout(function(){$(".closeWX").trigger("click")},1000);
        }
    }
    else if(res.result.code=="3200"){
       openmodal("登录失效");
        $(".layui-m-layer").addClass("layerChange");
        $(".layui-m-layermain").addClass("layerChange1");
        sessionStorage.removeItem("token");
        sessionStorage.setItem("wxToken","0");
        setTimeout(function(){
            wxBack();
        },1000);
    }
    else if(res.result.code=="300")
    {
        openmodal(res.result.detail);
    }
    else{
        openmodal("获取信息失败");
    }
}