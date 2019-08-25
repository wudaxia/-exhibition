/**
 * Created by Administrator on 2017/6/22 0022.
 */
function openUserInfo(){
    getUserInfo();
}
function getUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    $("body").css("min-height",$(window).height());
    var partyPartUser=JSON.parse(sessionStorage.getItem("partyPartUser"));
    var partyUserInfo=JSON.parse(sessionStorage.getItem("partyUserInfo"));
    var partyWxInfo=JSON.parse(sessionStorage.getItem("partyWxInfo"));
    var joinActive=JSON.parse(sessionStorage.getItem("joinActNum"));
    if(joinActive!=null&&joinActive!=undefined&&joinActive!="")
    {
     $(".pui-joinActive").text(joinActive+"次");
    }
    else{
        $(".pui-joinActive").text("0次");
    }
    //头部内容
    //获得头像
    var imgUrl;
    if(partyWxInfo!=null&&partyWxInfo!=undefined&&partyWxInfo!="")
    {
        if(partyWxInfo.headimgurl!=null&&partyWxInfo.headimgurl!=undefined&&partyWxInfo.headimgurl!="")
        {
            imgUrl=partyWxInfo.headimgurl;
        }
        else{
            imgUrl='../img/head-img.png';
        }
    }
    else{
        imgUrl='../img/head-img.png';
    }
    $(".pui-titleUserInfoImg").find("img").attr("src",imgUrl);

    if(partyPartUser!=null&&partyPartUser!=undefined&&partyPartUser!=""&&partyUserInfo!=null&&partyUserInfo!=undefined&&partyUserInfo!="")
    {
        //获得姓名
        $(".pui-titleUserInfoName").text(partyPartUser.apply_name);
        //联系电话
        $(".pui-body1BPhone").text(partyUserInfo.mobile_phone);
        $(".pui-body1BPhone").attr("href","tel:"+partyUserInfo.mobile_phone);
        //获得简介
        if(partyUserInfo.remark!=""&&partyUserInfo.remark!=undefined&&partyUserInfo.remark!=null)
        {
            $(".pui-newActive").text(partyUserInfo.remark);
        }
        //注册时间
        //$(".pui-createTime").text(changeTime2(partyUserInfo.create_time*1000));
        //何种用户
        var role_id=partyUserInfo.role_id;
        if(role_id=="0")
        {
            $(".pui-titleUserInfoOther1").text("未验证用户");
        }
        else if(role_id=="1")
        {
            $(".pui-titleUserInfoOther1").text("普通用户");
        }
        else if(role_id=="2")
        {
            $(".pui-titleUserInfoOther1").text("已微信绑定");
        }
        else{
            $(".pui-titleUserInfoOther1").text("未验证用户");
        }
    }
    else{
        openmodal("请选择一个活动参与人信息");
        setTimeout(function(){
            self.location.href="activeModel.html";
        },1500);
    }

    //获得历史活动
    //var actId=partyPartUser.activity_id;
    //var partId=partyPartUser.part_id;
    //if(actId!=null&&actId!=undefined&&actId!=""&&partId!=null&&partId!=undefined&&partId!="")
    //{
    //    var data='{"partId":'+partId+',"actId":'+actId+'}';
    //    AjaxSubmit("get", JSON.parse(data), basePath + "activity/getPartUserActivity", getPartUserActivity_fun)
    //}
    layer.closeAll();
}//获取活动人的相关数据
//function getPartUserActivity_fun(res){
//    console.log(res);
//    if(res.result.code=="200")
//    {
//        var activeTitleDiv="";
//        if(res.dataPacket!=null&&res.dataPacket!=""&&res.dataPacket!=undefined)
//        {
//            if(res.dataPacket.activtiyList!=null&&res.dataPacket.activtiyList!=undefined&&res.dataPacket.activtiyList!="")
//            {
//                if(res.dataPacket.activtiyList.length>0)
//                {
//                    $.each(res.dataPacket.activtiyList,function(i,activeTitle){
//                        if(activeTitle.activity!=null&&activeTitle.activity!=""&&activeTitle.activity!=undefined)
//                        {
//                             activeTitleDiv+="<p class=\"pui-createTime\">活动名称："+activeTitle.activity.title+"</p><p class=\"pui-createTime\">加入时间："+changeTime2((activeTitle.apply_time)*1000)+"</p>";
//                        }
//                    });
//                }
//                else{
//                    activeTitleDiv="该负责人之前未参加过活动";
//                }
//            }
//            else{
//                activeTitleDiv="该负责人之前未参加过活动";
//            }
//        }
//        else{
//            activeTitleDiv="该负责人之前未参加过活动";
//        }
//        $(".pui-newActive").append(activeTitleDiv);
//    }
//    else if(res.result.code=="300")
//    {
//        openmodal(res.result.detail);
//    }
//    else{
//        openmodal("获取参与活动信息失败");
//    }
//}