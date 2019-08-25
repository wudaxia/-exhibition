/**
 * Created by kangli on 2017/6/20.
 */
/**
 * Created by kangli on 2017/6/19.
 */
function openUserInfo(){
    editUserInfo();
}
function editUserInfo(){
    var id=JSON.parse(sessionStorage.getItem("userInfo"));
    var userInfo=JSON.parse(sessionStorage.getItem("userInfos"));
    if(id!=null&&id!=""&&id!=undefined&&id!="")
    {
        $(".us").each(function (i,us) {
            if($(us).attr("data-id")==id)
            {
                $(us).removeClass("hide").siblings(".us").addClass("hide");
                if($(us).attr("data-id")=="1")
                {
                    var imgUrl=JSON.parse(sessionStorage.getItem("UserInfoStyleImg"));
                    $(".ud-headImg").attr("src",imgUrl);
                }
                else if($(us).attr("data-id")=="4")
                {
                    if(userInfo!=null&&userInfo!=""&&userInfo!=undefined&&userInfo!="")
                    {
                        if(userInfo.remark!=null&&userInfo.remark!=""&&userInfo.remark!=undefined&&userInfo.remark!="")
                        {
                            $(us).find("textarea").val(userInfo.remark);
                            $(".e-word").text($(us).find("textarea").val().length);
                        }
                    }
                }
            }
        })
    }
    else{
        openmodal("请重新选择需要更改的信息");
        setTimeout(function () {
            sessionStorage.removeItem("userInfo");
            self.location.href="userInfo.html";
        })
    }
}
function cencel(btn){
    self.location.href="userInfo.html"
}


function changeImg(btn){
    $("#filetest").click();
}

function PreviewImage(btn)//上传预览图片
{
    var photos=[];
    files = btn.files;
    $.each(files,function(i,e){
        //if(photos.length>3){
        //    openmodal("添加的图片已满")
        //    return false;
        //}
        var fileReader = new FileReader();
        fileReader.readAsDataURL(e);
        photos.push(e);
    });
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
                        $("#img1").attr("src",imgPath2+imgUrl);
                        $("#img1").attr("data-url",""+imgUrl+"");
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
function enter(btn){
    //上传头像
    $(".us-nicks").each(function(i,div){
        if($(div).hasClass("hide"))
        {

        }
        else{
            var token=JSON.parse(sessionStorage.getItem("token"));
            var headUrl="";
            var remark="";
            //头像修改
            if($(div).attr("data-id")=="1")
            {
                headUrl=$("#img1").attr("src");
            }
            //个人简介修改
            else if($(div).attr("data-id")=="4")
            {
                remark=$(div).find("textarea").val();
            }
            AjaxSubmit3("POST", basePath + "userCenter/editInfo?token="+token+"&head="+headUrl+"&remark="+remark+"", editInfo_fun);
        }
    })
}
function editInfo_fun(res){
    console.log(res);
    if(res.result.code=="200")
    {
        openmodal("保存成功");
       sessionStorage.removeItem("token");
        setTimeout(function(){
            self.location.href="personalCenter.html";
        },1500)
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
        openmodal("保存失败");
    }
}
function e_word(btn){
    if($(btn).val().length<=200)
    {
        $(".e-word").text($(btn).val().length);
    }
    else{
        openmodal("不能超过200字");
    }
}//计算字数