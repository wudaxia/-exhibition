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
function openUserInfo(){
    $(".loadBox").html(addGetMoreInfo());
    AjaxActive();
    getMoreover();
   
}
function AjaxActive(){
    $("#over").removeClass("hide");
    $(".o-blank").remove();
    openGetMore();
    var status = 0;
    var token = JSON.parse(sessionStorage.getItem("token"));
    var data='{"token":"'+token+'","status":'+status+',"pageIndex":'+pageIndex+',"pageCount":'+pageCount+'}';
    console.log(data);
    AjaxSubmit("get",JSON.parse(data),basePath + "activity/getActivityListByDefault",getActivityListByDefault_fun);
}
function getActivityListByDefault_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        over=1;
        var activityList=res.dataPacket.activtiyList;
        if((activityList==null||activityList==undefined||activityList=="")&&pageIndex==1)
        {
            over=0;
            closeGetMore();
            $("#over").addClass("hide");
            $(".o-blank").remove();
            var blank=$('<div class="o-blank"><img src="../img/blank_03.jpg"/><div class="o-blankWord">您还没有相关的活动<p class="o-blankWord2"><a href="../html/allActivity.html">可以去看看有哪些活动</a></p></div></div>')
            $("#thelist").append(blank);
        }
        else{
            lastLength=activityList.length;
            $.each(activityList,function(index,obj) {
                var part_id;
                if(obj.part_id=="0"||obj.part_id==undefined||obj.part_id==""||obj.part_id==null)
                {
                    part_id=0;
                }
                else{
                    part_id=obj.part_id;
                }
                var imgUrl="http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg?imageView/1/w/1000/h/1000/q/80";
                if(obj.activity==null||obj.activity==""||obj.activity==undefined)
                {
                    imgUrl="http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg?imageView/1/w/1000/h/1000/q/80";
                }
                else{
                    if(obj.activity.img_url==null||obj.activity.img_url==""||obj.activity.img_url==undefined)
                    {
                        imgUrl="http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg?imageView/1/w/1000/h/1000/q/80";
                    }
                    else{
                        imgUrl=obj.activity.img_url;
                    }
                }
               
                var activityLists=$('<div class="index-main" onclick="lookActive(this)" data-actId="'+obj.activity.id+'" data-partId="'+part_id+'"><div class="index-left-text"> ' +
                    '<div class="index-t">' +
                    ' <div class="index-t2-1"style="margin-left:15px"> <span class="index-t2-2">'+obj.activity.title+'</span><br /> ' +
                    '<span class="index-t2-3">'+obj.activity.tags+'</span> </div> </div> ' +
                    '<div class="index-f" data-id="'+obj.id+'">' +
                    ' </div> </div> <div class="index-right-image"> <img class="am-radius" alt="140*140" src="'+imgPath+imgUrl+'"  /> </div> </div>');
                $("#thelist").append(activityLists);

                //门票信息
                var ticket;
                var ticketId;
                var ticketType;
                var ticketNo;
                $(".index-f").each(function (i,div) {
                    if($(div).attr("data-id")==obj.id)
                    {
                        if(obj.ticketList==""||obj.ticketList==undefined||obj.ticketList==null)
                        {
                            if(obj.part_id==0)
                            {
                                ticket="您还未拥有门票";
                                $(div).append(ticket);
                            }
                            else{
                                ticket=$('<div class="index-img"></span><span data-partId="'+obj.part_id+'" data-actId="'+obj.activity.id+'" onclick="event.cancelBubble=true;getTickets(this)" class="ma-ticket ma-ticket2">领取二维码门票</span></div>');
                                $(div).append(ticket);
                            }
                        }
                        else{
                            $.each(obj.ticketList,function (i,ticket) {
                                ticketId=ticket.ticket_id;
                                ticketNo=ticket.ticket_no;
                                ticketType=ticket.ticket_type;
                                var  ticketDiv="";
                                if(ticketType=="1")
                                {
                                    ticketDiv=$('<div class="index-img" onclick="event.cancelBubble=true;lookTicket(this)" data-ticketNo="'+ticketNo+'" data-ticketType="'+ticketType+'"  data-ticketId="'+ticketId+'""></span><span class="ma-ticket">实体票：'+ticketNo+'</span></div>');
                                    $(div).append(ticketDiv);
                                }
                                else if(ticketType=="2"){
                                    ticketDiv=$('<div class="index-img" onclick="event.cancelBubble=true;lookTicket(this)" data-ticketNo="'+ticketNo+'" data-ticketType="'+ticketType+'"  data-ticketId="'+ticket.ticket_id+'""></span><span class="ma-ticket">查看二维码门票</span></div>');
                                    $(div).append(ticketDiv);
                                }
                                else{
                                    ticket="门票信息失效";
                                    $(div).append(ticket);
                                }
                            });
                        }
                    }
                })
                /* if(res.dataPacket.user.role_id==1)
                 {
                 $(".in-name>img").attr("src",res.dataPacket.wxinfo.headimgurl);
                 }
                 //pc端登录
                 else if(res.dataPacket.user.role_id==2){

                 }*/
            });
            if((activityList==null||activityList==undefined||activityList==""))
            {
                activityList=[];
            }
            if(pageCount > activityList.length)
            {
                over=0;
                if(pageIndex==1&&activityList.length==0)
                {
                    closeGetMore();
                    $("#over").addClass("hide");
                    $(".o-blank").remove();
                    var blank=$('<div class="o-blank"><img src="../img/blank_03.jpg"/><div class="o-blankWord">您还没有相关的活动<p class="o-blankWord2"><a href="../html/allActivity.html">可以去看看有哪些活动</a></p></div></div>')
                    $("#thelist").append(blank);
                }
            }
        }
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


    }else{
        openmodal("信息读取失败");
    }
    limited = document.body.scrollHeight - 5;
    layer.closeAll();
    GetMoreOver();
}

