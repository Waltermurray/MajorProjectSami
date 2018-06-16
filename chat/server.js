let express = require('express'); //This is library from app which create a private server.

let app = express();

let server = app.listen(3000, listen); // This creates the private server to run this file..

let messages = [];
let usernames = [];
let lSockets = [];


// This function gives detail about server ip address and port address.
function listen() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

let io = require('socket.io')(server);

io.sockets.on('connection',
  function (socket) {
    // This gives every ip address that have connected to the server a id so i know who have connect and how many ip address have connected
    //to this server.
    console.log("We have a new client: " + socket.id);

    // This recevies all the message that host or client have send to another client.
    socket.on('tryLogin', function(data) {
      let chatmessages = true;

      if(chatmessages) {
        let data = {
          result: true,
        };
        io.to(socket.id).emit("loginRespond", data);
        usernames.push(data);
        lSockets.push(socket);
      }
      else {
        let data = {
          result: false
        };
        io.to(socket.id).emit("loginRespond", false);
      }
    });

    socket.on('newMessage', function(data) {
      if(messages.length >= 30) {
        messages.splice(0, 1);
      }

      let chatmessages = true;

      if(chatmessages) {
        let respond = {
          message: data,
          success: true
        };
        io.sockets.emit('messageRespond', respond);
        messages.push(data);
      }

      else {
        let respond = {
          success: false
        };
        io.to(socket.id).emit('messageRespond', respond);
      }
    });

    // This help me to know who have disconnected to the server.
    socket.on('disconnect', function() {
      let index = lSockets.indexOf(socket);
      usernames.splice(index, 1);
      lSockets.splice(index, 1);
      console.log("Client has disconnected" + " "+socket.id);
    });
  }
);
