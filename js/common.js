$(function(){
  // 导航栏点击搜索按钮的时候，搜索框弹出来
   $('.search_button').on('click',function(){
    $('.search').show();
    $('.search').addClass('active-search');
   })
   // 点击搜索里面的×时
   $('.close-s').on('click',function(){
    $('.search').fadeOut();
    $('.search').removeClass('active-search');
   })  
   // 点击导航栏的登录时，弹窗出现
   $('.login_btn').on('click',function(){
    $('.s_register').slideDown();
    $('.user_frame').fadeIn();
    $('.register_frame').hide();
    $('.click_log').css({
       'color': '#665f62',
       'border-bottom': '3px solid #858585'
    });
    $('.click_rt').css({
      'color':'#635c97',
      'border-bottom':'none'
    });
     $('.grey').show();

  })
    // 点击导航栏的注册时，弹窗出现
   $('.register_btn').on('click',function(){
    $('.s_register').slideDown();
    $('.user_frame').hide();
    $('.register_frame').fadeIn();
    $('.click_rt').css({
      'color': '#665f62',
      'border-bottom': '3px solid #858585'
    });
    $('.click_log').css({
      'color':'#635c97',
      'border-bottom':'none'
    });
    $('.grey').show();
  })
   // 点击×时
  $('.close').on('click',function(){
        $('.s_register').fadeOut();
        $('.reset_pwd').slideUp(); 
        $('.grey').fadeOut();
        $('.quiz').fadeOut();
        $('.invite').fadeOut();
  })
  // 点击弹窗里面的登录
  $('.click_log').on('click',function(){
    $('.user_frame').fadeIn();
    $('.register_frame').hide();
    $('.click_log').css({
       'color': '#665f62',
       'border-bottom': '3px solid #858585'
    });
    $('.click_rt').css({
      'color':'#635c97',
      'border-bottom':'none'
    });
  })
  // 点击弹窗里面的注册
  $('.click_rt').on('click',function(){
    $('.user_frame').hide();
    $('.register_frame').fadeIn();
    $('.click_rt').css({
      'color': '#665f62',
      'border-bottom': '3px solid #858585'
    });
    $('.click_log').css({
      'color':'#635c97',
      'border-bottom':'none'
    });
  })
  // 点击忘记密码时
  $('.fget_pwd').on('click',function(){
    $('.s_register').hide();
    $('.reset_pwd').slideDown();
  })
  //当鼠标经过头像和用户名的时候，我的消息我的主页等信息显示出来
  $('.have-login').mouseenter(function(){
      $('.message').show();
    }).mouseleave(function(){
      $('.message').hide();
    })
    //点击提问的时候
    $('.ask_btn').on('click',function(){
      $('.grey').show();
      $('.quiz').fadeIn();
      
    })

    
    //点击邀请回答框里面的‘×’的时候
    $('.close-invite').on('click',function(){
       $('.quiz').fadeIn();
       $('.invite').hide();
       $('.grey').show();
    })

    //点击我的主页，我的消息，我的收藏，我的资料的时候，跳转到用户的页面
    $('.message li').on('click',function(){
      var id=$(this).html();
      location.href='../html/user.html?id='+id;
    })
    //点击注销用户时，退出登录并跳转至主页
    $('.m_icon05').on('click',function(){
      location.href='/ideas/index.php/Home/User/logout';
    })
 //点击每一个软文的标题的时候，默认跳转到passage.html那一页，仅供重构展示用！
    $('.describe p').on('click',function(){
      var id=$(this).html();
      location.href='../html/passage.html?title='+id;
    })

//点击提问框中的‘发布’的时候
    $('.submitButton').on('click',function(){
      var question=$('.yourQuiz01').val();
      var describe=$('.yourQuiz02').val();
      var keyword=$('.yourQuiz03').val();

      if(question==''){
        $('.No-question').html('请写下你的问题');
        return false;
      }else{
        $('.No-question').html('');
        if(describe==''){
          $('.No-describe').html('请写下你的问题描述');
          return false;
        }else{
          $('.No-describe').html('');
          if(keyword==''){
            $('.No-key').html('请写下你的问题的关键词');
            return false;
          }else{
             $('.No-key').html('');

             //将数据传到后台
             $.ajax({
               url:'',
               data:{
                'question':question,
                'describe':describe,
                'keyword':keyword
               },
               dataType:'json',
               type:'POST',
               success:function(data){
                 //成功之后让框消失，然后alert(已成功发布)
                 //邀请回答之后的点击‘邀请’按钮，就不返回提问那一页了，因为那一页的内容都要动态生成，我先不做了，点击×的时候就可以回答提问那一页了。
               }
             })
          }
        }
      }


    })

// 在提问的邀请回答处点击‘邀请回答’字样，页面弹出邀请回答的框
    $('.invite_per').on('click',function(){
      var question=$('.yourQuiz01').val();
      var describe=$('.yourQuiz02').val();
      var keyword=$('.yourQuiz03').val();

      if(question==''){
        $('.No-question').html('请写下你的问题');
        return false;
      }else{
        $('.No-question').html('');
        if(describe==''){
          $('.No-describe').html('请写下你的问题描述');
          return false;
        }else{
          $('.No-describe').html('');
          if(keyword==''){
            $('.No-key').html('请写下你的问题的关键词');
            return false;
          }else{
             $('.No-key').html('');
             $('.quiz').hide();
             $('.invite').fadeIn();
              
          }
        }
      }
    })

})

