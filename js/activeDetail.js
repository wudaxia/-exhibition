/**
 * Created by MyPC on 2017/6/21.
 */
function openUserInfo(){
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    getSonPersonInfo();
}

function changeTime1(timeStr) {
    var date = new Date(timeStr*1000);
    var dateYear = date.getFullYear();
    var dateMonth = date.getMonth() + 1;
    var dateHour = date.getHours();
    var dateMin = date.getMinutes();
    var dateSen = date.getSeconds();
    var dateDay = date.getDate();
    var dateStr =  dateMonth + "-" + dateDay ;
    return dateStr;
}//时间戳转换为年月日



//获取下级管理详情
function  getSonPersonInfo(){
    //var url=basePath+"personnel/getSonPersonInfo";
    var token=JSON.parse(sessionStorage.getItem("token"));
    var partId=JSON.parse(sessionStorage.getItem("partid"));
    var actId=JSON.parse(sessionStorage.getItem("acActId"));
    var data='{"token":"'+token+'","actId":'+actId+',"partId":'+partId+'}';
    console.log(data);
    AjaxSubmit("get",JSON.parse(data),basePath + "personnel/getSonPersonInfo",getSonPersonInfo_fun);
}

//获得下级管理详情数据
function getSonPersonInfo_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        var str="";
        var str2="";
        var state;
        //$.each(e.dataPacket.sonpart,function(i,n){
        //   console.log(n.dataPacket.sonpart);
        //console.log(  changeTime(n.apply_time))
        //进入页面时权限状态判断
        if(res.dataPacket.sonpart.is_invitation==0){
            state="checked";
        }else{
            state="null";
        }
        str2+="<div id=\"m-cont-text\">" +
            "<span id=\"ac-wxname\">微信用户</span><br />" +
            "<span class=\"m-cont-text1\">允许开放邀请&nbsp;|&nbsp;<span class=\"ad-openNext\">已开放</span></span>" +
            "<div class=\"an-btn\">" +
            "<input name=\"status\" type=\"checkbox\" data-size=\"small\" id=\"status1\" class=\"switch-mini \" "+state+"/>" +
            "</div>" +
            "</div>";
        $(".m-cont").append(str2);
        $("#ac-wxname").html(res.dataPacket.sonpart.apply_name);
        if(res.dataPacket.sonpart.wxinfo==null||res.dataPacket.sonpart.wxinfo==""||res.dataPacket.sonpart.wxinfo==undefined)
        {
            $(".a-con-t").html("未绑定微信号");
        }
        else{
            $(".a-con-t").html(res.dataPacket.sonpart.wxinfo.nickname);
        }
        $(".a-con-t1").html(res.dataPacket.phone);
        $(".m-left").html( changeTime1(res.dataPacket.sonpart.apply_time));
        $("#ac-time").html( changeTime(res.dataPacket.sonpart.apply_time));
        $("#num").html(res.dataPacket.activeCount);
        $("#num3").html(res.dataPacket.allCardNum);
        $("#num1").html(res.dataPacket.saleCardNum);
        //底部导航
        check(res.dataPacket.sonpart.state);
        //动态附着上去
        str+="<ul><li onclick=\"phone1("+res.dataPacket.phone+")\"><i class=\"am-icon-phone\"></i>打电话</li><li onclick=\"sms("+ res.dataPacket.phone+")\"> <i class=\"am-icon-envelope\"></i>发短信</li></ul>";
        $(".a-active").append(str);
        if(res.dataPacket.sonpart.is_invitation==0){
            $(".ad-openNext").text("已禁用");
        }else if(res.dataPacket.sonpart.is_invitation==1){
            $(".ad-openNext").text("已开放");
        }
        else{
            $(".ad-openNext").text("获取失败");
        }
        //$(".ad-openNext").attr("data-is_invitation",res.dataPacket.sonpart.is_invitation);
        if(res.dataPacket.sonpart.is_invitation=="1")
        {
            $(".ad-openNext").attr("data-is_invitation","0");
        }
        else{
            $(".ad-openNext").attr("data-is_invitation","1");
        }
        $(".ad-openNext").attr("data-partId",res.dataPacket.sonpart.part_id);
        $('[name="status"]').bootstrapSwitch({    //初始化按钮
            onText:"开放",
            offText:"禁用",
            onColor:"success",
            offColor:"info",
            size:"small",
            onSwitchChange:function(event,state){
                if(state==true){
                    $(this).val("1");
                    permissions();

                }else{
                    $(this).val("2");
                    permissions();
                }
            }
        });

        //审核状态
        if (res.dataPacket.sonpart.state=="1"){
            $(".m-right").html("申请中");
        }else if (res.dataPacket.sonpart.state=="2"){
            $(".m-right").html("已审核");
        }
        else if(res.dataPacket.sonpart.state=="3")
        {
            $(".m-right").html("已拒绝");
        }
        else if(res.dataPacket.sonpart.state=="4"){
            $(".m-right").html("已禁用");
        }
        var fieldlist=res.dataPacket.fieldlist;
        var fieldDiv="";
        if(fieldlist!=null&&fieldlist!=""&&fieldlist!=undefined)
        {
            if(fieldlist.length>0)
            {
                $.each(fieldlist,function(fied,body){
                    if(body.data_type=="file")
                    {
                        fieldDiv+='<div> ' +
                            '<span class="ad-ticketDetails">'+body.title+'：</span>';
                        if(body.value!=null&&body.value!=undefined&&body.value!=undefined)
                        {
                            var values=body.value.split(",");
                            $.each(values,function (o,valImg) {
                                fieldDiv+='<span><img src="'+valImg+'" style="width: 80px;height: 80px;margin-right: 10px;"/></span>';
                            })
                        }

                        fieldDiv+='</div> ';
                    }
                    else{
                        fieldDiv+='<div> ' +
                            '<span class="ad-ticketDetails">'+body.title+'：</span><span>'+body.value+'</span>' +
                            '</div>';
                    }
                });
                $(".a-dingdan2").append(fieldDiv);
            }
            else{
                $(".a-dingdan2").remove();
            }
        }
        else{
            $(".a-dingdan2").remove();
        }
    }
    else if(res.result.code=="300")
    {
        openmodal(res.result.detail);
    }
    else if(res.result.code=="3201")
    {
        sessionStorage.setItem("token",JSON.stringify(res.dataPacket.token));
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
        openmodal("您未绑定微信，请去绑定");
        setTimeout(function(){
            self.location.href="login.html";
        },1500)
    }
    else if(res.result.code=="3200")
    {
        openmodal("登录失效");
        sessionStorage.removeItem("token");
        sessionStorage.setItem("wxToken","0");
        wxBack();
    }
    else{
        openmodal("获取信息失败，请重新选择");
        setTimeout(function(){
            self.location.href="applyActive.html";
        },1500)
    }
    layer.closeAll();
}



