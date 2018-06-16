// Muhammad Sami Khan
// 13 June 2018


// sources have been used:
//Socket.io
//youtube : The Coding Train for a help

let elements = []; // define
let socket;
let localMessages = [];
let namer;
let fillColor = 0;
let backgroundImg;
let backgroundImgTwo;
let backColor;

// set's of background which i have used for theme.
function preload() {
  backgroundImg = loadImage('images/background.jpg');
  backgroundImgTwo = loadImage('images/background2.jpg');
}


// this creates a input and creates a button so i can type something and send it.
function setup() {
    createCanvas(windowWidth, windowHeight);
    backColor = backgroundImg;

    elements[0] = createInput();
    elements[0].size(width-500, 30);
    elements[0].position(width/2-width/2+250, height-85);
    elements[1] = createButton("Log in");
    elements[1].size(250, 30);
    elements[1].position(width/2-125, height-50);
    elements[1].mousePressed(tryLogin);
    elements[2] = createButton("Send");
    elements[2].size(250, 30);
    elements[2].position(-200, -200);
    elements[2].mousePressed(sendMessage);

    // This gives the info to the server, if i remove this the server won't work at all.
    socket = io.connect("http://localhost:3000");
    socket.on('messageRespond', onMessage);
}

function draw() {
  // This is were i change my theme if i want to have dark mode or light mode.
  if (key === "|") {
    if (backColor === backgroundImg) {
      backColor = backgroundImgTwo;
      fillColor = 255;
    }
    else{
      backColor = backgroundImg;
      fillColor = 0;
    }
  }
  background(backColor);
  textSize(30);
  fill(255);
  let y = height-120;
  // this is used for typing message on input so if i want to send something this is what it will use to display on your screen and other peoples screen.
  for(let i = 0; i < localMessages.length; i++) {
    fill(fillColor);
    text(localMessages[i], 20, y);
    y -= 30;
  }
}


 // This is were i login in your username so I know who is send message.
function tryLogin() {
  if(elements[0].value() != "") {
    socket.emit("tryLogin", elements[0].value());

    socket.once("loginRespond", function(data) {
      if(data.result === true) {
        elements[0].value("Successfully logged in!");
        elements[1].position(-200, -200);
        setTimeout(function() {
          elements[0].value("");
          let id =socket.id;
          username = id[12]+id[11]+id[10];
          elements[2].position(width/2-125, height-50);
        }, 2000);
      }
      else {
        // bug!! // important.
        elements[0].value("This username is either invalid or already logged!");
        elements[1].position(-200, -200);
        setTimeout(function() {
          elements[0].value("");
          elements[1].position(width/2-125, height-50);
        }, 2000);
      }
    });
  }
  else {
    elements[0].value("Please enter your username first!");
    elements[1].position(-200, -200);
    setTimeout(function() {
      elements[0].value("");
      elements[1].position(width/2-125, height-50);
    }, 2000);
  }
}


// this function shows the message that I or the people have send too.
function sendMessage() {
  if(elements[0].value() != "") {
    let message = username + ": " + elements[0].value();
    socket.emit("newMessage", message);
    elements[0].value("");
  }
  else {
    // This is a message that will display if you didn't type anything and decided to send blank message it wont send.
    elements[0].value("Please type in something first!");
    elements[2].position(-200, -200);
    setTimeout(function() {
      elements[0].value("");
      elements[2].position(width/2-125, height-50);
    }, 2000);
  }
}


// this is a bug!! working on too!!
function onMessage(data) {
  if(data.success = true) {
    if(localMessages.length >= 30) {
      localMessages.splice(localMessages.length -1, 1);
    }

    localMessages.unshift(data.message);
  }
}
