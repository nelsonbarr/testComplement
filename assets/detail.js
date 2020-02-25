var playerDetail=[]

function getDetailData(){
	var queryString = decodeURIComponent(window.location.search);
	let id = queryString.substring(1);

	fetch("https://www.balldontlie.io/api/v1/players/"+id).then(function(response) {
	  	return response.json()
	}).then(function(data) {
	  	detail=data
	  	let stringDiv='<table border=1 spacing=1>'
	  	stringDiv+='<thead>'
	  	stringDiv+='<tr>'
	  	stringDiv+='<td>FirstName</td>'
	  	stringDiv+='<td>LastName</td>'
		stringDiv+='<td>Position</td>'
		stringDiv+='<td>Team</td>'
		stringDiv+='<td>Division</td>'
		stringDiv+='</tr>'
		stringDiv+='</thead>'
		stringDiv+='<tbody>'
		stringDiv+='<tr>'
	  	stringDiv+='<td>'+detail.first_name+'</td>'
	  	stringDiv+='<td>'+detail.last_name+'</td>'
	  	stringDiv+='<td>'+detail.position+'</td>'
		stringDiv+='<td>'+detail.team.full_name+'</td>'
		stringDiv+='<td>'+detail.team.division+'</td>'
		
		stringDiv+='</th>'
		stringDiv+='</tbody>'

	  	var divPlayer=this.document.getElementById('divPlayers')
		divPlayer.innerHTML=stringDiv
		var title=this.document.getElementById('titlePage')
		title.innerHTML+=' '+detail.first_name+' '+detail.last_name
	}).catch(function(error) {
	  console.log(error)
	});
}

getDetailData()