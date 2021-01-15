function funcBluetooth1(){
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

function funcBluetooth(){
  alert('密ではありません。飛沫が飛ばないように注意してマスクを外しても大丈夫です')
}
function funcBluetooth2(){
  alert('密です！マスク着用を続けましょう')
}