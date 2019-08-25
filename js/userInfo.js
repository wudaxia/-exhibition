/**
 * Created by kangli on 2017/6/19.
 */
function openUserInfo(){
    var token=JSON.parse(sessionStorage.getItem("token"));
    var data='{"token":"'+token+'"}';
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    AjaxSubmit("get",JSON.parse(data),basePath + "userCenter/getUserInfo",getUserInfo_fun);
}
/*function goto(i){
 console.log(i)
 if(i==3){
 window.location.href="userinfoDetail.html";

 }
 open22(i);
 }*/
function getUserInfo_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        sessionStorage.setItem("userInfos",JSON.stringify(res.dataPacket.userinfo));
        var wx_info=res.dataPacket.wx_info;
        var user_info=res.dataPacket.userinfo;
        var imgUrl="";
        if(wx_info!=null&&wx_info!=""&&wx_info!=undefined)
        {
            //微信头像
            if(wx_info.headimgurl!=null&&wx_info.headimgurl!=""&&wx_info.headimgurl!=undefined)
            {
                imgUrl=wx_info.headimgurl;
            }
            else{
                imgUrl='../img/head-img.png';
            }
            //微信昵称
            if(wx_info.nickname!=null&&wx_info.nickname!=""&&wx_info.nickname!=undefined){
                $(".us-nickname1").text(wx_info.nickname);
            }
            else{
                $(".us-nickname1").text("没有昵称");
            }
            if(wx_info.sex!=null&&wx_info.sex!=""&&wx_info.sex!=undefined){
                if(wx_info.sex=="1"){
                    $(".us-nicknam2").text("男");
                }
                else{
                    $(".us-nicknam2").text("女");
                }
            }
            else{
                $(".us-nicknam2").text("不明");
            }
        }
        else{
            imgUrl='../img/head-img.png';
        }
        $(".us-nicknam3").text(user_info.mobile_phone);
        $(".us-nicknam4").text(changeTime2(user_info.create_time*1000));
       // if(user_info.remark!=null&&user_info.remark!=""&&user_info.remark!=undefined)
       // {
       //     $(".us-nicknam5").text("查看简介");
       // }
       //else{
       //     $(".us-nicknam5").text("无");
       // }
        $(".us-headimg").attr("src",imgUrl);
        $(".us-head").attr("data-img",imgUrl);
    }
    else if(res.result.code=="300"){
        openmodal(res.result.detail);
        sessionStorage.removeItem("token");
    }
    else if(res.result.code=="3200")
    {
        openmodal("登录失效");
        sessionStorage.removeItem("token");
        sessionStorage.setItem("wxToken","0");
        wxBack();
    }
    else{
        openmodal("获取信息失败");
        setTimeout(function () {
            self.location.href="personalCenter";
        },1500)
    }
    layer.closeAll();
}
function noGoTo(btn){
    openmodal("抱歉，手机号码不可更改");
}//手机号码不可修改
function goTo(btn){
    var UserInfoStyle=$(btn).attr("data-id");
    if($(btn).attr("data-id")=="1")
    {
        var UserInfoStyleImg=$(btn).attr("data-img");
        sessionStorage.setItem("UserInfoStyleImg",JSON.stringify(UserInfoStyleImg));
    }
    else if($(btn).attr("data-id")=="4")
    {

    }
    sessionStorage.setItem("userInfo",JSON.stringify(UserInfoStyle));
    self.location.href="userInfoDetail.html";
}//跳转到修改页面