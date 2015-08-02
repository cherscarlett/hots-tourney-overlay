var $s = $(".stream"), 
	w = $s.innerWidth(),
	h = w*(3/5);

$(document).ready(function() {
	resizeStream();	
});

$(window).resize(function() {
	resizeStream();
});

$("a.about").on("click", function() {
	$("a.about").after("<div id='about-data' class='about-container' />");
	$.get('/about', function(data){
		$("#about-data").html(data).addClass("about-open");
		$(".contents").addClass("about-active");
		$(".about-content > div").addClass("about-panel-active");
		resizeOverlays();
	});
});

$("li > a").on("click", function() {
	var $parent = $(this).parent(),
		dataType = $parent.attr("id");
	handleOverlay(dataType, $parent, transformOverlay);
});

$(".contents").on("click", ".code", function() {
	$(this).toggleClass("code-open");
});

$(".contents").on("click", ".close", function() {
	$(".about-active").removeClass("about-active");
	transformOverlay("about", closeWindow);
});

$(".contents").on("click", ".nav-controls > a:not(.inactive)", function() {
	var panels = ["blurb", "structure", "functions", "styles"],
		$current = $(".about-panel-active"),
		current = $current.attr("id"),
		indexOfCurrent = panels.indexOf(current), 
		direction = $(this).attr("id"),
		next = "",
		prev = "",
		newCurrent = "";

	if (direction === "next") {
		if (indexOfCurrent+2 < panels.length) {
			next = panels[indexOfCurrent+2];
		}
		else {
			next = "inactive";
		}
		newCurrent = panels[indexOfCurrent+1];
		prev = current;
	}
	if (direction === "prev") {
		if (indexOfCurrent === 1) {
			prev = "inactive";
		}
		else {
			prev = panels[indexOfCurrent-2];
		}
		newCurrent = panels[indexOfCurrent-1];
		next = current;
	}
	handleAboutContent(direction, prev, current, next, newCurrent, null);
});

function closeWindow(object) {
	$(object).parent().remove();
}

function resizeStream() {
	var	$c = $(".chat > iframe");

	$s.css("height", h+"px");
	$c.css("height", parseInt(h+6)+"px");

	resizeOverlays();
}

function resizeOverlays() {
	var $t = $(".blue, .red"),
		$a = $("#about-data");

	if ($t.length) {
		$t.css("padding-top", parseInt((h-396)/2)+"px");
	}

	if ($a.length) {
		$a.css("height", parseInt(h+65)+"px");
	}
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
		$stream.append("<div class='"+dataType+"-container stream-overlay' />");
		$.get('/'+dataType, function(data){
			var $container = $("."+dataType+"-container");
			$container.html(data);
			$container.children(":first").css("left"); // give children something to transition from ... browser y u make me do dis? pls learn to reflow on your own t.t
			callback(dataType, null);
			if (dataType === 'teams') { resizeOverlays(h); }
		});
	}
}

function transformOverlay(dataType, callback) {
	$("."+dataType+"-container").toggleClass(dataType+"-open");
	if (dataType === "about") {
		var c = function() { callback($(".close"))};
		$(".about-container").one("transitionend, webkitTransitionEnd", c);
	}
	else {
		callback;
	}
}

function handleAboutContent(direction, prev, old, next, current, callback) {
	var $a = $(".about-content"),
		$o = $("#"+old),
		$n = $("#next"),
		$p = $("#prev"),
		panel = current,
		newClass = "", 
		c = function() { $o.remove();};

	$o.removeClass();

	if (direction === "next") {
		newClass = "about-previous-panel";
		$n.removeClass().addClass(next).find("span").html("Next: "+next);
		$p.removeClass().addClass(old).find("span").html("Previous: "+old);
	}
	else {
		newClass = "about-next-panel";
		$n.removeClass().addClass(old).find("span").html("Next: "+old);
		$p.removeClass().addClass(prev).find("span").html("Previous: "+prev);
	}

	$o.addClass(newClass);
	$(".inactive").find("span").html("");
	$o.one("transitionend, webkitTransitionEnd", c);
	$.get('/about/'+panel, function(data) {
		$a.append(data);
		$("#"+panel).addClass("about-panel-active");
	});
}
