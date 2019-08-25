var pageIndex=1;
var pageCount=10;
var lastLength=pageCount;
var over = 1;
var limited = 999999999999999999;
var statusk=1;
function openUserInfo(){
  //  document.getElementsById('wrapper')[0].style.height = window.innerHeight+'px';
	//dj5();
    sessionStorage.removeItem("ticketActiveId");
    sessionStorage.removeItem("ticketUserInfo");
    sessionStorage.removeItem("userInfos");
    sessionStorage.removeItem("userInfosPhone");
    $(".loadBox").html(addGetMoreInfo());
    ticketFirstStyle();
}
//getTicketList();
var kaiguan=1;

function  miss(){
	var $modal = $('#your-modal2');
	$modal.modal('close');
}
//返回
//获取全部列表
function  getTicketList(){
	//var url=basePath+"Ticket/getTicketList";
  $(".o-blank").remove();
    openGetMore();
    var actId=JSON.parse(sessionStorage.getItem("acActId"));
    if(actId==null||actId==undefined||actId=="")
    {
        openmodal("请选择一场活动进行售票");
        setTimeout(function(){
            self.location.href="activeCenter.html";
        },1500);
    }
    else{
        var token=JSON.parse(sessionStorage.getItem("token"));
        var data='{"token":"'+token+'", "status":'+statusk+', "pageIndex":'+pageIndex+', "pageCount":'+pageCount+', "actId":'+actId+'}';
        console.log(data);
        AjaxSubmit("get",JSON.parse(data),basePath + "Ticket/getTicketList",getTicketList_fun);
    }
}
//显示与隐藏
function makesure1(btn){
    $(btn).attr("onclick","");
    var ticketId = document.getElementsByName("test");
    var check_val = [];
    for (var i in ticketId) {
        if (ticketId[i].checked) {
            check_val.push(ticketId[i].value);
        }
    }
    if(check_val.length==0)
    {
        layer.open({
            content: "至少需要选择一张门票"
            ,skin: 'msg'
            ,time: 2 //1.5秒后自动关闭
        });
        $(".layui-m-layer").addClass("layerChange");
        $(".layui-m-layermain").addClass("layerChange1");
        $(btn).attr("onclick","makesure1(this)");
    }
    else {
        //门票分配
        $(btn).attr("onclick","makesure1(this)");
        var activeId="";
        $(btn).parent().siblings(".searchable-select").find(".searchable-select-item").each(function(i,select){
            if($(select).hasClass("selected")&&$(select).attr("data-value")!="0")
            {
                activeId=$(select).attr("data-value");
            }
        });
        if(activeId==null||activeId==""||activeId==undefined)
        {
            layer.open({
                content: "请选择一位用户进行卖票"
                ,skin: 'msg'
                ,time: 2 //1.5秒后自动关闭
            });
            $(".layui-m-layer").addClass("layerChange");
            $(".layui-m-layermain").addClass("layerChange1");
        }
        else{
            //var url=basePath+"Ticket/getTicketDistribution";
            var token=JSON.parse(sessionStorage.getItem("token"));
            var ticketIdList=check_val.toString().replace(/,/g,"|");
            var data='{"token":"'+token+'", "ticketIdList":"'+ticketIdList+'", "partId":'+activeId+'}';
            console.log(data);
            AjaxSubmit("get", JSON.parse(data), basePath + "Ticket/getTicketDistribution", getTicketDistribution_fun)
        }
    }
    ////var url = basePath + "Ticket/getTicketSaleByActiveId";
    //var token = JSON.parse(sessionStorage.getItem("token"));
    //var data = '{"token": "'+token+'", "ticketId":'+ticketId+', "activeId":'+activeId+'}';
    //AjaxSubmit("get", JSON.parse(data), basePath + "Ticket/getTicketSaleByActiveId", getTicketSaleByActiveId_fun)
}
//获得下级分配票的结果
function getTicketDistribution_fun(res){
    console.log(res);
    if (res.result.code == "200") {
        var $modal = $('#your-modal');
        $modal.modal('close');
        layer.open({
            content: "分配成功"
            ,skin: 'msg'
            ,time: 1 //1.5秒后自动关闭
        });
        $(".layui-m-layer").addClass("layerChange");
        $(".layui-m-layermain").addClass("layerChange1");
        setTimeout(function(){
            window.location.reload();
        },1000)
    }
    else if(res.result.code == "300")
    {
        layer.open({
            content: res.result.detail
            ,skin: 'msg'
            ,time: 1.5 //1.5秒后自动关闭
        });
        $(".layui-m-layer").addClass("layerChange");
        $(".layui-m-layermain").addClass("layerChange1");
    }
    else if(res.result.code=="3200")
    {
        layer.open({
            content: "登录超时"
            ,skin: 'msg'
            ,time: 1.5 //1.5秒后自动关闭
        });
        $(".layui-m-layer").addClass("layerChange");
        $(".layui-m-layermain").addClass("layerChange1");
        sessionStorage.removeItem("token");
        sessionStorage.setItem("wxToken","0");
        wxBack();
    }
    else{
        layer.open({
            content: "分配失败"
            ,skin: 'msg'
            ,time: 1.5 //1.5秒后自动关闭
        });
        $(".layui-m-layer").addClass("layerChange");
        $(".layui-m-layermain").addClass("layerChange1");
    }
}

