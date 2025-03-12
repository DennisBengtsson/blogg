$(function () {
  $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // Handle errors from jqBootstrapValidation plugin
      console.error("Validation errors:", errors);  // Log the errors for debugging
    },
    submitSuccess: function ($form, event) {
      event.preventDefault();

      // Get form values
      var name = $("#name").val();
      var email = $("#email").val();
      var subject = $("#subject").val();
      var message = $("#message").val();

      // Disable the submit button
      var $submitButton = $("#sendMessageButton");
      $submitButton.prop("disabled", true);

      // AJAX request
      $.ajax({
        url: "contact.php",
        type: "POST",
        data: {
          name: name,
          email: email,
          subject: subject,
          message: message,
        },
        cache: false,
        dataType: "text", // Expect plain text response
        success: function (response) {
          // Success message (using DOM manipulation - more secure)
          $("#success").html(
            "<div class='alert alert-success'>" +
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
              "<strong>Your message has been sent.</strong>" +
            "</div>"
          );

          // Clear all fields
          $("#contactForm").trigger("reset");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // Error message (using DOM manipulation - more secure)
          var errorMessage = "Sorry " + name + ", it seems that our mail server is not responding. Please try again later!";
          if(jqXHR.responseText){
              errorMessage = "Sorry " + name + ", " + jqXHR.responseText; // Use response from the server if available
          }

          $("#success").html(
            "<div class='alert alert-danger'>" +
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
              "<strong>" + errorMessage + "</strong>" +
            "</div>"
          );
          // Clear all fields
          $("#contactForm").trigger("reset");
        },
        complete: function () {
          // Re-enable the submit button after a delay
          setTimeout(function () {
            $submitButton.prop("disabled", false);
          }, 1000);
        },
      });
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });

  // Prevent display of success message when not needed
  $("#name").focus(function () {
    $("#success").empty();
  });

  // Optional: Tab functionality
  $('a[data-toggle="tab"]').on('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    $(this).tab("show"); // Show the related tab
  });
});