//验证表单
$(function(){

  // 判断输入框是否为空的函数
    function ifEmpty(clsName) {
     var username = $.trim($(clsName).val());
     if(username==""||username==null) {
      return false;
     }
      return true;
    } 
  // 判断phone框格式是否正确的函数
  function validate_phone(phone)
  {
   var pattern = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+(com|cn)$/);
    return pattern.test(phone);

  }

    //按下enter键的时候，完成相关事件
    function getEnter(frame,btn){
      $(frame).on('keydown',function(event){
        var e=event||window.event|| arguments.callee.caller.arguments[0];
      var keycode=e.which||e.keyCode; 
      if(keycode==13){
        $(btn).click();
        e.preventDefault(); 
      }
      })
    }
    //当登录框按下enter时
    getEnter('.user_frame','#login');
    //当注册框按下enter时
    getEnter('.register_frame','#register');
    //当登录框按下enter时
    getEnter('.reset_frame','#resetPwd');

    //验证登录框的页面
    //点击登录框的登录按钮的时候验证账号和密码是否正确以及是否为空
    $('#login').click(function(){
    	var iText=ifEmpty('.user');
		  var iPwd=ifEmpty('.password');
        
        var phone=$('.user').val();//邮箱框内容
        var password=$('.password').val();//密码框内容
		    var checkbox=$('input[name="keep"]:checked').val();//记住密码框内容
		if(iText){
			$('.user01').html('');
			if(iPwd){
               $('.pwd01').html('');

               //ajax验证用户名是否存在，密码是否正确
               $.ajax({
               	 url:'/ideas/index.php/Home/Index/login',
               	 data:{
               	 	'phone': phone,
               	 	'password': password,
               	 	'keep': checkbox,
               	 },
               	 dataType:'json',
               	 type:'POST',
               	 //回调函数
               	 success:function(data){
               	 	if(data.status == 'success')
               	 	{
               	 		$('.click_register').hide();
                    $('.have-login').fadeIn();
                    $('.s_register').fadeOut();
                    $('.grey').fadeOut();
                    $('.per_name').html(data.nickname);
                    return true;
               	 	}
               	 	else
               	 	{
               	 		//这种情况理论上不会发生，因为之前全部验证过,只是为了防止后台有bug
                        $('.user01').html("账号或密码错误");
                        return false;
               	 	}
               	 }
               })
			}else{
				$('.pwd01').html('密码不能为空');
				return false;
			}
		}else{
			$('.user01').html('手机号码不能为空');
			return false;
		}
    })


  //验证注册框的页面
  //验证手机号、昵称、密码、验证码框是否为空以及是否正确
  var error = new Array();
    error['phone'] = 1;
    error['nickname'] = 1;
    error['password'] = 1;
    error['repassword'] = 1;
    error['checkednum'] = 1;

    $('#phone').blur(function(){
        var phone = $('#phone').val();

        $.ajax({
            url:'/ideas/index.php/Home/Index/checkName',
            data:{
                'phone' : phone,
            },
            dataType:'json',
            type:'POST',
            success:function(data) {
                if (data == 'success') {
                    error['phone'] = 0;
                    $('#mess3').html("");
                }else{
                    error['phone'] = 1;
                    $('#mess3').html(data);
                }
            }
        });
    })
    $('#nickname').blur(function() {
        var nickname = $('#nickname').val();

        $.ajax({
            url:'/ideas/index.php/Home/Index/checkName',
            data:{
                'nickname' : nickname,
            },
            dataType:'json',
            type:'POST',
            success:function(data){
                if (data == 'success') {
                    error['nickname'] = 0;
                    $('#mess4').html("");
                }else {
                    error['nickname'] = 1;
                    $('#mess4').html(data);
                }
            }
        })
    })
    $('#password').blur(function() {
        var password = $('#password').val() + "";

        if (password == "") {
            error['password'] = 1;
            $('#mess2').html("密码不能为空!");
        } else if (password.length < 6) {
            error['password'] = 1;
            $('#mess2').html("密码长度必须大于6位！");
        } else {
            error['password'] = 0;
            $('#mess2').html("");
        }
    })
    $('#repassword').blur(function() {
        var password = $('#password').val() + "";
        var repassword = $('#repassword').val() + "";

        if (repassword == "") {
            error['repassword'] = 1;
            $('#mess22').html("确认密码不能为空!");
        } else if (repassword.length < 6) {
            error['repassword'] = 1;
            $('#mess22').html("密码长度必须大于6位！");
        } else if (password != repassword) {
            error['repassword'] = 1;
            $('#mess22').html("两次密码不一致!");
        } else {
            error['repassword'] = 0;
            $('#mess22').html("");
        }
    })

    $('#checkednum').blur(function() {
        var checkednum = $('#checkednum').val();
        $.ajax({
            url:"/ideas/index.php/Home/Index/check_verify",
            data:{
                checkednum:checkednum
            },
            dataType:'json',
            type:'POST',
            success:function(data){
                if(data == 'success') {
                    error['checkednum'] = 0;
                    $('#mess5').html("");
                }else {
                    error['checkednum'] = 1;
                    $('#mess5').html(data);
                }
            }
        });
    })
    $('#submit1').on('click',function(){
        if (error['phone'] == 1) {
            return false;
        }else if(error['nickname'] == 1){
            return false;
        }else if (error['password'] == 1){
            return false;
        }else if (error['repassword'] == 1){
            return false;
        }else if(error['checkednum'] == 1){
            return false;
        }else{
            //表示所有的数据都已通过验证
            var phone = $('#phone').val();
            var nickname = $('#nickname').val();
            var password = $('#password').val() + "";
            //用ajax完成注册过程，插入数据并自动登录
            $.ajax({
                url:'/ideas/index.php/Home/Index/register',
                data:{
                    'phone' : phone,
                    'nickname' : nickname,
                    'password' : password,
                },
                dataType:'json',
                type:'POST',
                success:function(data){
                    //我返回了一个data{status : success/后台报错, nickname : nickname/NULL }
                    if(data.status == 'success') {
                        $('.click_register').hide();
                        $('.have-login').fadeIn();
                        $('.s_register').fadeOut();
                        $('.grey').fadeOut();
                        $('.per_name').html(data.nickname);
                  return true;
                        //完成自动登录 昵称的字数限制是10个字，显示10个字的时候会换行.所以per_name这个span需要修改
                    }else{
                        //这种情况理论上不会发生，因为之前全部验证过,只是为了防止后台有bug
                        console.log("后台出现错误：",data.status);
                        return false;
                    }
                }
            });
        }
    })
})
    
