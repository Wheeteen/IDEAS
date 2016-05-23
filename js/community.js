$(function(){
	//点击最新动态的时候
	$('.newest').on('click',function(){
		$('.line02').show();
		$('.line03').hide();
		$('.quiz').hide();
		$('.grey').hide();
		$('.main_con').fadeIn();
		$('.detailed').hide();
	})
	//点击提问的时候
	$('.ask_again').on('click',function(){
		$('.line02').hide();
		$('.line03').show();
		$('.grey').show();
    	$('.quiz').fadeIn();
	})
	 // 点击×时
	$('.close').on('click',function(){
		$('.line02').show();
		$('.line03').hide();
	})
	// 点击‘查看全部’的时候
	$('.look_all').on('click',function(){
		$('.main_con').hide();
		$('.detailed').fadeIn();
	})
	//点击我的提问，我的回答，我的收藏，都是直接跳转到我的主页
	$('.myInfo li').on('click',function(){
		 var id=$(this).html();
     location.href='../html/user.html?id='+id;
	})
	
	//初始化
	getData();
	// 生成页面的一个最新动态（section）
	function dynamic(name,keyword,title,glance,praise,comment){
	  var section=$('<div>').appendTo($('.main_con')).addClass('section');
	  var personal=$('<div>').appendTo(section).addClass('personal');
	  var spanImg=$('<span>').appendTo(personal);
	  var perImg=$('<img/>').appendTo(spanImg).attr('src','../img/name.png').addClass('perImg');
	  var name=$('<span>').appendTo(personal).addClass('name_nick').html(name);//提出问题的作者
      var describe=$('<div>').appendTo(section).addClass('describe');
      var spanDian=$('<span>').appendTo(describe).addClass('dian');
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
      $('<span>').appendTo(copywrite).addClass('dian');
      $('<span>').appendTo(copywrite);
	}

	//点击‘查看全部’的时候动态生成页面内容
    function Check(name,keyword,title){
      var section=$('<div>').prependTo($('.discuss')).addClass('section');
	  var personal=$('<div>').appendTo(section).addClass('personal');
	  var spanImg=$('<span>').appendTo(personal);
	  var perImg=$('<img/>').appendTo(spanImg).attr('src','../img/name.png').addClass('perImg');
	  var name=$('<span>').appendTo(personal).addClass('name_nick').html(name);//提出问题的作者
      var describe=$('<div>').appendTo(section).addClass('describe');
      var spanDian=$('<span>').appendTo(describe).addClass('dian');
      var hotAnswer=$('<span>').appendTo(describe).addClass('hot_answer').html('热门回答');
      var from=$('<span>').appendTo(describe).addClass('form').html('来自'+keyword);//出自哪里(是提问的第三个框里面的‘写下你的问题的关键词’),如果太麻烦就把这个删掉就好了
      var title=$('<p>').appendTo(section).addClass('s_title').html(title);//问题的标题

      var hotCment=$('<div>').addClass('hot-comment').appendTo(section);
      var h3=$('<h3>').html('最新评论').appendTo(hotCment);
      var line01=$('<div>').addClass('line01').appendTo(hotCment);

    }
    
    //每一条评论
    function Comment(writer,comment){
    	var cmentPart=$('<div>').appendTo($('.hot-comment'));
    	var p01=$('<p>').appendTo(cmentPart);
    	var span1=$('<span>').appendTo(p01);
    	var publicImg=$('<img/>').appendTo(span1).addClass('publicImg').attr('src','../img/user01.png');
    	var getName=$('<span>').appendTo(p01).addClass('get_name').html(writer);//评论的作者的名字
        var comment=$('<p>').appendTo(cmentPart).addClass('view').html(comment);//评论的内容

    }
    //通过后台返回的section数据的函数
    function getData(){
    	$.ajax({
    		url:'',
    		data:{},
    		dataType:'json',
    		type:'POST',
    		success:function(data){
    			$('.blur').attr('src',data.img);//我的图片的路径
    			$('.myImg').attr('src',data.img);//同上，只是为了高斯模糊，要两张图片
    			$.each(data,function(index,value){
    				dynamic(data[index].name,data[index].keyword,data[index].title,data[index].glance,data[index].praise,data[index].comment); 
    				//点击查看全部
    				$('.look_all').eq(index).on('click',function(){
    					$('.main_con').hide();
		                $('.detailed').fadeIn();
		                $('.detailed').empty();
                        location.hash='#'+data[index].title;
                        Check(data[index].name,data[index].keyword,data[index].title);
                        // 评论的内容
                        $(data[index].comment).each(function(i,v){
                        	Comment(data[index].comment[i].writer,data[index].comment[i].value);
                        })
    				})   
    			})
    		}

    	})
    }

    //‘我要评论’处的评论内容
    $('.publish_btn').on('click',function(){
      var text=$('.myIdea').val();
      if(text==''||text==null){
         $('.comment-tip').html('评论的内容不能为空');
         return false;
      }else{
      	//把数据提交给后台
      	$.ajax({
      		url:'',
      		data:{
      			'content':text
      		},
      		dataType:'json',
      		type:'POST',
      		success:function(data){
              // $('.comment-tip').html('评论发表成功');
              $('.myIdea').val('');
              // 将评论的内容插到最新评论中
              Comment(data.name,text);//作者的名字，这里应该要改，这个评论的内容要怎么变化

      		}
      	})
      }
    })


})