sliderdata={
    eachtime:3000,
    changetime:1000,
    modmod:0,
    picData:[["./img/2.jpg",'http://www.jd.com'],["./img/3.jpg",'http://www.qq.com'],["./img/1.jpg",'http://www.baidu.com']],
}
// person={firstname:"John",lastname:"Doe",age:50,eyecolor:"blue"};
$('.controller').bind('click',function () {
    $('.recommandlink').attr({href:sliderdata.picData[sliderdata.modmod][1]});
    $('.recommandphoto').attr({src:sliderdata.picData[sliderdata.modmod][0]});
    sliderdata.modmod=(sliderdata.modmod+1)%3;
    console.log(sliderdata.modmod);
    console.log(sliderdata.picData[sliderdata.modmod][0]);
})
console.log(sliderdata.picData[1][0])