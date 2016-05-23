$(function(){
	var dataInt={
		'img':[{'src':'../img/image/pic_1.1.png'},{'src':'../img/image/pic_1.2.png'},{'src':'../img/image/pic_1.4.png'},{'src':'../img/image/pic_2.1.png'},{'src':'../img/image/pic_2.2.png'},{'src':'../img/image/pic_2.3.png'},{'src':'../img/image/pic_2.4.png'},{'src':'../img/image/pic_03.png'},
        {'src':'../img/image/pic_1.1.png'},{'src':'../img/image/pic_1.2.png'},{'src':'../img/image/pic_1.4.png'},{'src':'../img/image/pic_2.1.png'},{'src':'../img/image/pic_2.2.png'},{'src':'../img/image/pic_2.3.png'},{'src':'../img/image/pic_2.4.png'},{'src':'../img/image/pic_03.png'}
    ],
    'btn':['创意越过界','软文','微电影','网络游戏','综艺','创意越过界','软文','微电影','网络游戏','综艺',
       '创意越过界','软文','微电影','网络游戏','综艺','创意越过界','软文','微电影','网络游戏','综艺'
    ],
    'describe':['inpulse街头艺术，让童心美成一道光街头艺术','假如颜料可以挤出你想要的样子','这几款意面，你喜欢哪个发型？',' 天气预报的正确打开“方”式','这是一支太糊弄的广告，因为你对时间也很糊弄','inpulse街头艺术，让童心美成一道光街头艺术','盘点2016 CES十大创意展台','如果一天就是一本书，今天会是什么书？',
       'inpulse街头艺术，让童心美成一道光街头艺术','假如颜料可以挤出你想要的样子','这几款意面，你喜欢哪个发型？',' 天气预报的正确打开“方”式','这是一支太糊弄的广告，因为你对时间也很糊弄','inpulse街头艺术，让童心美成一道光街头艺术','盘点2016 CES十大创意展台','如果一天就是一本书，今天会是什么书？'
    ],
    'h':['280px','300px','250px','240px','250px','230px','250px','290px',
        '280px','300px','250px','240px','250px','230px','250px','290px'
    ]
      
	}

	//对瀑布流里面的元素进行定位
    falls();//初始化
    

    //虚拟的数据
     function falls(){
        for(var i=0;i<dataInt.img.length;i++){
          var section=$('<div>').appendTo($('.waterfall')).addClass('section');
          var section_w=$('<div>').appendTo(section).addClass('section_w');
          var top_part=$('<div>').appendTo(section_w).addClass('top_part').css('height',dataInt.h[i]);
          var img=$('<img/>').appendTo(top_part).addClass('image').css('height',dataInt.h[i]);
          var iwidth=$('.image').width();          
          $(img).attr('src',dataInt.img[i].src);
          var type=$('<button>').appendTo(top_part).addClass('type').html(dataInt.btn[i]);
          var top_wrap=$('<div>').appendTo(top_part).addClass('top_wrap').css('height',dataInt.h[i]);
          var writer=$('<div>').appendTo(top_wrap).addClass('writer');
          var p01=$('<p>').appendTo(writer).html('来自');
          var p02=$('<p>').appendTo(writer).html('Jsuan Seaenneam');
          var describe=$('<div>').appendTo(section_w).addClass('describe');
          var p03=$('<p>').appendTo(describe).html(dataInt.describe[i]);
          var oul=$('<ul>').appendTo(section_w).addClass('bottom_part');
          var oli01=$('<li>').appendTo(oul).addClass('b_icon01');
          var ospan01=$('<span>').appendTo(oli01).html('562');
           var oli02=$('<li>').appendTo(oul).addClass('b_icon02');
          var ospan02=$('<span>').appendTo(oli02).html('56');
           var oli03=$('<li>').appendTo(oul).addClass('b_icon03');
          var ospan03=$('<span>').appendTo(oli03).html('23');
        }
        // 定位
        var w=$('.section').eq(0).outerWidth();

        var cols=Math.floor($(window).width()/w); //列数
        if(cols<3){
          cols=3;
        }
        if(cols>6){
          cols=6;
        }

        $('.waterfall').width(w*cols).css('margin','0 auto');
        var hArr=[];
        $('.section').each(function(index,value){
          var h=$('.section').eq(index).outerHeight();
          if(index<cols){
            $(this).css({
              'left':w*index+'px',
              'top':0
            })
            hArr.push(h);
          }else{
             var minH=Math.min.apply(null,hArr);//求高最小的那个图
             var minHIndex=$.inArray(minH,hArr);//求高最小的那个图的索引
             $(value).css({
              'top':minH+'px',
              'left':minHIndex*w+'px'
             })
             hArr[minHIndex]+=$('.section').eq(index).outerHeight();//'.section').eq(index)
             $('.waterfall').css('height', hArr[minHIndex]);
          }
        })
    }

    //加载数据
    // $(window).on('scroll',function(){
    //     if(checkScrollSlide){
    //        waterfall();
    //     }
    // })

    // 在页面生成一个又一个section(后台给的数据)
    function section(height,img,type,user,title,glance,praise,comment){
      var section=$('<div>').appendTo($('.waterfall')).addClass('section');
      var section_w=$('<div>').appendTo(section).addClass('section_w');
      var top_part=$('<div>').appendTo(section_w).addClass('top_part').css('height',height);//高度
      var img=$('<img/>').appendTo(top_part).addClass('image').css('height',height);//图片的高度，定位
      var iwidth=$('.image').width();

      $(img).attr('src',img);//图片的路径
      var type=$('<button>').appendTo(top_part).addClass('type').html(type);//标签的内容
      var top_wrap=$('<div>').appendTo(top_part).addClass('top_wrap').css('height',height);//获取高度定位
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

    //定位
    function getPosition(){
      var width=$('.section').eq(0).outerWidth();//每个section的宽度
      var cols=Math.floor($(window).width()/w); //列数
      //列数
      if(cols<3){
        cols=3;
      }
      if(cols>6){
        cols=6;
      }

      $('.waterfall').width(w*cols).css('margin','0 auto');//对waterfall定位
      
      var hArr=[];//装图片的高度
        $('.section').each(function(index,value){
          var h=$('.section').eq(index).outerHeight();
          if(index<cols){
            $(this).css({
              'left':w*index+'px',
              'top':0
            })
            hArr.push(h);
          }else{
             var minH=Math.min.apply(null,hArr);//求高最小的那个图
             var minHIndex=$.inArray(minH,hArr);//求高最小的那个图的索引
             // console.log(value);
             $(value).css({
              'top':minH+'px',
              'left':minHIndex*w+'px'
             })
             hArr[minHIndex]+=$('.section').eq(index).outerHeight();//'.section').eq(index)
             $('.waterfall').css('height', hArr[minHIndex]);
          }
        })
    }

    // 通过ajax获取页面的类瀑布流的数据
    function waterfall(){
      $.ajax({
        url:'',
        dataType:'json',
        //回调函数
        success:function(data){
          //对每一个数据进行遍历
          $.each(data,function(index,value){
            //调用section函数在页面生成内容
             section(data[index].height,data[index].type,data[index].user,data[index].title,data[index].glance,data[index].praise,data[index].comment);    
             //每一个title点进去，软文内容，我直接让页面调到软文那一页，然后你在那一页返回数据给我，我在passage.js调用数据，这个我还没试过，不知道行不行
              $('.describe').eq(index).on('click',function(){
                location.href='/ideas/index.php/Home/User/passage?id='+data[index].id;
              })       
          })
          //定位
          getPosition();
        }
      })
    }
    // 当窗口发生变化的时候
    // $(window).on('resize',function(){
    //   waterfall();
    // })
    // 是否具备加载数据块的能力
    function checkScrollSlide(){
      var lastPic=$('.section').last();
      var lastPicDis=lastPic.offset().top+Math.floor(lastPic.outerHeight()/2);
      var scrollTop=$(window).scrollTop();
      var documentH=$(window).height();
      return (lastPicDis<(scrollTop+documentH))?true:false;
    }

    
   
    //对首页上的主题站的主题进行筛选：软文、微电影、创意越过界、网络游戏、综艺（根据标签上的字进行分类)
    //跟前面类瀑布流类似
    function classify(selector,describe){
      $(selector).on('click',function(){
        $('.waterfall').empty();
        $.ajax({
          url:'',
          data:{
            'field':describe
          },
          dataType:'json',
          type:'POST',
          success:function(data){
            $.each(data,function(index,value){
               section(data[index].height,data[index].type,data[index].user,data[index].title,data[index].glance,data[index].praise,data[index].comment);    
             //每一个title点进去，软文内容，我直接让页面调到软文那一页，然后你在那一页返回数据给我，我在passage.js调用数据，这个我还没试过，不知道行不行
              $('.describe').eq(index).on('click',function(){
                location.href='/ideas/index.php/Home/User/passage?id='+data[index].id;
              })  
              
            })
            //定位
            getPosition(); 
          }
        })
      })
    }

    // 如果标签种类不够的话，可以在数据库改一下，使得所有的标签都有
    //点击软文时
    classify('#passage','软文');
    //点击微电影时
    classify('#movie','微电影');
    //点击创意越过界时
    classify('#idea','创意越过界');
    //点击网络游戏时
    classify('#game','网络游戏');
    //点击综艺时
    classify('#show','综艺');

})