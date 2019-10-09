function preventDefault(event) {
    if (document.all) {
        window.event.returnValue = false;
    } else {
        event.preventDefault();
    }
}


//获取对象或数组中选中对象的index
function getIndex(jsonArray, keyName, value) {
    for (var i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i][keyName] == value) {
            return i;
        }
    }
};

//回到页面顶部
function toTop() {
    $("html,body").animate({
        scrollTop: $("body").offset().top
    }, 500, 'swing');
}

function formData(body) {
    var form = new FormData();
    for (var kn in body) {
        if (body) {
            form.set(kn, body[kn] === undefined ? '' : body[kn]);
        }
    }
    return form;
}

function formDataToUrl(body, ifFist) {
    var str = '';
    for (var keyName in body) {
        if (!str && ifFist) {
            str = '?' + keyName + '=' + (body[keyName] === undefined ? '' : encodeURI(body[keyName]));
        } else {
            str = str + '&' + keyName + '=' + (body[keyName] === undefined ? '' : encodeURI(body[keyName]));
        }
    }
    return str;
}

var ua = navigator.userAgent;
