;(function($){
	$.fn.lubo=function(options){
		return this.each(function(){
			var _lubo=$('.lubo'),
			    _box=$('.lubo_box'),
			    _this=$(this),
			    luboH=_box.height(),
			    over='mouseover',
			    out='mouseout',
			    Oli='li',
			    _cirBox='.cir_box',
			    _cirOn='.cir_on',
			    cirlen=_box.children(Oli).length, //圆点的数量
                luboTime=2000,//轮播时间
                switchTime=1000;//图片切换时间

                cir();
                Btn();

                //根据图片的数量来生成圆点
                function cir(){
                   var cir_box=$('<ul>').addClass('cir_box').appendTo($(_lubo));
                   for(var i=0;i<cirlen;i++){
                   	 $('<li>').appendTo($(cir_box)).attr('value',i);     
                   }
                   var cir_dss=cir_box.width();
                   cir_box.css({
                   	 left:'50%',
					 marginLeft:-cir_dss/2,
					 bottom:'3px' 
                   });
                   cir_box.children(Oli).eq(0).addClass('cir_on');

                }

                //生成左右按钮

                function Btn(){

                	//点击左边按钮
                	$('.left_btn').on('click',function(){
                		var cir_box=$(_cirBox);
					 	var onLen=$(_cirOn).val();	
						_box.children(Oli).eq(onLen).stop(false,false).animate({
							opacity:0
						},switchTime);

						if(onLen==0){
							onLen=cirlen;
						}
						_box.children(Oli).eq(onLen-1).stop(false,false).animate({
							opacity:1
						},switchTime);

						cir_box.children(Oli).eq(onLen-1).addClass('cir_on').siblings().removeClass('cir_on');
                	})
                    
                    //点击右边按钮
                    $('.right_btn').on('click',function(){
                		var cir_box=$(_cirBox);
					 	var onLen=$(_cirOn).val();	
						_box.children(Oli).eq(onLen).stop(false,false).animate({
							opacity:0
						},switchTime);

						if(onLen==cirlen-1){
							onLen=-1;
						}
						_box.children(Oli).eq(onLen+1).stop(false,false).animate({

							opacity:1

						 },switchTime);
				
						cir_box.children(Oli).eq(onLen+1).addClass('cir_on').siblings().removeClass('cir_on');
                	})
                }
            	//定时器
            	int=setInterval(clock,luboTime);

            	function clock(){
            		var cir_box=$(_cirBox);
				 	var onLen=$(_cirOn).val();	

				 	_box.children(Oli).eq(onLen).stop(false,false).animate({

						opacity:0

					},switchTime);

					if(onLen==cirlen-1){

					 		onLen=-1;

					 	}

					_box.children(Oli).eq(onLen+1).stop(false,false).animate({

						opacity:1

					 },switchTime);
					
					cir_box.children(Oli).eq(onLen+1).addClass('cir_on').siblings().removeClass('cir_on');
            	}

            	//鼠标在图片上  关闭定时器
            	_lubo.on(over,function(){
					clearInterval(int);
				});

				_lubo.on(out,function(){
					int=setInterval(clock,luboTime);
				});

				//鼠标滑过圆点  切换图片
                $(_cirBox).children(Oli).on(over,function(){
                	var i=$(this).index();
                	$(this).addClass('cir_on').siblings().removeClass('cir_on');
                	_box.children(Oli).stop(false,false).animate({
                		opacity:0
                	},switchTime);

                	_box.children(Oli).eq(i).stop(false,false).animate({
                		opacity:1
                	},switchTime);
                });
		});
	}
})(jQuery);