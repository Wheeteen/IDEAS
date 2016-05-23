
$.ajax({
	 url:'/ideas/index.php/Home/Index/check',
	 data:{},
	 dataType:'json',
	 type:'POST',
	 //回调函数
	 success:function(data){
	 	if(data.status == 'success')
	 	{
        	$('.per_name').html(data.nickname);
	 		$('.click_register').hide();
        	$('.have-login').show();
	 	}
	 	else
	 	{
	 		$('.click_register').show();
        	$('.have-login').hide();
	 	}
	 }
})