//直接拨打电话
function  phone1(a){
    self.location.href="tel:"+a;
}
//发送短信功能
function sms(b){
    self.location.href="sms:"+b;
}


//进入页面时申请状态判断
function check(k){
  $(".m-footer").each(function(){
      if(k==$(this).attr("data-id"))
      {
          $(this).removeClass("hide").siblings(".m-footer").addClass("hide");
      }
  })
}



//修改下级用户状态-审核通过
function  editPersonState(btn){
    var partid=sessionStorage.getItem("partid");
    var url=basePath+"personnel/editPersonState";
    var token=JSON.parse(sessionStorage.getItem("token"));
    var statue=$(btn).attr("data-id");
    var actId=JSON.parse(sessionStorage.getItem("acActId"));
    if(actId!=null&&actId!=undefined&&actId!="")
    {
        var data={
            "token":token,
            "status":statue,
            "partIdList":partid,
            "actId":actId
        };
        $.get(url,data, function (e) {
            if(e.result.code=="200"){
                openmodal("审核操作成功");
                setTimeout(function(){
                    self.location.href="activeList.html"
                },1500);
            }
            else if(e.result.code=="300"){
                openmodal(e.result.detail);
            }
            else{
                openmodal("审核操作失败");
            }
        });
    }
    else{
        openmodal("活动获取失效，请重新获取");
        setTimeout(function(){
            self.location.href="personalCenter.html";
        },1500);
    }

}

//修改下级用户状态-审核不通过

function  comeback(){
    self.location.href ="activeList.html";
}

//修改用户邀请权限
function  permissions(){
    //  console.log( n.dataPacket.sonpart.part_id);
    //console.log( $(".switch-mini").attr("data-partid"))
    var url=basePath+"personnel/editPersonJurisdiction";
    var token=JSON.parse(sessionStorage.getItem("token"));
    var partId= $(".ad-openNext").attr("data-partId");
    var status=$(".ad-openNext").attr("data-is_invitation");
    var actId=JSON.parse(sessionStorage.getItem("acActId"));
    if(actId!=null&&actId!=undefined&&actId!="")
    {
        var data='{"token":"'+token+'", "status":'+status+', "partIdList":'+partId+',"actId":'+actId+'}';
        console.log(data);
        AjaxSubmit("get",JSON.parse(data),basePath + "personnel/editPersonJurisdiction",editPersonJurisdiction_fun);
    }
    else{
        openmodal("活动失效，请重新选择");
        setTimeout(function(){
            self.location.href="personalCenter.html";
        },1500)
    }
}
function editPersonJurisdiction_fun(res){
    console.log(res);
    var status=$(".ad-openNext").attr("data-is_invitation");
    if(res.result.code=="200")
    {
        if(status==0)
        {
            $(".ad-openNext").attr("data-is_invitation","1");
            $(".ad-openNext").text("已开启");
        }
        else{
            $(".ad-openNext").attr("data-is_invitation","0");
            $(".ad-openNext").text("已禁用");
        }
        openmodal("更改成功");
    }
    else if (res.result.code=="300"){
        $("#status1").trigger("click");
        openmodal(res.result.detail);
    }
    else{
        $("#status1").trigger("click");
        openmodal("更改失败");
    }
}
//修改用户邀请权限
//function  permissions1(){
//    //console.log($(".switch-mini").attr("data-partid"))
//    var url=basePath+"personnel/editPersonJurisdiction";
//    var token=JSON.parse(sessionStorage.getItem("token"));
//    var partId= $(".ad-openNext").attr("data-partId");
//    var status=$(".ad-openNext").attr("data-is_invitation");
//    var data={"token":token, "status":1, "partIdList":sessionStorage.getItem("partid")}
//    $.get(url,data,function(res){
//        if(res.result.code=="200")
//        {
//            openmodal("更改成功");
//            $(".status1")
//        }
//        else if (res.result.code=="300"){
//            openmodal(res.result.details);
//        }
//        else{
//            openmodal("更改失败");
//        }
//    })
//}