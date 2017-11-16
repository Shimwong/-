;$(function () {
    //下拉显示更多菜单
    $('.menu-btn').click(function () {
            if ($('.index-menu').css('height') == 545 + 'px') {
                $('.index-menu').animate({height: '800px'}, 'slow');
                $('html,body').animate({scrollTop: '800px'}, 'slow');//菜单向下展开的同时窗口跟随滚动
                $(".menu-btn-txt").text("slide up");
                //向下箭头改为向上箭头
                $(".menu-icon").css({"background": "url('images/menu-btn-up.png')", "background-repeat": "no-repeat"});
                $(".menu-btn").css("marginLeft", "-61px");//调整margin使其居中

            } else {//上拉隐藏部分菜单 ,与上面类似
                $('.index-menu').animate({height: '545px'}, 'slow');
                $('html,body').animate({scrollTop: '680px'}, 'slow');
                $(".menu-btn-txt").text("load more");
                $(".menu-icon").css({"background": "url('images/menu-btn-down.png')", "background-repeat": "no-repeat"});
                $(".menu-btn").css("marginLeft", "-68px");
            }
        }
    );
    //菜品图片滚动展示
    var offSet = $('.show-pic').width() + parseInt($('.show').css('margin-right'));// 每次偏移量offset=290
    var page = 1;
    // $('.point-group span').click(function () {  点击圆点切换图片功能, 用户体验不好, 已取消
    //     if (!$(this).hasClass('active')) {
    //         var index = $(this).index();
    //         var a = -( index * offSet);
    //         var wl = parseInt($(".show-wrapper").css("marginLeft"));
    //         $(this).addClass('active').siblings().removeClass('active');
    //         $('.show-wrapper').animate({marginLeft: wl + a + 'px'}, 'normal');
    //         page = index + 1;
    //     }
    // });
    function changePoint() { // 圆点随图片改变 功能  暖色调图片和冷色调图片对应 不同颜色 圆点
        // alert(page); 查看当前页数
        if (page < 5) {
            $('.point-group span').eq(page - 1).addClass('active').siblings().removeClass('active').removeClass('active2');

        } else {
            $('.point-group span').eq(page - 5).addClass('active2').siblings().removeClass('active').removeClass('active2');
        }
    }

    //上一张
    $('.prev').click(function () {
        if (!$('.show-wrapper').is(':animated')) {
        }
        var wl = parseInt($(".show-wrapper").css("marginLeft"));
        page--;
        if (page < 1) {
            page = 8;
        }
        $('.show-wrapper').animate({marginLeft: wl + offSet + 'px'}, 'fast', function () {
            if (parseInt($(this).css("marginLeft")) > -290) {
                $(this).css("marginLeft", "-2320px");
                page = 8;
            }
        });
        //右上角圆点变化

        changePoint();
    });
    //下一张
    $('.next').click(function () {
        if (!$('.show-wrapper').is(':animated')) {
            var wl = parseInt($(".show-wrapper").css("marginLeft"));
            page++;
            if (page > 8) {
                page = 1;
            }
            $('.show-wrapper').animate({marginLeft: wl - offSet + 'px'}, 'fast', function () {
                if (parseInt($(this).css("marginLeft")) < -3190) {
                    $(this).css("marginLeft", "-1160px");
                    page = 1;
                }
            });
            //右上角圆点变化
            changePoint();
        }
    });

    //定义开始和停止函数
    function play() {
        timer = setTimeout(function () {//设置全局变量timer
            $('.next').trigger('click');
            play();//回调
        }, 2000);// 2秒自动切换
    }

    function stop() {
        clearTimeout(timer);
    }

    //鼠标移入图片区域暂停滚动,鼠标移出继续滚动
    $('.show-wrapper').hover(stop, play);
    play();
    //回到顶部
    $(window).on("scroll", function () {
        if ($(window).scrollTop() > $(window).height()) {
            $("#back-to-top").fadeIn("fast");
        } else {
            $("#back-to-top").fadeOut("fast");
        }
    });
    $(window).trigger("scroll");
    $("#back-to-top").click(function () {
        $("html,body").animate({scrollTop: 0}, 'slow');

    });
    // 切换图片箭头的显示隐藏, 用css更为简洁, 改为用 CSS 实现
    /*$('.show').hover(function () {
        $('.arrow').show();
    }, function () {
        $('.arrow').hide();
    });*/
});
