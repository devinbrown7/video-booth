jQuery(function($){

	var current_mode = "photo";
	var current_length = "5";

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

			// Hide the START button
			$('.start-button').addClass("hide");

			// Show the RECORDING button
			$('.recording-button').removeClass("hide");

			// Start the countdown
			var starting_value = current_length;
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
			// Hide the START button
			$('.recording-button').addClass("hide");

			// Show the RECORDING button
			$('.start-button').removeClass("hide");

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
	});

	// Shooting Mode
	$(".shooting-mode button").click(function(){
		current_mode = $(this).data("value");
		$(".shooting-mode button").removeClass("active");
		$(this).addClass("active");
		if (current_mode == "video") {
			$(".video-length").removeClass("hide");

			$(".video-length button").first().trigger("click");

		} else {
			$(".video-length").addClass("hide");
		}
	});

	// Video Length
	$(".video-length button").click(function(){
		current_length = $(this).data("value");
		$(".video-length button").removeClass("active");
		$(this).addClass("active");
		$(".timer-value").html(current_length);
	});

	$( ".video-button" ).trigger( "click" );

	// Add email address to modal form
	function addEmail() {

		var number_of_email_inputs = $(".email-input").length + 1;

		console.log("number_of_email_inputs: " + number_of_email_inputs);

		var email_input = '<div class="input-group">' +
				'<input type="email" class="form-control input-lg email-input" ' +
				'id="email_input_'+number_of_email_inputs+'" ' +
				'name="email_input_'+number_of_email_inputs+'" placeholder="email address"> ' +
				'<div class="input-group-addon btn btn-success add-email">+</div>' +
				'<div class="input-group-addon btn btn-danger remove-email">–</div>' +
			'</div>';
		$(".modal-email-list").append(email_input);

		// Bind click handlers
		bindAddRemoveClickHandlers();
	};

	function bindAddRemoveClickHandlers() {
		$("html").on("click", "div.add-email", function(){
		  $("html").off("click");
			addEmail();
		});

		$("html").on("click", "div.remove-email", function(){
			var number_of_email_inputs = $(".email-input").length;
			if (number_of_email_inputs > 1) {
				$(this).parent().remove();
			}
		});
	}

	function removeAllEmails() {
		$(".modal-email-list").html("");
	};

	// Add email to form when modal loads
	$('#email-modal').on('show.bs.modal', function (e) {
		addEmail();
	});

	// Add email to form when modal loads
	$('#email-modal').on('hidden.bs.modal', function (e) {
		removeAllEmails();
	});

	// Email form send
	$('.email-modal-send-button').click(function(){

	  // // Abort any pending request
	  // if (request) {
	  //     request.abort();
	  // }
	  // setup some local variables
	  var $form = $(".email-form");

	  // Let's select and cache all the fields
	  var $inputs = $form.find("input");

	  // Serialize the data in the form
	  var serializedData = $form.serialize();

	  // Let's disable the inputs for the duration of the Ajax request.
	  // Note: we disable elements AFTER the form data has been serialized.
	  // Disabled form elements will not be serialized.
	  $inputs.prop("disabled", true);

	  // Fire off the request to /form.php
	  request = $.ajax({
	      url: "/send",
	      type: "post",
	      data: serializedData
	  });

	  // Callback handler that will be called on success
	  request.done(function (response, textStatus, jqXHR){
	      // Log a message to the console
	      console.log("Hooray, it worked!");
	  });

	  // Callback handler that will be called on failure
	  request.fail(function (jqXHR, textStatus, errorThrown){
	      // Log the error to the console
	      console.error(
	          "The following error occurred: "+
	          textStatus, errorThrown
	      );
	  });

	  // Callback handler that will be called regardless
	  // if the request failed or succeeded
	  request.always(function () {
	      // Reenable the inputs
	      $inputs.prop("disabled", false);
	  });

	  // Prevent default posting of form
	  event.preventDefault();
	});

});
