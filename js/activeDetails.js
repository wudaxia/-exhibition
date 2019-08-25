/**
 * Created by kangli on 2017/6/9.
 */
var getUser="";
var getPartUser="";
var getWxInfo="";
var countdown =60;
var joinActNum="";

function openUserInfo(){
    sessionStorage.removeItem("wxToken2");
    $(".main_image").height($(".main_image").width()*0.557);
    getActiveInfo();
}
function o_apply(resb){
    $(".body").css("height",$(window).height()+"px");
    stopDefault();
    $("#mymodal").remove();
    getPrompt();
}
function getActiveInfo(){
    var activeDetailData=JSON.parse(sessionStorage.getItem("activeDetailData"));
    if(activeDetailData!=null&&activeDetailData!=undefined&&activeDetailData!="")
    {
        layer.open({
            type: 2
            ,content: '加载中',
            shadeClose: false
        });
        getActivityInfo_fun(activeDetailData);
    }
    else{
        openmodal("活动获取失败，请重新获取");
        setTimeout(function(){
            //sessionStorage.removeItem("activeDetails");
            self.location.href="allActivity.html";
        },1500);
    }
}//获取活动详情数据
function getActivityInfo_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        var style= sessionStorage.getItem("activeDetailsStyle");
        var actve=res.dataPacket.activity;
        var partUser=res.dataPacket.part_user;
        var user=res.dataPacket.user;
        var wxinfo=res.dataPacket.wxinfo;
        if(res.dataPacket.joinActNum!=null&&res.dataPacket.joinActNum!=undefined&&res.dataPacket.joinActNum!="")
        {
            joinActNum=res.dataPacket.joinActNum;
        }
        //轮播图
        if(actve.albumsList==null||actve.albumsList==""||actve.albumsList==undefined)
        {
            var img=$(' <li><img class="img_1" src="http://s.amazeui.org/media/i/demos/bing-1.jpg"/></li>')
            $(".ad-bannerUl").append(img);
        }
        else{
            if(actve.albumsList.length==1)
            {
                if(actve.albumsList[0].original_path==null||actve.albumsList[0].original_path==""||actve.albumsList[0].original_path==undefined)
                {
                    var img=$(' <li><img class="img_1" src="http://s.amazeui.org/media/i/demos/bing-1.jpg"/></li>')
                    $(".ad-bannerUl").append(img);
                }
                else{
                    var img=$(' <li><img class="img_1" src="'+imgPath+actve.albumsList[0].original_path+'"/></li>')
                    console.log(img);
                    $(".ad-bannerUl").append(img);
                }
            }
            else{
                $.each(actve.albumsList,function(i,li){
                    if(li.original_path==null||li.original_path==""||li.original_path==undefined)
                    {
                        var img=$(' <li><img class="img_1" src="http://s.amazeui.org/media/i/demos/bing-1.jpg"/></li>')
                        $(".ad-bannerUl").append(img);
                    }
                    else{
                        var img=$(' <li><img class="img_1" src="'+imgPath+li.original_path+'"/></li>');
                        var a=$('<a href="#">'+(i+1)+'</a>')
                        $(".ad-bannerUl").append(img);
                        $(".flicking_con").append(a);
                    }
                })
                if($(".ad-bannerUl").find("li").length>1){
                    banner();
                }
            }
        }
        //活动标题
        var title=$('<p class="title font14 mB5">'+actve.title+'</p> ' +
            '<div class="mB22"><span>访问人数：'+actve.click+'</span></div>');
        $(".ac-title").append(title);
        $(".ac-phoneA").attr("href","tel:"+actve.basephone+"");
        if(actve.title!=null&&actve.title!=""&&actve.title!=undefined)
        {
            $("title").text(actve.title);
            console.log($("title").text());
        }
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
        //活动联系人信息
        if(style!=null&&style!=undefined&&style!=""&&style=="0"||GetQueryString("partId")=="0"||partUser==null||partUser==""||partUser==undefined)
        {
            $(".ac-person").remove();
            //$(".ac-phone").remove();
        }
        else{
            var userInfo=JSON.stringify(user);
            var partUser2=JSON.stringify(partUser);
            var wxinfo2=JSON.stringify(wxinfo);
            getUser=userInfo;
            getPartUser=partUser2;
            getWxInfo=wxinfo2;
            var td=$('<td class="ac-headimg"><img src="'+imgUrl+'"></td> ' +
                '<td class="ac-info"><div class="ac-name">'+partUser.apply_name+'</div> ' +
                '<div class="ac-tel"><p><span class="ac-line">联系电话：</span><span style="margin-left:4px;">'+user.mobile_phone+'</span></p></div> ' +
                '</td> ' +
                '<td class="ac-more"> ' +
                '<div class="ac-moword fr"> ' +
                '<span class="ac-mo" onclick="userInfoMore(this)">更多</span> ' +
                '<img src="../img/more.png"> ' +
                '</div> ' +
                '</td>');
            $(".ac-userTr").append(td);
            //    联系电话
        }
        //活动举办地址
        if(actve.startTime==null||actve.startTime==""||actve.startTime==undefined||actve.endTime==""||actve.endTime==undefined||actve.endTime==null)
        {
            var address=$(' <div>地点：'+actve.tags+'</div> ' +
                '<div><span class="ac-imageTime">时间：未确定</span></div><div>售价：<span style="color:red;">VIP卡100元/张</span></div>');
            $(".ac-image").append(address);
        }
        else{
            var address=$(' <div>地点：'+actve.tags+'</div> ' +
                '<div><span class="ac-imageTime">时间：'+changeTime(actve.startTime)+'&nbsp;~&nbsp;'+changeTime(actve.endTime)+'</span></div><div>售价：<span style="color:red;">VIP卡100元/张</span></div>');
            $(".ac-image").append(address);
        }

        //活动介绍
        var wx_share_body;
        if(actve.content==null||actve.content==undefined||actve.content=="")
        {
            wx_share_body="无介绍内容";
        }
        else{
            wx_share_body=actve.content;
        }

        //活动时间
        //if(actve.attributeValue==null||actve.attributeValue==""||actve.attributeValue==undefined)
        //{
        //    var js=$(' <p class="ac-introword">'+wx_share_body+'</p> ' +
        //        '<p class="ac-introword">活动地址：'+actve.tags+'</p> ' +
        //        '<p class="ac-introword">活动时间：未确定</p>');
        //    $(".ac-acintro").after(js);
        //}

        //else{
            var js=$(' <p class="ac-introword">'+wx_share_body+'</p> ');
                //'<p class="ac-introword">活动地址：'+actve.tags+'</p> ' +
                //'<p class="ac-introword">活动时间：'+changeTime(actve.attributeValue.startTime.slice(6,length-2)/1000)+'&nbsp;~&nbsp;'+changeTime(actve.attributeValue.endTime.slice(6,length-2)/1000)+'</p>');
            $(".ac-acintro").after(js);
        //}
        //判断是哪个种类用户

        //获得活动id
        if(partUser!=null&&partUser!=undefined&&partUser!="")
        {
            $(".ad-quickSignUp").attr("data-id",partUser.part_id);
            $(".ad-quickSignUp").attr("data-actId",actve.id);
        }
        else{
            $(".ad-quickSignUp").attr("data-id","0");
            $(".ad-quickSignUp").attr("data-actId",actve.id);
        }


        //活动内容图片路径
        $(".ac-introword").find("img").each(function(i,imgs){
            var bodyImgUrl=$(imgs).attr("src");
            $(imgs).attr("src",imgPath+bodyImgUrl);
        })
    }
    else if(res.result.code=="300"){
        openmodal(res.result.detail);
        //setTimeout(function(){
        //    //sessionStorage.removeItem("activeDetails");
        //    self.location.href="index1.html";
        //},1500);
    }
    layer.closeAll();
}
function userInfoMore(btn){
    sessionStorage.setItem("partyUserInfo",getUser);
    sessionStorage.setItem("partyPartUser",getPartUser);
    sessionStorage.setItem("partyWxInfo",getWxInfo);
    sessionStorage.setItem("joinActNum",joinActNum);
    //sessionStorage.removeItem("activeDetails");
    self.location.href="partyUserInfo.html";
}

