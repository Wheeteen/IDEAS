$(function(){
	//预览图片（添加题图）
	function previewImage(file, prvid) {
	    /* file：file控件
	     * prvid: 图片预览容器
	     */
	    var file=document.getElementById(file);
	    var tip = "请选择jpg或png的图片"; // 设定提示信息
	    var filters = {
	        "jpeg"  : "/9j/4",
	        "gif"   : "R0lGOD",
	        "png"   : "iVBORw"
	    }	   
	    if (window.FileReader) { // html5方案
	        for (var i=0, f; f = file.files[i]; i++) {
	            var fr = new FileReader();
	            fr.onload = function(e) {
	                var src = e.target.result;
	                if (!validateImg(src)) {
	                    alert(tip)
	                } else {
	                    showPrvImg(src);
	                }
	            }
	            fr.readAsDataURL(f);
	        }
	    } else { // 降级处理
	        if ( !/\.jpg$|\.png$|\.gif$/i.test(file.value) ) {
	            alert(tip);
	        } else {
	            showPrvImg(file.value);
	        }
	    }
	 
	    function validateImg(data) {
	        var pos = data.indexOf(",") + 1;
	        for (var e in filters) {
	            if (data.indexOf(filters[e]) === pos) {
	                return e;
	            }
	        }
	        return null;
	    }
	 
	    function showPrvImg(src) {
	        var img=$('<img/>').appendTo($(prvid)).addClass('show_img');
	        $(img).attr('src',src);
	    }
    }
    $('#img-file').change(function(){
	    previewImage('img-file','.upload_pic .g_container');
    }) 
})