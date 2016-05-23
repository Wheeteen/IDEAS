$(function(){
  // var href=location.href.split('?')[1];
  // var id=href.slice(4);
  // var decodedUrl = decodeURIComponent(id);

  // 页面初始化
  // if(id=='我的主页'){
  //   $('.user-center').click();
  // }else if(id=='我的消息'){
  //   $('.user-tip').click();
  // }else if(id=='我的收藏'){
  //   $('.user-collect').click();
  // }else if(id=='我的资料'){
  //   $('.user-center').click();
  // }else if(id=='我的提问'){
  //   $('.user-ask').click();
  // }else{
  //   $('.user-awer').click();
  // }
	// 点击个人中心的时候
	$('.user-center').on('click',function(){
		$('.userCenter-wrap').fadeIn();
		$('.userMessage').hide();
		$('.userCollect').hide();
		$('.userSetting').hide();
		$('.userPassage').hide();
		$('.userAsk').hide();
		$('.userAnswer').hide();
	})
	

	// 个人信息的基本信息的编辑
	$('.changeName').on('click',function(){
		$('.original').hide();
		$('.change-text').show();
		$('.upload-tip').hide();
		$('.upload-img').show();
		$('.original-info').hide();
		$('.change-info').show();
		$('.submit-name').show();
	})
	//个人信息的联系信息的编辑
	$('.contact-btn').on('click',function(){
		$('.org-email').hide();
		$('.change-email').show();
		$('.phone-text').hide();
		$('.change-phone').show();
    $('.phone-btn').show();
	})
	
	
	// 点击‘写文章’的按钮的时候
	$('.create').on('click',function(){
		location.href='../html/write.html';	
	})

	// 图片预览
	// 个人主页的基本信息对上传图片的预览
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
	            var fr = new FileReader();//FileReader接口提供了一个异步API，可以在浏览器主线程中异步访问文件系统，读取文件数据
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
	        var img=$('<img/>').appendTo($(prvid)).addClass('upload-image');
	        $(img).attr('src',src);
	    }
    }
    $('#file').change(function(){
	    previewImage('file','.upload-img');
    }) 
    
    var interestArr=[];//记录‘我的兴趣’的li里面的信息
    