//填写报名信息
function getPrompt(msg) {
    var modalhtml = "<div class=\"am-modal am-modal-prompt\" tabindex=\"-1\" id=\"mymodal\">" +
        "<div class=\"am-modal-dialog\">" +
        "<div class=\"am-modal-hd\">填写报名信息<a href=\"javascript: void(0)\" onclick=\"removePrompt(this)\" class=\"am-clos am-close1\" data-am-modal-close><img src='../img/x.png'></a></div>" +
        "<div class=\"am-modal-bd\" id=\"msg\">" +
        "<div class=\"ac-per ac-fill\"><div class=\"ac-fillimg\"><img src=\"../img/person.png\"></div><input type=\"text\" placeholder='姓名' maxlength='12' class=\"ad-inputs ad-getName\"/></div>" +
        "<div class=\"ac-phone2 ac-fill\"><div class=\"ac-fillimg\"><img src=\"../img/phone2.png\"></div><input type=\"tel\" placeholder='手机号' class=\"ad-inputs ad-getPhone\"/></div>" +
        "</div>" +
        "<div class=\"am-modal-footer\">" +
        "<span class=\"am-btnb\" onclick=\"event.cancelBubble = true;signUpEnter(this)\">确定</span></div></div></div>";
    $("body").append(modalhtml);
    $('#mymodal').modal('open');
    fixed();
}
//获取验证码
//function getPhoneCode(){
//
//    var userName=$(".ad-getName").val();
//    var phone=$(".ad-getPhone").val();
//    if(name(userName))
//    {
//        if(phoneMath(phone)){
//            var data='{"phone":"'+phone+'"}';
//            console.log(data);
//            AjaxSubmit("get", JSON.parse(data), basePath + "Login/getPhoneCode", getPhoneCode_fun);
//        }
//        else{
//            layerInfo("请输入正确的手机号码");
//        }
//    }
//   else{
//        layerInfo("请输入正确的姓名");
//    }
//}
function layerInfo(msg){
    $(".am-modal-dialog").find("input[type=text]").attr("readonly",true);
    //$(".ac-code").attr("onclick","");
    $(".am-btnb").attr("onclick","");
    layer.open({
        content: msg
        ,skin: 'msg'
        ,time: 1 //1.5秒后自动关闭
    });
    $(".layui-m-layer").addClass("layerChange");
    $(".layui-m-layermain").addClass("layerChange1");
    setTimeout(function(){
        $(".am-modal-dialog").find("input[type=text]").attr("readonly",false);
        //$(".ac-code").attr("onclick","getPhoneCode();event.cancelBubble = true");
        $(".am-btnb").attr("onclick","signUpEnter(this);event.cancelBubble = true");
    },1000);
}//提示框
function getPhoneCode_fun(res){
    if(res.result.code=="200")
    {
        setTime();
    }
    else if(res.result.code=="300"){
        layerInfo(res.result.detail);
    }
    else if(res.result.code=="3202")
    {
        layerInfo("短信发送失败")
    }
    else{
        layerInfo("获取验证码失败!");
    }
}
function signUpEnter(btn){
    var userName=$(".ad-getName").val();
    var phone=$(".ad-getPhone").val();
    //var code=$(".ad-getCode").val();
    var partId=$(".ad-quickSignUp").attr("data-id");
    var actId=$(".ad-quickSignUp").attr("data-actId");
    if(name(userName))
    {
        if(phoneMath(phone)){
            var data;
            if(actId!=null&&actId!=undefined&&actId!="")
            {
                data ='{"name":"'+userName+'","phone":"'+phone+'","partId":'+partId+',"actId":'+actId+'}';
            }
            else{
                 data='{"name":"'+userName+'","phone":"'+phone+'","partId":'+partId+',"actId":'+actId+'}';
            }
            console.log(data);
            AjaxSubmit("get", JSON.parse(data), basePath + "personnel/activitySignUp", activitySignUp_fun);
        }
        else{
            layerInfo("请输入正确的手机号码");
        }
    }
    else{
        layerInfo("请输入正确的姓名");
    }
}
function removePrompt(btn){
    $(".body").removeAttr("style");
    startDefault();
}
function activitySignUp_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        layerInfo("报名成功!");
        $('#mymodal').modal('close');
        $(".body").removeAttr("style");
        startDefault();
        var partId=JSON.parse(sessionStorage.getItem("partId"));
       
        if(partId!=null&&partId!=undefined&&partId!=""&&partId!="0")
        {
            setTimeout(function(){
                self.location.href="wxGzh2.html";
            },1500)
        }
    }
    else if(res.result.code=="300"){
        layerInfo(res.result.detail);
    }
    else{
        layerInfo("报名失败!");
    }
}

function setTime() {
    if (countdown == 0) {
        countdown = 60;
        //$(".ac-code").removeAttr("disabled");
        $(".ad-getPhone").removeAttr("disabled");
        //$(".ac-code").text("重新获取");
        clearInterval(setTime);
    } else {
        countdown--;
        //$(".ac-code").attr("disabled",true);
        //$(".ad-getPhone").attr("disabled",true);
        //$(".ac-code").text(countdown+"s");
        setTimeout(setTime,1000);
    }
}//验证码倒计时

function activeShare(btn){
$("#my-alerts").modal('open');
}
function closeThis(){
    $("#my-alerts").modal('close');
}
window.onload = function() {
    $("#configWXs").trigger("click");
};