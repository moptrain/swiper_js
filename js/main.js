sliderdata={
    eachtime:1000,
    changetime:150,
    nowid:0,
    picData:[["./img/1.jpg",'http://www.jd.com'],["./img/2.jpg",'http://www.qq.com'],["./img/3.jpg","http://www.163.com"],["./img/4.jpg",'http://www.baidu.com'],],
}
function change(newid) {
    //这个newid不是offset，是第几个图片
    newid=newid-1;
    $('.recommandphoto').fadeOut(sliderdata.changetime);
    setTimeout(function () {
        console.log(newid);
        $('.recommandlink').attr({href:sliderdata.picData[newid][1]});
        $('.recommandphoto').attr({src:sliderdata.picData[newid][0]});
    },sliderdata.changetime);
    //否则，会在fadeout执行后立刻改变img的src，接着改变后的scr在一段时间内fadeOut.
    $('.recommandphoto').fadeIn(sliderdata.changetime);
}
var timeid;
function startswipe() {
    timerid=setInterval(function () {
        change (sliderdata.nowid+1);
        sliderdata.nowid=(sliderdata.nowid+1)%sliderdata["picData"].length;
    } ,sliderdata.eachtime);
}
startswipe();

$('.controller').click(function () {
    clearInterval(timerid);
})
$('.controller2').click(function () {
    timerid=setInterval(function () {
        change (sliderdata.nowid+1);
        sliderdata.nowid=(sliderdata.nowid+1)%sliderdata["picData"].length;
    } ,sliderdata.eachtime);
})
function mousemovehandler(){
    $('.slider').mousemove(function (event) {
        console.log(event);
        clearInterval(timerid);
        $('.slider').off('mousemove');
        //一次就行，以免以后鼠标在里面动的时候影响性能
    })
}
mousemovehandler();

$('.slider').mouseout(function (event) {
    console.log(event);
    startswipe();
    mousemovehandler();
    //出来之后在给他绑上事件
})
