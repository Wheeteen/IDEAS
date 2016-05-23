
$(function(){
    //获取id号
    var href=location.href.split('?')[1];
    var id=href.slice(4);

    //作者的个人信息
    function writer(img,loveNum,collectNum,replyNum,introduce){
    	$('.blur').attr('src',img);//作者的头像，如果没有就是默认的头像
    	$('.writerImg').attr('src',img);//同上
    	$('.love').html(loveNum);//该作者总的点赞数
    	$('.collect').html(collectNum);//该作者总的收藏数
    	$('.reply').html(replyNum);//该作者总的回答数

    	$('.introduce').html(introduce);//该作者对自己的自我介绍，如果没有，选择默认的。

    }

    //最新评论(动态生成)
    function Comment(name,text){
    	var section=$('<div>').addClass('c_ment').appendTo($('.comment'));
    	var user=$('<p>').appendTo(section);
    	var span01=$('<span>').appendTo(user);
    	var img=$('<img/>').appendTo(span01).addClass('userPic');
    	$(img).attr('src','../img/user01.png');

    	var span02=$('<span>').appendTo(user).addClass('get_name').html(name);//作者的名字
        var text=$('<p>').appendTo(section).addClass('view').html(text);//评论的内容
    }

	$.ajax({
		url:'',
    data:{
      'id':id
    }
		dataType:'json',
		success:function(data){
			//软文的标题
			$('.headline').html(data.title);
			$('.page_writer').html(data.username);//软文的作者
			$('.day').html(data.date);//软文的具体日期：eg:2016年3月15日
			$('.min').html(data.time);//软文的具体时间：eg:17:28:25
			$('.b_icon01').html(data.glance);//软文浏览量
			$('.b_icon02').html(data.praise);//软文的点赞量
			$('.b_icon03').html(data.comment);//软文的评论量

			//软文的内容，形式看你怎么返回给我
			$('.paragraph').html(data.passage);

			$('.where').html(data.from);//来自哪里，比如××微信公众号类的
			$('.writerName').html(data.writer);//作者名：××作者（作者两个字不用了）
            
            //作者个人信息
            writer(data.img,data.loveNum,data.collectNum,data.replyNum,data.introduce);

            //最新评论
             $(data.comment).each(function(index,value){
             	Comment(data.comment[index].name,data.comment[index].text);
             })
             //点赞
             praise(id);//id涉及到第几个
             //收藏
             collect(id);
		}
	})
    //点赞
    function praise(id){
    	$('.praise_btn').on('click',function(){
    		if($(this).html()==='赞')
    		{
    			praise_btn(id,'0','已赞');
    		}
    		else{
    		  	praise_btn(id,'1','赞');
    	    }
    	})
    }
    // 点赞或取消点赞的函数
    function praise_btn(id,state,text){
    	$.ajax({
    		url:'',
    		data:{
    			'id':id,
    			'active':state
    		},
    		dataType:'json',
    		type:'POST',
    		success:function(data){
    			$('.praise_btn').html(text);
    			var num=$('.countNum').html();
    			num=(text==='已赞')?(parseInt(num)+1):(parseInt(num)-1);
    			$('.countNum').html(num);
    		}
    	})
    }
	//收藏的
	function collect(){
		$('.store').on('click',function(){
			if($('.hot_collect').html()==='收藏'){
				 collect_fun(id,'0','已收藏');//要收藏
			}else{
         collect_fun(id,'1','收藏');//已收藏，取消收藏
			}
		})
	}

	// 收藏将数据收藏到数据库
	function collect_fun(id,state,text){
		$.ajax({
			url:'',
			data:{
				'id':id,
				'active':state  //这个看你需不需要，意思是点赞或者取消点赞的状态，0或1
			},
			type:'POST',
			dataType:'json',
			success:function(data){
               $('.hot_collect').html(text);
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
              $('.comment-tip').html('评论发表成功');
              // 将评论的内容插到最新评论中
              Comment(data.name,text);//作者的名字，这里应该要改，这个评论的内容要怎么变化

      		}
      	})
      }
    })

})