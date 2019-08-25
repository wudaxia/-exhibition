var pageIndex=1;
var pageCount=4;
var lastLength=pageCount;
var over = 1;
var limited = 999999999999999999;
var status1=1;
function openUserInfo(){
    $(".loadBox").html(addGetMoreInfo());
    $(".m-main").remove();
    $(".my-sectionTitleLi").each(function(){
        if($(this).hasClass("my-sectionTitleLiChose"))
        {
            status1=$(this).attr("data-id");
        }
    });
    getPersonList();
    getMoreover();
}
//筛选
function choseState(btn){
    if($(btn).hasClass("my-sectionTitleLiChose"))
    {

    }
    else{
        $(btn).addClass("my-sectionTitleLiChose").siblings(".my-sectionTitleLi").removeClass("my-sectionTitleLiChose");
        status1=$(btn).attr("data-id");
        pageIndex=1;
        limited = 999999999999999999;
        $(".m-main").remove();
        over=1;
        getPersonList();
        getMoreover();
    }
}
//处理
function batchs(btn){
    $(".inputtype").removeClass("disn");
    $(".inputtype").find("input").removeAttr("checked");
    $(".m-footer").each(function(){
        if($(this).attr("data-id")=="11")
        {
            $(this).removeClass("disn").siblings(".m-footer").addClass("disn");
        }
    });
}

//取消
function noChose(btn){
    $(".inputtype").addClass("disn");
    $(".inputtype").find("input").removeAttr("checked");
    $(".m-footer").each(function(){

        if($(this).attr("data-id")==$(btn).parent().attr("data-id").slice(0,length-1))
        {
            $(this).removeClass("disn").siblings(".m-footer").addClass("disn");
        }
    });
}
//取消1
function noChose1(btn){
    $(".inputtype").find("input").removeAttr("checked");
    $(".m-footer").each(function(){

        if($(this).attr("data-id")==$(btn).parent().attr("data-id").slice(0,length-1))
        {
            $(this).removeClass("disn").siblings(".m-footer").addClass("disn");
        }
    });
}
//批量选择
function batchProcess(btn){
    $(".inputtype").removeClass("disn");
    $(".inputtype").find("input").each(function(){
        $(this).prop("checked","checked");
    });
    $(".m-footer").each(function(){
        if($(this).attr("data-id")=="111")
        {
            $(this).removeClass("disn").siblings(".m-footer").addClass("disn");
        }
    });
}

//弹窗
function  next(){
    var count=0;
    var obj = document.getElementsByName("test");
    for (var i in obj) {
        if(obj[i].checked) {
            count++;
        }
    }
    if(count==0)
    {
        openmodal("请至少选择一个人进行操作");
    }
    else{
        layer.open({
            style:'float:right;width:90%;height:100%;',
            content: '<div class="s-screen">操作</div>' +
            '<div class="clear"></div>' +
            '<div class="s-cont">' +
            '<div class="s-title">审核处理</div>' +
            '<div class="s-btn">' +
            '<ul class="s-btnUl1">' +
            '' +
            '<li><button type="button"class="am-btn am-btn-primary am-radius bt1 nb1" data-id="2" onclick="djs(this)">审核通过</button></li>' +
            '<li><button type="button"class="am-btn am-btn-primary am-radius bt1" onclick="djs(this)" data-id="3">拒绝审核</button></li>' +
            '<li><button type="button"class="am-btn am-btn-primary am-radius bt1" data-id="4" onclick="djs(this)">账号禁用</button></li>' +
            '<li><button type="button"class="am-btn am-btn-primary am-radius bt1" data-id="2" onclick="djs(this)">账号恢复</button></li>' +
            '</ul><div class="clear"></div>' +
            '</div></div><div class="s-cont"><div class="s-title">邀请权限</div><div class="s-btn"><ul class="s-btnUl2">' +
        '' +
        '<li><button type="button" class="am-btn am-btn-primary am-radius bt1" data-name="1" onclick="djs(this)">开启</button></li>' +
        '<li><button type="button" class="am-btn am-btn-primary am-radius bt1" data-name="0" onclick="djs(this)">禁用</button></li>' +
        '</ul><div class="clear"></div><br></div></div><div class="clear"></div>' +
            '<div class="m-footer">' +
            '<div class="m-left-2 cz1" onclick="qx()">取消</div><div class="m-right-2" onclick="confirm(this)">确定</div>' +
            '</div>'
        });
    }
}



//跳转页面
function tz(btn,w){
	self.location.href="activeDetail.html"
    sessionStorage.setItem("partid",w);
}

	
//判断按钮的状态，如果被选中则出现样式
function djs(btn){
    if($(btn).hasClass("nb1"))
    {

    }
    else{
        $(".bt1").removeClass("nb1");
        $(btn).addClass("nb1")
    }

}

