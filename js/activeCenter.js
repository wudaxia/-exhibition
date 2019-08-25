var is_invitation="";
$(function () { 
  var isPageHide = false; 
  window.addEventListener('pageshow', function () { 
    if (isPageHide) { 
      sessionStorage.removeItem("historyGo");
    } 
  }); 
  window.addEventListener('pagehide', function () { 
    isPageHide = true; 
  }); 
}) 
function openUserInfo(){
    sessionStorage.removeItem("historyGo");
    var activeCenter=JSON.parse(sessionStorage.getItem("activeCenter"));
    if(activeCenter==null||activeCenter==undefined||activeCenter=="")
    {
        openmodal("您没有该场活动的管理权限，请重新选择");
        setTimeout(function () {
            self.location.href="personalCenter.html";
        },1500);

    }
    else{
        var actId=activeCenter.actId;
        var partId=activeCenter.partId;
        var token=JSON.parse(sessionStorage.getItem("token"));
        //下级二维码
        $(".ac-nextInviteCode").attr("data-actId",actId);
        $(".ac-nextInviteCode").attr("data-partId",partId);

        //用户二维码
        $(".ac-userInviteCode").attr("data-actId",actId);
        $(".ac-userInviteCode").attr("data-partId",partId);
        //用户报名链接
        $(".ac-userInviteUrl").attr("data-actId",actId);
        $(".ac-userInviteUrl").attr("data-partId",partId);

        //下级管理
        $(".ac-nextManageList").attr("data-actId",actId).attr("data-partId",partId);


        //下级报名链接
        $(".ac-nextInviteUrl").attr("data-actId",actId).attr("data-partId",partId);


        //门票管理
        $(".ac-ticketList").attr("data-actId",actId).attr("data-partId",partId);


        //报名管理
        $(".ac-applylist").attr("data-actId",actId).attr("data-partId",partId);
        //下级活动拓展属性修改
        $(".ac-nextUserInfoUrl").attr("data-actId",actId).attr("data-partId",partId);
        //获取数据
        var data='{"token":"'+token+'","actId":'+actId+'}';
        AjaxSubmit("get",JSON.parse(data),basePath + "activity/getActivityInfoDetails",getActivityInfoDetails_fun);
        AjaxSubmit("get",JSON.parse(data),basePath + "activity/getActivityJur",getActivityJur_fun);
    }
}

//下级权限查看
function getActivityJur_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        if(res.dataPacket!=null&&res.dataPacket!=undefined&&res.dataPacket!="")
        {
            if(res.dataPacket.is_invitation!=null&&res.dataPacket.is_invitation!=undefined&&res.dataPacket.is_invitation!="")
            {
                is_invitation=res.dataPacket.is_invitation;
            }
        }
    }
    else if(res.result.code=="300")
    {
        openmodal(res.result.detail);
    }
    else if(res.result.code=="3200"){
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
        setTimeout(function () {
            self.location.href="wxGzh.html";
        },1500)
    }
    else{

    }
}
//用户报名链接

function goActiveDetails(btn){
    sessionStorage.setItem("activeDetailsStyle","1");
    sessionStorage.setItem("activeDetails",sessionStorage.getItem("activeCenter"));
    var activeCenter=JSON.parse(sessionStorage.getItem("activeCenter"));
    if(activeCenter==null||activeCenter==undefined||activeCenter=="")
    {
        openmodal("您没有该场活动的管理权限，请重新选择");
        setTimeout(function () {
            self.location.href="personalCenter.html";
        },1500);
    }
    else{
        var actId=activeCenter.actId;
        var partId=activeCenter.partId;
        self.location.href="activeModel.html?actId="+actId+"&partId="+partId+"";
    }
}


