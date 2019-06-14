/**
 * parentcontent  //父容器
 * boxcontent   // 评论区图片展示区域
 */
function commentMove(parentcontent, boxcontent,id) {
	var style = new Object();
	style.activeClass = "tm-current current_"+id;
	style.nextButton = ".navright_"+id;
	style.prevButton = ".navleft_"+id;
	style.id = id;
	this.obj = style;
    this.parentcontent = parentcontent;
    this.boxcontent = boxcontent;
}

commentMove.prototype = {
    init: function () {
        var that = this;
        that.start();
        this.lefthover();
        this.righthover();
        this.leftclick();
        this.rightclick();
    },
    start: function () {
        var that = this;
	var viewWidth = 1066,viewHeight = 600,navWidth = 80;
        
        $(that.parentcontent + ' li').click(function () {
            $(this).toggleClass(that.obj.activeClass).siblings().removeClass(that.obj.activeClass);
            var src =  $('.current_' + that.obj.id).attr('data-src');
            
            $(that.boxcontent).css({ "width": viewWidth, "height": viewHeight });
            $(that.obj.prevButton).css({ "width": navWidth, "height": viewHeight });
            $(that.obj.prevButton).children().css({ "top": viewHeight / 2 - 10 + 'px' });
            $(that.obj.nextButton).children().css({ "top": viewHeight / 2 - 10 + 'px' });
            
            if (!src) {
                $(that.boxcontent).css({ "width": 0, "height": 0 });
            } else {
                $(that.boxcontent).css({"background-image":"url("+src+")","background-size":"contain","background-position":"center","background-repeat":"no-repeat","border":"1px solid lightGray"});
            }
        });

        $(that.boxcontent).click(function(e){
            if(e.pageX - $(this).offset().left <= navWidth || e.pageX - $(this).offset().left >= viewWidth -navWidth){
                return;
            }
            var index = $(that.parentcontent + ' li').index($(that.parentcontent + ' li.current_' + that.obj.id));
            $(that.parentcontent + ' li').eq(index).toggleClass(that.obj.activeClass).siblings().removeClass(that.obj.activeClass);
            $(this).css({"width":0,"height":0});
        });
    },
    lefthover: function () {
        var that = this;
        $(that.obj.prevButton).hover(function () {
        	
            var index = $(that.parentcontent + ' li').index($(that.parentcontent + ' li.current_' + that.obj.id));
            if (index < 1) {
                $(this).children().css("display", "none");
            } else {
                $(this).children().css({ "display": "inline" });
            }
        }, function () {
            $(this).children().css({ "display": "none" });
        })
    },
    righthover: function () {
        var that = this;
        $(that.obj.nextButton).hover(function () {
       
            var index = $(that.parentcontent + ' li').index($(that.parentcontent + ' li.current_' + that.obj.id));
           
            if (index >= $(that.parentcontent + ' li').length - 1) {
                $(this).children().css("display", "none");
            } else {
                $(this).children().css({ "display": "inline" });
            }
        }, function () {
            $(this).children().css({ "display": "none" });
        })
    },
    leftclick: function () {
        var that = this;
        $(that.obj.prevButton).click(function () { 	
            var index = $(that.parentcontent + ' li').index($(that.parentcontent + ' li.current_' + that.obj.id));
            index--;
            if (index >= 0) {
                $(that.parentcontent + ' li').eq(index).toggleClass(that.obj.activeClass).siblings().removeClass(that.obj.activeClass);
                $(that.boxcontent).css({"background-image":"url("+$(that.parentcontent + ' li').eq(index).attr('data-src')+")","background-size":"contain","background-position":"center","background-repeat":"no-repeat","border":"1px solid lightGray"});

            }
            if (index < 1) {
                index = 0;
                $(this).children().css({ "display": "none" });
                return;
            }
        })
    },
    rightclick: function () {
        var that = this;
        $(that.obj.nextButton).click(function () {
            var index = $(that.parentcontent + ' li').index($(that.parentcontent + ' li.current_' + that.obj.id));
            index++;
            if(index < $(that.parentcontent + ' li').length){
                $(that.boxcontent).css({"background-image":"url("+$(that.parentcontent + ' li').eq(index).attr('data-src')+")","background-size":"contain","background-position":"center","background-repeat":"no-repeat","border":"1px solid lightGray"});
                $(that.parentcontent + ' li').eq(index).toggleClass(that.obj.activeClass).siblings().removeClass(that.obj.activeClass);
            }
            if (index >= $(that.parentcontent + ' li').length - 1) {
                $(this).children().css({ "display": "none" });
            }
        })
    }
}
