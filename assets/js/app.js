$("document").ready(function(){

	//creates an array for the default buttons
	var animeList = ["Gundam","Digimon", "Yugioh","Naruto", "Bleach", "One Piece","Fairy Tail", "My Hero Academia"];
	var search ="";

	//function to render buttons
	function renderButtons(){
		$("#buttons-view").empty();

		//runs through array to create buttons
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
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x +"+anime" + limit + "&rating=pg&"+ apiKey;


		//ajax method to get a request from api
		 $.ajax({
		      url: queryURL,
		      method: 'GET'
		    }).done(function(response) {
		    	
		    	console.log(response);

		    	for (var i = 0; i < response.data.length; i++) 
		    	{
		    		//creates an image from the response
		    		$(".gifimg") = $("<img>");
		    		var r = $("<p>");
		    		var t = $("<p>");
		    		r.text("Rating: " + response.data[i].rating);
		    		t.text(response.data[i].title);

		    		//adds necessary attributes to manipulate response values
		    		$(".gifimg").addClass("animegif");
		    		$(".gifimg").attr("data-still", response.data[i].images.original_still.url);
		  			$(".gifimg").attr("data-animate", response.data[i].images.original.url);
		  			$(".gifimg").attr("src", $(".gifimg").attr("data-still"));
		    		$(".gifimg").append(t);
		    		$(".gifimg").append(r);
		    		$(".gifimg").append(gifimg);
		    	}

		    	//function to stop animation
				$(".animegif").on("click", function() {
					if($(this).attr("src") === $(this).attr("data-still"))
					{
						$(this).attr("src", $(this).attr("data-animate"));
					}
					else
					{
						$(this).attr("src", $(this).attr("data-still"));
					}
		    	});
			});


		renderButtons();
		$("#show-input").val('');
	}

	//Button request to get the request
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