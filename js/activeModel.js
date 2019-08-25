var getUser="";
var getPartUser="";
var getWxInfo="";
var countdown =60;
var joinActNum="";
$(function () { 
  var isPageHide = false; 
  window.addEventListener('pageshow', function () { 
    if (isPageHide) { 
      window.location.reload(); 
    } 
  }); 
  window.addEventListener('pagehide', function () { 
    isPageHide = true; 
  }); 
}) 
function openUserInfo(){
 var historyGo= JSON.parse(sessionStorage.getItem("historyGo"));
    if(historyGo!=undefined&&historyGo!=""&&historyGo!=""&&historyGo=="1")
    {
        history.go(-1);
    }
    else{
        getActiveInfo();
    }
}
function getActiveInfo(){
    var data;
    var partyId=GetQueryString("partId");
    var actId=GetQueryString("actId");
    if(partyId!=null&&partyId!=undefined&&partyId!=""&&actId!=null&&actId!=undefined&&actId!="")
    {
        data='{"actId":'+actId+',"partId":'+partyId+'}';
        sessionStorage.setItem("partId",JSON.stringify(partyId));
       
        sessionStorage.setItem("shareActives",data);
        //if(  actId=="126")
        //{
        //    self.location.href="activeDetails2.html?actId="+actId+"&partId="+partyId+"";
        //}
        //else{
        AjaxSubmit("get", JSON.parse(data), basePath + "activity/getActivityInfo", getActivityInfo_fun);
        //}
    }
    else{
        data=sessionStorage.getItem("activeDetails");
        console.log(data);
        var partId=JSON.parse(data).partId;
        sessionStorage.setItem("partId",JSON.stringify(partyId));
        if(data!=null&&data!=""&&data!=undefined)
        {
            JSON.parse(data);
            sessionStorage.setItem("shareActives",data);
            layer.open({
                type: 2
                ,content: '加载中',
                shadeClose: false
            });
            AjaxSubmit("get", JSON.parse(data), basePath + "activity/getActivityInfo", getActivityInfo_fun);
        }
        else{
            openmodal("请选择一场活动进行参加");
            setTimeout(function(){
                //sessionStorage.removeItem("activeDetails");
                self.location.href="index1.html";
            },1500);
            //layer.open({
            //    content: '请您选择一场活动'
            //    ,skin: 'msg'
            //    //,time: 1.5 //2秒后自动关闭
            //});
        }
    }
}//获取活动详情数据
function getActivityInfo_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        if(res.dataPacket!=null&&res.dataPacket!=undefined&&res.dataPacket!="")
        {
            sessionStorage.setItem("activeDetailData",JSON.stringify(res));
            //判断模板
            if(res.dataPacket.activity.modeltype!=null&&res.dataPacket.activity.modeltype!=undefined&&res.dataPacket.activity.modeltype!="")
            {
                if(res.dataPacket.activity.modeltype=="2"){
                    sessionStorage.setItem("historyGo","1");
                    setTimeout(function(){
                       
                        self.location.href="activeDetails2.html"
                    },500)
                }
                else if(res.dataPacket.activity.modeltype=="1")
                {
                    sessionStorage.setItem("historyGo","1");
                    setTimeout(function(){
                        
                        self.location.href="activeDetails.html"
                    },500)
                }
                else{
                    sessionStorage.setItem("historyGo","1");
                    setTimeout(function(){
                        
                        self.location.href="activeDetails.html"
                    },500)
                }
            }
            else{
                sessionStorage.setItem("historyGo","1");
                setTimeout(function(){
                   
                    self.location.href="activeDetails.html"
                },500)
            }
        }
    }
    else if(res.result.code=="300"){
        openmodal(res.result.detail);
        //setTimeout(function(){
        //    //sessionStorage.removeItem("activeDetails");
        //    self.location.href="index1.html";
        //},1500);
    }
    layer.closeAll();
}