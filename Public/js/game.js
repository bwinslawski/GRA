 //************************Nowa Gra ******************************************
 socket.on('newgames', function (username, plansza,kolej) {
		$('#Plansza').empty();
		for (var i=0;i<10;i++)
		 {
			$('#Plansza').append('<div class="halo poziom'+i+'"></div>');
			 for (var j=0;j<10;j++)
			 {
			 var elo = (i +' '+j);
			 if(plansza[i][j]==3)
			 {
			  $('.poziom'+i+'').append('<div class="'+elo+' drzewo poz" ><a href="#" onclick="NaPole(\''+ elo +'\')"><img  src="http://gmclan.org/uploader/3255/tree_gotowe.gif" width="30" height="30"/></a></div>');
		
			 }
			 else if(plansza[i][j]==1){
			 $('.poziom'+i+'').append('<div class="'+elo+' droga poz" ><a href="#" onclick="NaPole(\''+ elo +'\')"></a></div>');
			 }
			 else if(plansza[i][j]==2){
			  $('.poziom'+i+'').append('<div class="'+elo+' droga poz" ><a href="#" onclick="NaPole(\''+ elo +'\')"></a></div>');
			 }
			  else{
			  
			  $('.poziom'+i+'').append('<div class="'+elo+' gracz poz" ><a href="#" onclick="NaPole(\''+ elo +'\')">'+plansza[i][j]+'</a></div>');
			
			 	 }
			 }
		}
		  
		
		  });
		  //***********************************Fragi *********************************************************
		  socket.on('fragi', function (fragi , kolej) {
		$('#Kolej').empty();
			$('#Kolej').append('<table class="table table-striped"> <thead> <tr><th>#</th> <th>Nick</th><th>Fragi</th><th>Dead</th></tr></thead><tbody>');
			var lolek = kolej.length;
			var ii = 0
			for (var i=0;i<lolek;i++)
		 {
		 ii= i+1;
		 $('#Kolej').children().append(' <tr><td>'+ii+'</td><td>'+kolej[i]+'</td><td>'+fragi[i]+'</td><td>0</td></tr>');
		 }
		 $('#Kolej').append('</tbody></table>');
		  });
      //******************* CZAS ****************************************************************
	    socket.on('czas', function (kolej,czas) {
		$('#CZAS').empty();
		clearInterval(myVar);
		
		var c = 15;
		
		var myVar = setInterval(function(){
		c=c-1; 
		if(c==0){
		clearInterval(myVar);
		socket.emit('usun', kolej[0]);
		
		socket.emit('Zmiana', kolej[0]);
		
		}
		myTimer(c,kolej[0])
		},1000);
		
		});
		  
		  function myTimer(c,gracz)
{

var halo = gracz+' pozostało Ci '+c+' sekund!!!';
document.getElementById("CZAS").innerHTML=halo;
}
		  function myStopFunction()
{
clearInterval(czas);
}

		  
//*********************************Widok gracz***************************************************
socket.on('widokgracz', function (username, plansza,kolej,jeden,dwa) {
		//************* srodkowanie gracza ************************
		if(jeden > 4){jeden = jeden - 5;}
		if (dwa > 4) { dwa = dwa -5; }
		$('#Plansza').empty();
		//**********Drukowanie planszy ********************************
		for (var i=jeden;i<(jeden+10);i++)
		 {
			$('#Plansza').append('<div class="halo poziom'+i+'"></div>');
			 for (var j=dwa;j<(dwa+10);j++)
			 {
			 var jj = dwa - j + 5 ;    var ii = jeden - i + 5;
			 var elo = (i +' '+j);
			 var h = 4;
			 if(((ii==1)&&(jj==0))||((ii==0)&&(jj==1))||((ii==0)&&(jj==-1))||((ii==-1)&&(jj==0))){
				  
				 if(plansza[i][j]==3)
				 {
				  $('.poziom'+i+'').append('<div class="'+elo+' drzewo poz spr" ><a href="#"><img  src="http://gmclan.org/uploader/3255/tree_gotowe.gif" width="30" height="30"/></a></div>');
			
				 }
				 else if(plansza[i][j]==1){
				 $('.poziom'+i+'').append('<div class="'+elo+' droga poz spr" ><a href="#" onclick="NaPole(\''+ elo +'\')"></a></div>');
				 }
				 else if(plansza[i][j]==2){
				  $('.poziom'+i+'').append('<div class="'+elo+' droga poz spr" ><a href="#" onclick="NaPole(\''+ elo +'\')"></a></div>');
				 }
			  else{
			   
			   elo = (i +' '+j+' '+h);
			  $('.poziom'+i+'').append('<div class="'+elo+' gracz poz spr" ><a href="#" onclick="NaPole(\''+elo+'\')">'+plansza[i][j]+'</a></div>');
			
			 	 }
				 }
				 else{
				 if(plansza[i][j]==3)
			 {
			  $('.poziom'+i+'').append('<div class="'+elo+' drzewo poz" ><a href="#" ><img  src="http://gmclan.org/uploader/3255/tree_gotowe.gif" width="30" height="30"/></a></div>');
		
			 }
			 else if(plansza[i][j]==1){
			 $('.poziom'+i+'').append('<div class="'+elo+' droga poz" ><a href="#" ></a></div>');
			 }
			 else if(plansza[i][j]==2){
			  $('.poziom'+i+'').append('<div class="'+elo+' droga poz" ><a href="#" ></a></div>');
			 }
			  else{
			   
			  elo = (i +' '+j+' '+h);
			  $('.poziom'+i+'').append('<div class="'+elo+' gracz poz" ><a href="#" onclick="NaPole(\''+ elo +'\')">'+plansza[i][j]+'</a></div>');
			
			 	 }
				 
				 }
			 }
		}
		  
		
		  });		  
		  
