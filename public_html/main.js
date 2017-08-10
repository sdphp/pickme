/*
 * Meetup prize-drawing-winner picker JavaScript file.
 *
 */

/**
 * @callback parseAttendeesCallback
 * @param {Object[]} attendees
 */
/**
 * Query the Meetup API and get a list of attendees,
 * given an API key.
 *
 * @param {int} eventid The Meetup Event ID to be used for gathering a list.
 * @param {parseAttendeesCallback} callback A function to execute after successful ajax request.
 */
function get_attendees(eventid, callback) {

    $.ajax({
        type: 'POST',
        url: 'ajax.php',
        data: {
            event_id: eventid
        },
        success: callback,
        dataType: 'json'
    })
        .fail(function (xhr, status, error) {
            $("#winner-container").html("There was an error with the ajax request. Check your internet connection and the console for more information.");
            console.log("Status: " + status + " Error Thrown: " + error);
        });

}

/**
 * Put attendee list in the proper format, so the program can select a winner.
 *
 * Also, do some basic error checking to see if we got a response or error.
 *
 * @param {Object[]} attendees The response from the Meetup API.
 * @param {Object} attendees[].member The individual object that contains details about the member.
 * @param {string} attendees[].member_photo.photo_link A URL to the member's photo.
 * @return null
 */
function parse_attendees(attendees) {

    // Check to see if we have results or an error.

    if (attendees) {
        var rsvps = [];
        if (!$.isEmptyObject(attendees)) {

            for (var i = 0; i < attendees.length; i++) {

                if (attendees[i].response == "yes") {
                    var obj = {};
                    obj.name = attendees[i].member.name;
                    attendees[i].member_photo ? obj.photo = attendees[i].member_photo.photo_link : obj.photo = "";
                    rsvps.push(obj);
                }

            }

            select_winner(rsvps);

        }

        else {

            $("#winner-container").html("No RSVP's were found. Most likely, you didn't put in the right event ID. <a href=\"javascript:location.reload()\">Reload the page</a> and try again.");

        }

    }

    else {

        $("#winner-container").html(
            "Most likely, you didn't put in the right API key. <a href=\"javascript:location.reload()\">Reload the page</a> and try again."
        );
    }
}

/**
 * Pick a winner and do something special for them.
 *
 * @param {Object[]} rsvps The RSVP's in the proper format.
 * @return null
 */
function select_winner(rsvps) {

    $('#winner-banner').text('Choosing winner in...');


    var start_time, seconds_to_run, seconds, interval;
    start_time = new Date().getTime();
    seconds_to_run = 3000;
    seconds = 0;
    interval = setInterval(function () {

        seconds = new Date().getTime() - start_time;

        //noinspection JSJQueryEfficiency
        $('#countdown-timer').text(Math.ceil(Math.abs((seconds - seconds_to_run) / 1000)));

        if (seconds > seconds_to_run) {

            // If the code inside here runs, then display a picture of the chosen winner!
            clearInterval(interval);
            $('#winner-photo').html('<p><img src="' + rsvps[0].photo + '" width="150px" /></p><button id="again" class="btn btn-danger btn-lg">Run again?</button>&nbsp;<a href="javascript:location.reload();"><button class="btn btn-default btn-lg">Reload?</button></a>');
            $('#countdown-timer').empty();
            $('#winner-banner').text('WINNER!!!').css({'font-size': '3em', 'color': 'blue', 'font-weight': 'bold'});

            $('#again').click(function () {

                $('#winner-banner').empty().css({'font-size': '', 'color': '', 'font-weight': ''});
                $('#countdown-timer').empty();
                $('#winner-name').empty();
                $('#winner-photo').empty();

                select_winner(rsvps);
            });

            // Shoot off some fireworks.
            var r = 4 + parseInt(Math.random() * 16);
            for (var i = r; i--;) {
                setTimeout(
                    'createFirework(8,14,2,null,null,null,null,null,Math.random()>0.5,true)',
                    (i + 1) * (1 + parseInt(Math.random() * 1000)));
            }

            return; // End the program.

        }

        shuffle(rsvps);

        $('#winner-name').text(rsvps[0].name);

    }, 50);

}

/**
 * Randomize a given array
 *
 * @param {Array} array The array to be randomized.
 * @return {Array} The randomized array.
 */
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While elements remain...
    while (0 !== currentIndex) {

        // Pick one of the elements...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;

    }

    return array;
}

/**
 * Finally, bind an event handler to the submit button click event.
 */
$(document).ready(function () {

    $('#submit').click(function () {
        var event = $('#meetingid').val();

        if (event) {
            $('#form-container').slideUp();
            get_attendees(event, parse_attendees);
        }
    });

});
