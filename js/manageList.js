/**
 * Created by kangli on 2017/6/22.
 */
var pageIndex=1;
var pageCount=4;
var lastLength=pageCount;
var over = 1;
var limited = 999999999999999999;
var status;
function choseState(btn){
    if($(btn).hasClass("my-sectionTitleLiChose"))
    {

    }
    else{
        $(btn).addClass("my-sectionTitleLiChose").siblings(".my-sectionTitleLi").removeClass("my-sectionTitleLiChose");
        status=$(btn).attr("data-id");
        pageIndex=1;
        limited = 999999999999999999;
        $(".index-main").remove();
        over=1;
        AjaxActive();
        getMoreover();
    }
}

function openUserInfo(){
    $(".loadBox").html(addGetMoreInfo());
    $(".my-sectionTitleLi").each(function(){
      if($(this).hasClass("my-sectionTitleLiChose"))
      {
          status=$(this).attr("data-id");
      }
    });
    AjaxActive();
    getMoreover();
}
function AjaxActive(){
    $("#over").removeClass("hide");
    $(".o-blank").remove();
    openGetMore();
    var token =JSON.parse(sessionStorage.getItem("token"));
    var data='{"token":"'+token+'","status":'+status+',"pageIndex":'+pageIndex+',"pageCount":'+pageCount+'}';
    console.log(data);
    AjaxSubmit("get",JSON.parse(data),basePath + "activity/getActivityList",getActivityList_fun);
}
function getActivityList_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        over=1;
        var activityList=res.dataPacket.activtiyList;
        if((pageIndex==1)&&(activityList==null||activityList==undefined||activityList==""))
        {
            //if(status==0)
            //{
            //    openmodal("您还没可管理的活动");
            //    setTimeout(function(){
            //       self.location.href="personalCenter.html";
            //    },1500);
            //}
            closeGetMore();
  over=0;
            $("#over").addClass("hide");
            $(".o-blank").remove();
            var blank=$('<div class="o-blank"><img src="../img/blank_03.jpg"/><div class="o-blankWord">还没有相关的活动</div></div>')
            $("#thelist").append(blank);
        }
        else{
            lastLength=activityList.length;
            $.each(activityList,function(index,obj) {
                var imgUrl="";
                if(obj.activity.img_url==null||obj.activity.img_url==""||obj.activity.img_url==undefined)
                {
                    imgUrl="http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg?imageView/1/w/1000/h/1000/q/80";
                }
                else{
                    imgUrl=obj.activity.img_url;
                }
                var part_id;
                if(obj.part_id=="0"||obj.part_id==undefined||obj.part_id==""||obj.part_id==null)
                {
                    part_id=0;
                }
                else{
                    part_id=obj.part_id;
                }
                var activeState="";
                if(obj.state=="1")
                {
                    activeState="申请中";
                    var activityLists=$('<div class="index-main"><div class="index-left-text"> ' +
                        '<div class="index-t">' +
                        ' <div class="index-t2-1"style="margin-left:15px"> <span class="index-t2-2">['+activeState+']'+obj.activity.title+'</span><br /> ' +
                        '<span class="index-t2-3">'+obj.activity.tags+'</span> </div> </div> ' +
                        '<div class="index-f">' +
                        ' <div class="index-img fl">' +
                        '<span class="look-detail lookdetail1">暂无帐户权限</span></div> ' +
                        ' </div> </div> <div class="index-right-image"> <img class="am-radius" alt="140*140" src="'+imgPath+imgUrl+'"  /> </div> </div>');
                    $("#thelist").append(activityLists);
                }
                else if(obj.state=="2")
                {
                    activeState="已审核"
                    var activityLists=$('<div class="index-main" data-actId="'+obj.activity.id+'" data-partId="'+obj.part_id+'" onclick="goManage(this)"><div class="index-left-text"> ' +
                        '<div class="index-t">' +
                        ' <div class="index-t2-1"style="margin-left:15px"> <span class="index-t2-2">['+activeState+']'+obj.activity.title+'</span><br /> ' +
                        '<span class="index-t2-3">'+obj.activity.tags+'</span> </div> </div> ' +
                        '<div class="index-f">' +
                        ' <div class="index-img fl"><img src="../img/set.png"/>' +
                        '<span class="look-detail lookdetail1">进行管理</span></div> ' +
                        ' </div> </div> <div class="index-right-image"> <img class="am-radius" alt="140*140" src="'+imgPath+imgUrl+'"  /> </div> </div>');
                    $("#thelist").append(activityLists);;
                }
                else if(obj.state=="3")
                {
                    activeState="拒绝审核";
                    var activityLists=$('<div class="index-main"><div class="index-left-text"> ' +
                        '<div class="index-t">' +
                        ' <div class="index-t2-1"style="margin-left:15px"> <span class="index-t2-2">['+activeState+']'+obj.activity.title+'</span><br /> ' +
                        '<span class="index-t2-3">'+obj.activity.tags+'</span> </div> </div> ' +
                        '<div class="index-f">' +
                        ' <div class="index-img fl">' +
                        '<span class="look-detail lookdetail1">暂无帐户权限</span></div> ' +
                        ' </div> </div> <div class="index-right-image"> <img class="am-radius" alt="140*140" src="'+imgPath+imgUrl+'"  /> </div> </div>');
                    $("#thelist").append(activityLists);
                }
                else if(obj.state=="4")
                {
                    activeState="禁用状态";
                    var activityLists=$('<div class="index-main"><div class="index-left-text"> ' +
                        '<div class="index-t">' +
                        ' <div class="index-t2-1"style="margin-left:15px"> <span class="index-t2-2">['+activeState+']'+obj.activity.title+'</span><br /> ' +
                        '<span class="index-t2-3">'+obj.activity.tags+'</span> </div> </div> ' +
                        '<div class="index-f">' +
                        ' <div class="index-img fl">' +
                        '<span class="look-detail lookdetail1">暂无帐户权限</span></div> ' +
                        ' </div> </div> <div class="index-right-image"> <img class="am-radius" alt="140*140" src="'+imgPath+imgUrl+'"  /> </div> </div>');
                    $("#thelist").append(activityLists);
                }

                /* if(res.dataPacket.user.role_id==1)
                 {
                 $(".in-name>img").attr("src",res.dataPacket.wxinfo.headimgurl);
                 }
                 //pc端登录
                 else if(res.dataPacket.user.role_id==2){

                 }*/
            });
            if(pageCount > activityList.length)
            {
                over=0;
                if(pageIndex==1&&activityList.length==0)
                {
                    //if(status==0)
                    //{
                    //    openmodal("您还没可管理的活动");
                    //    setTimeout(function(){
                    //        self.location.href="personalCenter.html";
                    //    },1500);
                    //}
                    closeGetMore();
  over=0;
                    $("#over").addClass("hide");
                    $(".o-blank").remove();
                    var blank=$('<div class="o-blank"><img src="../img/blank_03.jpg"/><div class="o-blankWord">还没有该审核状态的活动</div></div>')
                    $("#thelist").append(blank);
                }
            }
        }
    }
    else if(res.result.code=="3200")
    {
        openmodal("登录超时");
        sessionStorage.removeItem("token");
        sessionStorage.setItem("wxToken","0");
        setTimeout(function(){
            wxBack();
        },1000);
    }
    else if(res.result.code=="3201")
    {
        sessionStorage.setItem("returnUrl",JSON.stringify(window.location.href));
        sessionStorage.setItem("token",JSON.stringify(res.dataPacket.token));
        openmodal("未绑定微信号");
        setTimeout(function(){
            self.location.href="login.html";
        },1500);
    }
    else if(res.result.code=="3202")
    {
        openmodal("微信授权登录失败");
    }
    else if(res.result.code=="3203")
    {
        self.location.href="wxGzh.html";
    }
    else{
        openmodal("信息读取失败");
    }
    limited = document.body.scrollHeight - 5;
    layer.closeAll();
    GetMoreOver();
}
function goManage(btn){
    var actId=$(btn).attr("data-actId");
    var partyId=$(btn).attr("data-partId");
    var data='{"actId":'+actId+',"partId":'+partyId+'}';
    sessionStorage.setItem("activeCenter",data);
    self.location.href="activeCenter.html";
}//进行管理
//加载更多
function getMoreover() {
    var bodyHeight = setInterval(function () {
        if ($("body").height() < $(window).height() && over == 1) {
            limited = 999999999999999999;//无穷大，限制重复滚动
            pageIndex++;
            AjaxActive();
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
            AjaxActive();
        }
    });
}