 socket.on('newgames', function (username, plansza,kolej) {
		$('#Plansza').empty();
		$('#Kolej').empty();
			$.each(kolej, function(key, value) {
			key = key +1;
			$('#Kolej').append(key+': '+value+'</br>');
			});
		for (var i=0;i<10;i++)
		 {
			$('#Plansza').append('<div class="halo poziom'+i+'"></div>');
			 for (var j=0;j<10;j++)
			 {
			 var elo = (i +''+j);
			 if(plansza[i][j]==3)
			 {
			  $('.poziom'+i+'').append('<div class="'+elo+' drzewo poz" ><a href="#" onclick="switchRoom(\''+ elo +'\')"><img  src="http://www.formanowicz.pl/start_pliki/drzewo.gif" width="30" height="30"/></a></div>');
		
			 }
			 else if(plansza[i][j]==1){
			 $('.poziom'+i+'').append('<div class="'+elo+' droga poz" ><a href="#" onclick="switchRoom(\''+ elo +'\')">' +  plansza[i][j] + '</a></div>');
			 }
			 else if(plansza[i][j]==2){
			  $('.poziom'+i+'').append('<div class="'+elo+' droga poz" ><a href="#" onclick="switchRoom(\''+ elo +'\')">' +  plansza[i][j] + '</a></div>');
			 }
			  else{
			  
			  $('.poziom'+i+'').append('<div class="'+elo+' gracz poz" ><a href="#" onclick="switchRoom(\''+ elo +'\')">'+plansza[i][j]+'</a></div>');
			
			 	 }
			 }
		}
		  
		
		  });
		 
		  socket.on('dodaj', function (jeden, dwa) {
		$('#Liczby').empty();
		
			$('#Liczby').append('jeden:'+jeden+'dwa:'+dwa);
			
		
		  
		
		  });
		 
		
		 
$(function(){
		
		$('#dolaczz').click( function() {
			var message = $('#data').val();
			$('#data').val('');
			socket.emit('dolacz', message);
			//$('#menu').empty();
			});
		
		
	$('#newgame').click( function() {
			var message = $('#data').val();
			$('#data').val('');
			socket.emit('newgamee', message);
			});
			
});






