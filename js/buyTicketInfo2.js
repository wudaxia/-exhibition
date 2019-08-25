function wxLogins(){
    personSign();
}
var listfield="";
function personSign(){
    var data="";
    var partyId=GetQueryString("partId");
    var actId=GetQueryString("actId");
    var token=JSON.parse(sessionStorage.getItem("token"));
    var ticketId=GetQueryString("ticketId");
    var ticketUserInfo=JSON.parse(sessionStorage.getItem("ticketUserInfo"));
    var ticketActiveId=JSON.parse(sessionStorage.getItem("ticketActiveId"));
    var proUserInfo=JSON.parse(sessionStorage.getItem("userInfos"));
    var proUserInfoPhone=JSON.parse(sessionStorage.getItem("userInfosPhone"));
    if(partyId!=null&&partyId!=undefined&&partyId!=""&&ticketId!=null&&ticketId!=undefined&&ticketId!="")
    {
        data='{"ticketId":'+ticketId+',"partId":'+partyId+'}';
        AjaxSubmit("get", JSON.parse(data), basePath + "Ticket/getTicketInfo", getTicketInfo_fun);
        //管理员进入
        if(token!=null&&token!=undefined&&token!="")
        {
            $(".bti2-userCode").remove();
            data='{"actId":'+actId+',"token":"'+token+'"}';
            AjaxSubmit("get", JSON.parse(data), basePath + "Ticket/getTicketSaleAttribute", getTicketSaleAttribute_fun);
            //报名用户
            if(ticketUserInfo!=null&&ticketUserInfo!=undefined&&ticketUserInfo!=""&&ticketActiveId!=null&&ticketActiveId!=undefined&&ticketActiveId!="")
            {
                var userInfos=ticketUserInfo.split("|");
                $(".bti2-userName").val(userInfos[0]).attr("readonly","readonly");
                $(".bti2-userPhone").val(userInfos[1]).attr("readonly","readonly");
            }
            else if(proUserInfo!=null&&proUserInfo!=undefined&&proUserInfo!=""&&proUserInfoPhone!=undefined&&proUserInfoPhone!=""&&proUserInfoPhone!=null)
            {
                $(".bti2-userName").val(proUserInfo).attr("readonly","readonly");
                $(".bti2-userPhone").val(proUserInfoPhone).attr("readonly","readonly");
            }
            //非报名用户
            else{
                $(".bti-clickQeCode").removeClass("hide");
            }
        }
        //用户进入
        else{

        }
    }
    else{
        openmodal("获取信息失败");
    }
}
function getTicketSaleAttribute_fun(res) {
    console.log(res);
    if(res.result.code=="200")
    {
        listfield=res.dataPacket.fieldList;
        if(listfield!=null&&listfield!=""&&listfield!=undefined)
        {
            $.each(listfield, function (i,input) {
                //文本框
                if(input.data_type=="singe-text")
                {
                    var str=$(' <div class="M_topic maxtop question"> ' +
                        '<div class="topic_title">'+input.title+'</div> ' +
                        '<div class="topic_con"> ' +
                        '<div class="topic_input topic_input_default"> ' +
                        '<input type="text" data-title="'+input.title+'" data-requird="'+input.is_required+'" required="required" name="'+input.name+'"  pattern="'+input.valid_pattern+'"  class="option '+input.name+'" data-type="'+input.data_type+'" data-fid="'+input.f_id+'" nullmsg="请输入相关内容" placeholder="请输入相关内容"/> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>');
                    $("#question_box").append(str);
                }
                //日期
                else if(input.data_type=="datetime")
                {
                    var str=$(' <div class="M_topic maxtop question"> ' +
                        '<div class="topic_title">'+input.title+'</div> ' +
                        '<div class="topic_con"> ' +
                        '<div class="topic_input topic_input_default"> ' +
                        ' <input type="text" data-title="'+input.title+'" required="required" data-requird="'+input.is_required+'" name="'+input.name+'"  pattern="'+input.valid_pattern+'"  class="option '+input.name+'" data-type="'+input.data_type+'" data-fid="'+input.f_id+'" placeholder="请输入日期"/>  ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>');
                    $("#question_box").append(str);
                }
                //多选
                else if(input.data_type=="multi-checkbox")
                {
                    if(input.item_option!=null&&input.item_option!=undefined&&input.item_option!="")
                    {
                        var itemAttr=input.item_option.split("|");
                        if(itemAttr.length>0)
                        {
                            var str="";
                            str+=' <div class="M_topic maxtop question"> ' +
                                '<div class="topic_title">'+input.title+'</div><div class="topic_con checkbox_wrap"> ' +
                                '<div class="related-tip"></div> ' +
                                '<ul class="unstyled"> ';
                            $.each(itemAttr,function(j,item){
                                if(j==0)
                                {
                                    str+='<li><div class="checked_wrap"><label class="inputLabel"><input data-requird="'+input.is_required+'" type="checkbox" id="checkbox-1-'+(i+"0"+j+"0"+1)+'" value="'+item+'" required name="'+input.name+'" data-type="'+input.data_type+'"  class="regular-checkbox a-default '+input.name+'" data-fid="'+input.f_id+'"/><label for="checkbox-1-'+(i+"0"+j+"0"+1)+'" class="inputLable"></label>'+item+'</label></div></li>';
                                }
                                else{
                                    str+='<li><div class="checked_wrap"><label class="inputLabel"><input type="checkbox" value="'+item+'" id="checkbox-1-'+(i+"0"+j+"0"+1)+'"  name="'+input.name+'"  class="regular-checkbox a-default '+input.name+'"/><label for="checkbox-1-'+(i+"0"+j+"0"+1)+'" class="inputLable"></label>'+item+'</label></div></li> ';
                                }
                            })
                            str+=  '</ul> ' +
                                '</div> ' +
                                '</div>'
                            $("#question_box").append(str);
                        }
                    }
                }
                //单选
                else if(input.data_type=="multi-radio"){
                    if(input.item_option!=null&&input.item_option!=undefined&&input.item_option!="")
                    {
                        var itemAttr2=input.item_option.split("|");
                        if(itemAttr2.length>0)
                        {
                            var str="";
                            str+=' <div class="M_topic maxtop question"> ' +
                                '<div class="topic_title">'+input.title+'</div><div class="topic_con checkbox_wrap"> ' +
                                '<div class="related-tip"></div> ' +
                                '<ul class="unstyled"> ';
                            $.each(itemAttr2,function(z,item2){
                                if(z==0)
                                {
                                    str+='<li><div class="checked_wrap"><label class="inputLabel"><input data-requird="'+input.is_required+'" type="radio" id="radio-1-'+(i+"0"+z+"0"+1)+'" value="'+item2+'" required name="'+input.name+'" data-type="'+input.data_type+'"  class="regular-radio a-default '+input.name+'" data-fid="'+input.f_id+'"/><label for="radio-1-'+(i+"0"+z+"0"+1)+'" class="regular-radioLabel"></label>'+item2+'</label></div></li>';
                                }
                                else{
                                    str+='<li><div class="checked_wrap"><label class="inputLabel"><input type="radio" value="'+item2+'" id="radio-1-'+(i+"0"+z+"0"+1)+'"  name="'+input.name+'"  class="regular-radio a-default '+input.name+'"/><label for="radio-1-'+(i+"0"+z+"0"+1)+'" class="regular-radioLabel"></label>'+item2+'</label></div></li> ';
                                }
                            })
                            str+=  '</ul> ' +
                                '</div> ' +
                                '</div>'
                            $("#question_box").append(str);
                        }
                    }
                }
                //图片
                else if(input.data_type=="file")
                {
                    var str=$('<div class="M_topic maxtop question" data-id="'+input.f_id+'"> ' +
                        '<div class="topic_title">'+input.title+'</div><div class="topic_con checkbox_wrap"> ' +
                        '<div class="related-tip"></div> ' +
                        '<ul class="unstyled"> <li> ' +
                        '<div class="checked_wrap ImgUrls" id="photoList'+i+'"> ' +
                        '<div class="subImg" id="subImg'+i+'"> ' +
                        '<img id="chooseImg'+i+'" class="e-join" data-requird="'+input.is_required+'" src="../img/15.png" data-id="inputFile'+i+'" onClick="subFile(this)" /> ' +
                        '<img id="deleteImg'+i+'" class="e-imgExit" src="../img/14.png" onClick="deleteImgF(this)"/> ' +
                        '</div> ' +
                        '<form id="seekHelpForm'+i+'" hidden=""> ' +
                        '<input name="photos" data-photoList="photoList'+i+'" data-deleteImg="deleteImg'+i+'" data-chooseImg="chooseImg'+i+'" data-subImg="subImg'+i+'" onchange="imgSave(this)" id="inputFile'+i+'" class="hide" type="file" /> ' +
                        '</form> ' +
                        '</div> ' +
                        '</li> ' +
                        '</ul> ' +
                        '</div> ' +
                        '</div>');
                    $("#question_box").append(str);
                }
            });
            //$(".am-form-field").focus(function(){
            //    $(".am-form-field").blur();
            //});
        }
    }
    else if(res.result.code=="300"){
        openmodal(res.result.detail);
    }
    else if(res.result.code=="3200"){
        openmodal("登录失效");
        sessionStorage.removeItem("token");
        sessionStorage.setItem("wxToken","0");
        wxBack();
    }
    else{

    }
    layer.closeAll();
}

