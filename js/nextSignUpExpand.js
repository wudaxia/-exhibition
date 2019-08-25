function openUserInfo(){
    personSign();
}
function personSign(){
    var partyId=JSON.parse(sessionStorage.getItem("acPartId"));
    var actId=JSON.parse(sessionStorage.getItem("acActId"));
    var token=JSON.parse(sessionStorage.getItem("token"));
    console.log(partyId);
    console.log(actId);
    if(partyId!=null&&partyId!=undefined&&partyId!=""&&actId!=null&&actId!=undefined&&actId!="")
    {
       var  data='{"token":"'+token+'","partId":'+partyId+',"actId":'+actId+'}';
        AjaxSubmit("get", JSON.parse(data), basePath + "personnel/getPersonSignUpFieldVal", getPersonSignUpFieldVal_fun);
       var  dataInfo='{"actId":'+actId+',"partId":'+partyId+'}';
        AjaxSubmit("get", JSON.parse(dataInfo), basePath + "activity/getActivityInfo", getActivityInfo_fun);
    }
    else{
        openmodal("获取信息失败,请重新获取");
        setTimeout(function(){
            self.location.href="activeCenter.html";
        })
    }
}
function getPersonSignUpFieldVal_fun(res) {
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

                    if(input.value!=null&&input.value!=undefined&&input.value!="")
                    {
                        var str=$(' <div class="M_topic maxtop question"> ' +
                            '<div class="topic_title">'+input.title+'</div> ' +
                            '<div class="topic_con"> ' +
                            '<div class="topic_input topic_input_default"> ' +
                            '<input type="text" data-title="'+input.title+'" required="required" data-requird="'+input.is_required+'" value="'+input.value+'" name="'+input.name+'"  pattern="'+input.valid_pattern+'"  class="option '+input.name+'" data-type="'+input.data_type+'" data-fid="'+input.f_id+'" nullmsg="请输入相关内容" placeholder="请输入相关内容"/> ' +
                            '</div> ' +
                            '</div> ' +
                            '</div>');
                    }
                    else{
                        var str=$(' <div class="M_topic maxtop question"> ' +
                            '<div class="topic_title">'+input.title+'</div> ' +
                            '<div class="topic_con"> ' +
                            '<div class="topic_input topic_input_default"> ' +
                            '<input type="text" data-title="'+input.title+'" required="required" data-requird="'+input.is_required+'" name="'+input.name+'"  pattern="'+input.valid_pattern+'"  class="option '+input.name+'" data-type="'+input.data_type+'" data-fid="'+input.f_id+'" nullmsg="请输入相关内容" placeholder="请输入相关内容"/> ' +
                            '</div> ' +
                            '</div> ' +
                            '</div>');
                    }
                    $("#question_box").append(str);
                }
                //日期
                else if(input.data_type=="datetime")
                {
                    if(input.value!=null&&input.value!=undefined&&input.value!="")
                    {
                        var str=$(' <div class="M_topic maxtop question"> ' +
                            '<div class="topic_title">'+input.title+'</div> ' +
                            '<div class="topic_con"> ' +
                            '<div class="topic_input topic_input_default"> ' +
                            ' <input type="text" data-title="'+input.title+'" data-requird="'+input.is_required+'" value="'+input.value+'" required="required" name="'+input.name+'"  pattern="'+input.valid_pattern+'"  class="option '+input.name+'" data-type="'+input.data_type+'" data-fid="'+input.f_id+'" placeholder="请输入日期"/>  ' +
                            '</div> ' +
                            '</div> ' +
                            '</div>');
                    }
                    else{
                        var str=$(' <div class="M_topic maxtop question"> ' +
                            '<div class="topic_title">'+input.title+'</div> ' +
                            '<div class="topic_con"> ' +
                            '<div class="topic_input topic_input_default"> ' +
                            ' <input type="text" data-title="'+input.title+'" data-requird="'+input.is_required+'" required="required" name="'+input.name+'"  pattern="'+input.valid_pattern+'"  class="am-form-field '+input.name+'" data-type="'+input.data_type+'" data-fid="'+input.f_id+'" placeholder="请选择日期" data-am-datepicker readonly/>  ' +
                            '</div> ' +
                            '</div> ' +
                            '</div>');
                    }
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
                                '<ul class="unstyled" id="unstyled'+i+'"> ';
                            $.each(itemAttr,function(j,item){
                                if(j==0)
                                {
                                    str+='<li><div class="checked_wrap"><label class="inputLabel"><input data-requird="'+input.is_required+'" type="checkbox" id="checkbox-1-'+(i+"0"+j+"0"+1)+'" value="'+item+'" required name="'+input.name+'" data-type="'+input.data_type+'"  class="regular-checkbox a-default '+input.name+'" data-fid="'+input.f_id+'"/><label for="checkbox-1-'+(i+"0"+j+"0"+1)+'" class="inputLable"></label>'+item+'</label></div></li>';
                                }
                                else{
                                    str+='<li><div class="checked_wrap"><label class="inputLabel"><input type="checkbox" value="'+item+'" id="checkbox-1-'+(i+"0"+j+"0"+1)+'"  name="'+input.name+'"  class="regular-checkbox a-default '+input.name+'"/><label for="checkbox-1-'+(i+"0"+j+"0"+1)+'" class="inputLable"></label>'+item+'</label></div></li> ';
                                }
                            });
                            str+=  '</ul> ' +
                                '</div> ' +
                                '</div>';
                            $("#question_box").append(str);
                        }
                        if(input.value!=null&&input.value!=undefined&&input.value!="")
                        {
                            var checkValues=input.value.split(",");
                            if(checkValues.length>0)
                            {
                                $.each(checkValues,function(checkValuesNum,checkValuesValue){
                                    $("#unstyled3").find("input[type=checkbox]").each(function(){
                                        if($(this).attr("value")==checkValuesValue)
                                        {
                                            $(this).attr("checked",true);
                                        }
                                    })
                                })
                            }
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
                                '<ul class="unstyled"  id="unstyled'+i+'"> ';
                            $.each(itemAttr2,function(z,item2){
                                if(z==0)
                                {
                                    str+='<li><div class="checked_wrap"><label class="inputLabel"><input type="radio" data-requird="'+input.is_required+'" id="radio-1-'+(i+"0"+z+"0"+1)+'" value="'+item2+'" required name="'+input.name+'" data-type="'+input.data_type+'"  class="regular-radio a-default '+input.name+'" data-fid="'+input.f_id+'"/><label for="radio-1-'+(i+"0"+z+"0"+1)+'" class="regular-radioLabel"></label>'+item2+'</label></div></li>';
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
                        if(input.value!=null&&input.value!=undefined&&input.value!="")
                        {
                            var checkValues=input.value.split(",");
                            if(checkValues.length>0)
                            {
                                $.each(checkValues,function(checkValuesNum,checkValuesValue){
                                    $("#unstyled3").find("input[type=radio]").each(function(){
                                        if($(this).attr("value")==checkValuesValue)
                                        {
                                            $(this).attr("checked",true);
                                        }
                                    })
                                })
                            }
                        }
                    }
                }
                //图片
                else if(input.data_type=="file")
                {
                    if(input.value!=null&&input.value!=undefined&&input.value!="")
                    {
                        var str="";
                        str+='<div class="M_topic maxtop question" data-id="'+input.f_id+'"> ' +
                            '<div class="topic_title">'+input.title+'</div><div class="topic_con checkbox_wrap"> ' +
                            '<div class="related-tip"></div> ' +
                            '<ul class="unstyled"> <li> ' +
                            '<div class="checked_wrap ImgUrls" id="photoList'+i+'"> ';
                        var imgUrls=input.value.split(",");
                        if(imgUrls.length>0)
                        {
                            $.each(imgUrls,function(imgUrlsNum,imgUrlsThis){
                                str+= '<div class="subImg" id="subImg'+i+'"> ' +
                                    '<img id="chooseImg'+i+'" data-requird="'+input.is_required+'" data-url="'+imgUrlsThis+'" class="e-join" data-url="'+imgUrlsThis+'" src="'+imgPath2+imgUrlsThis+'" data-id="inputFile'+i+'" /> ' +
                                    '<img id="deleteImg'+i+'" class="e-imgExit" src="../img/14.png" style="display: inline" onClick="deleteImgF(this)"/> ' +
                                    '</div> ';
                            });
                            str+= '<div class="subImg" id="subImg'+i+'"> ' +
                                '<img id="chooseImg'+i+'" data-requird="'+input.is_required+'" class="e-join" src="../img/15.png" data-id="inputFile'+i+'" onClick="subFile(this)" /> ' +
                                '<img id="deleteImg'+i+'" class="e-imgExit" src="../img/14.png" onClick="deleteImgF(this)"/> ' +
                                '</div> ';
                        }
                        else{
                            str+= '<div class="subImg" id="subImg'+i+'"> ' +
                                '<img id="chooseImg'+i+'" data-requird="'+input.is_required+'" class="e-join" src="../img/15.png" data-id="inputFile'+i+'" onClick="subFile(this)" /> ' +
                                '<img id="deleteImg'+i+'" class="e-imgExit" src="../img/14.png" onClick="deleteImgF(this)"/> ' +
                                '</div> ';
                        }
                        str+='<form id="seekHelpForm'+i+'" hidden=""> ' +
                            '<input name="photos" data-photoList="photoList'+i+'" data-deleteImg="deleteImg'+i+'" data-chooseImg="chooseImg'+i+'" data-subImg="subImg'+i+'" onchange="imgSave(this)" id="inputFile'+i+'" class="hide" type="file" /> ' +
                            '</form> ' +
                            '</div> ' +
                            '</li> ' +
                            '</ul> ' +
                            '</div> ' +
                            '</div>'
                    }
                    else{
                        var str=$('<div class="M_topic maxtop question" data-id="'+input.f_id+'"> ' +
                            '<div class="topic_title">'+input.title+'</div><div class="topic_con checkbox_wrap"> ' +
                            '<div class="related-tip"></div> ' +
                            '<ul class="unstyled"> <li> ' +
                            '<div class="checked_wrap ImgUrls" id="photoList'+i+'"> ' +
                            '<div class="subImg" id="subImg'+i+'"> ' +
                            '<img id="chooseImg'+i+'" data-requird="'+input.is_required+'" class="e-join" src="../img/15.png" data-id="inputFile'+i+'" onClick="subFile(this)" /> ' +
                            '<img id="deleteImg'+i+'" class="e-imgExit" src="../img/14.png" onClick="deleteImgF(this)"/> ' +
                            '</div> ' +
                            '<form id="seekHelpForm'+i+'" hidden=""> ' +
                            '<input name="photos" data-photoList="photoList'+i+'" data-deleteImg="deleteImg'+i+'" data-chooseImg="chooseImg'+i+'" data-subImg="subImg'+i+'" onchange="imgSave(this)" id="inputFile'+i+'" class="hide" type="file" accept="img/*" multiple=""/> ' +
                            '</form> ' +
                            '</div> ' +
                            '</li> ' +
                            '</ul> ' +
                            '</div> ' +
                            '</div>');
                    }
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
function getActivityInfo_fun(res) {
    console.log(res);
    if(res.result.code=="200")
    {
        var actve=res.dataPacket.activity;
        var partUser=res.dataPacket.part_user;
        var user=res.dataPacket.user;
        var wxinfo=res.dataPacket.wxinfo;
        listfield=res.dataPacket.listfield;
        console.log(listfield);
        //售卡人
        if(partUser!=null&&partUser!=undefined&&partUser!="")
        {
            if(partUser.apply_name!=null&&partUser.apply_name!=""&&partUser.apply_name!=undefined)
            {
                $(".bti2-userName").val(partUser.apply_name).attr("readonly","readonly");
            }
        }
        $("title").text(actve.title);
         var imgS=$('<img style="width:100%" src="../img/baiodanimg.jpg"/>');
        $(".wj_titleP").append(imgS);
        var activeTime="";
        if(actve.startTime==null||actve.startTime==""||actve.startTime==undefined||actve.endTime==""||actve.endTime==undefined||actve.endTime==null)
        {
            activeTime="未确定时间"
        }
        else{
            activeTime=changeTime(actve.startTime)+'&nbsp;~&nbsp;'+changeTime(actve.endTime);
        }
        $('.btf2-activeTime').html(activeTime);
        $('.btf2-activeAdd').text(actve.tags);
    }
    else if(res.result.code=="300"){
        openmodal(res.result.detail);
        setTimeout(function(){
            self.location.href="index1.html";
        },1500);
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



//表单数据
function validatform(_form) {
    var $input = $("#" + _form + " :input"), isvalidat = true;
    var fidlist = "";
    var fvallsit = "";
    $input.each(function (i, value) {

        var type = $(value).attr("data-type");
//                if(validatform1(_form)){
        switch(type)
        {
            case "singe-text":
            {
                if($(value).val()!=null&&$(value).val()!=undefined&&$(value).val()!="")
                {
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
                    isvalidat = false;
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
                    isvalidat = false;
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
    fidlists=fidlist;
    fvallsits=fvallsit;
    return isvalidat;
}
//获取表单数据成功，提交数据

var fvallsits="";
var fidlists="";
function saveData(btn){

    if(validatform('doc-vld-msg')){
        var partyId=JSON.parse(sessionStorage.getItem("acPartId"));
        var actId=JSON.parse(sessionStorage.getItem("acActId"));
        var token=JSON.parse(sessionStorage.getItem("token"));
        if(partyId!=null&&partyId!=undefined&&partyId!=""&&actId!=null&&actId!=undefined&&actId!="")
        {
            var  data='{"token":"'+token+'","actId":'+actId+',"fidList":"'+fidlists+'","valueList":"'+fvallsits+'"}';
            console.log(data);
            AjaxSubmit("get", JSON.parse(data), basePath + "personnel/personSignUpAddField", personSignUpAddField_fun);
        }
        else{
            openmodal("获取信息失败,请重新获取");
            setTimeout(function(){
                self.location.href="activeCenter.html";
            })
        }

        //管理员给报名用户分配门票
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
    }
}
function personSignUpAddField_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        openmodal("保存成功!");
        var urlReturnBack=JSON.parse(sessionStorage.getItem("urlReturnBack"));
        console.log(urlReturnBack);
        if(urlReturnBack==null&&urlReturnBack==undefined&&urlReturnBack=="")
        {
            setTimeout(function(){$(".closeWX").trigger("click")},1000);
        }
        else{
            setTimeout(function(){ self.location.href=urlReturnBack;},1000);
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
        openmodal("保存失败!");
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
        console.log($(btn).parent().siblings(".subImg").length>1);
       if($(btn).parent().siblings(".subImg").length>1){
           openmodal("只能添加一张");
           return false;
       }
        //if(photos.length>1){
        //    openmodal("只能添加一张");
        //    return false;
        //}
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
    })
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
}

