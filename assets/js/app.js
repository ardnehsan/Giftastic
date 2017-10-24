$("document").ready(function(){

	var animeList = ["Gundam","Digimon", "Yugioh","Naruto", "Bleach", "One Piece","Fairy Tail", "My Hero Academia"];
	var search ="";

	//function to render buttons
	function renderButtons(){
		$("#buttons-view").empty();

		for (var i = 0; i < animeList.length; i++) {
			var a =$("<button>");
			a.addClass("anime");
			a.attr("data-name",animeList[i]);
			a.text(animeList[i]);
			$("#buttons-view").append(a);
		}
	}

	//function to get api request
	function getRequest(x){
		event.preventDefault();

		//with each search a new list of values is presented
		$(".gifimg").empty();



		//build api
		var apiKey = "&api_key=dc6zaTOxFJmzC";
		var limit = "&limit=10&";
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + x +"+anime" + limit + "&rating=pg&"+ apiKey;


		//ajax method to get a request from api
		 $.ajax({
		      url: queryURL,
		      method: 'GET'
		    }).done(function(response) {
		    	
		    	for (var i = 0; i < response.data.length; i++) 
		    	{
		    		//creates an image from the response
		    		gifimg = $("<img>").attr("src", response.data[i].images.original.url);
		    		var r = $("<p>");
		    		r.text("Rating: " + response.data[i].rating);
		    		gifimg.addClass("animegif");

		    		$(".gifimg").append(gifimg);
		    		$(".gifimg").append(r);
		    	}
		    	});

		renderButtons();

	}

	//Button request
	$(document).on("click", '.anime', function(event){
		
		search = $(this).text();
		getRequest(search);
		
	})

	//on click function for creating a new search
	$("#add-anime").on("click", function(event){	
		search = $("#show-input").val().trim();
		animeList.push(search);
		getRequest(search);
		
	});

	renderButtons();
});