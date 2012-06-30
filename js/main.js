var searchInput = $('#cli');
var searchTerm = searchInput.val();

$('#input').submit(function(){
	goGoAjax();
	_gaq.push(['_trackEvent(Search, Query,' + searchTerm + ')']);
	return false;
});

focusInput();

function focusInput() {
	searchInput.focus();
}

function resetInput() {
	searchInput.val(null);
}

function hasTomatoes() {
	var searchTerm = searchInput.val();
	
	if (searchTerm.indexOf(' -t') > 0 || searchTerm.indexOf(' --tomatoes') > 0)
		return true;
}

function goGoAjax() {
	var searchTerm = searchInput.val();

	if (hasTomatoes()) {
		var searchString = 'http://www.imdbapi.com/?tomatoes=true&t=' + searchTerm.replace('--tomatoes', '')
	} else {
		var searchString = 'http://www.imdbapi.com/?t=' + searchTerm;
		$('#tomatoes').hide();
	}

	$.ajax({
		url: searchString,
		dataType: 'json',
		success:function(data){
			if (data.Response == 'False') {
				$('.title').html('Error');
			} else {
				callback(data);
			}
		},
		error:function(error){
			log(error);
			$('.title').html('Error');
		}
	});
}

function callback(data) {
	$('.output').show();
	$('.title').html(data.Title);		
	$('.starring').html(data.Actors);
	$('.director').html(data.Director);
	$('.writer').html(data.Writer);
	$('.genre').html(data.Genre);
	$('.plot').html(data.Plot);
	$('.length').html(data.Runtime);
	$('.rated').html(data.Rated);
	$('.released').html(data.Released);
	$('.imdb-rating').html(data.imdbRating);
	$('.imdb-votes').html(data.imdbVotes);	
	
	if (hasTomatoes()) {
		$('#tomatoes').show();
		$('.tomato-consensus').html(data.tomatoConsensus);
		$('.tomatometer > span').html(data.tomatoMeter);
		$('.tomato-user-rating').html(data.tomatoUserRating);
		$('.tomato-user-votes').html(data.tomatoUserReviews)
	}

	resetInput();
	focusInput();
}