//function signUpEnter(btn){
//    var token=JSON.parse(sessionStorage.getItem("token"));
//    var partId=GetQueryString("partId");
//    var actId=GetQueryString("actId");
//    if(actId!=null&&actId!=undefined&&actId!="")
//    {
//        var fidList="";
//        var valueList="";
//        //var wxdata='{"token":"'+token+'","actId":'+actId+',"fidList":'+fidList+',"valueList":"'+valueList+'"}';
//        console.log(fidList);
//        console.log(valueList);
//        //AjaxSubmit("get",JSON.parse(wxdata),basePath + "personnel/personSignUpAddField",personSignUpAddField_fun);
//    }
//    else{
//        openmodal("未获取到相关活动");
//    }
//}

function getTicketInfo_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        var style= sessionStorage.getItem("activeDetailsStyle");
        var actve=res.dataPacket.activity;
        var partUser=res.dataPacket.part_user;
        var user=res.dataPacket.user;
        var ticket=res.dataPacket.ticket;
        var wxinfo=res.dataPacket.wxinfo;
        //活动标题
        if(actve.title!=null&&actve.title!=""&&actve.title!=undefined)
        {
            $("title").text(actve.title);
            
             var imgS=$('<img style="width:100%" src="../img/baiodanimg.jpg"/>');
              $(".wj_titleP").append(imgS);
        }
        //活动联系人信息
        //活动举办地址
        if(actve.startTime==null||actve.startTime==""||actve.startTime==undefined||actve.endTime==""||actve.endTime==undefined||actve.endTime==null)
        {
            $(".btf2-activeTime").text("未确定");
            $(".btf2-activeAdd").text("未确定");
        }
        else{
            $(".btf2-activeTime").html(changeTime(actve.startTime)+'&nbsp;~&nbsp;'+changeTime(actve.endTime));
            $(".btf2-activeAdd").text(actve.tags);
        }
        if(ticket!=null&&ticket!=undefined&&ticket!="")
        {
            if(ticket.ticket_no!=null&&ticket.ticket_no!=""&&ticket.ticket_no!=undefined)
            {
                $(".btf2-ticketNo").text(ticket.ticket_no);
            }
        }
    }
    else if(res.result.code=="300"){
        openmodal(res.result.detail);
    }
}


