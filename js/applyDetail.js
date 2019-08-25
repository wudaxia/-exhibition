/**
 * Created by MyPC on 2017/6/28.
 */
function openUserInfo(){
    getActivitySignUpInfo();
}

//getActivitySignUpInfo();

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



//报名详情
function  getActivitySignUpInfo(){
    var url=basePath+"personnel/getActivitySignUpInfo";
    var token=JSON.parse(sessionStorage.getItem("token"));
    var actId=JSON.parse(sessionStorage.getItem("acActId"));
    var actvieId=JSON.parse(sessionStorage.getItem("partid"));
    if(actId==null||actId==""||actId==undefined||actvieId==null||actvieId==""||actvieId==undefined)
    {
        openmodal("您未选择一位用户，请去选择")
        setTimeout(function(){
            self.location.href="applyActive.html";
        },1500)
    }
    var data='{"token":"'+token+'", "actId":'+actId+', "actvieId":'+actvieId+'}';
    console.log(data);
    $.get(url,JSON.parse(data),function(e){
        console.log(e)
        if(e.result.code=="200") {
            if (e.dataPacket.active.state == 1) {
                status = "普通报名用户";
                //numno = "尚未购卡"
            }
            else if (e.dataPacket.active.state == 3) {
                status = "二维码门票用户";
                //numno = e.dataPacket.active.ticketList.ticket_no;
            }
            else if (e.dataPacket.active.state == 2) {
                status = "条码门票用户";
                //numno = e.dataPacket.active.ticketList.ticket_no;
            }
            else if (e.dataPacket.active.state == 4) {
                status = "双门票用户";
                //numno = e.dataPacket.active.ticketList[0].ticket_no + "和" + e.dataPacket.active.ticketList[1].ticket_no
            }

            var wxName = "";
            if (e.dataPacket.active.wxinfo == null || e.dataPacket.active.wxinfo == "" || e.dataPacket.active.wxinfo == undefined || e.dataPacket.active.wxinfo.nickname == null || e.dataPacket.active.wxinfo.nickname == "" || e.dataPacket.active.wxinfo.nickname == undefined)
            {
                wxName="未绑定微信";
            }
            else{
                wxName=e.dataPacket.active.wxinfo.nickname
            }
            var phone="";
            if(e.dataPacket.active.phone==null||e.dataPacket.active.phone==undefined||e.dataPacket.active.phone=="")
            {
                phone="无联系电话";
            }
            else{
                phone=e.dataPacket.active.phone;
            }
               //console.log(n)
            var str = "";
            str += "<div class=\"m-type\"><span class=\"m-left\">"+changeTime1(e.dataPacket.active.active_time)+"</span><span class=\"m-right\">"+status+"</span></div><div class=\"m-cont\"><div id=\"m-cont-text\">"+ e.dataPacket.active.active_name+"<br />";
            str += "<span class=\"m-cont-text1\">报名时间："+changeTime(e.dataPacket.active.active_time)+"</span></div></div><div class=\"a-cont-c\"><div><span class='ad-wxName'>微信昵称：</span><span class=\"a-con-t\">"+wxName+"</span></div>";
            str += "<div id=\"a-tel\"><span class='ad-wxName'>联系电话：</span><span class=\"a-con-t\">"+phone+"</span></div></div><div class=\"clear\"></div><div class=\"a-active\"><ul>";
            str += "<li onclick=\"phone1("+phone+")\"><i class=\"am-icon-phone\"></i>  打电话</li><li onclick=\"sms("+phone+")\"><i class=\"am-icon-envelope\"></i>  发短信  </li></ul></div>";
            $(".ap").append(str);

            if(e.dataPacket.active.state==1){
              $(".a-dingdan").css("display","none");
            }
            else {
                $(".a-dingdan").css("display","block");
            }
            //门票信息
            var ticket=e.dataPacket.active.ticketList;
            if(ticket==null||ticket==""||ticket==undefined)
            {
                var ticketDiv=$("<div class=\"a-dingdan\">" +
                    "<div style=\"text-align: center\">该用户尚未拥有任何门票</div>" +
                    "</div>");
                $(".ap").append(ticketDiv);
            }
            else{
                $.each(ticket,function(i,ticketList){
                    var ticketTyle="";
                    if(ticketList.ticket_type=="2")
                    {
                        ticketTyle="二维码门票";
                    }
                    else if(ticketList.ticket_type=="1")
                    {
                        ticketTyle="条形码门票";
                    }
                    var ticketTime="";
                    if(ticketList.saleTime==""||ticketList.saleTime==undefined||ticketList.saleTime==undefined)
                    {
                        ticketTime="尚未填写售卡时间";
                    }
                    else
                    {
                        ticketTime=changeTime(ticketList.saleTime);
                    }
                    var ticketDiv=$("<div class=\"a-dingdan a-ticketId"+i+"\">" +
                        "<div><span class=\"ad-wxName\">门票类型：</span>"+ticketTyle+"</div>" +
                        "<div><span class=\"wxName\">门票编号：</span>"+ticketList.ticket_no+"</div>" +
                        "<div><span class=\"wxName\">购票时间：</span>"+ticketTime+"</div>" +
                        "</div>");
                    $(".ap").append(ticketDiv);
                    if(ticketList.ticket_type=="1")
                    {
                        if(ticketList.fieldlist!=null&&ticketList.fieldlist!=undefined&&ticketList.fieldlist!="")
                        {
                            if(ticketList.fieldlist.length>0)
                            {
                                $.each(ticketList.fieldlist,function(fieldlist,div){
                                    var value="";
                                    if(div.value==null||div.value==undefined||div.value=="")
                                    {
                                        value="未填";
                                    }
                                    else{
                                        value=div.value;
                                    }
                                    var ticketFieldlist=$("<div><span class=\"ad-wxName\">"+div.title+"：</span>"+value+"</div>");
                                    $(".a-ticketId"+i+"").append(ticketFieldlist);
                                })
                            }
                        }
                    }
                })
            }
        }
       else if(e.result.code=="300")
        {
            openmodal(e.result.detail);
        }
        else if(e.result.code=="3200"){
            openmodal("登录失效");
            sessionStorage.removeItem("token");
            sessionStorage.setItem("wxToken","0");
            wxBack();
        }
        else if(e.result.code=="3201"){
            sessionStorage.setItem("returnUrl",JSON.stringify(window.location.href));
            sessionStorage.setItem("token",JSON.stringify(res.dataPacket.token));
            openmodal("您未绑定微信号，请去绑定");
            setTimeout(function(){
                self.location.href="login.html";
            },1500)
        }
        else{
            openmodal("信息读取错误，请重新获取");
            setTimeout(function(){
                self.location.href="applyActive.html";
            },1500)
        }
    })
}



//直接拨打电话
function  phone1(a){
    self.location.href="tel:"+a;
}
//发送短信功能
function sms(b){
    self.location.href="sms:"+b;
}

//返回
function  fh(){
   self.location.href="applyActive.html";
}