//链接到别的页面,需要传递的参数
function goOtherPage(btn){
    //下级报名二维码
    if($(btn).hasClass("ac-nextInviteCode"))
    {
        if(is_invitation=="1"){
            var actId= $(btn).attr("data-actId");
            var partId= $(btn).attr("data-partId");
            if((actId==null||actId==undefined||actId=="")&&(partId==null||partId==undefined||partId==""))
            {
                openmodal("请您重新选择需要管理的活动");
                setTimeout(function(){
                    self.location.href="personalCenter.html";
                },1500)
            }
            else{
                sessionStorage.setItem("acActId",JSON.stringify(actId));
                sessionStorage.setItem("acPartId",JSON.stringify(partId));
                sessionStorage.setItem("acImgStyle",JSON.stringify("1"));//1代表下级用户，2代表普通用户;
                self.location.href="inviteCodeNext.html";
            }
        }
        else{
            openmodal("您没有发展下线的权限");
        }
    }
    //用户报名二维码
    else if($(btn).hasClass("ac-userInviteCode"))
    {
        var actId= $(btn).attr("data-actId");
        var partId= $(btn).attr("data-partId");
        if((actId==null||actId==undefined||actId=="")&&(partId==null||partId==undefined||partId==""))
        {
            openmodal("请您重新选择需要管理的活动");
            setTimeout(function(){
                self.location.href="personalCenter.html";
            },1500)
        }
        else{
            sessionStorage.setItem("acActId",JSON.stringify(actId));
            sessionStorage.setItem("acPartId",JSON.stringify(partId));
            sessionStorage.setItem("acImgStyle",JSON.stringify("2"));//1代表下级用户，2代表普通用户;
            self.location.href="inviteCode.html";
        }
    }
    //用户报名链接
    else if($(btn).hasClass("ac-userInviteUrl"))
    {
        var actId= $(btn).attr("data-actId");
        var partId= $(btn).attr("data-partId");
        if((actId==null||actId==undefined||actId=="")&&(partId==null||partId==undefined||partId==""))
        {
            openmodal("请您重新选择需要管理的活动");
            setTimeout(function(){
                self.location.href="personalCenter.html";
            },1500)
        }
        else
        {
            sessionStorage.setItem("activeDetailsStyle","1");
            sessionStorage.setItem("activeDetails",sessionStorage.getItem("activeCenter"));
            self.location.href="activeModel.html?actId="+actId+"&partId="+partId+"";
        }
    }
    //下级管理
    else if($(btn).hasClass("ac-nextManageList"))
    {
        if(is_invitation=="1")
        {
            var actId= $(btn).attr("data-actId");
            var partId= $(btn).attr("data-partId");
            if((actId==null||actId==undefined||actId=="")&&(partId==null||partId==undefined||partId==""))
            {
                openmodal("请您重新选择需要管理的活动");
                setTimeout(function(){
                    self.location.href="personalCenter.html";
                },1500)
            }
            else{
                sessionStorage.setItem("acActId",JSON.stringify(actId));
                sessionStorage.setItem("acPartId",JSON.stringify(partId));
                sessionStorage.setItem("alStatus",JSON.stringify("1"));
                self.location.href="activeList.html";
            }
        }
        else{
            openmodal("您没有发展下线的权限");
        }
    }
    //下级报名链接
    else if($(btn).hasClass("ac-nextInviteUrl"))
    {
        if(is_invitation=="1")
        {
            var actId= $(btn).attr("data-actId");
            var partId= $(btn).attr("data-partId");
            if((actId==null||actId==undefined||actId=="")&&(partId==null||partId==undefined||partId==""))
            {
                openmodal("请您重新选择需要管理的活动");
                setTimeout(function(){
                    self.location.href="personalCenter.html";
                },1500)
            }
            else{
                sessionStorage.setItem("activeDetailsStyle","2");
                sessionStorage.setItem("activeDetails",sessionStorage.getItem("activeCenter"));
                /*   sessionStorage.setItem("applyName",sessionStorage.getItem("applyName"));*/
                var actId= $(btn).attr("data-actId");
                var partId= $(btn).attr("data-partId");
                self.location.href="nextSignUp.html?actId="+actId+"&partId="+partId+"";
            }
        }
        else{
            openmodal("您没有发展下线的权限");
        }
    }
    //门票管理
    else if($(btn).hasClass("ac-ticketList"))
    {
        var actId= $(btn).attr("data-actId");
        var partId= $(btn).attr("data-partId");
        if((actId==null||actId==undefined||actId=="")&&(partId==null||partId==undefined||partId==""))
        {
            openmodal("请您重新选择需要管理的活动");
            setTimeout(function(){
                self.location.href="personalCenter.html";
            },1500)
        }
        else{
            sessionStorage.setItem("acActId",JSON.stringify(actId));
            sessionStorage.setItem("acPartId",JSON.stringify(partId));
            self.location.href="ticket.html";
        }
    }
    //报名管理
    else if($(btn).hasClass("ac-applylist"))
    {
        var actId= $(btn).attr("data-actId");
        var partId= $(btn).attr("data-partId");
        if((actId==null||actId==undefined||actId=="")&&(partId==null||partId==undefined||partId==""))
        {
            openmodal("请您重新选择需要管理的活动");
            setTimeout(function(){
                self.location.href="personalCenter.html";
            },1500)
        }
        else{
            sessionStorage.setItem("acActId",JSON.stringify(actId));
            sessionStorage.setItem("acPartId",JSON.stringify(partId));
            self.location.href="ApplyActive.html";
        }
    }
    else if($(btn).hasClass("ac-nextUserInfoUrl"))
    {
        var actId= $(btn).attr("data-actId");
        var partId= $(btn).attr("data-partId");
        if((actId==null||actId==undefined||actId=="")&&(partId==null||partId==undefined||partId==""))
        {
            openmodal("请您重新选择需要管理的活动");
            setTimeout(function(){
                self.location.href="personalCenter.html";
            },1500)
        }
        else{
            sessionStorage.setItem("acActId",JSON.stringify(actId));
            sessionStorage.setItem("acPartId",JSON.stringify(partId));
            sessionStorage.setItem("urlReturnBack",JSON.stringify(window.location.href));
            self.location.href="nextSignUpExpand.html";
        }
    }
}


//获取顶部数量
function getActivityInfoDetails_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        if(res.dataPacket.part_user_tz!=null&&res.dataPacket.part_user_tz!=undefined&&res.dataPacket.part_user_tz!="")
        {
            $(".ac-activePeople").text(res.dataPacket.part_user_tz.active_num);
            $(".ac-activeSale").text(res.dataPacket.part_user_tz.sale_card_num);
            $(".ac-activeVisit").text(res.dataPacket.part_user_tz.visit_num);

        }

    }
}