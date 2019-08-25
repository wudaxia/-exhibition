var countdown =60;
function wxLogins(){
    $(".l-enter").click(function () {
        openloadmodal();
        var user=$(".l-user").val();//获取填入的手机号
        var pass=$(".l-pass").val();//获取验证码
        var token=JSON.parse(sessionStorage.getItem("token"));
        if(phoneText()==true)//判断手机号的格式
        {
            if(pass!=""&&pass!=null&&pass!=undefined)//判断是否填入验证码
            {
                var data='{"token":"'+token+'","phone":"'+user+'","code":"'+pass+'"}';
                AjaxSubmit("get", JSON.parse(data), basePath + "Login/UserWxBind",UserWxBind_fun);
            } else {openmodal("请输入验证码");}
        }
        closeloadmodal();
    })//点击登录后操

}
//获取验证码
function getCode(){
    openloadmodal();
    var user=$(".l-user").val();//获取填入的手机号
    var pass=$(".l-pass").val();//获取填验证码
    if(phoneText()==true)
    {
        var data='{"phone":"'+user+'"}';
        AjaxSubmit("get", JSON.parse(data), basePath + "Login/getPhoneCode",getPhoneCode_fun);
    }
    closeloadmodal();
}
function setTime() {
    if (countdown == 0) {
        countdown = 60;
        $(".l-getPass").attr("onclick","getCode()");
        $(".l-user").removeAttr("disabled");
        $(".l-getPass").text("重新获取");
        clearInterval(setTime);
    } else {
        countdown--;
        $(".l-getPass").attr("onclick","");
        $(".l-user").attr("disabled",true);
        $(".l-getPass").text(countdown+"s");
        setTimeout(setTime,1000);
    }
}//验证码倒计时
function getPhoneCode_fun(result){
    console.log(result.result.code);
    if(result.result.code=="200")
    {setTime();}
    else if(result.result.code=="300")
    {
        openmodal("验证码错误");
    }
    else if(result.result.code=="3201")
    {openmodal("短信发送异常，请稍后再试");}
    else if(result.result.code=="3202")
    {openmodal("60S内重复获取验证码");}
}//获取手机验证码

function phoneText(){
    var user=$(".l-user").val();//获取填入的手机号
    var pass=$(".l-pass").val();//获取验证码
    if(user != ""&& user!=null && user!=undefined)//判断是否填入手机号
    {
        if(phoneMath(user)==true)//判断手机号的格式
        {
            return true;
        }
        else {openmodal("请输入正确的手机号码");}
    }
    else {openmodal("请输入手机号码");}
}//验证手机号是否为空及格式
function UserWxBind_fun(wxres){
    console.log(wxres);
    if(wxres.result.code=="200")
    {
        sessionStorage.removeItem("token");
        openmodal("绑定成功");
        var returnUrl=JSON.parse(sessionStorage.getItem("returnUrl"));
        var linkUrl=JSON.parse(sessionStorage.getItem("linkUrl"));
        var linkUrls=JSON.parse(sessionStorage.getItem("linkUrls"));
        if(linkUrls!=null&&linkUrls!=undefined&&linkUrls!=""&&linkUrls=="1"&&linkUrl!=null&&linkUrl!=undefined&&linkUrl!="")
        {
            setTimeout(function(){
                sessionStorage.removeItem("linkUrls");
                self.location.href=linkUrl;
            },1500);
        }
        else if(returnUrl!=null&&returnUrl!=undefined&&returnUrl!="")
        {
            //sessionStorage.removeItem("personalCenter");
            setTimeout(function(){
                self.location.href=returnUrl;
            },1500);
        }
        else{
            setTimeout(function(){
                self.location.href="index1.html";
            },1500);
        }
    }
    else if(wxres.result.code=="3201"){
        openmodal("验证码输入错误");
    }
    else if(wxres.result.code=="3200")
    {
        openmodal("登录失效");
        sessionStorage.removeItem("token");
        sessionStorage.setItem("wxToken","0");
        wxBack();
    }
    else if(wxres.result.code=="300"){
        openmodal("验证错误，请重新验证");
    }
    else if(wxres.result.code=="3202"){
        openmodal("获取失败，请重新登录");
    }
    else if(wxres.result.code=="3203")
    {
        self.location.href="wxGzh.html";
    }
    else{
        openmodal("获取失败");
    }
}
