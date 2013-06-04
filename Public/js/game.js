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
			  $('.poziom'+i+'').append('<div class="'+elo+' drzewo poz" ><a href="#" ><img  src="http://gmclan.org/uploader/3255/tree_gotowe.gif" width="40" height="40"/></a></div>');
		
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
	/*	$('#CZAS').empty();
		clearInterval(myVar);
		
		var c = czas;
		
		var myVar = setInterval(function(){
		c=c-1; 
		if(c==0){
		
		warun = 0;
		clearInterval(myVar);
		warun=1;
		//socket.emit('usun', kolej[0]);
		var usun = 0;	
		}
		if(warun==2){
		c=0;
		clearInterval(myVar);
		socket.emit('Zmiana', kolej[0]);
		warun==0;
		}
		
		myTimer(c,kolej[0]);
		},1000);
				  function myTimer(c,gracz)
{

var halo = gracz+' pozostało Ci '+c+' sekund!!!';
document.getElementById("CZAS").innerHTML=halo;
}
		*/
		});
		  
//*********************************Widok gracz***************************************************
socket.on('widokgracz', function (pomoc, plansza,kolej,jeden,dwa) {
		//************* srodkowanie gracza ************************
		if(jeden > 4){jeden = jeden - 5;}
		if (dwa > 4) { dwa = dwa -5; }
		$('#Plansza').empty();
		//****** dodanie tablicy ****
		var fe = pomoc.lenght
		//if(!fe){ pomoc.push("gora"); pomoc.push(0); pomoc.push("siemka"); }
		//************** Gdzie mozna strzelic ***************************
		var g = 0;
		var d = 0;
		var l = 0;
		var p = 0;
		
		for (var t=1;t<6;t++)
		 {
		 if(plansza[jeden+5][dwa+5+t]==3) {    t = 6;   }
		 else {p=p+1;}
		 }
		 for (var t=1;t<6;t++)
		 {
		 if(plansza[jeden+5][dwa+5-t]==3) {    t = 6;   }
		 else {l=l+1;}
		 }
		  for (var t=1;t<6;t++)
		 {
		 if(plansza[jeden+4+t][dwa+5]==3) {    t = 6;   }
		 else {d=d+1;}
		 }
		  for (var t=1;t<6;t++)
		 {
		 if(plansza[jeden+5-t][dwa+5]==3) {    t = 6;   }
		 else {g=g+1;}
		 }
		
		console.log('p '+p+' l '+l+' g '+g+' d '+d);
		
		//**********Drukowanie planszy ********************************
		for (var i=jeden;i<(jeden+10);i++)
		 {
			$('#Plansza').append('<div class="halo poziom'+i+'"></div>');
			
			 for (var j=dwa;j<(dwa+10);j++)
			 {
			 var jj = dwa - j + 5 ;    var ii = jeden - i + 5;
			 var elo = (i +' '+j);
			 var h = 4;
			 if(((ii==1)&&(jj==0))||((ii==0)&&(jj==1))||((ii==0)&&(jj==-1))||((ii==-1)&&(jj==0))||((ii==0)&&(jj==0))){
				  
				 if(plansza[i][j]==3)
				 {
				  $('.poziom'+i+'').append('<div class="'+elo+' drzewo poz " ><a href="#" onclick="NaPole(\''+ elo +'\')"><img  src="http://gmclan.org/uploader/3255/tree_gotowe.gif" width="40" height="40"/></a></div>');
			
				 }
				 else if(plansza[i][j]==1){
				 $('.poziom'+i+'').append('<div class="'+elo+' droga poz spr" ><a href="#" onclick="NaPole(\''+ elo +'\')"></a></div>');
				 }
				 else if(plansza[i][j]==2){
				  $('.poziom'+i+'').append('<div class="'+elo+' droga poz spr" ><a href="#" onclick="NaPole(\''+ elo +'\')"></a></div>');
				 }
			  else{
			   
			   elo = (i +' '+j+' '+h);
			   if(pomoc[0]=="gora"){$('.poziom'+i+'').append('<div class="'+elo+' gracz poz spr2" ><a href="#" ><img  src="http://host1.panoramix.maxnet.org.pl/~wisla/XML/CZOLG.png" width="40" height="40"/></a></div>');
				}
				else if(pomoc[0]=="prawa"){
				$('.poziom'+i+'').append('<div class="'+elo+' gracz poz spr2" ><a href="#" ><img  src="http://host1.panoramix.maxnet.org.pl/~wisla/XML/CZOLGp.png" width="40" height="40"/></a></div>');
				}
				else if(pomoc[0]=="lewa"){
				$('.poziom'+i+'').append('<div class="'+elo+' gracz poz spr2" ><a href="#" ><img  src="http://host1.panoramix.maxnet.org.pl/~wisla/XML/CZOLGl.png" width="40" height="40"/></a></div>');
				}
				else if(pomoc[0]=="dol"){
				$('.poziom'+i+'').append('<div class="'+elo+' gracz poz spr2" ><a href="#" ><img  src="http://host1.panoramix.maxnet.org.pl/~wisla/XML/CZOLGd.png" width="40" height="40"/></a></div>');
				}
				else {
				$('.poziom'+i+'').append('<div class="'+elo+' gracz poz spr2" ><a href="#" ><img  src="http://host1.panoramix.maxnet.org.pl/~wisla/XML/CZOLGd.png" width="40" height="40"/></a></div>');
				}
			 	 }
				 }
				 else{
				 
			
				 if(plansza[i][j]==3)
			 {
			  $('.poziom'+i+'').append('<div class="'+elo+' drzewo poz" ><a href="#" ><img  src="http://gmclan.org/uploader/3255/tree_gotowe.gif" width="40" height="40"/></a></div>');
		
			 }
			 else if(plansza[i][j]==1){
			 $('.poziom'+i+'').append('<div class="'+elo+' droga poz " ><a href="#" ></a></div>');
			 }
			 else if(plansza[i][j]==2){
			  $('.poziom'+i+'').append('<div class="'+elo+' droga  poz" ><a href="#" ></a></div>');
			 }
			 
			  else{
			   
			  elo = (i +' '+j+' '+h);
			  var pp = dwa + p +5;
			  var ll = dwa - l +5;
			  var dd = jeden + d +5;
			  var gg = jeden - g + 5;
			  var dwaa =dwa +5;
			  var jedenn = jeden +5;
			  
			  console.log('i: '+jj+' '+i+' <'+jedenn+' || '+i+' >= '+gg+' g '+g);
			  if(ii==0 && ((j>dwaa)&&(j<=pp))){
			  console.log("jest1");
			  $('.poziom'+i+'').append('<div class="'+elo+' gracz poz" ><a href="#" onclick="NaPole(\''+ elo +'\')"><img  src="http://host1.panoramix.maxnet.org.pl/~wisla/XML/Ogame1.PNG" width="40" height="40"/></a></div>');
			}
			else if(ii==0 && ((j < dwaa)&&(j >= ll))){
			  console.log("jest2");
			  $('.poziom'+i+'').append('<div class="'+elo+' gracz poz" ><a href="#" onclick="NaPole(\''+ elo +'\')"><img  src="http://host1.panoramix.maxnet.org.pl/~wisla/XML/Ogame1.PNG" width="40" height="40"/></a></div>');
			}
			else if(jj==0 && ((i < jedenn)&&(i >= gg))){
			  console.log("jest3");
			  $('.poziom'+i+'').append('<div class="'+elo+' gracz poz" ><a href="#" onclick="NaPole(\''+ elo +'\')"><img  src="http://host1.panoramix.maxnet.org.pl/~wisla/XML/Ogame1.PNG" width="40" height="40"/></a></div>');
			}else
			if(jj==0 && ((i>jedenn)&&(i<=dd))){
			  console.log("jest4");
			  $('.poziom'+i+'').append('<div class="'+elo+' gracz poz" ><a href="#" onclick="NaPole(\''+ elo +'\')"><img  src="http://host1.panoramix.maxnet.org.pl/~wisla/XML/Ogame1.PNG" width="40" height="40"/></a></div>');
			}
			
			else  {
			  $('.poziom'+i+'').append('<div class="'+elo+' gracz poz" ><a href="#" onclick="NaPole(\''+ elo +'\')"><img  src="http://host1.panoramix.maxnet.org.pl/~wisla/XML/CZOLG.png" width="40" height="40"/></a></div>');
		
			}
			
			 	 }
				 
				 }
			 }
		}
		  
		
		  });		  
		  
/*socket.on('widoknie', function (username, plansza,kolej,jeden,dwa) {
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
			  
			  $('.poziom'+i+'').append('<div class="'+elo+' gracz poz" ><a href="#" ><img  src="http://host1.panoramix.maxnet.org.pl/~wisla/XML/CZOLG.png" width="40" height="40"/></a></div>');
			
			 	 }
			 }
		}
		  
		
});		  */
 
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
		
		$('#TURA').click( function() {
			var message = "TURA";
			warun = 2;
			socket.emit('NaPole', message);
			});
		
	$('#newgame').click( function() {
			var message = $('#data').val();
			$('#data').val('');
			socket.emit('newgamee', message);
			});
			
});






