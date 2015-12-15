jQuery(function($){

	// Our countdown plugin takes a callback, a duration
	$.fn.countdown = function (callback, duration) {
			// Get reference to container, and set initial content
			var container = $(this[0]).html(duration);
			// Get reference to the interval doing the countdown
			var countdown = setInterval(function () {
					// If seconds remain
					if (duration--) {
							// Update our container's text
							container.html(duration);
					// Otherwise
					} else {
							// Clear the countdown interval
							clearInterval(countdown);
							// And fire the callback passing our container as `this`
							callback.call(container);
					}
			// Run interval every 1000ms (1 second)
			}, 1000);

	};

	function timer_finished() {
		$().video_stop();
	}

	$.fn.video_start = function () {
		var start = $.ajax({
			url: "/start",
			type: "GET",
			dataType: 'json',
			contentType: 'application/json',
			data : { name: "name"},
			accepts: "application/json"
		});

		start.done(function(msg) {
			console.log(msg["video_name"])
			var starting_value = 1;
			$(".timer-value").countdown(timer_finished, starting_value);
		});

		start.fail(function(jqXHR, textStatus) {
			alert( "Request failed: " + textStatus );
		});

	};

	$.fn.video_stop = function () {
		var start = $.ajax({
			url: "/stop",
			type: "GET",
			dataType: 'json',
			contentType: 'application/json',
			data : { name: "name"},
			accepts: "application/json"
		});

		start.done(function(msg) {
			$("#email-modal").modal('show');
		});

		start.fail(function(jqXHR, textStatus) {
			alert( "Request failed: " + textStatus );
		});

	};

	$(".start-button").click(function() {
		$().video_start();
	});

	// Set focus to email box when modal is shown
	$('#email-modal').on('shown.bs.modal', function () {
	  $('#email').focus()
	})

});