//表单数据
function validatform(_form) {
    var $input = $("#" + _form + " :input"), isvalidat = true;
    var fidlist = "";
    var fvallsit = "";
    $input.each(function (i, value) {
        console.log(isvalidat);
        var type = $(value).attr("data-type");
//                if(validatform1(_form)){
        switch(type)
        {
            case "singe-text":
            {
                console.log(isvalidat);
                if($(value).val()!=null&&$(value).val()!=undefined&&$(value).val()!="")
                {
                    console.log(isvalidat);
                    fidlist += $(value).attr("data-fid") + "|";
                    fvallsit +=$(value).val() + "|";
                }
                else{
                    if($(value).attr("data-requird")=="1")
                    {
                        console.log($(value).attr("data-type"));
                        openmodal($(value).attr("data-title")+"："+"内容不为空");
                        isvalidat=false;
                        return false;
                        break;
                    }
                    else{
                        fidlist += $(value).attr("data-fid") + "|";
                        fvallsit +=$(value).val() + "|";
                    }
                }
            }
                break;
            case "datetime":
            {
                if($(value).val()!=null&&$(value).val()!=undefined&&$(value).val()!="")
                {
                    fidlist += $(value).attr("data-fid") + "|";
                    fvallsit += $(value).val() + "|";
                }
                else{
                    if($(value).attr("data-requird")=="1")
                    {
                        console.log($(value).attr("data-type"));
                        openmodal($(value).attr("data-title")+"："+"内容不为空");
                        isvalidat=false;
                        return false;
                        break;
                    }
                    else{
                        fidlist += $(value).attr("data-fid") + "|";
                        fvallsit +=$(value).val() + "|";
                    }
                }
            }
                break;
            case "multi-checkbox":
            {
                var name = $(value).attr("name");
                var str = "";
                if($("input:checkbox[name='"+name+"']:checked").length>0)
                {
                    $.each( $("input:checkbox[name='"+name+"']:checked"),function(i,val){
                        if (i == 0)
                        {
                            fidlist += $(value).attr("data-fid") + "|";
                        }
                        str += $(val).val()+","
                    });
                    str= str.substring(0, str.length - 1);
                    console.log(str);
                    fvallsit += str + "|";
                }
                else{
                    openmodal("多选：请至少选择一项");
                    isvalidat=false;
                    return false;
                    break;

                }
            }
                break;
            case "multi-radio":
            {
                var name = $(value).attr("name");
                var str = "";
                if($("input:radio[name='"+name+"']:checked").length>0)
                {
                    $.each($("input:radio[name='" + name + "']:checked"), function (i, val) {
                        if (i == 0) {
                            fidlist += $(value).attr("data-fid") + "|";
                        }
                        str += $(val).val() + ","
                    })
                    str = str.substring(0, str.length - 1);

                    console.log(str)
                    fvallsit += str + "|";
                }
                else{
                    openmodal("单选：请至少选择一项");
                    isvalidat=false;
                    return false;
                    break;
                }
            }
                break;
        }
//                }
//                else{
//                    isvalidat=false;
//                    return false;
//                }
    });
    if($(".M_topic").length>0)
    {
       $(".M_topic").each(function (img,imgUrl) {
            if( $(imgUrl).find(".e-join").length>0)
            {
                fidlist+=$(imgUrl).attr("data-id")+"|";
                var str = "";
                $(imgUrl).find(".e-join").each(function (imgs,imgUrlVal) {
                    if($(imgUrlVal).attr("onClick")!="subFile(this)")
                    {
                        str+=$(imgUrlVal).attr("data-url")+",";
                    }
                    else{
                        if($(imgUrlVal).attr("data-requird")=="1")
                        {
                            openmodal("图片：请至少选择一项");
                            isvalidat=false;
                            return false;
                            return false;
                        }
                    }
                });
                str = str.substring(0, str.length - 1);
                fvallsit += str + "|";
            }
        });
    }
    fvallsit = fvallsit.substring(0, fvallsit.length-1);
    fidlist = fidlist.substring(0, fidlist.length - 1);
    console.log(fvallsit);
    console.log(fidlist);
    console.log(isvalidat);
    fvallsits=fvallsit;
    fidlists=fidlist;
    return isvalidat;
}
var fvallsits;
var fidlists;
//获取表单数据成功，提交数据
function saveData(btn){
    if(validatform("doc-vld-msg"))
    {
        var token=JSON.parse(sessionStorage.getItem("token"));
        var partId=GetQueryString("partId");
        var actId=GetQueryString("actId");
        var ticketId=GetQueryString("ticketId");
        var userName=$(".bti2-userName").val();
        var phone=$(".bti2-userPhone").val();
        var code=$(".bti2-userCodes").val();
        //管理员给报名用户分配门票
        var ticketActiveId=JSON.parse(sessionStorage.getItem("ticketActiveId"));
        //门票信息不为空
        if(ticketId!=null&&ticketId!=undefined&&ticketId!="")
        {
            //报名用户ID
            if(ticketActiveId!=null&&ticketActiveId!=""&&ticketActiveId!=undefined)
            {
                var data='{"token":"'+token+'","activeId":'+ticketActiveId+',"fidList":"'+fidlists+'","valueList":"'+fvallsits+'","ticketId":'+ticketId+'}';
                console.log(data);
                AjaxSubmit("get", JSON.parse(data), basePath + "Ticket/getTicketSaleByActiveId", getTicketSaleByActiveId_fun);
            }
            else{
                //非报名用户自填信息
                if(token==null||token==undefined||token=="")
                {
                    if(name(userName))
                    {
                        if(phoneMath(phone)){
                            if(code!=null&&code!=undefined&&code!="")
                            {
                                if(ticketId!=null&&ticketId!=undefined&&ticketId!="")
                                {
                                    var data='{"phone":"'+phone+'","name":"'+userName+'","code":"'+code+'","ticketId":'+ticketId+',"partId":'+partId+'}';
                                    console.log(data);
                                    AjaxSubmit("get", JSON.parse(data), basePath + "Ticket/ticketSaleByOrdinaryUser", ticketSaleByOrdinaryUser_fun);
                                }
                                else{
                                    openmodal("卡号失效，请联系售卡人");

                                }
                            }
                            else{
                                openmodal("请输入手机验证码");
                            }
                        }
                        else{
                            openmodal("请输入正确的手机号码");
                        }
                    }
                    else{
                        openmodal("请输入正确的姓名");
                    }
                }
                //管理员给非报名用户填写信息
                else{
                    //管理员为非报名用户填写拓展信息
                    var proUserInfo=JSON.parse(sessionStorage.getItem("userInfos"));
                    if(proUserInfo!=null&&proUserInfo!=undefined&&proUserInfo!="")
                    {
                        var data='{"token":"'+token+'","actId":'+actId+',"fidList":"'+fidlists+'","valueList":"'+fvallsits+'","ticketId":'+ticketId+'}';
                        console.log(data);
                        AjaxSubmit("get", JSON.parse(data), basePath + "Ticket/addSaleTicketAttribute", addSaleTicketAttribute_fun);
                    }
                    //为非报名用户填写门票及拓展信息
                    else{
                        if(name(userName))
                        {
                            if(phoneMath(phone)){
                                if(ticketId!=null&&ticketId!=undefined&&ticketId!=""){
                                    var data='{"phone":"'+phone+'","name":"'+userName+'","token":"'+token+'","ticketId":'+ticketId+',"fidList":"'+fidlists+'","valueList":"'+fvallsits+'"}';
                                    console.log(data);
                                    AjaxSubmit("get", JSON.parse(data), basePath + "Ticket/ticketSaleByBelonging", ticketSaleByBelonging_fun);
                                }
                            }
                            else{
                                openmodal("请输入正确的手机号码");
                            }
                        }
                        else{
                            openmodal("请输入正确的姓名");
                        }
                    }
                }
            }
        }

        //if(actId!=null&&actId!=undefined&&actId!=""&&ticketId!=undefined&&ticketId!=null&&ticketId!="")
        //{
        //    if(fvallsit!=null&&fvallsit!=undefined&&fvallsit!=""&&fidlist!=null&&fidlist!=undefined&&fidlist!="")
        //    {
        //        console.log(fvallsit);
        //        var data='{"token":"'+token+'","actId":'+actId+',"fidList":"'+fidlist+'","valueList":"'+fvallsit+'","ticketId":'+ticketId+'}';
        //        console.log(data);
        //
        //    }
        //}
        else{
            openmodal("未获取到相关信息");
        }
    }
}
function addSaleTicketAttribute_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        openmodal("完善成功!");
        sessionStorage.removeItem("userInfos");
        sessionStorage.removeItem("userInfosPhone");
        var urlReturnBack=JSON.parse(sessionStorage.getItem("urlReturnBack"));
        if(urlReturnBack==null&&urlReturnBack==undefined&&urlReturnBack=="")
        {
            setTimeout(function(){$(".closeWX").trigger("click")},1000);
        }
       else{
            setTimeout(function(){  self.location.href=urlReturnBack;},1000);
        }
    }
    else if(res.result.code=="300"){
        openmodal(res.result.detail);
    }
    else if(res.result.code=="3200"){
        openmodal("登录失效");
        sessionStorage.removeItem("token");
        sessionStorage.setItem("wxToken","0");
        wxBack();
    }
    else if(res.result.code=="3201"){
        sessionStorage.setItem("returnUrl",JSON.stringify(window.location.href));
        sessionStorage.setItem("token",JSON.stringify(res.dataPacket.token));
        openmodal("未绑定微信号");
        setTimeout(function(){
            self.location.href="login.html";
        },1500);
    }
    else{
        openmodal("信息完善失败!");
    }
}

