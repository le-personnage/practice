//画像モノクロ化プログラム
//週刊アスキー参照

var canvas, context;
var img = new Image();

function initCanvas() {
  canvas = document.getElementById("monochrome");
  context = canvas.getContext("2d");

  document.getElementById("reset").disabled = true;
  document.getElementById("set1").disabled = true;
  document.getElementById("set2").disabled = true;
  document.getElementById("red").disabled = true;
  document.getElementById("green").disabled = true;
  document.getElementById("blue").disabled = true;
}

function loadPicture(e) {
  var fileurl = URL.createObjectURL(e.files[0]);
  img.src = fileurl;

  img.onload = function() {

    document.getElementById("reset").disabled = false;
    document.getElementById("set1").disabled = false;
    document.getElementById("set2").disabled = false;
    document.getElementById("red").disabled = false;
    document.getElementById("green").disabled = false;
    document.getElementById("blue").disabled = false;

    canvas.width = img.width;
    canvas.height = img.height;

    draw();
  }
}

function draw() {
  context.drawImage(img, 0, 0);

  var imageData = context.getImageData(0, 0, img.width, img.height);

  var monoTypeList = document.getElementsByName("monoType");
  var monoType = 0;
  for (var i = 0; i < monoTypeList.length; i++) {
    monoType = monoTypeList[i].value;
    break;
  }
}

var red = document.getElementById("red").value;
var green = document.getElementById("green").value;
var blue = document.getElementById("blue").value;

for (var i = 0; i < imageData.data.length; i+=4) {
  var r = imageData.data[i];
  var g = imageData.data[i+1];
  var b = imageData.data[i+2];
  var a = imageData.data[i+3];

  if (monoType>0) {
    var monoData;
    if (monoType == 1) {
      monoData = (r + g + b) / 3;
    } else if (monoType == 2) {
      monoData = 0.299 * r + 0.587 * g + 0.114 * b;
    }
    imageData.data[i] = monoData * (red/255);
    imageData.data[i] = monoData * (green/255);
    imageData.data[i] = monoData * (blue/255);
    imageData.data[i] = a;
  }
}

context.putImageData(imageData, 0, 0);