//一下是‘个人中心’的详细内容和编辑
    //点击我的主页的时候，默认是个人信息这一页
    //初始化，我的头像，我的名字，我的总的点赞数，收藏数，评论数，昵称，个人简介，邮箱，手机，兴趣等等
    $.ajax({
    	url:'',
    	data:{},
    	dataType:'json',
    	type:'POST',
    	success:function(data){
    		//我的头像
    		$('.blur').attr('src',data.img);
    		$('.myImg').attr('src',data.img);//同上
    		$('.writername').html(data.name);//我的昵称
    		$('.love').html(data.praise);//点赞数
    		$('.collect').html(data.collect);//收藏数
    		$('.reply').html(data.answer);//回答数
    		$('.original').html(data.name);//昵称
    		$('.original-info').html(data.introduction);//个人简介，如果没有，就是默认的
    		$('.org-email').html(data.phone);//我的手机
    		$('.phone-text').html(data.email);//我的邮箱，如果没有就是默认的‘填写你的邮箱’
    		//我的兴趣，这个我也不清楚怎么来的
            $(data.interest).each(function(index,value){
                interest(data.interest[index]);
                interestArr.push(data.interest[index]);
            })
    	}
    })

    function interest(content){
    	$('<li>').appendTo($('.interest')).html(content);
    }

    // 个人信息的话题信息的编辑
	$('.topic-btn').on('click',function(){
		$('.interest').hide();
		$('.add-topic').show();
		$('.interest-btn').show();
		//将我的兴趣呈现在页面上，并且后面加上一个×，表示可以删除我之前的兴趣
		for(var i=0;i<interestArr.length;i++){
		  var li=$('<li>').appendTo($('.edit-interest')).html(interestArr[i]);
		  $('<span>').appendTo(li).addClass('remove').html('×');
		  //每个Li里面的×
		  $('.remove').eq(i).on('click',function(){
            removeCha(i);
            interestArr.pop(i);
		  })
		}
	})

    // 话题信息之我的兴趣之原来的兴趣上面的×叉掉的话父元素消失
	function removeCha(id){
		$.ajax({
			url:'',
			data:{
			  'id':id
			},
			dataType:'json',
			type:'POST',
			success:function(){
				$('.remove').eq(id).parent().remove();
			}
		})
	}

    //话题信息之我的兴趣的热门标签里面的加号标签
	$('.add-label').on('click',function(){
		$(this).parent().remove();
		var text=$(this).parent().children($('.hot-text')).html();
		addInterest(text);
		interestArr.push(text);
	})

	// 话题信息之我的兴趣的热门标签里面的加号标签
	function addInterest(text){
		$.ajax({
			url:'',
			data:{
              'topic':text
			},
			dataType:'json',
			type:'POST',
			success:function(){
			  var oli=$('<li>').appendTo($('.edit-interest')).html(text);
		      var close=$('<span>').appendTo(oli).addClass('remove').html('×');
			}
		})
	}
    //点击基本信息的‘保存’的时候
    $('#basicBtn').on('click',function(){
    	var name=$('.original').html();
    	var introduce=$('.original-info').html();
    	$('.getNick').val(name);
    	$('.myIntro').html(introduce);
    	var changeName=$('.getNick').val();
    	var changeIntro=$('.myIntro').val();

    	var form=new FormData();//因为要提交图片信息，所以用这个比较容易提交图片信息
    	form.append('file',$('#file')[0].files[0]);//图片的信息
    	form.append('nickname',changeName);//昵称的信息
    	form.append('introduction',changeIntro);//个人简介的信息
        
        if(ifEmpty('.getNick')){
        	$('.nickTip').html('');
        	if(ifEmpty('#file')){
        		$('.ImgTip').html('');
        		if(ifEmpty('.myIntro')){
        			$('.IntroTip').html('');

        			//通过html5的FormData()来提交表单信息
                    $.ajax({
                    	url:'',
                    	type:'POST',
                    	dataType:'json',
                    	data:form,
                    	processData:false,
                    	contentType:false,
                    	success:function(data){
                    		$('.original').html(changeName);
                    		$('.original-info').html(changeIntro);
                    		//我的头像(你返回图片的路径给我吧)
        				    		$('.blur').attr('src',data.img);
        				    		$('.myImg').attr('src',data.img);//同上
        				    		$('.writername').html(changeName);//我的昵称
                        $('.original-info').html(changeIntro);//个人简介

                        $('.original').show();
          							$('.change-text').hide();
          							$('.upload-tip').show();
          							$('.upload-img').hide();
          							$('.original-info').show();
          							$('.change-info').hide();
          							$('.IntroTip').hide();
          							$('.submit-name').hide();
                    	}
                    })
        		}else{
        			$('.IntroTip').html('简介不能为空');
        			return false;
        		}
        	}else{
        		$('.ImgTip').html('头像不能为空');
        		return false;
        	}
        }else{
        	$('.nickTip').html('昵称不能为空');
        	return false;
        }
    })

    //点击联系信息的‘保存’的时候
    $('#ContactBtn').on('click',function(){
    	var phone=$('.org-email').html();//我的手机
        var email=$('.phone-text').html();//我的邮箱

        $('.getPhone').val(phone);
    	$('.getEmail').val(email);
        var changePhone=$('.getPhone').val();//填写的号码
        var changeEmail=$('.getEmail').val();//填写的邮箱

        if(ifEmpty('.getPhone')){
        	$('.PhoneTip').html('');
        	if(ifEmpty('.getEmail')){
        		$('.EmailTip').html('');
        		//ajax发送数据
        		$.ajax({
        			url:'',
        			data:{
                      'phone':changePhone,
                      'email':changeEmail
        			},
        			dataType:'json',
        			type:'POST',
        			success:function(data){
        				$('.org-email').html(changePhone);
        				$('.phone-text').html(changeEmail);

        				$('.org-email').show();
    						$('.change-email').hide();
    						$('.phone-text').show();
    						$('.change-phone').hide();
				        $('.phone-btn').hide();
				        $('.PhoneTip').hide();
				        $('.EmailTip').hide();

        			}
        		})
        	}else{
        		$('.EmailTip').html('邮箱不能为空');
        		return false;
        	}
        }else{
        	$('.PhoneTip').html('手机号码不能为空');
        	return false;
        }
    })

    //点击话题信息的‘保存’时
    $('#TopicBtn').on('click',function(){
     $('.interest').show();
	   $('.add-topic').hide();
	   $('.interest-btn').hide();
	   for(var i=0;i<interestArr.length;i++){
	   	 interest(interestArr[i]);
	   }
    })
    // 判断上传内容的框有没有为空
	 // 判断text是否为空的函数
    function ifEmpty(clsName) {
  	 var username = $.trim($(clsName).val());
  	 if(username==""||username==null) {
  	  return false;
  	 }
  	  return true;
  	} 