//图片部分点击
function subFile(btn) {
    //if(photos.length>3){
    //    return false;
    //}
    photos=[];
    var inputFile=$(btn).attr("data-id");
    return $("#"+inputFile).click();
}
//图片删除
function deleteImgF(res){
    openloadmodal();
    var deleteNum;
    var $res = $(res);
    console.log( $res);
    var imgName = $res.parent().find("#chooseImg").attr("name");
    console.log(imgName+'aaa');
    $res.parent().remove();
    closeloadmodal();
}
//图片改变及保存到input
var photos = [];
function imgSave(btn)
{
    layer.open({
        type: 2
        ,content: '加载中',
        shadeClose: false
    });
    files = btn.files;
    $.each(files,function(i,e){
        //if(photos.length>3){
        //    openmodal("添加的图片已满")
        //    return false;
        //}
        if($(btn).parent().siblings(".subImg").length>1){
            openmodal("只能添加一张");
            return false;
        }
        var subImg = $("#"+$(btn).attr("data-subImg")).clone();
        console.log(subImg);
        var fileReader = new FileReader();
        fileReader.readAsDataURL(e);
        e.mark = Math.random();
        subImg.find("#"+$(btn).attr("data-chooseImg")).attr("name",e.mark);
        subImg.find("#"+$(btn).attr("data-chooseImg")).addClass(""+e.mark+"");
        fileReader.onload = function(){
            //subImg.find("#"+$(btn).attr("data-chooseImg")).attr("src",this.result);
            subImg.find("#hrefimg").attr("href",this.result);
        }
        subImg.find("#"+$(btn).attr("data-deleteImg")).show();
        subImg.find("#"+$(btn).attr("data-chooseImg")).removeAttr("onClick");
        $("#"+$(btn).attr("data-photoList")).prepend(subImg);
        photos.push(e);
        var token=JSON.parse(sessionStorage.getItem("token"));
        var formData = new FormData();
        formData.append('token', token);
        $.each(photos,function(i,e){
            console.log(e);
            formData.append('photos',e);
        });
        console.log(formData);
        $.ajax({
            url: basePath+ "personnel/PostFileImg" ,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res);
                if(res.result.code=="200")
                {
                    if(res.dataPacket.urlList.length>0)
                    {
                        $.each(res.dataPacket.urlList,function (img,imgUrl) {
                            $(btn).parent().parent().find(".e-join").each(function (imgs,imgUrls) {
                                if($(imgUrls).attr("onclick")=="subFile(this)")
                                {

                                }
                                else{
                                    $(".e-join").eq(img).attr("src",imgPath2+imgUrl);
                                    $(".e-join").eq(img).attr("data-url",""+imgUrl+"");
                                }
                            })
                        })
                    }
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

                }
                layer.closeAll();
            }
        })
    })
}


