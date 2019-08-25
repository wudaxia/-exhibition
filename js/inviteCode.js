function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    $(".ic-bgImg").height($(window).height());
    var token = JSON.parse(sessionStorage.getItem("token"));
    var actId=JSON.parse(sessionStorage.getItem("acActId"));
    var partId=JSON.parse(sessionStorage.getItem("acPartId"));
    if(token==null||token==undefined||token==""||actId==null||actId==undefined||actId==""||partId==null||partId==undefined||partId=="")
    {
        layer.closeAll();
        openmodal("请选择您管理的活动");
        setTimeout(function () {
            self.location.href="personalCenter.html";
        },1500);
    }
    else{
        //二维码生成
        //var acImgStyle=JSON.parse(sessionStorage.getItem("acImgStyle"));
        //var data='{"token":"'+token+'","actId":'+actId+'}';
        var ourdata='{"actId":'+actId+',"partId":'+partId+'}';
        ////判断是专属链接二维码还是下级邀请二维码
        //if(acImgStyle=="1")
        //{
        //    AjaxSubmit("get",JSON.parse(data),basePath + "activity/getActivityInvitationQrcode",getActivityInvitationQrcode_fun);
        //}
        //else if(acImgStyle=="2"){
        //    AjaxSubmit("get",JSON.parse(data),basePath + "activity/getActivityInfoQrcode",getActivityInfoQrcode_fun);
        //}
        //活动详情
        AjaxSubmit("get",JSON.parse(ourdata),basePath + "activity/getActivityInfo",getActivityInfo_fun);

        //二维码生成
        var goUrl=baseUrl+"activeModel.html?actId="+actId+"&partId="+partId+"";
        console.log(goUrl);
        $qr = $('.in-code');
        function makeCode(text) {
            $qr.empty().qrcode(text);
            var mycanvas1=document.getElementsByTagName('canvas')[0];
            var img=convertCanvasToImage(mycanvas1);
            $('.in-code').hide();
            var wxImg=$('<div class="in-code wxImg"></div>');
            $('.in-code').after(wxImg);
            $('.wxImg').append(img);
        }
        makeCode(goUrl);
    }
}
//转换成图片
function convertCanvasToImage(canvas) {
    //新Image对象，可以理解为DOM
    var image = new Image();
    // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
    // 指定格式 PNG
    image.src = canvas.toDataURL("image/png");
    return image;

}
function getActivityInfo_fun(res){
console.log(res);
    if(res.result.code=="200"){
        var obj = res.dataPacket.activity;
        var objj=res.dataPacket;
        var wxinfo=res.dataPacket.wxinfo;
        var orderInfo =$(' <div class="texC in-name"> <img src="../img/head-img.png" style="border-radius: 50%"> <p class="username texC" data-partid="'+objj.part_user.part_id+'"data-appname="'+objj.part_user.apply_name+'">'+objj.part_user.apply_name+'</p> </div>' +
            ' <div class="in-activity texC">'+obj.title+'</div>' +
            '<div class="in-info texC"> <div class="in-time"></div> ' +
            '<div class="in-place texC">'+obj.tags+'</div> </div>');
        $('.section').append(orderInfo);
        //背景图
        var imgBgUrl="";
        if(obj.activeimg!=null&&obj.activeimg!=""&&obj.activeimg!=undefined)
        {
            imgBgUrl=imgPath+obj.activeimg;

        }
        else{
            imgBgUrl="../img/inviteBg1.png";
        }
        $(".ic-bgImg").attr("src",imgBgUrl);
        //判断微信头像是否存在
        var imgUrl;
        if(wxinfo!=null&&wxinfo!=undefined&&wxinfo!="")
        {
            if(res.dataPacket.wxinfo.headimgurl!=null&&res.dataPacket.wxinfo.headimgurl!=undefined&&res.dataPacket.wxinfo.headimgurl!="")
            {
                imgUrl=res.dataPacket.wxinfo.headimgurl;
            }
            else{
                imgUrl='../img/head-img.png';
            }
        }
        else{
            imgUrl='../img/head-img.png';
        }
        $(".in-name>img").attr("src",imgUrl);
        var activeTime="";
        if(obj.startTime==null||obj.startTime==""||obj.startTime==undefined||obj.endTime==""||obj.endTime==undefined||obj.endTime==null)
        {
            activeTime="未确定时间"
        }
        else{
            activeTime=changeTime(obj.startTime)+'&nbsp;~&nbsp;'+changeTime(obj.endTime)
        }
        $(".in-time").append(activeTime);
    }else if(res.result.code=="3200")
    {
        openmodal("登录失效");
        sessionStorage.removeItem("token");
        sessionStorage.setItem("wxToken","0");
        wxBack();
    }
    else if(res.result.code=="3201")
    {
        var returnUrlsCode=GetQueryString("code");
        if(returnUrlsCode!=null&&returnUrlsCode!=undefined&&returnUrlsCode!="")
        {
            var returnUrlsCode2="code="+returnUrlsCode+"&";
            var returnUrls=window.location.href.replace(returnUrlsCode2,"");
            sessionStorage.setItem("returnUrl",JSON.stringify(returnUrls));
        }
        else{
            sessionStorage.setItem("returnUrl",JSON.stringify(window.location.href));
        }
        sessionStorage.setItem("token",JSON.stringify(res.dataPacket.token));
        openmodal("您未绑定微信，请去绑定");
        setTimeout(function () {
            self.location.href="login.html";
        },1500)

    }else{
        openmodal("信息读取失败");
    }
    layer.closeAll();
}

