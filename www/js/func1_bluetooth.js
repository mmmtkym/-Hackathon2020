function funcBluetooth()
    document.addEventListener('deviceready', function() {
      ble.scan([], 5, function(device) {
          alert(JSON.stringify(device));
      }, function(){
          alert("Scan failed...");	//エラー時の処理
      });
    }, false);
