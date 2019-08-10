// 表单格式验证
;$(function () {
    $(':input').blur(function () {
        var $parent = $(this).parent();
        //移除之前的错误信息
        $parent.find('.alert').remove();
        // 密码格式验证
        if ($(this).is(':password')) {
            if (!this.value.match(/^[a-z0-9_-]{6,18}$/)) {
                var errorMsg = "密码格式错误";
                $parent.append('<div class="alert alert-danger">' + errorMsg + '</div>');
                $(this).select();
            }
        }
        // 手机格式验证
        if ($(this).is('.phone')) {
            if (!this.value.match(/^1[3458][0-9]\d{4,8}$/)) {
                var errorMsg = "请输入正确的手机号";
                $parent.append('<div class="alert alert-danger">' + errorMsg + '</div>');
                $(this).select();
            }
        }
        // 验证码格式验证
        if ($(this).is('.authCode')) {
            var $parent = $(this).parents('.form-group');
            $parent.find('.alert').remove();
            if (!this.value.match(/^\d{4}$/)) {
                var errorMsg = "请输入正确的验证码";
                $parent.append('<div class="alert alert-danger">' + errorMsg + '</div>');
            }
        }

    });
});

