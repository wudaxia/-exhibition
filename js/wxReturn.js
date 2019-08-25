$(function () {
});
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
            sessionStorage.setItem("wxToken","0");
            wxBack();
        }
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
        openmodal(res.result.detail);
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
    }
    else if(res.result.code=="3202")
    {
        openmodal("微信code失效");
    }
    else if(res.result.code=="3203")
    {
        self.location.href="wxGzh.html";
    }
    else{
        openmodal("登录失败");
        setTimeout(function () {
            self.location.href="index1.html";
        },1500)
    }
}