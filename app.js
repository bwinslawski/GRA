﻿var express = require('express')
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
var pomoc = 0;
var kolej = [];
var usernames = {};
var plansza1 = Array();
var plansza2 = Array();
var plansza3 = Array();
var plansza = Array();
var nazwy = Array();
var fragi = Array();
var pomocc = Array();
var pozycja = 0;
var max = 20;
var teren = "LOL";
var rooms = ['GRA','NIEGRA'];
var krok = 0;
var strzal = 0;
var CZASS = 20;
io.sockets.on('connection', function (socket) {
	
	/*	socket.on('newgamee', function (data) {
		io.sockets.in(socket.room).emit('newgames', socket.username, data);
	});*/

	socket.on('newgamee', function(name){
	kolej = [];
	for (var j=0;j<max;j++)
			 {
			 for (var i=0;i<max;i++)
			 {
			 if(0 == 0 )
				 {
				 teren = Math.floor((Math.random()*3)+1); 
				 }
				else
				{teren = "0";}
			 plansza1.push(teren);
			 }
			 plansza[j] = plansza1;
			 plansza1 = [];
			 }
			 fragi = [];
			socket.emit('newgames', pomoc,plansza,kolej);
			socket.broadcast.emit('newgames', pomoc,plansza,kolej);
	});
		
	socket.on('CZAS', function(name){
    if(socket.username == kolej[0]){
			socket.emit('czas', kolej,CZASS);
			socket.broadcast.emit('czas', kolej,CZASS);
			}
		//	setTimeout(function(){socket.emit('czas', kolej,czas)},1000);
		
	});
	
	socket.on('Zmiana', function(name){
    var lolek = kolej.length - 1;
		if(lolek){
	socket.emit('czas', kolej, CZASS);
	//socket.broadcast.emit('czas', kolej, CZASS );
	}
	});
	
	socket.on('dolacz', function(username){
	var warunek = 1;
	while(warunek)
	{
		var min = max -5;
		var dwa = Math.floor((Math.random()*max)); 
		var jeden = Math.floor((Math.random()*max));
		if(dwa < 5){dwa = dwa + 5;}
		if(jeden < 5){jeden = jeden + 5;}
		if(dwa > min){dwa = dwa - 5;}
		if(jeden > min){jeden = jeden - 5;}
		// socket.emit('dodaj', jeden,dwa);
		if(plansza[jeden][dwa] == 1 || plansza[jeden][dwa] == 2)
		{
			warunek = 0;
			plansza[jeden][dwa]=socket.username;
		 }
	 }
	 kolej.push(socket.username);
	 fragi.push(0);
	 for (var i=0;i<max;i++)
				{
					 for (var j=0;j<max;j++)
					 {
					 if(plansza[i][j]==socket.username){ jeden = i; dwa = j; }
					 if(plansza[i][j]==kolej[0]){ var pier = i; var dru = j; }
					 }
					 
				}
	 	
	
	socket.emit('fragi',fragi, kolej);
	socket.broadcast.emit('fragi', fragi, kolej);
	if(kolej[0] == socket.username) {
	socket.emit('czas', kolej, CZASS);
	socket.broadcast.emit('czas', kolej, CZASS);
	
	socket.emit('widokgracz', pomocc,plansza,kolej,jeden,dwa);
	socket.broadcast.emit('widokgracz', pomocc,plansza,kolej,pier,dru);
	}
	else{ 
	socket.emit('widokgracz', pomocc,plansza,kolej,jeden,dwa);
	socket.broadcast.emit('widokgracz', pomocc,plansza,kolej,pier,dru);
	}

	
	});
	
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
	
	socket.on('NaPole', function(newpole){
	// Sprawdza czy osoba która kliknela jest piersza w kolejce
	console.log("Siemka");
	if(socket.username==kolej[0]){
	socket.emit('anime', newpole);
	socket.broadcast.emit('anime', newpole);
	sleep(1000);
	krok++;
	
	if(newpole=="TURA"){
	console.log("Siemka");
	 krok = 0;
	var pomocna = kolej[0];
	var pomocnaa = fragi[0]
	kolej.shift();
	kolej.push(pomocna);
	fragi.shift();
	fragi.push(pomocnaa);
	for (var i=0;i<max;i++)
				{
					 for (var j=0;j<max;j++)
					 {
					 if(plansza[i][j]==kolej[0]){ pier = i; drug = j; }
					 }
				}
	//socket.emit('czas', kolej,CZASS);
	//socket.broadcast.emit('czas', kolej,CZASS);
	 }
	else{
	
	if(krok<6){
	pomocc = [];
	 
		var myArray = newpole.split('_');
		var pier = parseInt( myArray[0]);
		var drug = parseInt( myArray[1]);
		
		for (var i=0;i<max;i++){for (var j=0;j<max;j++){if(plansza[i][j]==socket.username){  je = i; dw = j; }}}	
		if(drug<dw){ pomocc.push("lewa");    }
		else if(drug>dw){ pomocc.push("prawa");    }
		else if(je<pier){ pomocc.push("dol");    }
		else if(je>pier){ pomocc.push("gora");    }
		
		
		
		var cztery = parseInt( myArray[2]);
		console.log(cztery);
			//jezeli strzelamy do gracza wchodzi w if
		if(cztery==4){
				fragi[0] = fragi[0] + 1;	
				socket.emit('fragi',fragi,kolej);
				socket.broadcast.emit('fragi', fragi,kolej);
				var GRACZ = plansza[pier][drug];
				plansza[pier][drug] = 1;
				var warunek = 1;
				while(warunek)
				{
					var min = max -5;
					var dwa = Math.floor((Math.random()*max)); 
					var jeden = Math.floor((Math.random()*max));
					if(dwa < 5){dwa = dwa + 5;}
					if(jeden < 5){jeden = jeden + 5;}
					if(dwa > min){dwa = dwa - 5;}
					if(jeden > min){jeden = jeden - 5;}
					// socket.emit('dodaj', jeden,dwa);
					if(plansza[jeden][dwa] == 1 || plansza[jeden][dwa] == 2)
					{
						warunek = 0;
						plansza[jeden][dwa]=GRACZ;
					 }
				 }
				 for (var i=0;i<max;i++){for (var j=0;j<max;j++){if(plansza[i][j]==socket.username){  pier = i;drug = j; }}}	
		}else{
	for (var i=0;i<max;i++)
		{
			 for (var j=0;j<max;j++)
			 {
			 if(plansza[i][j]==socket.username){ plansza[i][j]=1; }
			 }
		}
    
	plansza[pier][drug]=socket.username;
	var trzy = max - drug;
	var min = max -5;
	 if(pier < 5 || trzy < 5 || trzy > min || pier > min)
	 { 
		pomoc = pomoc +1;
		max = max + 2; 
		var ma = max -2 ;
		
		for (var j=0;j<max;j++)
				 {
				 for (var i=0;i<max;i++)
				 {
					if(j < 1){
						teren = Math.floor((Math.random()*3)+1); 
						 plansza3.push(teren);
					 }
					 else if (i < 1){
						 teren = Math.floor((Math.random()*3)+1); 
						 plansza3.push(teren);
					 }
					 else if (i > ma){
						 teren = Math.floor((Math.random()*3)+1); 
						 plansza3.push(teren);
					 }
					 else if ( j > ma){
						 teren = Math.floor((Math.random()*3)+1); 
						 plansza3.push(teren);
					 }
					 else {
					teren = plansza[j-1][i-1];
						 plansza3.push(teren);
					 }
				 }
				 
				 plansza2[j] = plansza3;
				 plansza3 = [];
				 }
		
		 for (var j=0;j<max;j++)
				 {
				 for (var i=0;i<max;i++)
				 {
				 teren = plansza2[j][i];
				  plansza1.push(teren);
				}
				 plansza[j] = plansza1;
				 plansza1 = [];
				}
		 pier = parseInt( myArray[0]);
		 drug = parseInt( myArray[1]);
		 pier = pier +1;
		 drug = drug + 1;
	
	 }
	 }
	}
	// jezeli 
	 else
	 {
	 krok = 0;
	var pomocna = kolej[0];
	var pomocnaa = fragi[0]
	kolej.shift();
	kolej.push(pomocna);
	fragi.shift();
	fragi.push(pomocnaa);
	for (var i=0;i<max;i++)
				{
					 for (var j=0;j<max;j++)
					 {
					 if(plansza[i][j]==kolej[0]){ pier = i; drug = j; }
					 }
				}
    socket.emit('fragi',fragi, kolej);
	socket.broadcast.emit('fragi', fragi, kolej);
	 }
	 }
	 
	// pomoc.push(krok);
	// pomoc.push(socket.username);
	 console.log(pier+' '+drug);
	 
	socket.emit('fragi',fragi, kolej);
	socket.broadcast.emit('fragi', fragi, kolej);
	socket.emit('widokgracz', pomocc,plansza,kolej,pier,drug);
	socket.broadcast.emit('widokgracz', pomocc,plansza,kolej,pier ,drug);

	}
	});
	
	socket.on('adduser', function(username){
		
		
		var wiel = nazwy.length
		for(i=0;i<wiel;i++){
		console.log(nazwy.length);
		if(username==nazwy[i]||username=='1'||username=='2'||username=='3'||username=='4'){
		i=wiel;
		socket.emit('inna', username);
		}
		}
		
		nazwy.push(username);
		socket.username = username;
		socket.room = 'NIEGRA';
		usernames[username] = username;
		
		socket.join('NIEGRA');
		socket.emit('updatechat', 'SERVER', 'połączyłeś się  z  NIEGRA');
		socket.broadcast.to('NIEGRA').emit('updatechat', 'SERVER', username + ' dołączył do pokoju NIEGRA');
		socket.emit('updaterooms', rooms, 'NIEGRA');
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
		var lolek = kolej.length;
		if(lolek > 0){
		  for (var i=0;i<max;i++)
				{
					 for (var j=0;j<max;j++)
					 {
					 if(plansza[i][j]==socket.username){ plansza[i][j] = 1;  console.log(plansza[i][j]);}
					
					 }
					 
				}
			
		for(var j=0; j < lolek;j++)
		{
		if(kolej[j]==socket.username)
		{ kolej.splice(j,1); console.log(kolej[j]); }
		}

		for (var i=0;i<max;i++)
				{
					 for (var j=0;j<max;j++)
					 {
					 if(plansza[i][j]==kolej[0]){ var je = i; var dw = j; }
					
					 }
					 
				}
		socket.broadcast.emit('widokgracz', pomoc,plansza,kolej,je ,dw);
		socket.emit('widokgracz', pomoc,plansza,kolej,je ,dw);
		socket.emit('fragi',fragi, kolej);
		socket.broadcast.emit('fragi', fragi, kolej);
		}
		
		delete usernames[socket.username];
		io.sockets.emit('updateusers', usernames);
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
		
	});
	
	socket.on('usun', function(wywal){
	
		var lolek = kolej.length -1;
		if(lolek){
		if(lolek > 0){
		  for (var i=0;i<max;i++)
				{
					 for (var j=0;j<max;j++)
					 {
					 if(plansza[i][j]==wywal){ plansza[i][j] = 1;  console.log(plansza[i][j]);}
					}
				}
			
		for(var j=0; j < lolek;j++)
		{
		if(kolej[j]==wywal)
		{ kolej.splice(j,1); console.log(kolej[j]); }
		}

		for (var i=0;i<max;i++)
				{
					 for (var j=0;j<max;j++)
					 {
					 if(plansza[i][j]==kolej[0]){ var je = i; var dw = j; }
					
					 }
					 
				}
		socket.broadcast.emit('widokgracz', pomoc,plansza,kolej,je ,dw);
		socket.emit('widokgracz', pomoc,plansza,kolej,je ,dw);
		socket.emit('fragi',fragi, kolej);
		socket.broadcast.emit('fragi', fragi, kolej);
		}
		
		delete usernames[wywal];
		io.sockets.emit('updateusers', usernames);
		socket.leave(socket.room);
		}
	});
	
});
