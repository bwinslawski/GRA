var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);
 path = require('path');
 var less = require('less-middleware');
server.listen(8080);

app.use(express.static(path.join(__dirname, 'Public')));

// routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/Public/index.html');
  
  console.log("Siemka");
});

	app.get(/name\/(.*)/, function (req, res) {
  res.sendfile(__dirname + '/Public/test.html');
   var move = req.params[0].split('/');
   
 //socket.emit('showuser',move);
 //socket.emit('showus',name);
});
var kolej = [];
var usernames = {};
var plansza1 = Array();
 var plansza = Array();
  var pozycja = 0;
  var max = 10;
   var teren = 0;
var rooms = ['Siemka'];

io.sockets.on('connection', function (socket) {
	
	/*	socket.on('newgamee', function (data) {
		io.sockets.in(socket.room).emit('newgames', socket.username, data);
	});*/

	socket.on('newgamee', function(name){
	for (var j=0;j<max;j++)
			 {
			 for (var i=0;i<max;i++)
			 {
			 if(0 == 0 )
				 {
				 teren = Math.floor((Math.random()*3)+1); 
				 }
				else
				{teren = 0;}
			 plansza1.push(teren);
			 }
			 plansza[j] = plansza1;
			 plansza1 = [];
			 }
			 
			 //plansza[5][5]=socket.username;
			 
	
    socket.emit('newgames', socket.username,plansza,kolej);
	  socket.broadcast.emit('newgames', socket.username,plansza,kolej);
	});
	
	
	socket.on('showuser', function(name){
	socket.emit('showus',name);
	});
	
	socket.on('dolacz', function(username){
	var warunek = 1;
	
	while(warunek)
	{
		var dwa = Math.floor((Math.random()*max)); 
		var jeden = Math.floor((Math.random()*max));
		// socket.emit('dodaj', jeden,dwa);
		if(plansza[jeden][dwa] == 1 || plansza[jeden][dwa] == 2)
		{
			warunek = 0;
			plansza[jeden][dwa]=socket.username;
		 }
	 }
	 kolej.push(socket.username);
	  socket.emit('newgames', socket.username,plansza,kolej);
	  socket.broadcast.emit('newgames', socket.username,plansza,kolej);
	});
	
	
	socket.on('adduser', function(username){
		
		socket.username = username;
		socket.room = 'Siemka';
		usernames[username] = username;
		
		socket.join('Siemka');
		socket.emit('updatechat', 'SERVER', 'połączyłeś się  z  Siemka');
		socket.broadcast.to('Siemka').emit('updatechat', 'SERVER', username + ' dołączył do pokoju Siemka');
		socket.emit('updaterooms', rooms, 'Siemka');
	});
	
	
	socket.on('changename', function(change){
	socket.username = change;
	
	});
	socket.on('sendchat', function (data) {
		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
	});

	
	socket.on('switchRoom', function(newroom){
		socket.leave(socket.room);
		socket.join(newroom);
		socket.emit('updatechat', 'SERVER', 'jesteś połączeny z  '+ newroom);
		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' wyszedł z pokoju');
		socket.room = newroom;
		socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' dołączył się do pokoju');
		socket.emit('updaterooms', rooms, newroom);
	});
	
	
		socket.on('createrommm', function(newroomm){
		var jest = 1;
		 for (var i=0;i<rooms.length;i++)
			{
			if(rooms[i] == newroomm)
				{
					jest = 0;
					
				}
			}
		if(jest){
		rooms.push(newroomm);
		}
		socket.leave(socket.room);
		socket.join(newroomm);
		socket.emit('updatechat', 'SERVER', 'masz połączenie z  '+ newroomm);
		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' wyszedł z pokoju');
		socket.room = newroomm;
		socket.broadcast.to(newroomm).emit('updatechat', 'SERVER', socket.username+'  dołączył się do pokoju');
		socket.broadcast.emit('updaterooms', rooms, newroomm);
		socket.emit('updaterooms', rooms, newroomm);
		
		
	});
	
	
		socket.on('disconnect', function(){
		delete usernames[socket.username];
		io.sockets.emit('updateusers', usernames);
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
	});
});