//报名用户结果
function getTicketSaleByActiveId_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        openmodal("门票出售成功");
        sessionStorage.removeItem("ticketActiveId");
        sessionStorage.removeItem("ticketUserInfo");
        var urlReturnBack=JSON.parse(sessionStorage.getItem("urlReturnBack"));
        if(urlReturnBack==null&&urlReturnBack==undefined&&urlReturnBack=="")
        {
            setTimeout(function(){$(".closeWX").trigger("click")},1000);
        }
        else{
            setTimeout(function(){  self.location.href=urlReturnBack;},1000);
        }
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
    else if(res.result.code=="3201")
    {
        sessionStorage.setItem("returnUrl",JSON.stringify(window.location.href));
        sessionStorage.setItem("token",JSON.stringify(res.dataPacket.token));
        openmodal("未绑定微信号");
        setTimeout(function(){
            self.location.href="login.html";
        },1500);
    }
    else{
        openmodal("门票出售失败");
    }
}

//管理员给非报名用户生成二维码
//转换成图片
function convertCanvasToImage(canvas) {
    //新Image对象，可以理解为DOM
    var image = new Image();
    // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
    // 指定格式 PNG
    image.src = canvas.toDataURL("image/png");
    return image;

}
function clickQeCode(btn){
    var token=JSON.parse(sessionStorage.getItem("token"));
    var ticketId=GetQueryString("ticketId");
    var partyId=GetQueryString("partId");
    var actId=GetQueryString("actId");
    //var data='{"token":"'+token+'","ticketId":'+ticketId+'}';
    if(ticketId!=null&&ticketId!=""&&ticketId!=undefined&&partyId!=null&&partyId!=""&&partyId!=undefined&&actId!=null&&actId!=undefined&&actId!="")
    {
        var ticketUrl=baseUrl+"buyTicketInfo2.html?actId="+actId+"&partId="+partyId+"&ticketId="+ticketId+"";
        console.log(ticketUrl);
        $qr = $('.in-code');
        function makeCode(text) {
            $qr.empty().qrcode(text);
            var mycanvas1=document.getElementsByTagName('canvas')[0];
            var img=convertCanvasToImage(mycanvas1);
            $('.in-code').hide();
            var wxImg=$('<div  class="in-code wxImg"> <p onclick="bti_back(this)">返回</p></div>');
            $('.in-code').after(wxImg);
            $('.wxImg').prepend(img);
            $(".bti-clickQeCode").addClass("disn");
        }
        makeCode(ticketUrl);
        //AjaxSubmit("get", JSON.parse(data), basePath + "Ticket/getTicketQrcode", getTicketQrcode_fun);
    }
    else{
        openmodal("没有相关门票信息");
    }
}
function getTicketQrcode_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        $(".bti-userInfoP2").addClass("disn");
        var ticketUrl=res.dataPacket.url;
        if(ticketUrl!=null&&ticketUrl!=""&&ticketUrl!=undefined)
        {
            $(".in-code").find("img").remove();
            $(".in-code").find("p").remove();
            var imgs=$('<img width="120px" height="120px" src="'+ticketUrl+'"/><p onclick="bti_back(this)">返回</p>');
            $(".in-code").append(imgs);
            //imgs.trigger("click");
            //$qr = $('.in-code');
            //function makeCode(text) {
            //    $qr.empty().qrcode(text);
            //    var mycanvas1=document.getElementsByTagName('canvas')[0];
            //    var img=convertCanvasToImage(mycanvas1);
            //    $('.in-code').hide();
            //    var wxImg=$('<div class="in-code wxImg disn"></div>');
            //    $('.in-code').after(wxImg);
            //    $('.wxImg').append(img);
            //    $(img).attr("onclick","img_click(this)");
            //    $(img).trigger("click");
            //}
            //makeCode(ticketUrl);
        }
        else{
            openmodal("获取二维码失败,请联系管理员");
        }
    }
    else if(res.result.code=="300")
    {
        openmodal(res.result.detail);
    }
    else{
        openmodal("获取二维码失败");
    }
}
function bti_back(btn) {
    $(".wxImg").remove();
    $(".bti-clickQeCode").removeClass("disn");
}