//function dj(btn){
//    if($(btn).hasClass("nb1"))
//    {
//
//    }
//    else{
//        $(".bt1").removeClass("nb1");
//        $(btn).addClass("nb1")
//    }
//}
//重置
//function cz(){
//    $(".bt1").each(function(){
//        if($(this).attr("datastate")=="1")
//        {
//
//        }
//    });
//    $(".bt1").removeClass("nb1");
//    $(".bt1").addClass("nb1");
//}
//取消
function  qx(){
    layer.closeAll();
}


//弹窗
//function sx(){
//    layer.open({
//        style:'float:right;width:90%;height:100%;',
//        content: '<div class="s-screen">筛选</div><div class="clear"></div><div class="s-cont"><div class="s-title">审核状态</div>' +
//        '<div class="s-btn"><ul>' +
//        '<li><button type="button"class="am-btn am-btn-primary am-radius bt1 nb1" onclick="dj(this)" datastate="1">申请中</button></li>' +
//        '<li><button type="button"class="am-btn am-btn-primary am-radius bt1" onclick="dj(this)" datastate="2">已审核</button></li>' +
//        '<li><button type="button"class="am-btn am-btn-primary am-radius bt1" onclick="dj(this)" datastate="3">已拒绝</button></li>' +
//        '<li><button type="button"class="am-btn am-btn-primary am-radius bt1" onclick="dj(this)" datastate="4">已禁用</button></li>' +
//        '</ul><br/></div></div><div class="clear"></div>' +
//        '<div class="m-footer"><div class="m-left-2 cz1" onclick="qx()">取消</div>' +
//        '<div class="m-right-2" onclick="makesure()">确定</div></div>'
//    });
//}
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







