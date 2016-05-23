$(function(){
	// 点击写文章的按钮时，跳转到写文章的页面
	$('.create').on('click',function(){
		location.href='../html/write.html';	
	})
 

	// 内容的布局
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
    
    //第几页
    var iPage=1;
    //初始化：软文的内容，一页放9个section吧
    getAjax('1','软文');
 
    //这个你看着吧，看你后台需要什么参数，可以改，分页那里我也不清楚怎么写了。
    //点击软文的时候
    $('#passage').on('click',function(){
    	getAjax('1','软文');
    })
    //点击综艺的时候
    $('#show').on('click',function(){
    	getAjax('1','综艺');
    })
    //点击微电影的时候
    $('#movie').on('click',function(){
    	getAjax('1','微电影');
    })
    //点击网络游戏的时候
    $('#game').on('click',function(){
    	getAjax('1','网络游戏');
    })
    //点击创意越过界的时候
    $('#ideas').on('click',function(){
    	getAjax('1','创意越过界');
    })
    //对于每一个1,2,3等分页（$('.waterfall').empty();之后不知道怎么写了）
    $('.pages-num li').each(function(index,value){
    	$(this).on('click',function(){
    		$('.waterfall').empty();
    	})
    })
    //ajax各个part的内容
    function getAjax(iPage,label){
    	$.ajax({
	    	url:'',
	    	data:{
	    		'page':iPage,
	    		'type':label//(type的内容可以是你设置的变量)

	    	},
	    	dataType:'json',
	    	type:'POST',
	    	success:function(data){
	    		//这个可以根据你的数据进行适当的改变
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
})