//function getActivityInvitationQrcode_fun(res){
//    console.log(res);
//    //var url = res.dataPacket.url;
//    //var arr=url.split("=");
//    //var obj = JSON.parse(arr[1]);
//    //arr[0]+="=";
//    //arr[0]+=obj.ticket;
//    //var trueUrl = arr[0];
//    if(res.result.code=="200")
//    {
//        var imgs=$('<img class="in-codeImg" width="120px" height="120px" src="'+res.dataPacket.url+'"/>');
//        $(".in-code").append(imgs);
//        //$('.in-codeImg').longPress2(function(){
//        //});
//        //$qr = $('.in-code');
//        //function makeCode(text) {
//        //    $qr.empty().qrcode(text);
//        //    var mycanvas1=document.getElementsByTagName('canvas')[0];
//        //    var img=convertCanvasToImage(mycanvas1);
//        //    $('.in-code').hide();
//        //    var wxImg=$('<div class="in-code wxImg"></div>')
//        //    $('.in-code').after(wxImg);
//        //    $('.wxImg').append(img);
//        //    $(img).attr("onclick","img_click(this)")
//        //}
//        //makeCode(res.dataPacket.url);
//    }
//    else if(res.result.code=="300")
//    {
//        openmodal(res.result.detail);
//    }
//    else{
//        openmodal("二维码读取失败");
//    }
//    layer.closeAll();
//}


//获得专属链接二维码
//function getActivityInfoQrcode_fun(res){
//    //console.log(res);
//    //console.log(res.dataPacket.url);
//    //var url = res.dataPacket.url;
//    //var arr=url.split("=");
//    //var obj = JSON.parse(arr[1]);
//    //console.log(obj.ticket);
//    //arr[0]+="=";
//    //arr[0]+=obj.ticket;
//    //var trueUrl = arr[0];
//    //console.log(trueUrl);
//    if(res.result.code=="200")
//    {
//        var imgs=$('<img width="120px" height="120px" class="in-codeImg" src="'+res.dataPacket.url+'"/>');
//        $(".in-code").append(imgs);
//        //$('.in-codeImg').longPress2(function(){
//        //
//        //});
//        //$qr = $('.in-code');
//        //function makeCode(text) {
//        //    $qr.empty().qrcode(text);
//        //    var mycanvas1=document.getElementsByTagName('canvas')[0];
//        //    var img=convertCanvasToImage(mycanvas1);
//        //    $('.in-code').hide();
//        //    var wxImg=$('<div class="in-code wxImg"></div>')
//        //    $('.in-code').after(wxImg);
//        //    $('.wxImg').append(img);
//        //    $(img).attr("onclick","img_click(this)")
//        //}
//        //makeCode();
//    }
//    else if(res.result.code=="300")
//    {
//        openmodal(res.result.detail);
//    }
//    else{
//        openmodal("二维码读取失败");
//    }
//    layer.closeAll();
//}


//转化为图片
//function convertCanvasToImage(canvas) {
//    //新Image对象，可以理解为DOM
//    var image = new Image();
//    // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
//    // 指定格式 PNG
//    image.src = canvas.toDataURL("image/png");
//    return image;
//
//}
//获取网页中的canvas对象
//将转换后的img标签插入到html中
//$.fn.longPress2 = function(fn) {
//    var timeout = undefined;
//    var $this = this;
//    for(var i = 0;i<$this.length;i++){
//        $this[i].addEventListener('touchstart', function(event) {
//            timeout = setTimeout(fn, 800);  //长按时间超过800ms，则执行传入的方法
//            $(".in-codeImg").removeClass(".in-codeImg");
//            setTimeout(function(){
//                $(".in-code").find("img").addClass("in-codeImg");
//            },1000);
//        }, false);
//        $this[i].addEventListener('touchend', function(event) {
//            clearTimeout(timeout);  //长按时间少于800ms，不会执行传入的方法
//            var imgUrl=$(".in-codeImg")[0];
//            img_click(imgUrl);
//        }, false);
//    }
//};
window.onload = function() {
    $("#configWXs").trigger("click");
};