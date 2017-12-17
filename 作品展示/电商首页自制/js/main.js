$(function () {
    var flag0 = 0;//大轮播图页数标志
    var flag1 = 0;//第一栏小轮播图页数标志
    var flag2 = 0;//第二栏小轮播图页数标志
    var $banner = $('.banner');//大轮播图父元素
    var $rowContent1 = $('.row-content1');//第一栏小轮播图父元素
    var $rowContent2 = $('.row-content2');//第二栏小轮播图父元素
    var $imgBox = $('.imgBox');//大轮播图图片盒子
    var $rowImgBox1 = $('.rowImgBox1');//第一栏图片盒子
    var $rowImgBox2 = $('.rowImgBox2');//第二栏图片盒子
    //图片切换函数 传入参数有: 图片盒子,页数标志,父元素
    var banner = function (imgBox, pageNum, father) {
        //图片个数,可以任意更改
        var imgCount = imgBox.find('img').length;
        //单个图片宽度,没有单位
        var oneWidth = imgBox.find('img').eq(0).width();
        //当前图片盒子的左定位,没有单位
        var curLeft = parseInt(imgBox.css('left'));
        //最大位移处,也没有单位
        var endLeft = -1 * (imgCount - 1) * oneWidth;
        //判断是否到达最后一张图片
        if (curLeft == endLeft) {
            //滑动图片
            imgBox.animate({left: '0px'}, 2000);
            pageNum = 0;
            //将当前页数赋值给相应页数标志
            whichSlider(imgBox, pageNum);
            //当前页数对应下标高亮
            curPage(father, pageNum);
        }
        else {
            //和上面类似
            imgBox.animate({left: curLeft - oneWidth + 'px'}, 2000);
            pageNum++;
            whichSlider(imgBox, pageNum);
            curPage(father, pageNum);
        }
    };
    //定义函数判断当前是哪个轮播图,并将当前页数赋给相应的页数标志
    var whichSlider = function (imgBox, pageNum) {
        if (imgBox == $imgBox)
            flag0 = pageNum;
        else if (imgBox == $rowImgBox1)
            flag1 = pageNum;
        else
            flag2 = pageNum;
    };
    //定义函数将当前页数对应下标高亮
    var curPage = function (father, pageNum) {
        father.find($('.imgNum a')).eq(pageNum).addClass('active').siblings().removeClass('active');
    };
    //每个轮播图设置相应的定时器,传入对应参数
    var timer1 = setInterval(function () {
        banner($imgBox, flag0, $banner);
    }, 3000);
    var timer2 = setInterval(function () {
        banner($rowImgBox1, flag1, $rowContent1);
    }, 3000);
    var timer3 = setInterval(function () {
        banner($rowImgBox2, flag2, $rowContent2);
    }, 3000);

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
        $(this).animate({bottom: '10px'}, '500');
        $("html,body").delay(500).animate({scrollTop: 0}, 'normal');
        $(this).animate({bottom: '20px'}, 'slow');
    });
});