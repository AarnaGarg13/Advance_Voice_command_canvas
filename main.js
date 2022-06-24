x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
apple = "";
draw_apple = "";
speak_data = "";
to_number = 0;
background_color = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload()
{
  apple = loadImage("apple.png")
}


 
recognition.onresult = function(event) 
{

  console.log(event); 
  content = event.results[0][0].transcript;
  to_number = Number(content);
  console.log(content + " apples drawn")

  if(Number.isInteger(to_number))
  {
    document.getElementById("status").innerHTML = "Started drawing the apple";
    draw_apple = "set";
  }
  else
  {
    document.getElementById("status").innerHTML = "The speech has not been recognized as a number";
  }

  document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 

function setup() {
  canvas = createCanvas(900 , 600)
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
}

function draw() {
  if(draw_apple == "set")
  {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    speak_data = to_number + " Apples drawn"
    speak(speak_data)
    draw_apple = "";
    for(var i = 1; i <= to_number; i++)
    {
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 400);
      image(apple , x , y , 50 , 50)
    }
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}