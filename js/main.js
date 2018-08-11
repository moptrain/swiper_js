sliderdata={
    eachtime:3000,
    changetime:150,
    nowid:1,
    picData:[["./img/1.jpg",'http://www.jd.com'],["./img/2.jpg",'http://www.qq.com'],["./img/3.jpg","http://www.163.com"],["./img/4.jpg",'http://www.baidu.com'],],
}
$('.btn').toggle();//一开始btn是隐藏的

function change(newid) {
    //改变的逻辑是，先把旧的图片隐藏，
    //这个newid不是offset，是第几个图片
    $('.circle-item').css({backgroundColor:' rgba(0,0,0,0.3)'})//把所有小圆点恢复到没选中
    $('.recommandphoto').fadeOut(sliderdata.changetime);
    setTimeout(function () {
        //下面的代码转换下面小白点
        $("div[itemid=" + newid+ "]").css({backgroundColor:' rgba(255,255,255,0.9)'})
        newid=newid-1;
        $('.recommandlink').attr({href:sliderdata.picData[newid][1]});
        $('.recommandphoto').attr({src:sliderdata.picData[newid][0]});
        $('.recommandphoto').fadeIn(sliderdata.changetime);
    },sliderdata.changetime);
    //否则，会在fadeout执行后立刻改变img的src，接着改变后的scr在一段时间内fadeOut.

}
var timeid;
function startswipe() {
    console.log('setInterval...from '+sliderdata.nowid);
    timerid=setInterval(function () {
        var olddd=sliderdata.nowid
        var tmp=(sliderdata.nowid+1)%(sliderdata["picData"].length+1);
        sliderdata.nowid=(!tmp?1:tmp);
        console.log(olddd+"下一个是"+sliderdata.nowid)
        change (sliderdata.nowid);
    } ,sliderdata.eachtime);
}
startswipe();
$('.slider').mouseenter(function (event) {
    console.log('clearInterval ...')
    clearInterval(timerid);
    console.log("mouseenter"+event)
    $('.btn').toggle();
})
$('.slider').mouseleave(function (event) {
    startswipe();
    console.log("mouseleave"+event)
    $('.btn').toggle();
})

$('.btn:first').click(
    function () {
        var tmp=(sliderdata.nowid-1);
        sliderdata.nowid=(!tmp?sliderdata["picData"].length:tmp);
        change (sliderdata.nowid);
    }
)
$('.btn-right').click(
    function () {//实际上和计时里的操作一样
        var tmp=(sliderdata.nowid+1)%(sliderdata["picData"].length+1);
        sliderdata.nowid=(!tmp?1:tmp);
        change (sliderdata.nowid);
    }
)
$('.btn a').click(function (event) {
    event.preventDefault();
})
$('#circle-wraaper').css("width",sliderdata["picData"].length*50)
for (var i=0;i<sliderdata["picData"].length;i++){
    var ii=i+1
    tmpstring='itemid='+ii.toString();
    tmpstring='<div class="circle-item"'+tmpstring+'></div>'
    // $('#circle-wraaper').append($('<div class="circle-item"></div>'));
    $('#circle-wraaper').append($(tmpstring))
}
//以上代码创建下面的小圆点

for (var i=0;i<sliderdata["picData"].length;i++){
    var tmpstring=(i+1).toString()
    $("div[itemid=" + tmpstring + "]").mouseenter({id:tmpstring},function (event) {// 这是给里面函数穿数据的方法,jQuery属性选择器选择动态变量在变量前后添加“+"
        sliderdata.nowid=parseInt(event.data.id);
        console.log('点了一下'+sliderdata.nowid)
        change(sliderdata.nowid);
    })
}