//以下是‘我的消息’的内容
    //别人邀请你回答问题的信息，或是别人回答了你的提问，或是你的软文成功发布等相关信息
    //每条信息的下面的‘点击查看’先弄成虚的吧
    // 点击我的消息
	$('.user-tip').on('click',function(){
		$('.userCenter-wrap').hide();
		$('.userMessage').fadeIn();
		$('.userCollect').hide();
		$('.userSetting').hide();
		$('.userPassage').hide();
		$('.userAsk').hide();
		$('.userAnswer').hide();

        getInfo();
	})
    //每条信息在页面动态生成
    function message(info){
      var section=$('<div>').appendTo($('.userMessage-wrap')).addClass('tip-section');
      var dian=$('<div>').appendTo(section).addClass('dian').html('·');
      var main=$('<div>').appendTo(section).addClass('main-tip');
      var info=$('<p>').appendTo(main).html(info);//信息
      var check=$('<div>').addClass('click-look').appendTo(main).html('点击查看');
    }
    //通过ajax取得信息
    function getInfo(){
    	$.ajax({
    		url:'',
    		data:{
              'type':'消息'//这个传什么参数给你，你定吧，我现在只是传了一个标签
    		},
    		dataType:'json',
    		type:'POST',
    		success:function(data){
           $.each(data,function(index,value){
           	 message(data[index].message);//每一条信息,弄出来之后把页面中除了第一条‘欢迎来到。。。’，其他都删掉吧           
           })
    		}
    	})
    }

//以下是‘我的收藏’，与‘我的文章’样式相似

    // 点击我的收藏
	$('.user-collect').on('click',function(){
		$('.userCenter-wrap').hide();
		$('.userMessage').hide();
		$('.userCollect').fadeIn();
		$('.userSetting').hide();
		$('.userPassage').hide();
		$('.userAsk').hide();
		$('.userAnswer').hide();
        
        var url='';//取得收藏数据的路径
        getCollect(url,'收藏');// 参数

	})

	// 在页面生成一个又一个section(后台给的数据)
    function section(img,type,user,title,glance,praise,comment){
      var section=$('<div>').appendTo($('.waterfall')).addClass('section');
      var section_w=$('<div>').appendTo(section).addClass('section_w');
      var top_part=$('<div>').appendTo(section_w).addClass('top_part');
      var img=$('<img/>').appendTo(top_part).addClass('image');

      $(img).attr('src',img);//图片的路径
      var type=$('<button>').appendTo(top_part).addClass('type').html(type);//标签的内容
      var top_wrap=$('<div>').appendTo(top_part).addClass('top_wrap');
      var writer=$('<div>').appendTo(top_wrap).addClass('writer');
      var p01=$('<p>').appendTo(writer).html('来自');
      var p02=$('<p>').appendTo(writer).html(user);//作者的名字
      var describe=$('<div>').appendTo(section_w).addClass('describe');
      var p03=$('<div>').appendTo(describe).html(title);//描述软文的标题
      var oul=$('<ul>').appendTo(section_w).addClass('bottom_part');
      var oli01=$('<li>').appendTo(oul).addClass('b_icon01');
      var ospan01=$('<span>').appendTo(oli01).html(glance);//浏览量
      var oli02=$('<li>').appendTo(oul).addClass('b_icon02');
      var ospan02=$('<span>').appendTo(oli02).html(praise);//点赞量
      var oli03=$('<li>').appendTo(oul).addClass('b_icon03');
      var ospan03=$('<span>').appendTo(oli03).html(comment);//评论量
    }

    //通过ajax取得收藏的函数
    function getCollect(url,type){
    	$.ajax({
    		url:url,
    		data:{
              'type':type//这个传什么参数给你，你定吧，我现在只是传了一个标签
    		},
    		dataType:'json',
    		type:'POST',
    		success:function(data){
                $.each(data,function(index,value){
		          	section(data[index].type,data[index].user,data[index].title,data[index].glance,data[index].praise,data[index].comment);    
		          	//每一个title点进去，软文内容，我直接让页面调到软文那一页，然后你在那一页返回数据给我，我在passage.js调用数据，这个我还没试过，不知道行不行
		              $('.describe').eq(index).on('click',function(){
		                location.href='/ideas/index.php/Home/User/passage?id='+data[index].id;
		              }) 
		        })
    		}
    	})
    }

//以下是‘我的文章’
   // 我的文章
	$('.user-psge').on('click',function(){
		$('.userCenter-wrap').hide();
		$('.userMessage').hide();
		$('.userCollect').hide();
		$('.userSetting').hide();
		$('.userPassage').fadeIn();
		$('.userAsk').hide();
		$('.userAnswer').hide();

		var url='';//取得文章数据的路径
        getCollect(url,'文章');// 参数
	}) 

