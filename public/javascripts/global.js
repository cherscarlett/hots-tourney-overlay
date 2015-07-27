$(document).ready(function() {
	resizeStream();
});
$(window).resize(function(e) {
	resizeStream();
});
$("a.about").on("click", function(e) {
	$("a.about").after("<div id='about-data'></div>");
	$.get('/about', function(data){
		$("#about-data").html(data);
	});
});
$("li > a").on("click", function(e) {
	var $parent = $(this).parent(),
		dataType = $parent.attr("id");
	handleOverlay(dataType, $parent);
});
$(".contents").on("click", ".close", function(e) {
	closeWindow(this);
});

function closeWindow(object) {
	$(object).parent().remove();
}

function resizeStream(e) {
	var $s = $(".stream"), 
		w = $s.innerWidth(),
		h = w*(3/5);
	$s.css("height", h+"px");
}

function handleOverlay(dataType, parent) {
	var $parent = parent,
		$stream = $(".stream"),
		old = $(".active").attr("id"),
		$old = $("."+old+"-container");
	if ($old) { closeWindow($old.children(":first"));}
	if ($parent.hasClass("active")) {
		$(".active").removeClass("active");
	}
	else {
		$(".active").removeClass("active");
		$parent.addClass("active");
		$stream.append("<div class='"+dataType+"-container stream-overlay'></div>");
		$.get('/'+dataType, function(data){
			$("."+dataType+"-container").html(data);
		});
	}
}
