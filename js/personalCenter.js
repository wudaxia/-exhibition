/**
 * Created by kangli on 2017/6/9.
 */
function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    var token=JSON.parse(sessionStorage.getItem("token"));
    $(".pe-bgBox").css("height",$(".content").height());
    var data='{"token":"'+token+'"}';
    AjaxSubmit("get",JSON.parse(data),basePath + "userCenter/getUserInfo",getUserInfo_fun);
    AfternineNumber();
}
function AfternineNumber(){
    var pc_num=$(".content").find("span");
    for(var i=0;i<pc_num.length;i++){
        var totalNum = $(pc_num).eq(i).text();
        if(totalNum>99){
            $(pc_num).eq(i).text("99");
        }
    }
}
function getUserInfo_fun(res){
console.log(res);
    if(res.result.code=="200")
    {
        var wx_info=res.dataPacket.wx_info;
        var status="";
        if(res.dataPacket.userinfo!=null&&res.dataPacket.userinfo!=""&&res.dataPacket.userinfo!=undefined)
        {
            if(res.dataPacket.userinfo.role_id=="0")
            {
                status="还未成功验证";
            }
            else if(res.dataPacket.userinfo.role_id=="1")
            {
                status="普通用户";
            }
            else if(res.dataPacket.userinfo.role_id=="2")
            {
                status="微信绑定用户";
            }
            $(".pc-userVip").text("["+status+"]");
        }
        else{

        }

        var imgUrl="";
        if(wx_info!=null&&wx_info!=""&&wx_info!=undefined)
        {
            if(wx_info.headimgurl!=null&&wx_info.headimgurl!=""&&wx_info.headimgurl!=undefined)
            {
                imgUrl=wx_info.headimgurl;
            }
            else{
                imgUrl='../img/head-img.png';
            }
            if(wx_info.nickname!=null&&wx_info.nickname!=""&&wx_info.nickname!=undefined){
                $(".pc-userName").text(wx_info.nickname);
                $(".pe-login").attr("data-id","1");
            }
            else{
                $(".pc-userName").text("未获取到您的昵称");
            }
        }
        else{
            imgUrl='../img/head-img.png';
        }
        $(".pc-headImg").attr("src",imgUrl);
    }
    else if(res.result.code=="300"){
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
        openmodal("获取信息失败");
    }
    layer.closeAll();
}
function goEditAndLogin(btn){
    if($(btn).attr("data-id")=="1")
    {
        self.location.href="userInfo.html";
    }
    else{
        self.location.href="login.html";
    }
}