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
$(".main_image").height($(".main_image").width()*0.42);
$(".main_image1").height($(".main_image1").width()*0.42);
	layer.open({
		type: 2
		,content: '加载中',
		shadeClose: false
	});
	sessionStorage.removeItem("historyGo");
	//banner1();
	//console.log(data);
    AjaxSubmit2("get",basePath + "userCenter/getIndex",getIndex_fun);
}
$(window).load(function() {
	$(".in-slide ul").css("width",$('.in-slide ul li').length*$('.in-slide ul li').width()+"px");
});
function getIndex_fun(res){
	console.log(res);
	if(res.result.code=="200")
	{
		var activeLists=res.dataPacket.actList;
		$.each(activeLists,function(i,activeList){
			var imgUrl="";
			if(activeList.img_url==null||activeList.img_url==""||activeList.img_url==undefined)
			{
				imgUrl="http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg?imageView/1/w/1000/h/1000/q/80";
			}
			else{
				imgUrl=activeList.img_url;
			}
			var i_activeList=$('<div class="index-main" onclick="lookActive(this)" data-actId="'+activeList.id+'" data-partId="0"> ' +
			'<div class="index-left-text"> ' +
			'<div class="index-t"> ' +
			'<div class="index-t2-1" style="margin-left:15px"> ' +
			'<span class="index-t2-2">'+activeList.title+'</span><br /> ' +
			'<span class="index-t2-3">'+activeList.tags+'</span> ' +
			'</div> ' +
			'</div> ' +
			'<div class="index-f"> ' +
			'<button type="button" class="am-btn am-btn-success am-round"><span class="a-look">去看看<img src="../img/icon-1.png" /></span></button> ' +
			'</div> ' +
			'</div> ' +
			'<div class="index-right-image"> ' +
			'<img class="am-radius" alt="140*140" src="'+imgPath+imgUrl+'" /> ' +
			'</div> ' +
			'</div>');
			$(".index-mains").append(i_activeList);
		});
        var lx1=res.dataPacket.lx1;
        if(lx1!=null&&lx1!=undefined&&lx1!=""&&lx1.length>0)
        {
            if(lx1.length==1)
            {
                console.log(lx1[0].img_url)
                var img=$(' <li><a href="'+lx1[0].tags+'"><img class="img_1" src="'+imgPath+lx1[0].img_url+'"/></a></li>');
                $(".i-banner1Ul").append(img);
            }
            else{
                $.each(lx1,function(lxi,lx1Img){
                    var img=$(' <li><a href="'+lx1Img.tags+'"><img class="img_'+(lxi+1)+'" src="'+imgPath+lx1Img.img_url+'"/></a></li>');
                    $(".i-banner1Ul").append(img);
                });
                banner();
            }
        }
        else{
            var img=$(' <li><img class="img_1" src="http://s.amazeui.org/media/i/demos/bing-1.jpg"/></li>');
            $(".i-banner1Ul").append(img);
        }
        var lx2=res.dataPacket.lx2;
        if(lx2!=null&&lx2!=undefined&&lx2!=""&&lx2.length>0)
        {
            if(lx2.length==1)
            {
                console.log(lx2[0].img_url)
                var img=$(' <li><a href="'+lx2[0].tags+'"><img class="img_1" src="'+imgPath+lx2[0].img_url+'"/></a></li>');
                $(".i-banner2Ul").append(img);
            }
            else{
                $.each(lx2,function(lx2i,lx2Img){
                    var img=$(' <li><a href="'+lx2Img.tags+'"><img class="img_'+(1+lx2i)+'" src="'+imgPath+lx2Img.img_url+'"/></a></li>');
                    $(".i-banner2Ul").append(img);
                });
                banner1();
            }
        }
        else{
            var img=$(' <li><img class="img_1" src="http://s.amazeui.org/media/i/demos/bing-1.jpg"/></li>');
            $(".i-banner2Ul").append(img);
        }
        var lx3=res.dataPacket.lx3;
        if(lx3!=null&&lx2!=undefined&&lx3!=""&&lx3.length>0)
        {
            if(lx3.length==1)
            {
                console.log(lx3[0].img_url)
                var img=$('<li><a href="'+lx3[0].tags+'"><img src="'+imgPath+lx3[0].img_url+'"></a> </li>');
                $(".i-HotActives").append(img);
            }
            else{
                $.each(lx3,function(lx3i,lx3Img){
                    var img=$(' <li><a href="'+lx3Img.tags+'"><img  src="'+imgPath+lx3Img.img_url+'"/></a></li>');
                    $(".i-HotActives").append(img);
                });
            }
        }
        else{
            var img=$(' <li><img class="img_1" src="http://s.amazeui.org/media/i/demos/bing-1.jpg"/></li>');
            $(".i-HotActives").append(img);
        }
        $(".in-slide ul").css("width",$('.in-slide ul li').length*$('.in-slide ul li').width()+"px");
	}
	else if(res.result.code=="300")
	{
		openmodal(res.result.detail);
	}
	else{
		openmodal("出现错误，请刷新该页面");
	}
	layer.closeAll();
}
function banner1(){
	var timer1;
	$(".main_visual1").hover(function(){
		$("#btn_prev1,#btn_next1").fadeIn();
	},function(){
		$("#btn_prev1,#btn_next1").fadeOut();
	});
	$dragBln = false;
	$(".main_image1").touchSlider({
		flexible : true,
		speed : 300,
		btn_prev : $("#btn_prev1"),
		btn_next : $("#btn_next1"),
		paging : $(".flicking_con1 a"),
		counter : function (e){
			$(".flicking_con1 a").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	$(".main_image1").bind("mousedown", function() {
		$dragBln = false;
	});
	$(".main_image1").bind("dragstart", function() {
		$dragBln = true;
	});
	$(".main_image1 a").click(function(){
		if($dragBln) {
			return false;
		}
	});
	timer1 = setInterval(function(){
		$("#btn_next1").click();
	}, 3000);
	$(".main_visual1").hover(function(){
		clearInterval(timer);
	},function(){
		timer1 = setInterval(function(){
			$("#btn_next1").click();
		},3000);
	});
	$(".main_image1").bind("touchstart",function(){
		clearInterval(timer1);
	}).bind("touchend", function(){
		timer1 = setInterval(function(){
			$("#btn_next1").click();
		}, 3000);
	});
}//轮播图
function lookActive(btn){
    var actId=parseInt($(btn).attr("data-actId"));
    var partId=parseInt($(btn).attr("data-partId"));
    var data='{"actId":'+actId+',"partId":'+partId+'}'
    sessionStorage.setItem("activeDetails",data);
    sessionStorage.setItem("activeDetailsStyle","0");
    self.location.href="activeModel.html";
}