//获取下级管理
function  getPersonList(){
    $("#over").removeClass("hide");
    $(".o-blank").remove();
    openGetMore();
	var url=basePath+"personnel/getPersonList";
    var token=JSON.parse(sessionStorage.getItem("token"));
    var actId=JSON.parse(sessionStorage.getItem("acActId"));
    var partyId=JSON.parse(sessionStorage.getItem("acPartId"));
    if(partyId!=null&&partyId!=undefined&&partyId!=""&&actId!=null&&actId!=undefined&&actId!="")
    {
        console.log(status1);
        var data={
            "token":token,
            "status":status1,
            "pageIndex":pageIndex,
            "pageCount":pageCount,
            "actId":actId
        }
        console.log(status1);
        $.get(url,data,function(e){
            console.log(e);

            if(e.result.code=="200") {
                over=1;
                lastLength=e.dataPacket.userList.length;
                $.each(e.dataPacket.userList, function (i, n) {
                    //console.log(n)
                    //      拼接处理
                    var status;
                    if(n.state=="1")
                    {
                        status="申请中";
                    }
                    else if(n.state=="2")
                    {
                        status="已审核";
                    }
                    else if(n.state=="3")
                    {
                        status="已拒绝";
                    }

                    else if(n.state=="4"){
                        status="已禁用";
                    }
                    else{
                        status="未知状态";
                    }
                    if(n.is_invitation==0){
                        state="checked";

                    }else{
                        state="null";
                    }

                    var imgUrl="";
                    if(n.wxinfo!=null&&n.wxinfo!=""&&n.wxinfo!=undefined)
                    {
                        //微信头像
                        if(n.wxinfo.headimgurl!=null&&n.wxinfo.headimgurl!=""&&n.wxinfo.headimgurl!=undefined)
                        {
                            imgUrl=n.wxinfo.headimgurl;
                        }
                        else{
                            imgUrl='../img/head-img.png';
                        }
                    }
                    else{
                        imgUrl='../img/head-img.png';
                    }

                    var str1="";
                    str1+="<div class=\"m-main\"><div class=\"m-type\"><span class=\"m-left\">"+changeTime1(n.apply_time)+"</span><span class=\"m-right\">"+ status+"</span><div class=\"clear\"></div></div>"
                    str1+="<div class=\"m-cont\"  onclick=\"tz(this,"+ n.part_id+")\"><div class=\"inputtype disn\"><input class=\"type1\" type=\"checkbox\" onclick=\"event.cancelBubble = true;\"  value="+ n.part_id+" name=\"test\"/></div><img  class=\"al-userImg\" src="+imgUrl+">"
                    str1+="<div class=\"m-cont-text\"><p class=\"ac-name-w\">"+n.apply_name+"</p><p class=\"m-cont-text1\">邀请功能|<span class=\"ad-openNext\"></span></p></div>"
                    str1+=" <div class=\"an-btn\"><input name=\"status\" data-partId="+ n.part_id+"      type=\"checkbox\" data-size=\"small\" id=\"status1\" class=\"switch-mini \" "+state+"></div></div></div></div>"
                    $("#thelist").append(str1);
                    if(n.is_invitation==0){
                        $(".ad-openNext").text("已禁用");
                    }else if(n.is_invitation==1){
                        $(".ad-openNext").text("已开放");
                    }
                    //$("#thelist").css("height","auto")

                    //修改用户邀请权限
                    function  permissions(){
                        var url=basePath+"personnel/editPersonJurisdiction";
                        var token=JSON.parse(sessionStorage.getItem("token"));
                        var actId=JSON.parse(sessionStorage.getItem("acActId"))
                        var data={
                            "token":token,
                            "status":0,
                            "actId":actId,
                            "partIdList":$(".switch-mini").eq(i).attr("data-partid"),

                        };
                        console.log(data);
                        $.get(url,data,function(res){
                             if(res.result.code=="200")
                            {
                                $(".ad-openNext").text("已禁用");
                            }
                        })
                    }
                    //修改用户邀请权限
                    function  permissions1(){
                        //console.log($(".switch-mini").attr("data-partid"))
                        var url=basePath+"personnel/editPersonJurisdiction";
                        var token=JSON.parse(sessionStorage.getItem("token"));
                        var actId=JSON.parse(sessionStorage.getItem("acActId"));
                        var data={
                            "token":token,
                            "status":1,
                            "actId":actId,
                            "partIdList":$(".switch-mini").eq(i).attr("data-partid"),

                        };
                        console.log(data);
                        $.get(url,data,function(res){
                            if(res.result.code=="200")
                            {
                                $(".ad-openNext").text("已开放");
                            }
                        })
                    }

                    $('[name="status"]').bootstrapSwitch({    //初始化按钮
                        onText:"开放",
                        offText:"禁用",
                        onColor:"success",
                        offColor:"info",
                        size:"small",
                        onSwitchChange:function(event,state){
                            if(state==true){
                                $(this).val("1");
                                permissions();//开启
                                //   console.log("这是关闭状态，开始按钮显示出来")
                            }else{
                                $(this).val("2");
                                permissions1();//关闭
                                //   console.log("这是开启状态，关闭按钮显示出来")
                            }
                        }
                    });
                });
                if(pageCount >e.dataPacket.userList.length)
                {
                    console.log(33);
                    over=0;
                    if(pageIndex==1&&e.dataPacket.userList.length ==0)
                    {  closeGetMore();
                        $("#over").addClass("hide");
                        $(".o-blank").remove();
                        var blank=$('<div class="o-blank"><img src="../img/blank_05.png"/><div class="o-blankWord">还没有相关的下级人员</div></div>')
                        $("#thelist").append(blank);
                        //$("#wrapper").css("height","auto")
                    }
                    //$("o-blank").remove()
                }
            }
            else if(e.result.code=="3200"){
                openmodal("登录失效");
                sessionStorage.removeItem("token");
                sessionStorage.setItem("wxToken","0");
                wxBack();
            }
            else if(e.result.code=="300") {
                over=0;
                if(pageIndex==1){
                    closeGetMore();
                    $("#over").addClass("hide");
                    $(".o-blank").remove();
                    var blank=$('<div class="o-blank"><img src="../img/blank_05.png"/><div class="o-blankWord">还没有相关的下级人员</div></div>')
                    $("#thelist").append(blank);
                }
            }
            else{
                over=0;
                if(pageIndex==1){
                    closeGetMore();
                    $("#over").addClass("hide");
                    $(".o-blank").remove();
                    var blank=$('<div class="o-blank"><img src="../img/blank_05.png"/><div class="o-blankWord">还没有相关的下级人员</div></div>')
                    $("#thelist").append(blank);
                }
            }
            limited = document.body.scrollHeight - 5;
            layer.closeAll();
            GetMoreOver();
        });
    }
    else{
        openmodal("您没有相关下级人员");
        setTimeout(function(){
           self.location.href="activeCenter.html";
        },1500)
    }
}