//以下是‘我的提问’，与‘我的回答’相似

    // 我的提问，‘查看全部’先不写了
	$('.user-ask').on('click',function(){
		$('.userCenter-wrap').hide();
		$('.userMessage').hide();
		$('.userCollect').hide();
		$('.userSetting').hide();
		$('.userPassage').hide();
		$('.userAsk').fadeIn();
		$('.userAnswer').hide();
        
        var url='';//取得提问数据的路径
        getAsk(url,'提问');
	})

    // 生成页面的每一个‘我的提问’
	function dynamic(selector,name,keyword,title,glance,praise,comment){
	  var section=$('<div>').appendTo($(selector)).addClass('ask01');
	  var personal=$('<div>').appendTo(section).addClass('personal');
	  var spanImg=$('<span>').appendTo(personal);
	  var perImg=$('<img/>').appendTo(spanImg).attr('src','../img/name.png').addClass('perImg');
	  var name=$('<span>').appendTo(personal).addClass('name_nick').html(name);//提出问题的作者
      var describe=$('<div>').appendTo(section).addClass('describe-ask');
      var spanDian=$('<span>').appendTo(describe).addClass('spot');
      var hotAnswer=$('<span>').appendTo(describe).addClass('hot_answer').html('热门回答');
      var from=$('<span>').appendTo(describe).addClass('form').html('来自'+keyword);//出自哪里(是提问的第三个框里面的‘写下你的问题的关键词’),如果太麻烦就把这个删掉就好了
      var title=$('<p>').appendTo(section).addClass('s_title').html(title);//问题的标题
      var answer=$('<p>').appendTo(section).addClass('b_answer').html(content);//问题的回答，设了最多三行
      var checkAll=$('<div>').appendTo(section).addClass('checkAll');
      var lookAll=$('<div>').appendTo(checkAll).addClass('look_all').html('查看全部');
      var bottom=$('<div>').appendTo(section).addClass('bottom');
      var ul=$('<ul>').appendTo(bottom).addClass('bottom_part');

      var oli01=$('<li>').appendTo(oul).addClass('b_icon01');
      var ospan01=$('<span>').appendTo(oli01).html(glance);//浏览量
      var oli02=$('<li>').appendTo(oul).addClass('b_icon02');
      var ospan02=$('<span>').appendTo(oli02).html(praise);//点赞量
      var oli03=$('<li>').appendTo(oul).addClass('b_icon03');
      var ospan03=$('<span>').appendTo(oli03).html(comment);//评论量

      var copywrite=$('<div>').appendTo(bottom).addClass('copywrite');
      $('<span>').appendTo(copywrite).addClass('spot');
      $('<span>').appendTo(copywrite);
	}

	function getAsk(url,type){
    	$.ajax({
    		url:url,
    		data:{
              'type':type//这个传什么参数给你，你定吧，我现在只是传了一个标签
    		},
    		dataType:'json',
    		type:'POST',
    		success:function(data){
                $.each(data,function(index,value){
		          	dynamic('.userAsk-wrap',data[index].name,data[index].keyword,data[index].title,data[index].glance,data[index].praise,data[index].comment); 
		          	
		        })
    		}
    	})
    }

//以下是‘我的回答’
    // 我的回答
	$('.user-awer').on('click',function(){
		$('.userCenter-wrap').hide();
		$('.userMessage').hide();
		$('.userCollect').hide();
		$('.userSetting').hide();
		$('.userPassage').hide();
		$('.userAsk').hide();
		$('.userAnswer').fadeIn();

		var url='';//取得回答数据的路径
        getAsk(url,'回答');
	})   

//以下是‘我的设置’
    // 我的设置
	$('.user-setting').on('click',function(){
		$('.userCenter-wrap').hide();
		$('.userMessage').hide();
		$('.userCollect').hide();
		$('.userSetting').fadeIn();
		$('.userPassage').hide();
		$('.userAsk').hide();
		$('.userAnswer').hide();

		isClose();
	})
    

    function getClose(act,id,tip){
    	$.ajax({
    		url:'',//我的设置的提交地方
    		data:{
              'active':act,
              'id':id
    		},
    		dataType:'json',
    		type:'POST',
    		success:function(data){
            $('.open-close input').eq(id).value(tip);
    		}
    	})
    }


    // 关闭还是开启
    function isClose(){
    	$('.open-close input').each(function(index,value){
    		var selector=$('.open-close input');
    		selector.on('click',function(){
    			if(selector.val()==='关闭'){
	    			getClose('0',index,'开启');
	    		}else{
	    			getClose('1',index,'关闭');
	    		}
    		})
    	})
    }

    //'点击关闭变成开启，点击开启变成关闭'，仅供前端展示用!
    $('.open-close input').each(function(index,value){
      var selector=$('.open-close input').eq(index);
      selector.on('click',function(){
          if(selector.val()==='关闭'){
            selector.val('开启');
          }else{
            selector.val('关闭');
          }
        })
    })
})