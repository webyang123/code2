var f_time;
var relationName = [
  {name:"*氢氧化锂",friend:[
    {name:"锂离子电池",relationship:"",type:"领域"},
    {name:"锰酸锂",relationship:"",type:"领域"},
  {name:"*碳酸锂",relationship:"",type:"领域"},
    {name:"*王永强",relationship:"",type:"人物"},
    {name:"徐明江",relationship:"",type:"人物"},
  {name:"金鹏",relationship:"",type:"人物"},
  {name:"*格林美公司",relationship:"",type:"机构"},
  {name:"赣锋锂业公司",relationship:"",type:"机构"}]
  
  },
  {name:"*碳酸锂",friend:[
  {name:"*氢氧化锂",relationship:""},
    {name:"徐明江",relationship:""},
    {name:"霍立明",relationship:""},
    {name:"金鹏",relationship:""},
    {name:"格林美公司",relationship:""},
    {name:"赣锋锂业公司",relationship:""},
    {name:"路翔公司",relationship:""},
    {name:"众和公司",relationship:""}]
  },
  {name:"*格林美公司",friend:[
    {name:"徐明江",relationship:""},
    {name:"金鹏",relationship:""},
    {name:"碳酸锂",relationship:""},
    {name:"碳酸铁锂",relationship:""},
  {name:"*氢氧化锂",relationship:""},
    {name:"格林美资源循环",relationship:""}]
  },
  {name:"*王永强",friend:[
  {name:"*氢氧化锂",relationship:""},
    {name:"碳酸锂",relationship:""},
    {name:"碳酸铁锂",relationship:""},
  {name:"锂盐",relationship:""},
    {name:"锂离子电池",relationship:""}]
  }
]
var relation = {
  radius:6,
  boxW:16,
  boxH:20,
  hostW:5,
  hostH:5,
  guestW:4,
  guestH:4,
  relationW:0,
  relationH:0,
  angle:0,
  id:"box",
  init:function(array,n){//传入参数1：数组 参数2：第几个
  this.array = array;
    this.appendHost(this.array,n);
    this.appendQuest(this.array,n);
    this.appendRelationShip(this.array,n);
  },
  appendHost:function(array,n){
    var box = $("#"+this.id);
    var host ="<span class='host'>"+array[n].name+"</span>";
    box.append(host)
    this.postHost();
  },
  postHost:function(){
    var x = (this.boxW - this.hostW)/2+0.5 +"rem";
    var y = (this.boxH - this.hostH)/2 +"rem";
    $(".host").css({
      left:x,
      top:y
    })
  },
  appendQuest:function(array,n){
    var box = $("#"+this.id);
    var guests="";
    var that = this;
    for(var i=0; i<array[n].friend.length; i++){
    //根据节点类型，改变型状
    var radius = "";
    var cl="";
    if (array[n].friend[i].type == "领域"){radius = "";cl = "7BC0EA";}
    if (array[n].friend[i].type == "机构"){radius = "";cl = "red";}
    if (array[n].friend[i].type == "人物"){radius = "";cl="gray";}
    
      guests+="<span class='guest' style='background-color:" + cl + ";border-radius:" + radius + "px;'>"+array[n].friend[i].name+"</span>";
    }
    $(guests).appendTo(box);
    $(document).on("click",".guest",function(){
      that.move(that,this);
        $('.fast').remove();
        clearTimeout(f_time);
        f_time = setTimeout("f_lianxian()", 1500);
    })
    this.postQuest();
  },
  postQuest:function(){
    var guests = $(".guest");
    var that = this;
    guests.each(function(i){
    guests.eq(i).css({
        left:that.setQuestPose(guests.length,that.radius,i,that.guestW,that.guestH,that.angle).left,
    
        top:that.setQuestPose(guests.length,that.radius,i,that.guestW,that.guestH,that.angle).top
      }).attr("angle",i/guests.length);
    })
  },
  setQuestPose:function(n,r,i,w,h,d){//n代表共几个对象 r代表周长 i代表第几个对象 w代表外面对象的宽带 h代表外面对象的高度 d代表其实角度
    var p = i/n*Math.PI*2+Math.PI*2*d;
    var x = r * Math.cos(p);
    var y = r * Math.sin(p);
    return {
      "left":parseInt(this.boxW/2+ x - w/2)+0.5 +"rem",
      "top":parseInt(this.boxH/2 + y - h/2)+"rem",
    }
  },
  appendRelationShip:function(array,n){
    var box = $("#"+this.id);
    var relation="";
    for(var i=0; i<array[n].friend.length; i++){
      relation+="<span class='relationship'>"+array[n].friend[i].relationship+"</span>";
    }
    box.append(relation);
    this.postRelationShip();

  },
  postRelationShip:function(){
    var guests = $(".relationship");
    var that = this;
    guests.each(function(i){
      guests.eq(i).css({
        left:that.setQuestPose(guests.length,that.radius/2,i,that.relationW,that.relationH,that.angle).left,
        top:that.setQuestPose(guests.length,that.radius/2,i,that.relationW,that.relationH,that.angle).top
      })
    })
  },
  move:function(t,i){
    var n = $(".guest").index($(i));
    this.angle = parseFloat($(i).attr("angle"))+0.5;
    this.delect(n);
    this.moveHost(i);
    this.moveQuest(i);
    this.moveRelationship(i);
    this.changeClass();
    setTimeout(function(){t.newAppend(i)},500);
  },
  newAppend:function(i){
    this.newAppendGuest(i,"guest","name",this.guestW,this.guestH,this.radius);
    this.newAppendGuest(i,"relationship","relationship",this.relationW,this.relationH,this.radius/2);
  },
  newAppendGuest:function(i,className,name,w,h,r){
    var host = $(i).html();
    var guest = $(".guest").html();
    var box = $("#"+this.id);
    var that = this;
    var next=0;
    for(var i=0; i<this.array.length; i++){
      if(host == this.array[i].name){
        for(var j=0;j<this.array[i].friend.length; j++){
      
          if(guest !== this.array[i].friend[j].name){
            next++;
      
      
      
      var guests ="<span class='"+className+"'>"+this.array[i].friend[j][name]+"</span>";
      
      //alert(guests);
            $(guests).appendTo(box).css({
              left:that.setQuestPose(this.array[i].friend.length,r,next,w,h,that.angle).left,
              top:that.setQuestPose(this.array[i].friend.length,r,next,w,h,that.angle).top
            }).attr("angle",that.angle+next/this.array[i].friend.length).hide().fadeIn(1000);
      
      $(guests).css("color","green");
          }
        }
      }
    }
  },
  moveHost:function(i){
    var hLeft = parseInt($(".host").css("left")) + this.hostW/2;
    var hTop = parseInt($(".host").css("top")) + this.hostH/2;
    var gLeft = parseInt($(i).css("left")) + this.guestW/2;
    var gTop = parseInt($(i).css("top")) + this.guestH/2;
    var l = gLeft - hLeft;
    var t = gTop - hTop;
    var left = (hLeft - l - this.guestW/2)+0.5 +"rem";
    var top = (hTop - t - this.guestH/2)+"rem";
    this.animate(".host",left,top);
  },
  moveRelationship:function(i){
    var hLeft = parseInt($(".host").css("left")) + this.hostW/2;;
    var hTop = parseInt($(".host").css("top")) + this.hostH/2;
    var gLeft = parseInt($(".relationship").css("left")) + this.relationW/2;
    var gTop = parseInt($(".relationship").css("top")) + this.relationH/2;
    var l = gLeft - hLeft;
    var t = gTop - hTop;
    var left = (hLeft - l - this.relationW/2)+"rem";
    var top = (hTop - t - this.relationH/2)+"rem";
    this.animate(".relationship",left,top);
  },
  moveQuest:function(i){
    var left = $(".host").css("left");
    var top = $(".host").css("top");
    this.animate(i,left,top);
  },
  delect:function(n){
    $(".guest").slice(0,n).remove();
    $(".guest").slice(1).remove();
    $(".relationship").slice(0,n).remove();
    $(".relationship").slice(1).remove();
  },
  animate:function(i,left,top){
    $(i).animate({
      left:left,
      top:top
    },500);
  },
  changeClass:function(){
    var that =this;
    $(".guest").addClass("abcdef").removeClass("guest");
    $(".host").addClass("guest").removeClass("host").attr("angle",that.angle);
    $(".abcdef").addClass("host").removeClass("abcdef").attr("angle",null);
  }
}
$(document).ready(function(){
  relation.init(relationName,0);
  f_lianxian();
})