$(function(){
  //重置密码框的页面
    //点击重置密码框的确认按钮的火花验证邮箱地址、验证码、重置密码是否为空以及是否正确
    $('#resetPwd').on('click',function(){
      var iNum=ifEmpty('.num');
    var iphone=ifEmpty('.add');
    var iPwd=ifEmpty('.rst_pwd');

    var num=$('.num').val();
        var phone=$('.add').val();
        var pwd=$('.rst_pwd').val();

        if(iphone){
          $('.none_phone').html('');
           var isFormated=validate_phone(phone);
           if(isFormated){
                if(iNum){
                   $('.num02').html('');
                   if(iPwd){
                      $('.pwd03').html(''); 

                      //ajax验证邮箱、验证码、重置密码是否正确
                      $.ajax({
                        url:'',
                        data:{
                           'phone':phone,
                           'checkNum':num,
                           'password':pwd
                        },
                        dataType:'json',
                        type:'POST',
                        success:function(data){

                        }
                      })
                   }else{
                     $('.pwd03').html('重置密码不能为空');
                     return false;
                   }
                }else{
                   $('.num02').html('验证码框不能为空');
                   return false;
                }
           }else{
            $('.none_phone').html('请输入正确的邮箱');
                return false;
           }
        }else{
          $('.none_phone').html('邮箱不能为空');
      return false;
        }
    })
})

    