var count = 0;

function getCurrentPosition() {
  count++;
  if (count > 4) {
    clearInterval(window.timer);
    alert("計測終了！")
  }else {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    // 現在地取得に成功した場合の処理
    function onSuccess(position) {
      //var countup = function(){
      alert("計測開始");
      //do{
      // 緯度
      var latitude = position.coords.latitude;
      // 経度
      var longitude = position.coords.longitude;
      document.writeln(" 緯度:" + latitude);
      document.writeln(" 経度:" + longitude);
      var array3 = new Array(2);
      array3[0] = latitude;
      array3[1] = longitude;
    }
    // 現在地取得に失敗した場合の処理
    function onError(error) {
      alert(error.message)
    }
  }
}

function funcMistu1() {
  alert("Hello2!");
  var flag = 1;
  if (flag === 1) {
    document.addEventListener("deviceready", function () {
      window.timer = setInterval(getCurrentPosition, 3000);
    })
  }
}

function funcMistu2() {
  var flag = 1;
  if (flag === 1) {
    document.addEventListener("deviceready", function () {
      //配列を用意する
      var array1 = new Array(4);
        array1[0] = 35.6602757
        array1[1] = 35.6602757
        array1[2] = 35.6602757
        array1[3] = 35.6602757
      var array2 = new Array(4);
        array2[0] = 139.7908105
        array2[1] = 139.7908105
        array2[2] = 139.7908105
        array2[3] = 139.7908105
      var i = 0;
      var j = 0;
      if( array1[0] == array1[1]
        && array1[1] == array1[2]
        && array1[2] == array1[3]
        && array2[0] == array2[1]
        && array2[1] == array2[2]
        && array2[2] == array2[3]){
          alert("換気をしてください！！！");
       }
    })
  }
}