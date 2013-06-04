var socket = io.connect('http://localhost:8080');

		socket.on('connect', function(){
		socket.emit('adduser', prompt("Podaj swój nick?"));
	});
    
	socket.on('inna', function (username) {
		socket.emit('adduser', prompt("Nick "+ username +" jest zajęty. Podaj inny nick?"));
	});

	socket.on('updatechat', function (username, data) {
		$('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
	});

	socket.on('updaterooms', function(rooms, current_room) {
		$('#rooms').empty();
		$.each(rooms, function(key, value) {
			if(value == current_room){
				$('#rooms').append('<div>' + value + '</div>');
			}
			else {
				$('#rooms').append('<div><a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
			}
		});
	});
	
	


	
	socket.on('showus', function(rooms) {
		$('#rooms').empty();
		$.each(rooms, function(key, value) {
			if(value == current_room){
				$('#rooms').append('<div>' + value + '</div>');
			}
			else {
				$('#rooms').append('<div><a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
			}
		});
	});

	function switchRoom(room){
		socket.emit('switchRoom', room);
	}
	
	
	$(function(){
		
		
		
		
		
		$('#datasend').click( function() {
			var message = $('#data').val();
			$('#data').val('');
			
			socket.emit('sendchat', message);
		});
		
			$('#roomsend').click( function() {
			var room = $('#ROOMS').val();
			
			console.log(room);
			socket.emit('createrommm', room);
		});
		
		$('#namesend').click( function() {
			var room = $('#NAMES').val();
			
			console.log(room);
			socket.emit('changename', room);
		});

		
		$('#data').keypress(function(e) {
			if(e.which == 13) {
				$(this).blur();
				$('#datasend').focus().click();
			}
		});
	});
