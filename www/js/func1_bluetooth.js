function funcBluetooth(){
    document.addEventListener('deviceready', function() {
      ble.scan([], 5, function(device) {
          alert(JSON.stringify(device));
      }, function(){
          alert("Scan failed...");	//エラー時の処理
      });
    }, false);
}

//list.length()に格納する
//その数を表示する
//3で割る
//密度がxxなら、xxと測定する
