$(document).ready(function() {
	resizeStream();
});

$(window).resize(function(e) {
	resizeStream();
});

$("a.about").on("click", function(e) {
	$("a.about").after("<div id='about-data' class='about-container'></div>");
	$.get('/about', function(data){
		$("#about-data").html(data).addClass("about-open");
	});
});

$("li > a").on("click", function(e) {
	var $parent = $(this).parent(),
		dataType = $parent.attr("id");
	handleOverlay(dataType, $parent, transformOverlay);
});

$(".contents").on("click", ".close", function(e) {
	var c = function() {closeWindow(this)};
	transformOverlay("about", c);
});

function closeWindow(object) {
	$(object).parent().remove();
}

function resizeStream(e) {
	var $s = $(".stream"), 
		w = $s.innerWidth(),
		h = w*(3/5), 
		$c = $(".chat > iframe");
	$s.css("height", h+"px");
	$c.css("height", parseInt(h+6)+"px");
}

function handleOverlay(dataType, parent, callback) {
	var $parent = parent,
		$stream = $(".stream"),
		old = $(".active").attr("id"),
		$old = $("."+old+"-container"),
		closeW = function() { closeWindow($old.children(":first"))};
	if ($old.length) { 
		transformOverlay(old, $old.one("transitionend, webkitTransitionEnd", closeW));
	}
	if ($parent.hasClass("active")) {
		$(".active").removeClass("active");
	}
	else {
		$(".active").removeClass("active");
		$parent.addClass("active");
		$stream.append("<div class='"+dataType+"-container stream-overlay'></div>");
		$.get('/'+dataType, function(data){
			var $container = $("."+dataType+"-container");
			$container.html(data);
			$container.children(":first").css("left"); // give children something to transition from ... browser y u make me do dis? pls learn to reflow on your own t.t
			callback(dataType, null);
		});

	}
}

function transformOverlay(dataType, callback) {
	$("."+dataType+"-container").toggleClass(dataType+"-open");
}