//下一步按钮被按获取到下级列表
function  next(){
	var actId=JSON.parse(sessionStorage.getItem("acActId"));
   //// console.log(actId)
    if(actId==null||actId==undefined||actId=="")
    {
        openmodal("请选择一场活动");
    }
    else{
        //var url = basePath + "personnel/getPersonList";
        var nextPeoplePageIndex=1;
        var nextPeoplepageCount=999;
        var token = JSON.parse(sessionStorage.getItem("token"));
        var data = '{"token": "'+token+'", "status": 0, "pageIndex":'+nextPeoplePageIndex+', "pageCount": '+nextPeoplepageCount+', "actId": '+actId+'}';
        AjaxSubmit("get", JSON.parse(data), basePath + "personnel/getPersonList", getPersonList_fun);
    }
}

//获得下级列表数据
function getPersonList_fun(res){
    console.log(res);
    $(".searchable-select").remove();
    if (res.result.code == "200") {
        if(res.dataPacket.userList==null||res.dataPacket.userList==""||res.dataPacket.userList==undefined||res.dataPacket.userList.length==0)
        {
            openmodal("对不起，您还没有发展下级");
        }
        else{
            var str11 = "";
            $.each(res.dataPacket.userList, function (i, n) {
                var phone;
                if(n.phone==null||n.phone==undefined||n.phone=="")
                {
                    phone="无号码";
                }
                else{
                    phone=n.phone;
                }
                //str11 += "<option value=" + n.user_id+ ">" + n.apply_name + "</option> <script type=\"text/javascript\" src=\"../base/layui/lay/modules/form.js\"></script>";
                str11 += "<option value=" + n.part_id+ ">" + n.apply_name+"&nbsp;&nbsp;"+ n.phone+ "</option>";
            });
            $(".kp").append(str11);

        }
        $('#your-modal').modal({closeViaDimmer: false });
        $('#your-modal').modal('open');
        var len = $("input:checkbox:checked").length;
        $(".t-nextPeroleTicketNum").text("("+len+")");
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
    else{
        openmodal("获取信息失败");
    }
    $('.kp').searchableSelect();
    fixed();
}
//查看活动详情
function lookActive(btn){
	var actId=parseInt($(btn).attr("data-actId"));
	var partId=parseInt($(btn).attr("data-partId"));
	var data='{"actId":'+actId+',"partId":'+partId+'}'
	sessionStorage.setItem("activeDetails",data);
	sessionStorage.setItem("activeDetailsStyle","0");
	self.location.href="activeModel.html";
}//查看详情



function  tzsp(n){
	sessionStorage.setItem("ticketId",n);
	var modalhtml = "<div class=\"am-modal am-modal-prompt\" tabindex=\"-1\" id=\"mymodal\">" +
			"<div class=\"am-modal-dialog\">"+
			"<div class=\"t-buyTicketTitle\">售票<a href=\"javascript: void(0)\" class=\"am-clos am-close1\" data-am-modal-close><img src='../img/x.png'></a></div>"+
		"<div class=\"spchoose \">" +
		"<span class=\"t-enterChose t-buyInput\" onclick=\"choose1()\">未报名用户</span>" +
		"<span class=\"t-buyInput t-buyInput2\" onclick=\"choose2()\">报名用户</span>" +
		"</div></div>";
	$("body").append(modalhtml);
    $('#mymodal').modal({closeViaDimmer: false });
	$('#mymodal').modal('open');
    $(".inputtype").css("display","none");
    $(".inputtype").find("input").each(function(){
       $(this).removeAttr("checked");
    });
    $(".m-footer").each(function(){
        if($(this).attr("data-name")==1)
        {
            $(this).removeClass("disn").siblings(".m-footer").addClass("disn");
        }
    })
	$(".t-enterChose").attr("data-ticketId",n);
}

//未报名用户选择
function  choose1(){
    var partId=JSON.parse(sessionStorage.getItem("acPartId"));
    var actId=JSON.parse(sessionStorage.getItem("acActId"));
    if(partId==null||partId==""||partId==undefined||$(".t-enterChose").attr("data-ticketId")==null||$(".t-enterChose").attr("data-ticketId")==undefined||$(".t-enterChose").attr("data-ticketId")=="")
    {
        openmodal("您选择的门票Id为空，请重新选择");
        layer.closeAll();
    }
    else{
        sessionStorage.setItem("urlReturnBack",JSON.stringify(window.location.href));
        self.location.href="buyTicketInfo2.html?ticketId="+$(".t-enterChose").attr("data-ticketId")+"&partId="+partId+"&actId="+actId+"";
    }
}
function  choose2(){
    //对报名用户售票
    $('#mymodal').modal('close');
    $('#your-modal2').modal({closeViaDimmer: false });
    $('#your-modal2').modal('open');
    var url = basePath + "personnel/getActivitySignUpList";
    var token = JSON.parse(sessionStorage.getItem("token"));
    var userPageIndex=1;
    var userPageCount=999;
    var actId=JSON.parse(sessionStorage.getItem("acActId"));
    var data = '{"token": "'+token+'", "status": '+0+', "pageIndex":'+userPageIndex+', "pageCount": '+userPageCount+', "actId":'+actId+' }';
    //console.log(data);
    AjaxSubmit("get", JSON.parse(data), basePath + "personnel/getActivitySignUpList", getActivitySignUpList_fun);
}
//获得报名用户列表
function getActivitySignUpList_fun(res){
    console.log(res);
    $(".kz").find("option").remove();
    $(".kz").append($('<option value="0">报名用户</option>'));
    $(".searchable-select").remove();
	if (res.result.code == "200")
	{
		if(res.dataPacket.activelist!=null&&res.dataPacket.activelist!=undefined&&res.dataPacket.activelist!="")
		{
			$.each(res.dataPacket.activelist, function (i, n){
				var str11 = "";
                var phone;
                if(n.phone==null||n.phone==undefined||n.phone=="")
                {
                    phone="无号码";
                }
                else{
                    phone=n.phone;
                }
				str11 += "<option value=" +n.id+ ">" + n.active_name+"|"+phone+ "</option>";
				$(".kz").append(str11);
					//})
					//$modal.modal();
					//var len = $("input:checkbox:checked").length;
					//$(".number").html(len);
					//  $modal.modal();
				});
		}
		//$(".kz").find("option").remove();
	}
   else if(res.result.code == "300")
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
	else{
		openmodal("获取列表失败");
	}
    $('.kz').searchableSelect();
    //var elAside = $('.searchable-scroll');
    //$(".searchable-scroll").attr("data-is-bind-scroll","true");
    //$.smartScroll(elAside, '.scrollable');
    //$('html').addClass('noscroll');
    fixed();
}

function  missone(){
	var $modal = $('#your-modal');
	$modal.modal('close');
}

//卖票
function  mai(btn){
    var ticketId=JSON.parse(sessionStorage.getItem("ticketId"));
    $(btn).attr("onclick","");
    setTimeout(function(){
        $(btn).attr("onclick","mai(this)");
    },1000);
    var activeId="";
    var UserInfo="";
    $(btn).parent().siblings(".searchable-select").find(".searchable-select-item").each(function(i,select){
            if($(select).hasClass("selected")&&$(select).attr("data-value")!="0")
            {
                activeId=$(select).attr("data-value");
                UserInfo=$(select).text();
            }
         });
    if(activeId==null||activeId==""||activeId==undefined||UserInfo==null||UserInfo==""||UserInfo==undefined)
    {
        layer.open({
            content: "请选择一位用户进行卖票"
            ,skin: 'msg'
            ,time: 2 //1.5秒后自动关闭
        });
        $(".layui-m-layer").addClass("layerChange");
        $(".layui-m-layermain").addClass("layerChange1");
    }
    else{
        if(ticketId==null||ticketId==""||ticketId==undefined)
        {
            layer.open({
                content: "请选择一张门票进行出售"
                ,skin: 'msg'
                ,time: 1.5 //1.5秒后自动关闭
            });
            $(".layui-m-layer").addClass("layerChange");
            $(".layui-m-layermain").addClass("layerChange1");
            setTimeout(function(){
                var $modal = $('#your-modal2');
                $modal.modal('close');
            },1500)
        }
        else{
            var token = JSON.parse(sessionStorage.getItem("token"));
            var partId=JSON.parse(sessionStorage.getItem("acPartId"));
            var actId=JSON.parse(sessionStorage.getItem("acActId"));
            if(partId==null||partId==""||partId==undefined||actId==""||actId==undefined||actId==null)
            {
                layer.open({
                    content: "活动信息失效，请重新获取"
                    ,skin: 'msg'
                    ,time: 1.5 //1.5秒后自动关闭
                });
                $(".layui-m-layer").addClass("layerChange");
                $(".layui-m-layermain").addClass("layerChange1");
                setTimeout(function(){
                    var $modal = $('#your-modal2');
                    $modal.modal('close');
                    self.location.href="personalCenter.html"
                },1500)
            }
            else{
                //var data = '{"token": "'+token+'", "ticketId":'+ticketId+', "activeId":'+activeId+',"partId":'+partId+'}';
                //console.log(data);
                sessionStorage.setItem("ticketActiveId",JSON.stringify(activeId));
                sessionStorage.setItem("ticketUserInfo",JSON.stringify(UserInfo));
                sessionStorage.setItem("urlReturnBack",JSON.stringify(window.location.href));
                self.location.href="buyTicketInfo2.html?actId="+actId+"&ticketId="+ticketId+"&partId="+partId+"";
                //AjaxSubmit("get", JSON.parse(data), basePath + "Ticket/getTicketSaleByActiveId", getTicketSaleByActiveId_fun)
            }
        }
        //var url = basePath + "Ticket/getTicketSaleByActiveId";

    }

}
//卖票结果
//function getTicketSaleByActiveId_fun(res){
//    console.log(res);
//    if (res.result.code == "200") {
//        var token=JSON.parse(sessionStorage.getItem("token"));
//        var actId=JSON.parse(sessionStorage.getItem("acActId"));
//        if(actId!=null&&actId!=undefined&&actId!="")
//        {
//            var data = '{"token": "'+token+'", "actId":'+actId+'}';
//            console.log(data);
//            AjaxSubmit("get", JSON.parse(data), basePath + "Ticket/getTicketSaleAttribute", getTicketSaleAttribute_fun)
//        }
//
//    }
//    else if(res.result.code == "300")
//    {
//        layer.open({
//            content: res.result.detail
//            ,skin: 'msg'
//            ,time: 1.5 //1.5秒后自动关闭
//        });
//        $(".layui-m-layer").addClass("layerChange");
//        $(".layui-m-layermain").addClass("layerChange1");
//    }
//    else if(res.result.code=="3200")
//    {
//        layer.open({
//            content: "登录超时"
//            ,skin: 'msg'
//            ,time: 1.5 //1.5秒后自动关闭
//        });
//        $(".layui-m-layer").addClass("layerChange");
//        $(".layui-m-layermain").addClass("layerChange1");
//        sessionStorage.removeItem("token");
//        sessionStorage.setItem("wxToken","0");
//        wxBack();
//    }
//    else{
//        layer.open({
//            content: "卖票失败"
//            ,skin: 'msg'
//            ,time: 1.5 //1.5秒后自动关闭
//        });
//        $(".layui-m-layer").addClass("layerChange");
//        $(".layui-m-layermain").addClass("layerChange1");
//    }
//}

//获取卖票是否有拓展属性信息
//function getTicketSaleAttribute_fun(res){
//    console.log(res);
//    if(res.result.code=="200")
//    {
//        if(res.dataPacket.fieldList!=null&&res.dataPacket.fieldList!=""&&res.dataPacket.fieldList!=undefined)
//        {
//            if(res.dataPacket.fieldList.length>0)
//            {
//                var $modal = $('#your-modal2');
//                $modal.modal('close');
//                layer.open({
//                    content: "操作成功，请去填写拓展信息!"
//                    ,skin: 'msg'
//                    ,time: 1 //1.5秒后自动关闭
//                });
//                $(".layui-m-layer").addClass("layerChange");
//                $(".layui-m-layermain").addClass("layerChange1");
//                var actId=JSON.parse(sessionStorage.getItem("acActId"));
//                var ticketId=JSON.parse(sessionStorage.getItem("ticketId"));
//                var partId=JSON.parse(sessionStorage.getItem("acPartId"));
//                if(actId!=null&&actId!=""&&actId!=undefined&&ticketId!=null&&ticketId!=undefined&&ticketId!=""&&partId!=null&partId!=undefined&&partId!="")
//                {
//                    setTimeout(function(){
//                        sessionStorage.setItem("urlReturnBack",JSON.stringify(window.location.href));
//                        //到时候改
//                        self.location.href="buyTicketInfo2.html?actId="+actId+"&ticketId="+ticketId+"&partId="+partId+"";
//                    },1000)
//                }
//                else{
//                    layer.open({
//                        content: "相关信息失效，请重新获取"
//                        ,skin: 'msg'
//                        ,time: 1 //1.5秒后自动关闭
//                    });
//                    $(".layui-m-layer").addClass("layerChange");
//                    $(".layui-m-layermain").addClass("layerChange1");
//                    setTimeout(function(){
//                        //到时候改
//                        window.location.reload();
//                    },1000)
//                }
//            }
//        }
//        else{
//            var $modal = $('#your-modal2');
//            $modal.modal('close');
//            layer.open({
//                content: "卖票成功"
//                ,skin: 'msg'
//                ,time: 1 //1.5秒后自动关闭
//            });
//            $(".layui-m-layer").addClass("layerChange");
//            $(".layui-m-layermain").addClass("layerChange1");
//            setTimeout(function(){
//                window.location.reload();
//            },1000)
//        }
//    }
//    else if(res.result.code=="3200"){
//        layer.open({
//            content: "登录超时"
//            ,skin: 'msg'
//            ,time: 1 //1.5秒后自动关闭
//        });
//        $(".layui-m-layer").addClass("layerChange");
//        $(".layui-m-layermain").addClass("layerChange1");
//        sessionStorage.removeItem("token");
//        sessionStorage.setItem("wxToken","0");
//        setTimeout(function(){
//            wxBack();
//        },1000);
//    }
//    else if(res.result.code=="300")
//    {
//        layer.open({
//            content: res.result.detail
//            ,skin: 'msg'
//            ,time: 1 //1.5秒后自动关闭
//        });
//        $(".layui-m-layer").addClass("layerChange");
//        $(".layui-m-layermain").addClass("layerChange1");
//    }
//    else{
//        layer.open({
//            content: "获取信息失败"
//            ,skin: 'msg'
//            ,time: 1 //1.5秒后自动关闭
//        });
//        $(".layui-m-layer").addClass("layerChange");
//        $(".layui-m-layermain").addClass("layerChange1");
//    }
//}

//获得全部列表数据
function getTicketList_fun(e){
    $("#over").removeClass("hide");
    console.log(e);
    $(".o-blank").remove();
    $(".inputtype").css("display","none");
    $(".inputtype").find("input").removeAttr("checked");
    $(".t-ticketStyleUl").find("li").each(function(li,chose){
        $(".m-footer").each(function(input,clicks){
            if($(chose).hasClass("lic_1")&&$(chose).attr("data-name")==$(clicks).attr("data-name"))
            {
                $(clicks).removeClass("disn").siblings(".m-footer").addClass("disn");
            }
        })
    })
    if(e.result.code=="200") {
        over=1;
        lastLength=e.dataPacket.list.length;
        $.each(e.dataPacket.list, function (i, n) {
            //sessionStorage.setItem("partId",n.part_id)
            //console.log(status);
            // console.log(1);
//            if(n.state==status){
            //状态判断
            var status="";
            if(n.ticket.ticket_type=="1"){
                status="普通条码";
            }
            else if(n.ticket.ticket_type=="2"){
                status="二维码";
            }
            if(n.name==null){
                name="未分配票"
            }else if(n.name==""){
                name="未分配票"
            }
            else{
                name="持票人："+n.name
            }

            //拼接
            var str="";
            if(n.state=="1")//未出售嫖
            {
                str+="<div class=\"allmain\"><div class=\"main\"><div  class=\"o-con\"><div class=\"inputtype\" style=\"display: none; \"><input type=\"checkbox\" value="+ n.ticket.ticket_id+" name=\"test\"/></div>";
                str+="门票编号:<span>"+ n.ticket.ticket_no+"</span><span class=\"o-con-text\">&emsp;&emsp;"+status+"</span><br /></div></div><div class=\"o-con1\"> <span class=\"undistributed\">"+ name+"  </span> <span class=\"money\" onclick=\"tzsp("+ n.ticket.ticket_id+")\">售票</span> </div></div>";
            }
            else if(n.state=="2")//待确认票
            {
                str+="<div class=\"allmain\"><div class=\"main\"><div  class=\"o-con\"><div class=\"inputtype\" style=\"display: none; \"><input type=\"checkbox\" value="+ n.ticket.ticket_id+" name=\"test\"/></div>";
                str+="门票编号:<span>"+ n.ticket.ticket_no+"</span><span class=\"o-con-text\">&emsp;&emsp;"+status+"</span><br /></div></div><div class=\"o-con1\"> <span class=\"undistributed\">"+ name+"  </span> <span class=\"money2 hide\"  data-phone=\""+n.phone+"\" data-name=\""+n.name+"\" data-ticketId=\""+ n.ticket.ticket_id+"\" onclick=\"buyTicketInfo2(this)\">完善信息</span> </div></div>";

            }
            else if(n.state=="3")
            {
                str+="<div class=\"allmain\"><div class=\"main\"><div  class=\"o-con\"><div class=\"inputtype\" style=\"display: none; \"><input type=\"checkbox\" value="+ n.ticket.ticket_id+" name=\"test\"/></div>";
                str+="门票编号:<span>"+ n.ticket.ticket_no+"</span><span class=\"o-con-text\">&emsp;&emsp;"+status+"</span><br /></div></div><div class=\"o-con1\"> <span class=\"undistributed\">"+ name+"  </span> </div></div>";
                //$(".kl").append(str);
            }
            else if(n.state=="4")
            {
                str+="<div class=\"allmain\"><div class=\"main\"><div  class=\"o-con\"><div class=\"inputtype\" style=\"display: none; \"><input type=\"checkbox\" value="+ n.ticket.ticket_id+" name=\"test\" /></div>";
                str+="门票编号:<span>"+ n.ticket.ticket_no+"</span><span class=\"o-con-text\">&emsp;&emsp;"+status+"</span><br /></div></div><div class=\"o-con1\"> <span class=\"undistributed\">"+ name+"  </span></div></div>";
            }
            //$(".kl").append(str);
            $("#thelist").append(str);
            //console.log($(".money"))
            //  }
        });
        if (pageCount>e.dataPacket.list.length) {
            over=0;
            GetMoreOver();
            if (pageIndex == 1 && e.dataPacket.list.length == 0) {
                closeGetMore();

                $("#over").addClass("hide");
                $(".o-blank").remove();
                var blank = $('<div class="o-blank"><img src="../img/blank_03.jpg"/><div class="o-blankWord">您还没有相关的门票</div></div>')
                $("#thelist").append(blank);
            }
        }
        extendedAttribute();
    }
    else if(e.result.code=="3200"){
        openmodal("登录失效");
        sessionStorage.removeItem("token");
        sessionStorage.setItem("wxToken","0");
        wxBack();
    }
    else if(e.result.code=="3201") {
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
    else if(e.result.code=="3203")
    {
        self.location.href="wxGzh.html";
    }
    else if(e.result.code=="300")
    {
        lastLength=0;
        GetMoreOver();
        over=0;
        if (pageIndex == 1) {
            closeGetMore();
            $(".o-blank").remove();
            $("#over").addClass("hide");
            var blank = $('<div class="o-blank"><img src="../img/blank_03.jpg"/><div class="o-blankWord">您还没有相关门票</div></div>')
            $("#thelist").append(blank);
        }
    }
    else{

    }
    limited = document.body.scrollHeight - 5;
    GetMoreOver();
    layer.closeAll();
}

var ticketStyles=1;//默认未出售
//状态筛选 选择
function ticketStyle(btn){
    if($(btn).hasClass("lic_1"))
    {}
    else{

        $(btn).addClass("lic_1").siblings().removeClass("lic_1");
        statusk=$(btn).attr("data-style");
        pageIndex=1;
        over=1;
        $(".allmain").remove();
        getTicketList();
        getMoreover();
        $(".m-footer").each(function(i,show){
            //显示按钮
            if($(show).attr("data-name")==$(btn).attr("data-name"))
            {
                $(show).removeClass("disn").siblings(".m-footer").addClass("disn");
            }
        })
    }
}

//待确认门票查看是否需要填写拓展属性
function extendedAttribute(){
    var token=JSON.parse(sessionStorage.getItem("token"));
    var actId=JSON.parse(sessionStorage.getItem("acActId"));
    if(actId!=null&&actId!=undefined&&actId!="")
    {
        var data = '{"token": "'+token+'", "actId":'+actId+'}';
        console.log(data);
        AjaxSubmit("get", JSON.parse(data), basePath + "Ticket/getTicketSaleAttribute", getTicketSaleAttribute_fun2)
    }
}
function getTicketSaleAttribute_fun2(res){
    if(res.result.code=="200")
    {
        if(res.dataPacket.fieldList!=null&&res.dataPacket.fieldList!=""&&res.dataPacket.fieldList!=undefined)
        {
            if(res.dataPacket.fieldList.length>0)
            {
                if($(".allmain").find(".money2").length>0)
                {
                    $(".allmain").find(".money2").each(function(i,span){
                        $(span).removeClass("hide");
                    })
                }
            }
        }
    }
    else if(res.result.code=="3200"){
       openmodal("登录超时");
        $(".layui-m-layer").addClass("layerChange");
        $(".layui-m-layermain").addClass("layerChange1");
        sessionStorage.removeItem("token");
        sessionStorage.setItem("wxToken","0");
        setTimeout(function(){
            wxBack();
        },1000);
    }
    else if(res.result.code=="300")
    {
        oenmodal(res.result.detail);
    }
    else{
        oenmodal("获取信息失败");
    }
}

function buyTicketInfo2(btn){
    var actId=JSON.parse(sessionStorage.getItem("acActId"));
    var ticketId=$(btn).attr("data-ticketId");
    var partId=JSON.parse(sessionStorage.getItem("acPartId"));
    if(actId!=null&&actId!=""&&actId!=undefined&&ticketId!=null&&ticketId!=undefined&&ticketId!=""&&partId!=null&partId!=undefined&&partId!="")
    {
        sessionStorage.setItem("urlReturnBack",JSON.stringify(window.location.href));
        sessionStorage.setItem("userInfos",JSON.stringify($(btn).attr("data-name")));
        sessionStorage.setItem("userInfosPhone",JSON.stringify($(btn).attr("data-phone")));
        //setTimeout(function(){
        //    //到时候改
            self.location.href="buyTicketInfo2.html?actId="+actId+"&ticketId="+ticketId+"&partId="+partId+"";
        //},1000)
    }
    else {
        openmodal("信息获取失败");
    }
}
//data-next
//4是恢复功能
//其他是按第二个选项的data-sum控制

//一开始加载的样式
function ticketFirstStyle(){
    $(".t-ticketStyleUl").find("li").each(function(i,li){
        if($(li).attr("data-style")==ticketStyles)
        {
            $(li).trigger("click");
        }
    })
}


//分配未出售门票
function ticketShare(btn){
    $(".inputtype").css("display","block");
    if($(btn).attr("data-sum")=="2")
    {
        $(".inputtype").find("input").each(function(){
            $(this).prop("checked","checked");
        });
    }
    $(".m-footer").each(function(i,next){
        //下一步
        if($(next).attr("data-name")=="11")
        {
            $(next).removeClass("disn").siblings(".m-footer").addClass("disn");
        }
    })
}

//取消选择
function t_shareCencel(btn){
    $(".m-footer").each(function(i,back){
        if($(back).attr("data-name")==$(btn).attr("data-name"))
        {
            $(back).removeClass("disn").siblings(".m-footer").addClass("disn");
            $(".inputtype").css("display","none");
            $(".inputtype").find("input").each(function(){
                $(this).removeAttr("checked");
            });
        }
    })
}
//加载更多
function getMoreover() {
    var bodyHeight = setInterval(function () {
        if ($("body").height() < $(window).height() && over == 1) {
            limited = 999999999999999999;//无穷大，限制重复滚动
            pageIndex++;
          
            getTicketList();
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
            getTicketList();
        }
    });
}

//重置
function ticketReturn(btn){
    $(".inputtype").css("display","block");
    $(".m-footer").each(function(i,next){
        //下一步
        if($(next).attr("data-name")=="21")
        {
            $(next).removeClass("disn").siblings(".m-footer").addClass("disn");
            $(next).attr("data-next",$(btn).attr("data-sum"));
        }
    });
}
//作废
function ticketDel(btn){
    $(".inputtype").css("display","block");
    $(".m-footer").each(function(i,next){
        //下一步
        if($(next).attr("data-name")=="12")
        {
            $(next).removeClass("disn").siblings(".m-footer").addClass("disn");
            $(next).attr("data-next",$(btn).attr("data-sum"));
        }
    });
}
//恢复
function ticketReply(btn){
    $(".inputtype").css("display","block");
    $(".m-footer").each(function(i,chose){
        //下一步
        if($(chose).attr("data-name")=="999")
        {
            $(chose).removeClass("disn").siblings(".m-footer").addClass("disn");
            $(chose).attr("data-parent",$(btn).parent().attr("data-name"));
            $(chose).attr("data-next",$(btn).parent().attr("data-next"));
        }
    });
}
//取消
function t_cencel(btn){
    var dataName=$(btn).parent().attr("data-name").slice(0,length-1);
    $(".m-footer").each(function(i,back){
        if($(back).attr("data-name")==dataName)
        {
            $(back).removeClass("disn").siblings(".m-footer").addClass("disn");
            $(".inputtype").css("display","none");
            $(".inputtype").find("input").each(function(){
                $(this).removeAttr("checked");
            });
        }
    })
}

//批量选择
function ticketChose(btn){
    $(".inputtype").css("display","block");
    $(".inputtype").find("input").each(function(){
        $(this).prop("checked","checked");
    });
    $(".m-footer").each(function(i,chose){
        if($(chose).attr("data-name")=="999")
        {
            $(chose).removeClass("disn").siblings(".m-footer").addClass("disn");
            $(chose).attr("data-parent",$(btn).parent().attr("data-name"));
            $(chose).attr("data-next",$(btn).parent().attr("data-next"));
        }
    })
}
//批量选择取消
function t_cencel1(btn){
    $(".inputtype").find("input").each(function(){
        $(this).removeAttr("checked");
    });
    if($(btn).parent().attr("data-parent")=="4")
    {
        $(".inputtype").css("display","none");
    }
    $(".m-footer").each(function(i,chose){
        if($(chose).attr("data-name")==$(btn).parent().attr("data-parent"))
        {
            $(chose).removeClass("disn").siblings(".m-footer").addClass("disn");
        }
    })
}
//确定
function t_sure(btn){
    //重置与确定
    var token=JSON.parse(sessionStorage.getItem("token"));
    var ticketId = document.getElementsByName("test");
    var check_val = [];
    for (var i in ticketId) {
        if (ticketId[i].checked) {
            check_val.push(ticketId[i].value);
        }
    }
    if(check_val.length==0)
    {
        openmodal("至少需要选择一张门票");
    }
    else{
        var ticketIdList=check_val.toString().replace(/,/g, "|");
        //重置与确定
        if($(btn).parent().attr("data-name")=="21"||$(btn).parent().attr("data-parent")=="21")
        {
            var type;
            if($(btn).parent().attr("data-next")=="1")
            {
                //重置
                type=0;
            }
            else{
                //确定
                type=1;
            }
            var data ='{"token":"'+token+'","type": '+type+',"ticketIdList":"'+ticketIdList+'"}';
            AjaxSubmit("get", JSON.parse(data),  basePath + "Ticket/ticketConfirmSale", ticketConfirmSale_fun);
        }
        //作废
        else if($(btn).parent().attr("data-name")=="12"||$(btn).parent().attr("data-parent")=="12"||$(btn).parent().attr("data-parent")=="4")
        {
          var type;
            if($(btn).parent().attr("data-next")=="3"){
                //作废
                type=0;
            }
           else{
                //恢复
                type=1;
            }
            var data ='{"token":"'+token+'","type": '+type+',"ticketIdList":"'+ticketIdList+'"}';
            AjaxSubmit("get", JSON.parse(data),  basePath + "Ticket/ticketToVoid", ticketToVoid_fun);
        }
    }
}
//作废与恢复结果
function ticketToVoid_fun(res){
    console.log(res);
    if (res.result.code == "200") {
        openmodal("操作成功");
        ticketStyles=1;
        $(".t-ticketStyleUl").find("li").removeClass("lic_1");
        ticketFirstStyle();
    }
    else if(res.result.code == "300")
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
    else{
        openmodal("操作失败");
    }
}

//重置结果
function  ticketConfirmSale_fun(res){
    console.log(res);
    if (res.result.code == "200") {
       openmodal("操作成功");
        ticketStyles=2;
        $(".t-ticketStyleUl").find("li").removeClass("lic_1");
        ticketFirstStyle();
    }
    else if(res.result.code == "300")
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
    else{
        openmodal("操作失败");
    }
}


//返回上一页
function t_back(btn){
    self.location.href="activeCenter.html";
}

function goData(btn){
  
    var token=JSON.parse(sessionStorage.getItem("token"));
    var actId=JSON.parse(sessionStorage.getItem("acActId"));
    var data='{"token":"'+token+'", "actId":'+actId+'}';
    console.log(data);
    if(actId!=null&&actId!=""&&actId!=undefined)
    {
        self.location.href=basePath1+"/Excel/sale_ticketList.aspx?token="+token+"&actId="+actId+"";
    }
    else{
        openmodal("活动失效，请重新选择")
        setTimeout(function(){
            self.location.href="personalCenter.html";
        },1500)
    }
}