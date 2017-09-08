$(function() {
  //function f_lianxian(){
    // $('.host').connections({to: '.guest', 'class': 'fast'});
    // var d=$('connection');
    // d.repeat().each($).wait(0).connections('update');
  //}
    //维度导航切换
    $("#kjwl_nav li").click(function () {
      for (var i = 0; i < $("#kjwl_nav li").length; i++) {
        $("#kjwl_nav li").eq(i).removeClass("active");
        $(".kjwl_main .kjwl_detail").eq(i).hide();
      }
      $(this).addClass("active");
      $(".kjwl_main .kjwl_detail").eq($(this).index()).show();
      $(".org_list").show();
      $(".org_detail_section").hide();
      $(".expert_list").show();
      $(".expert_detail").hide();
    })

    //机构类型左右滑动切换
    var startX = endX = 0;
    var index = 1;
    var orgLen = $("#kjwl_detail_org ol").length;
    var obj = document.getElementById('kjwl_detail_org');
    obj.addEventListener('touchstart',function(event){
        var touch = event.targetTouches[0];
        startX = touch.pageX;
    },false);
    obj.addEventListener('touchmove', function(event) {
        var touch = event.targetTouches[0];
        endX = touch.pageX;  
    }, false);
    obj.addEventListener('touchend',function(event){
        if (startX - endX > 50 && index < orgLen && endX !=0) {
          index++;
        } else if(endX -startX > 50 && index > 1) {
          index--;
        } else {
          return
        }
        for (var i = 0; i < orgLen; i++) {
          $("#kjwl_detail_org ol").eq(i).hide("normal");
        }
        $("#kjwl_detail_org ol").eq(index-1).show("normal");
        startX = 0;endX = 0;
    },false);

    //点击导航时，机构和专家回到列表页
    $("#kjwl_detail_org ol li a").click(function() {
      $(".org_list").hide();
      $(".org_detail_section").show();
    })
    $("#kjwl_detail_expert .expert_list li a").click(function() {
      $(".expert_list").hide();
      $(".expert_detail").show();
    })
})

  