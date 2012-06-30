var searchInput = $('.input');
var searchTerm = searchInput.val();

$('.output').hide();

$('#input').submit( function(){
	goGoAjax();
	_gaq.push(['_trackEvent(Search, Query,' + searchTerm + ')']);
	$('.title').html('Loading...');
	return false;
});

focusInput();

function focusInput() {
	searchInput.focus();
}

function resetInput() {
	searchInput.val(null);
}

function goGoAjax() {
	var searchTerm = searchInput.val();
	
	$.ajax({
		url: 'http://www.imdbapi.com/?t=' + searchTerm,
		dataType: 'json',
		success:function(data){
			callback(data);
		},
		error:function(error){
			log(error);
			$('.title').html('Error');
		}
	});
}

function callback(data) {
	if (data.Response == 'False') {
		$('.title').html('Error');
	} else {
		log(data);
		$('.output').show();
		resetInput();
		focusInput();
		$('.title').html(data.Title);		
		$('.starring').html(data.Actors);
		$('.director').html(data.Director);
		$('.writer').html(data.Writer);
		$('.genre').html(data.Genre);
		$('.plot').html(data.Plot);
		$('.length').html(data.Runtime);
		$('.rated').html(data.Rated);
		$('.released').html(data.Released);
	}
}