//function goActiveDetails(btn){
//    var actId=$(btn).attr("data-actId");
//    var partyId=$(btn).attr("data-partId");
//    var data='{"actId":'+actId+',"partId":'+partyId+'}';
//    sessionStorage.setItem("activeDetails",data);
//    setTimeout(function(){
//        self.localStorage.href="activeDetails.html";
//    })
//}

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
//查看详情信息
function lookActive(btn){
    var actId=parseInt($(btn).attr("data-actId"));
    var partId=parseInt($(btn).attr("data-partId"));
    if(partId=="0")
    {
        sessionStorage.setItem("activeDetailsStyle","0");
    }
    else{
        sessionStorage.setItem("activeDetailsStyle","1");
    }
    var data='{"actId":'+actId+',"partId":'+partId+'}';
    sessionStorage.setItem("activeDetails",data);
    self.location.href="activeModel.html";
}


//查看门票二维码
function lookTicket(btn){
    if($(btn).attr("data-ticketType")=="2")
    {
       var ticketNo=$(btn).attr("data-ticketNo");
        $qr = $('.in-code');
        function makeCode(text) {
            $qr.empty().qrcode(text);
            var mycanvas1=document.getElementsByTagName('canvas')[0];
            var img=convertCanvasToImage(mycanvas1);
            $('.in-code').hide();
            var wxImg=$('<div class="in-code wxImg disn"></div>');
            $('.in-code').after(wxImg);
            $('.wxImg').append(img);
            $(img).attr("onclick","img_click(this)");
            $(img).trigger("click");
        }
        makeCode(ticketNo);
    }
}

//转换成图片
function convertCanvasToImage(canvas) {
    //新Image对象，可以理解为DOM
    var image = new Image();
    // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
    // 指定格式 PNG
    image.src = canvas.toDataURL("image/png");
    return image;

}
//领取二维码门票
function getTickets(btn) {
    var partId=$(btn).attr("data-partId");
    var actId=$(btn).attr("data-actId");
    var conHtml = "<div class=\"am-modal am-modal-confirm\" tabindex=\"-1\" id=\"my-confirm\"><div class=\"am-modal-dialog\"><div class=\"am-modal-hd\"></div><div class=\"am-modal-bd\">确定领取二维码门票？</div><div class=\"am-modal-footer\"><span class=\"am-modal-btn\" onclick='ticketCencel(this)' data-am-modal-cancel>取消</span><span data-partId=\""+partId+"\" data-actId=\""+actId+"\" class=\"am-modal-btn enter\" data-am-modal-confirm onclick='ticketEnter(this)'>确定</span></div> </div></div>"
    $("body").append(conHtml);
    var $modal = $('#my-confirm');
    $modal.modal('open');
}
//取消领取
function ticketCencel(btn){
    $("#my-confirm").remove();
    $(".am-dimmer").css("display","none");
    $("body").removeClass("am-dimmer-active");
}
//确认领取
function ticketEnter(btn){
    var token=JSON.parse(sessionStorage.getItem("token"));
    var partId=$(btn).attr("data-partId");
    var actId=$(btn).attr("data-actId");
    if(partId!=null&&partId!=undefined&&partId!=""&&actId!=null&&actId!=undefined&&actId!="")
    {
        var data='{"token":"'+token+'","actId":'+actId+',"partId":"'+partId+'"}';
        AjaxSubmit("get",JSON.parse(data),basePath + "Ticket/userGetQrcodeTicket",userGetQrcodeTicket_fun);
    }
    $("#my-confirm").remove();
    $(".am-dimmer").css("display","none");
    $("body").removeClass("am-dimmer-active");
}
function userGetQrcodeTicket_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        layer.open({
            content: "领取成功"
            ,skin: 'msg'
            ,time: 2 //1.5秒后自动关闭
        });
        setTimeout(function(){
            window.location.reload();
        },1000)
    }
    else if(res.result.code=="300")
    {
        layer.open({
            content: res.result.detail
            ,skin: 'msg'
            ,time: 2 //1.5秒后自动关闭
        });
    }
    else if(res.result.code=="3200")
    {
        layer.open({
            content: "登录失效"
            ,skin: 'msg'
            ,time: 2 //1.5秒后自动关闭
        });
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
    else if(res.result.code=="3203")
    {
        self.location.href="wxGzh.html";
    }
    else {
        layer.open({
            content: "对不起，该场活动没有发放二维码门票"
            ,skin: 'msg'
            ,time: 2 //1.5秒后自动关闭
        });
    }

}