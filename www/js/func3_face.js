
function funcFace() {


// カメラ準備
    var options = {
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: 0     // 0=JPG 1=PNG
    };   

    // カメラ起動
    navigator.camera.getPicture(onSuccess, onFail, options);

    // 成功時処理
    function onSuccess (imageData) {
        // Blobを作成
        var byteCharacters = toBlob(imageData);

        // Azureに画像データを送る関数
        azureFunc(byteCharacters);
    }

    // エラー時処理
    function onFail (message) {
        console.log (message);
    }

    // Blob作成関数
    function toBlob(base64) {
        var blob;
        var bin = atob(base64.replace(/^.*,/, ''));
        var buffer = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) {
            buffer[i] = bin.charCodeAt(i);
        }
        // Blobを作成
        try{
            blob = new Blob([buffer.buffer], {
                type: 'image/png'
            });
        }catch (e){
            return false;
        }
        return blob;
    }


var emo=[8];
var max;
var emotion=0;
var x=[2];
var y=[2];
var mask
function azureFunc(file){
var area = "westus"; 
var subscriptionKey = "0a50c6d56ddb41c98f952861abe8c050" 
var uriBase = "https://" + area + ".api.cognitive.microsoft.com/face/v1.0/detect";
     
var params = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "true",
    "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
};

// Perform the REST API call.
$.ajax({
    url: uriBase + "?" + $.param(params),

    // Request headers.
    beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/octet-stream");
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },

    type: "POST",

    // Request body.
    data: file,
    processData: false,
   // cache : false
})




// 成功時！
.done(function(data) {
    // 写真に人が写っていれば、その人数がlengthに入ります
    if( data.length > 0 ){
       // 複数人の場合data["1"]、["2"]となっていきます
       // 数理のデータは100倍して0～100の数値にします。（使いやすいから）
       // 怒り
       emo[0] = Math.floor(data["0"].faceAttributes.emotion.anger * 100); 
       // 不面目
       emo[1] = Math.floor(data["0"].faceAttributes.emotion.contempt * 100); 
       // 嫌気
       emo[2] = Math.floor(data["0"].faceAttributes.emotion.disgust * 100);                    
       // 恐怖
       emo[3] = Math.floor(data["0"].faceAttributes.emotion.fear * 100);
       // 幸福
       emo[4] = Math.floor(data["0"].faceAttributes.emotion.happiness * 100); 
       // 無感動
       emo[5] = Math.floor(data["0"].faceAttributes.emotion.neutral * 100);
       // 悲しみ
       emo[6] = Math.floor(data["0"].faceAttributes.emotion.sadness * 100);      
       // 感嘆
       emo[7] = Math.floor(data["0"].faceAttributes.emotion.surprise * 100); 
       emo[8]=data["0"].faceAttributes.occlusion.mouthOccluded;

       mask = data["0"].faceAttributes.accessories.type.mask.confidence;
       y[0]= Math.floor(data["0"].faceLandmarks.noseLeftAlarOutTip.y);
      //x[1]= Math.floor(data["0"].faceLandmarks.underLipBottom.x);
     // y[1]= Math.floor(data["0"].faceLandmarks.underLipBottom.y);


    
    }
     alert(mask);
    max=emo[0];
    // FaceAPIから取得した情報を使います
  
   if(y[0]>0 && emo[8]==false){
         for(var i=1;i<7;i++){
if(max<emo[i]){
  max=emo[i];
  emotion=i;
}
}
if(emotion==0){
  alert("怒り");
}
 if(emotion==1){
  alert("不面目");
}
if(emotion==2){
  alert("嫌気");
}
if(emotion==3){
  alert("恐怖");
}
if(emotion==4){
  alert("幸福");
}
if(emotion==5){
  alert("無感動");
}
if(emotion==6){
  alert("悲しみ");
}
if(emotion==7){
  alert("感嘆");
}
 alert("マスクちゃんとつけて！！！！！");

    }

    else if(emo[8]==true){
     alert("鼻まで装着してください");
    } else{
  alert("マスクは正しく装着されています");
    }
})


//失敗時！
.fail(function(jqXHR, textStatus, errorThrown) {
    // Display error message.
    var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
    errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
        jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
    alert(errorString);
    console.log(errorString);
});
}
}

