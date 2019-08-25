var pageIndex=1;
var pageCount=10;
var lastLength;
var statusType=0;
var over = 1;
var limited = 999999999999999999;

function openUserInfo(){
    $(".loadBox").html(addGetMoreInfo());
    $(".my-sectionTitleLi").each(function(){
        if($(this).hasClass("my-sectionTitleLiChose"))
        {
            statusType=$(this).attr("data-id");
        }
    });
    $(".m-main").remove();
    getActivitySignUpList();
    getMoreover();
}
//筛选
function choseState(btn){
    if($(btn).hasClass("my-sectionTitleLiChose"))
    {

    }
    else{
        $(btn).addClass("my-sectionTitleLiChose").siblings(".my-sectionTitleLi").removeClass("my-sectionTitleLiChose");
        statusType=$(btn).attr("data-id");
        pageIndex=1;
        limited = 999999999999999999;
        $(".m-main").remove();
        over=1;
        getActivitySignUpList();
        getMoreover();
    }
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
function goback(){
    self.location.href="activeCenter.html"
}
//重置
function cz(){
		$(".am-btn-primary").removeClass("nb1");
		  $(".bt1").addClass("nb1");
}

////筛选
//function sx(){
//	layer.open({
//		style:'float:right;width:90%;height:100%;',
//		content: '<div class="s-screen">筛选</div><div class="clear"></div><div class="s-cont"><div class="s-title"><strong>购票种类选择</strong></div><div class="s-btn"><ul><li><button type="button"class="am-btn am-btn-primary am-radius bt1 nb1" onclick="dj()">全部用户</button></li><li><button type="button"class="am-btn am-btn-primary am-radius bt2" onclick="dj2()">条形码票</button></li><li><button type="button"class="am-btn am-btn-primary am-radius bt3" onclick="dj3()">二维码票</button></li></li><li><button type="button"class="am-btn am-btn-primary am-radius bt4" onclick="dj4()">普通报名</button></li><li><button type="button"class="am-btn am-btn-primary am-radius bt5" onclick="dj5()">两票同领</button></li></ul><br/><div class="clear"></div><div class="m-footer"><div class="m-left-2" onclick="cz()">重置</div><div class="m-right-2" onclick="cfsure()">确定</div></div>'
//	});
//}

//跳转
function tz(w){
	window.location.href="applyDetail.html";
    sessionStorage.setItem("partid",w);
}


var kaiguan=1;
function dc(){
    var token=JSON.parse(sessionStorage.getItem("token"));
    var actId=JSON.parse(sessionStorage.getItem("acActId"));
    var data='{"token":"'+token+'", "actId":'+actId+'}';
    console.log(data);
    if(actId!=null&&actId!=""&&actId!=undefined)
    {

        self.location.href=basePath1+"/Excel/wxActiveList.aspx?token="+token+"&actId="+actId+"";
    }
    else{
        openmodal("活动失效，请重新选择");
        setTimeout(function(){
            self.location.href="personalCenter.html";
        },1500)
    }
}
function getActivityList_fun(res){
    console.log(res);
    
}

//获取活动下级
function  getActivitySignUpList() {
    $("#over").removeClass("hide");
    $(".o-blank").remove();
    openGetMore();
    var url = basePath + "personnel/getActivitySignUpList";
    var token = JSON.parse(sessionStorage.getItem("token"));
    var data = {
        "token": token,
        "status": statusType,
        "pageIndex":pageIndex,
        "pageCount": pageCount,
        "actId": JSON.parse(sessionStorage.getItem("acActId"))
    };
    $.get(url, data, function (e) {
        //  console.log(e)
        if (e.result.code == "200") {
            over=1;
            console.log(e);
            console.log(pageCount);
            console.log(e.dataPacket.activelist.length);
            lastLength=e.dataPacket.activelist.length;
            $.each(e.dataPacket.activelist, function (i, n) {
                //console.log(n)

                var imgUrl;
                if (n.wxinfo != null && n.wxinfo != undefined && n.wxinfo != "") {

                    if (n.wxinfo.headimgurl != null && n.wxinfo.headimgurl != undefined && n.wxinfo.headimgurl != "") {
                        imgUrl = n.wxinfo.headimgurl;
                    }
                    else {
                        imgUrl = '../img/head-img.png';
                    }
                }
                else {
                    imgUrl = '../img/head-img.png';
                }

                //状态判断
                if (n.state == 1) {
                    status = "普通报名用户"
                }
                else if (n.state == 3) {
                    status = "二维码门票用户"
                }
                else if (n.state == 2) {
                    status = "条码门票用户"
                }
                else if (n.state == 4) {
                    status = "双门票用户"
                }
                //动态拼接
                var phone="";
                if(n.phone==null|| n.phone==undefined|| n.phone=="")
                {
                    phone="未填写手机号码";
                }
                else{
                    phone= n.phone;
                }
                var str = "";
                str += "<div class=\"m-main\"><div class=\"m-type\"><span class=\"m-left\">" + changeTime1(n.active_time) + "</span><span class=\"m-right\">" + status + "</span></div><div class=\"clear\"></div><div class=\"m-cont\" onclick=\"tz(" + n.id + ")\">";
                str += "<div class=\"inputtype\"  style=\"display: none;\"><input type=\"checkbox\" checked=\"checked\" /></div><img  class=\" am-circle\" src=" + imgUrl + " width=\"50\" height=\"50\"/>"
                str += "<div class=\"m-cont-text\"><span class=\"a-con-name\">" + n.active_name + "</span><br /><span class=\"m-cont-text1\">"+phone+"</span></div></div></div>";
               // $(".a-all").append(str);
                $("#thelist").append(str);
//           console.log(pageCount)
            })
            if (pageCount>e.dataPacket.activelist.length) {
                over=0;
                    if (pageIndex == 1&& e.dataPacket.activelist.length == 0) {
                        closeGetMore();
                        $("#over").addClass("hide");
                        $(".o-blank").remove();
                        var blank = $('<div class="o-blank"><img src="../img/blank_05.png"/><div class="o-blankWord">还没有相关的人员</div></div>')
                        $("#thelist").append(blank);
                    }
                }
        }
        else if (e.result.code == "3200") {
            openmodal("登录失效");
            sessionStorage.removeItem("token");
            sessionStorage.setItem("wxToken","0");
            wxBack();
        }
        else if (e.result.code == "3201") {
            sessionStorage.setItem("token",JSON.stringify(res.dataPacket.token));
            sessionStorage.setItem("returnUrl",JSON.stringify(window.location.href));
            openmodal("您未绑定微信号，请去绑定");
            setTimeout(function(){
                self.location.href="login.html";
            },1500);
        }
        else if (e.result.code == "300"){
            openmodal(e.result.detail);
        }
        else{}
 limited = document.body.scrollHeight - 5;
        layer.closeAll();
        GetMoreOver();
    })
}
//筛选
//function cfsure(){
//    //全部用户
//    if($(".bt1").hasClass("nb1")){
//        $(".m-main").remove();
//        pageIndex=1;
//        statusType=0;
//        over = 1;
//        limited = 999999999999999999;
//        getActivitySignUpList();
//        getMoreover();
//    }
//    //二维码票
//    else if($(".bt2").hasClass("nb1")){
//        $(".m-main").remove();
//        pageIndex=1;
//        over = 1;
//        statusType=2;
//        limited = 999999999999999999;
//        getActivitySignUpList();
//        getMoreover();
//    }
//    //条码票
//    else if($(".bt3").hasClass("nb1")){
//
//        $(".m-main").remove();
//        pageIndex=1;
//        statusType=3;
//        over = 1;
//        limited = 999999999999999999;
//        getActivitySignUpList();
//        getMoreover();
//    }
//    //普通报名
//    else if($(".bt4").hasClass("nb1")){
//
//        $(".m-main").remove();
//          pageIndex=1;
//          limited = 999999999999999999;
//          statusType=1;
//          over = 1;
//          getActivitySignUpList();
//        getMoreover();
//    }
//    //两票同领
//    else if($(".bt5").hasClass("nb1")){
//
//    	$(".m-main").remove();
//        pageIndex=1;
//        limited = 999999999999999999;
//        statusType=4;
//        over = 1;
//        getActivitySignUpList();
//        getMoreover();
//}}
//加载更多
function getMoreover() {
    var bodyHeight = setInterval(function () {
        if ($("body").height() < $(window).height() && over == 1) {
            limited = 999999999999999999;//无穷大，限制重复滚动
            pageIndex++;
            getActivitySignUpList();
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
            getActivitySignUpList();
        }
    });
}