//筛选条件选中
//function  makesure(){
//    $(".bt1").each(function(){
//       if($(this).hasClass("nb1"))
//       {
//           status1=$(this).attr("datastate");
//           sessionStorage.setItem("alStatus",JSON.stringify(status1));
//           $(".m-main").remove();
//           over = 1;
//           limited = 999999999999999999;
//           getPersonList();
//           getMoreover();
//       }
//    });
//}
//.批量处理
function  confirm() {
    var sum=0;
    var status3;
    var status2;
    var obj = document.getElementsByName("test");
    var  check_val = [];
    for (var i in obj) {
        if (obj[i].checked) {
            check_val.push(obj[i].value);
        }
    }
    $(".s-btnUl1").find(".bt1").each(function(i,btn1){
        if($(btn1).hasClass("nb1"))
        {
            if($(btn1).attr("data-id")=="0")
            {
                sum++;
            }
            else{
                status3=$(btn1).attr("data-id");
            }
        }
    });
    $(".s-btnUl2").find(".bt1").each(function(i,btn2){
        if($(btn2).hasClass("nb1"))
        {
            if($(btn2).attr("data-name")=="00")
            {
                sum++;
            }
            else{
                status2=$(btn2).attr("data-name");
            }
        }
    });
    console.log(sum);
    //两项都不选
    if(sum>=1)
    {
        openmodal("请至少选择一项内容进行更改");
        $(".am-modal").addClass("z-index");
        $(".am-modal-btn").click(function(){
            $(".am-modal").removeClass("z-index");
        })
    }
    else{
        var partIdList=check_val.toString().replace(/,/g,"|");
        var token = JSON.parse(sessionStorage.getItem("token"));
        var actId=JSON.parse(sessionStorage.getItem("acActId"));
        if(status3!=null&&status3!=""&&status3!=undefined&&status3!="0")
        {
            var data='{"token":"'+token+'","status":'+status3+',"partIdList":"'+partIdList+'","actId":'+actId+'}';
            console.log(data);
            AjaxSubmit("get",JSON.parse(data),basePath + "personnel/editPersonState",editPersonState_fun);
        }
        if(status2!=null&&status2!=""&&status2!=undefined&&status2!="00")
        {
            var data='{"token":"'+token+'","status":'+status2+',"partIdList":"'+partIdList+'","actId":'+actId+'}';
            console.log(data);
            AjaxSubmit("get",JSON.parse(data),basePath + "personnel/editPersonJurisdiction",editPersonJurisdiction_fun);
        }
    }
}
function goback(){
    self.location.href="activeCenter.html"
}
function editPersonState_fun(res){
    console.log(res);
    layer.closeAll();
    if (res.result.code == "200") {
        openmodal("审核操作成功");
        setTimeout(function(){
            location.reload();
        },1500);
    }
    else if (res.result.code == "300") {
        openmodal("审核:"+res.result.detail);
    }
    else{
        openmodal("对不起，审核操作出现错误，请重新进行");
    }
}
function editPersonJurisdiction_fun(res){
    console.log(res);
    layer.closeAll();
    if (res.result.code == "200") {
        openmodal("邀请权限更改成功");
        setTimeout(function(){
            location.reload();
        },1500);
    }
    else if (res.result.code == "300") {
        openmodal("邀请权限:"+res.result.detail);
    }
    else{
        openmodal("对不起，邀请权限更改失败");
    }
}
function lookActive(btn){
    var actId=parseInt($(btn).attr("data-actId"));
    var partId=parseInt($(btn).attr("data-partId"));
    var data='{"actId":'+actId+',"partId":'+partId+'}'
    sessionStorage.setItem("activeDetails",data);
    sessionStorage.setItem("activeDetailsStyle","0");
    self.location.href="activeModel.html";
}//查看详情

//加载更多
function getMoreover() {
    var bodyHeight = setInterval(function () {
        if ($("body").height() < $(window).height() && over == 1) {
            limited = 999999999999999999;//无穷大，限制重复滚动
            pageIndex++;
            getPersonList();
        }
    })
    if ($("body").height() > $(window).height()) {
        clearInterval(bodyHeight);
    }
    else if (over == 0) {
        clearInterval(bodyHeight);
    }
    $(window).scroll(function() {
        var $thisMain = $("body");
        var screenScrollHeight = parseInt($thisMain.scrollTop()) + parseInt(window.screen.availHeight);
        console.log("页面滑动的高度：" + screenScrollHeight + '-' + "屏幕可视区域高度：" + $(document).height());
        if(screenScrollHeight >= limited&&over==1) {
            limited = 999999999999999999;
            pageIndex++;
            getPersonList();
        }
    });
}
function goDtata(btn){
    var token=JSON.parse(sessionStorage.getItem("token"));
    var actId=JSON.parse(sessionStorage.getItem("acActId"));

    if(actId!=null&&actId!=""&&actId!=undefined)
    {
        self.location.href=basePath1+"/Excel/NextDown.aspx?token="+token+"&actId="+actId+"";
    }
    else{
        openmodal("活动失效，请重新选择")
        setTimeout(function(){
            self.location.href="personalCenter.html";
        },1500)
    }
}

