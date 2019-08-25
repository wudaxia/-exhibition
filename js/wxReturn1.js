function wxLogins(){
    fixed();
    fixedTextarea();
    var token=sessionStorage.getItem("token");
    if(token==""||token==null||token==undefined)
    {
        var code=GetQueryString("code");
        //var code="15757831215";
        if(code!=null&&code!=""&&code!=undefined)
        {
            //console.log(GetQueryString("code"));
            var wxData='{"code":"'+code+'"}';
            AjaxSubmit("get",JSON.parse(wxData),basePath + "Login/wxLogin",wxLogin_fun);
        }
        else{
            openUserInfo();
            //wxBack();
        }
        //else{
        //    openmodal("未获取到相关信息");
        //    setTimeout(function () {
        //        sessionStorage.setItem("wxToken","0");
        //        wxBack();
        //    },1500);
        //}
    }
    else
    {
        openUserInfo();
    }
}
function wxLogin_fun(res){
    if(res.result.code=="200")
    {
        sessionStorage.setItem("token",JSON.stringify(res.dataPacket.token));
        openUserInfo();
    }
    else if(res.result.code=="300")
    {
        openUserInfo();
    }
    else if(res.result.code=="3200")
    {
        openmodal("登录失效");
        sessionStorage.removeItem("token");
        sessionStorage.setItem("wxToken","0");
        wxBack();
    }
    else if(res.result.code=="3201")
    {
        //sessionStorage.setItem("returnUrl",JSON.stringify(window.location.href));
        //sessionStorage.setItem("token",JSON.stringify(res.dataPacket.token));
        //sessionStorage.setItem("token",JSON.stringify(res.dataPacket.token));
        openUserInfo();
    }
    else{
        openUserInfo()
    }
}
