/**
 * Created by kangli on 2017/6/22.
 */
var pageIndex=1;
var pageCount=4;
var lastLength=pageCount;
var over = 1;
var limited = 999999999999999999;
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
function wxLogins(){
    $(".loadBox").html(addGetMoreInfo());
    AjaxActive();
    getMoreover();
    sessionStorage.removeItem("historyGo");
}
function AjaxActive(){
    $("#over").removeClass("hide");
    $(".o-blank").remove();
    openGetMore();
    var data='{"pageIndex":'+pageIndex+',"pageCount":'+pageCount+'}';
    AjaxSubmit("get",JSON.parse(data),basePath + "activity/getDefaultActivityList",getDefaultActivityList_fun);
}
function getDefaultActivityList_fun(res){
    console.log(res);
    var noDetalis=0;
    if(res.result.code=="200")
    {
        over=1;
        var activeLists=res.dataPacket.activtiyList;
        lastLength=activeLists.length;
        $.each(activeLists,function(index,obj) {
            var imgUrl="";
            if(obj.img_url==null||obj.img_url==""||obj.img_url==undefined)
            {
                imgUrl="http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg?imageView/1/w/1000/h/1000/q/80";
            }
            else{
                imgUrl=obj.img_url;
            }
            var activityList=$('<div class="index-main" onclick="lookActive(this)" data-actId="'+obj.id+'" data-partId="0"> ' +
                '<div class="index-left-text"> ' +
                '<div class="index-t"> ' +
                '<div class="index-t2-1" style="margin-left:15px"> ' +
                '<span class="index-t2-2">'+obj.title+'</span><br /> ' +
                '<span class="index-t2-3">'+obj.tags+'</span> ' +
                '</div> ' +
                '</div> ' +
                '<div class="index-f"> ' +
                '<button type="button" class="am-btn am-btn-success am-round"><span class="a-look">去看看' +
                '<img src="../img/icon-1.png" />' +
                '</span></button> ' +
                '</div> ' +
                '</div> ' +
                '<div class="index-right-image"> ' +
                '<img class="am-radius" alt="140*140" src="'+imgPath+imgUrl+'"  /> ' +
                '</div> ' +
                '</div>')
            $("#thelist").append(activityList);
            /* if(res.dataPacket.user.role_id==1)
             {
             $(".in-name>img").attr("src",res.dataPacket.wxinfo.headimgurl);
             }
             //pc端登录
             else if(res.dataPacket.user.role_id==2){

             }*/
        });
        if(pageCount > activeLists.length)
        {
            over=0;
            document.addEventListener('DOMContentLoaded', "", false);
            if(pageIndex==1&&activeLists.length==0)
            {
                closeGetMore();
                $("#over").addClass("hide");
                $(".o-blank").remove();
                var blank=$('<div class="o-blank"><img src="../img/blank_03.jpg"/><div class="o-blankWord">还没有相关的活动</div></div>')
                $("#thelist").append(blank);
            }
        }
    }
    else if(res.result.code=="300")
    {
        openmodal(res.result.detail);
    }
    else{
        openmodal("信息读取失败");

    }
    limited = document.body.scrollHeight - 5;
    layer.closeAll();
    GetMoreOver();
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