socket.on('widoknie', function (username, plansza,kolej,jeden,dwa) {
		if(jeden > 4){
        jeden = jeden - 5;	
		}
		if (dwa > 4) { dwa = dwa -5; }
		
		$('#Plansza').empty();
		
		for (var i=jeden;i<(jeden+10);i++)
		 {
			$('#Plansza').append('<div class="halo poziom'+i+'"></div>');
			 for (var j=dwa;j<(dwa+10);j++)
			 {
			 var elo = (i +' '+j);
			 if(plansza[i][j]==3)
			 {
			  $('.poziom'+i+'').append('<div class="'+elo+' drzewo poz" ><a href="#" ><img  src="http://gmclan.org/uploader/3255/tree_gotowe.gif" width="30" height="30"/></a></div>');
		
			 }
			 else if(plansza[i][j]==1){
			 $('.poziom'+i+'').append('<div class="'+elo+' droga poz" ><a href="#" ></a></div>');
			 }
			 else if(plansza[i][j]==2){
			  $('.poziom'+i+'').append('<div class="'+elo+' droga poz" ><a href="#" ></a></div>');
			 }
			  else{
			  
			  $('.poziom'+i+'').append('<div class="'+elo+' gracz poz" ><a href="#" >'+plansza[i][j]+'</a></div>');
			
			 	 }
			 }
		}
		  
		
});		  
 
		  socket.on('dodaj', function (jeden, dwa) {
		$('#Liczby').empty();
			$('#Liczby').append('jeden:'+jeden+'dwa:'+dwa);
		  });
		 
		 

		 
		 
		function NaPole(room){
		socket.emit('NaPole', room);
	}
		 
$(function(){
		
		$('#dolaczz').click( function() {
			var message = $('#data').val();
			$('#data').val('');
			socket.emit('dolacz', message);
			//socket.emit('CZAS', '60');
			$('#menu').empty();
			});
		
		
	$('#newgame').click( function() {
			var message = $('#data').val();
			$('#data').val('');
			socket.emit('newgamee', message);
			});
			
});