//管理员给非报名用户报名
function ticketSaleByBelonging_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        openmodal("门票出售成功");
        var urlReturnBack=JSON.parse(sessionStorage.getItem("urlReturnBack"));
        if(urlReturnBack==null&&urlReturnBack==undefined&&urlReturnBack=="")
        {
            setTimeout(function(){$(".closeWX").trigger("click")},1000);
        }
        else{
            setTimeout(function(){  self.location.href=urlReturnBack;},1000);
        }
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
    else if(res.result.code=="3201")
    {
        sessionStorage.setItem("returnUrl",JSON.stringify(window.location.href));
        sessionStorage.setItem("token",JSON.stringify(res.dataPacket.token));
        openmodal("未绑定微信号");
        setTimeout(function(){
            self.location.href="login.html";
        },1500);
    }
    else{
        openmodal("门票出售失败");
    }
}


//获取验证码
var countdown =60;
function getPhoneCode(){

    var userName=$(".bti2-userName").val();
    var phone=$(".bti2-userPhone").val();
    if(name(userName))
    {
        if(phoneMath(phone)){
            var data='{"phone":"'+phone+'"}';
            AjaxSubmit("get", JSON.parse(data), basePath + "Login/getPhoneCode", getPhoneCode_fun);
        }
        else{
            openmodal("请输入正确的手机号码");
        }
    }
    else{
        openmodal("请输入正确的姓名");
    }
}
function getPhoneCode_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        setTime();
    }
    else if(res.result.code=="300"){
        openmodal(res.result.detail);
    }
    else if(res.result.code=="3202")
    {
        openmodal("短信发送失败");
    }
    else{
        openmodal("获取验证码失败!");
    }
}
function setTime() {
    if (countdown == 0) {
        countdown = 60;
        $(".bti-code").text("重新获取");
        clearInterval(setTime);
    } else {
        countdown--;
        $(".bti-code").attr("disabled",true);
        $(".bti-getPhone").attr("disabled",true);
        $(".bti-code").text(countdown+"s");
        setTimeout(setTime,1000);
    }
}//验证码倒计时
function ticketSaleByOrdinaryUser_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        openmodal("完善成功");
        var urlReturnBack=JSON.parse(sessionStorage.getItem("urlReturnBack"));
        if(urlReturnBack==null&&urlReturnBack==undefined&&urlReturnBack=="")
        {
            setTimeout(function(){$(".closeWX").trigger("click")},1000);
        }
        else{
            setTimeout(function(){  self.location.href=urlReturnBack;},1000);
        }
    }
    else if(res.result.code=="300")
    {
        openmodal(res.result.detail);
    }
    else{
        openmodal("完善失败，请联系相关业务员");
        setTimeout(function(){$(".closeWX").trigger("click")},1000);
    }
}
window.onload = function() {
    $("#configWXs").trigger("click");
};
