var players=[]

function getData(){
	if(window.localStorage.getItem('dataPlayers')){
		players=JSON.parse(window.localStorage.getItem('dataPlayers'))
		printData(players)
	}
	else{
		fetch("https://www.balldontlie.io/api/v1/players").then(function(response) {
		  	return response.json()
		}).then(function(data) {
		  	players=data.data
		  	window.localStorage.setItem('dataPlayers', JSON.stringify(players))
		  	printData(players)
		}).catch(function(error) {
		  console.log("Booo"+error)
		});
	}	
	
}

function addPlayer(){
	players=JSON.parse(window.localStorage.getItem('dataPlayers'))
	var firstName = document.getElementById("firstName").value;
	var lastName  = document.getElementById("lastName").value;
	var position  = document.getElementById("position").value;
	var nameTeam  = document.getElementById("nameTeam").value;
	var division  = document.getElementById("division").value;
	let newPlayer ={first_name:firstName,last_name:lastName,position:position,team:{division:division,full_name:nameTeam}}
	players.push(newPlayer)
	window.localStorage.setItem('dataPlayers', JSON.stringify(players))
	
	location.href="index.html"
}

function setDataPlayer(){
	var queryString = decodeURIComponent(window.location.search);
	let index = queryString.substring(1);
	players=JSON.parse(window.localStorage.getItem('dataPlayers'))
	document.getElementById("firstName").value=players[index].first_name
	document.getElementById("lastName").value=players[index].last_name
	document.getElementById("position").value=players[index].position
	document.getElementById("nameTeam").value=players[index].team.full_name
	document.getElementById("division").value=players[index].team.division	
}

function updateDataPlayer(){
	var queryString = decodeURIComponent(window.location.search);
	let index = queryString.substring(1)
	console.log(index)
	if(players.length==0){
		players=JSON.parse(window.localStorage.getItem('dataPlayers'))
	}
	
	var firstName = document.getElementById("firstName").value;
	var lastName  = document.getElementById("lastName").value;
	var position  = document.getElementById("position").value;
	var nameTeam  = document.getElementById("nameTeam").value;
	var division  = document.getElementById("division").value;
	let dataPlayer ={first_name:firstName,last_name:lastName,position:position,team:{division:division,full_name:nameTeam}}
	console.log(players[index])
	players[index]=Object.assign(players[index],dataPlayer)
	window.localStorage.setItem('dataPlayers', JSON.stringify(players))
	
	location.href="index.html"
}

function deletePlayer(index){
	players=JSON.parse(window.localStorage.getItem('dataPlayers'))
	players.splice(index,1)
	window.localStorage.setItem('dataPlayers', JSON.stringify(players))
	printData(players)
	
}

function filterPlayers(){
	players=JSON.parse(window.localStorage.getItem('dataPlayers'))
	var filterBy = document.getElementById("select").value;
	var search = document.getElementById("search").value;
	switch (filterBy){
		case 'first_name':
			players= players.filter(function(el) {
			    return el.first_name.indexOf(search) > -1;
			})
			break;
		case 'position':
			players= players.filter(function(el) {
			    return el.position.indexOf(search) > -1;
			})
			break;
		case 'division':
			players= players.filter(function(el) {
			    return el.team.division.indexOf(search) > -1;
			})
			break;
		default:
			break;
	}
	printData(players)
	
  }


  
 function printData(players){
	let stringDiv='<table border=1 spacing=1>'
  	stringDiv+='<thead>'
  	stringDiv+='<tr>'
  	stringDiv+='<td>FirstName</td>'
  	stringDiv+='<td>LastName</td>'
	stringDiv+='<td>Position</td>'
	stringDiv+='<td>Team</td>'
	stringDiv+='<td>Division</td>'
	stringDiv+='<td>Action</td>'
	stringDiv+='</tr>'
	stringDiv+='</thead>'
	stringDiv+='<tbody>'
	players.forEach(function(element,index){
		stringDiv+='<tr>'
	  	stringDiv+='<td><a href="detail.html?'+element.id+'">'+element.first_name+'</a></td>'
	  	stringDiv+='<td>'+element.last_name+'</td>'
	  	stringDiv+='<td>'+element.position+'</td>'
		stringDiv+='<td>'+element.team.full_name+'</td>'
		stringDiv+='<td>'+element.team.division+'</td>'
		stringDiv+='<td><button type="buttom" onclick="deletePlayer('+index+')">Delete Player</button><button type="buttom" onclick="window.location.href =\'updatePlayer.html?'+index+'\'">Update Player</button></td>'
		stringDiv+='</th>'
	})
	stringDiv+='</tbody>'

  
  	var divPlayer=document.getElementById('divPlayers')
	divPlayer.innerHTML=stringDiv
 }