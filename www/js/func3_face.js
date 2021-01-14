
function ohayou3() {
  alert("Hello3!");

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


var age = 0;                // 年齢'
var gender = 0;             // 性別 （male/female)
var emoSmile = 0;           // 笑顔'
var emoAnger = 0;           // 怒り'
var emoContempt = 0;        // 不面目
var emoDisgust = 0;         // 嫌気
var emoFear = 0;            // 恐怖
var emoHappiness = 0;       // 幸福
var emoNeutral = 0;         // 無感動
var emoSadness = 0;         // 悲しみ
var emoSuprise = 0;         // 感嘆
var makeEye = 0;            // 化粧-目 (true/false)
var makeLip = 0;            // 化粧-唇 (true/false)
var hairBald = 0;           // 髪の量
var hairInvisible = 0;      // スキンヘッド (true/false)
var glasses = 0;            // メガネ (NoGlasses/ReadingGlasses/Sunglasses/SwimmingGoggles)


function azureFunc(file){
var area = "westus"; 
var subscriptionKey = "0a50c6d56ddb41c98f952861abe8c050" 
var uriBase = "https://" + area + ".api.cognitive.microsoft.com/face/v1.0/detect";
     
var params = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "false",
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
       // 年齢
       age = data["0"].faceAttributes.age;  
       // 性別 （male/female)
       gender = data["0"].faceAttributes.gender; 
       // 数理のデータは100倍して0～100の数値にします。（使いやすいから）
       // 笑顔
       emoSmile = Math.floor(data["0"].faceAttributes.smile * 100);
       // 怒り
       emoAnger = Math.floor(data["0"].faceAttributes.emotion.anger * 100); 
       // 不面目
       emoContempt = Math.floor(data["0"].faceAttributes.emotion.contempt * 100); 
       // 嫌気
       emoDisgust = Math.floor(data["0"].faceAttributes.emotion.disgust * 100);                    
       // 恐怖
       emoFear = Math.floor(data["0"].faceAttributes.emotion.fear * 100);
       // 幸福
       emoHappiness = Math.floor(data["0"].faceAttributes.emotion.happiness * 100); 
       // 無感動
       emoNeutral = Math.floor(data["0"].faceAttributes.emotion.neutral * 100);
       // 悲しみ
       emoSadness = Math.floor(data["0"].faceAttributes.emotion.sadness * 100);      
       // 感嘆
       emoSuprise = Math.floor(data["0"].faceAttributes.emotion.surprise * 100);           
       // 化粧-目 (true/false)
       makeEye = data["0"].faceAttributes.makeup.eyeMakeup; 
       // 化粧-唇 (true/false)
       makeLip = data["0"].faceAttributes.makeup.lipMakeup;     
       // 髪の量
       hairBald = data["0"].faceAttributes.hair.bald; 
       // スキンヘッド (true/false)
       hairInvisible = data["0"].faceAttributes.hair.invisible;
       // メガネ (NoGlasses/ReadingGlasses/Sunglasses/SwimmingGoggles)
       glasses = data["0"].faceAttributes.glasses; 
    }
    // FaceAPIから取得した情報を使います
    alert("あなたは" + age + "歳です");
    if( emoSmile > 50 )
    {
        alert("とても笑顔です");
    }
    else if( emoSmile > 0 ) {
        alert("笑顔です");
    }
    else {
        alert("笑顔じゃありません");
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