sliderdata={
    eachtime:1000,
    changetime:150,
    nowid:1,
    picData:[["./img/1.jpg",'http://www.jd.com'],["./img/2.jpg",'http://www.qq.com'],["./img/3.jpg","http://www.163.com"],["./img/4.jpg",'http://www.baidu.com'],],
}
$('.btn').toggle();//一开始btn是隐藏的

function change(newid) {
    //这个newid不是offset，是第几个图片
    console.log("new id "+newid);
    newid=newid-1;
    $('.recommandphoto').fadeOut(sliderdata.changetime);
    setTimeout(function () {
        $('.recommandlink').attr({href:sliderdata.picData[newid][1]});
        $('.recommandphoto').attr({src:sliderdata.picData[newid][0]});
    },sliderdata.changetime);
    //否则，会在fadeout执行后立刻改变img的src，接着改变后的scr在一段时间内fadeOut.
    $('.recommandphoto').fadeIn(sliderdata.changetime);
}
var timeid;
function startswipe() {

    timerid=setInterval(function () {
        console.log('没改之前是'+sliderdata.nowid);
        var tmp=(sliderdata.nowid+1)%(sliderdata["picData"].length+1);
        sliderdata.nowid=(!tmp?1:tmp);
        change (sliderdata.nowid);

    } ,sliderdata.eachtime);
}
startswipe();

function mousemovehandler(){
    $('.slider').mousemove(function (event) {
        console.log(event);
        clearInterval(timerid);
        $('.slider').off('mousemove');
        //一次就行，以免以后鼠标在里面动的时候影响性能
        $('.btn').toggle();
        //改变btn的状态
    })
}
mousemovehandler();
$('.slider').mouseout(function (event) {
    console.log(event);
    startswipe();
    mousemovehandler();
    //出来之后在给他绑上事件
    $('.btn').toggle();
    //离开的时候也要改变btn的状态
})
$('.btn:first').click(
    function () {
        var tmp=(sliderdata.nowid-1);
        sliderdata.nowid=(!tmp?sliderdata["picData"].length:tmp);
        change (sliderdata.nowid);
    }
)
$('.btn-left').click(
    function () {//实际上和计时里的操作一样
        var tmp=(sliderdata.nowid+1)%(sliderdata["picData"].length+1);
        sliderdata.nowid=(!tmp?1:tmp);
        change (sliderdata.nowid);
    }
)
