/*
 * Meetup prize-drawing-winner picker JavaScript file.
 *
 */

/**
 * Query the Meetup API and get a list of attendees,
 * given an API key.
 *
 * @param int eventid The Meetup Event ID to be used for gathering a list.
 * @param string meetupapi The Meetup API for the account to be used.
 * @param function callback A function to execute after successful ajax request.
 */
function get_attendees( eventid, meetupapi, callback ){

    $.ajax({
        type: 'GET',
        url: 'https://api.meetup.com/2/rsvps',
        data: {
            event_id: eventid,
            key: meetupapi
        },
        success: callback,
        dataType: 'jsonp'
    })
    .fail( function( xhr, status, error ){
        $("#winner-container").html("There was an error with the ajax request. Check your internet connection and the console for more information.");
        console.log("Status: " + status + " Error Thrown: " + error);
    });

}

/**
 * Put attendee list in the proper format, so the program can select a winner.
 *
 * Also, do some basic error checking to see if we got a response or error.
 *
 * @param mixed data The response from the Meetup API.
 * @return null
 */
function parse_attendees( data ){
        
    // Check to see if we have results or an error.
    
    if( data.results ){

        var attendees = data.results,
            attendee = [];
        
        if( !isEmpty( attendees ) ) {
          
            for( i = 0; i < attendees.length; i++ ){
                
                if( attendees[i].response == "yes" ){
                    var obj = {};
                    obj.name = attendees[i].member.name;
                    attendees[i].member_photo ? obj.photo = attendees[i].member_photo.photo_link : obj.photo = "";
                    attendee.push(obj);
                }
            
            }
            
            select_winner( attendee );
            
        }
        
        else{
        
            $("#winner-container").html("No RSVP's were found. Most likely, you didn't put in the right event ID. <a href=\"javascript:location.reload()\">Reload the page</a> and try again.");
            
            return;
        
        }
        
    }
    
    else {
        
        $("#winner-container").html(
            data.status + "<p></p>"+
            data.problem + "<p></p>"+
            "Most likely, you didn't put in the right API key. <a href=\"javascript:location.reload()\">Reload the page</a> and try again."
        );
        
        return;
        
    }
}

/**
 * Checks to see if a given object is empty.
 *
 * @param object obj The object in question.
 * @return bool Returns true if the object is empty, false if not.
 */
function isEmpty( obj ){

    for( var i in obj){
        return false;
    }
    
    return true;

}

/**
 * Pick a winner and do something special for them.
 *
 * @param mixed rsvps The RSVP's in the proper format.
 * @return null
 */
function select_winner( rsvps ){

    $('#winner-banner').text( 'Choosing winner in...' );


    var start_time = new Date().getTime(),
        seconds_to_run = 5000, // in milliseconds
        seconds = 0,
        interval = setInterval( function(){
        
            seconds = new Date().getTime() - start_time;
            
            $('#countdown-timer').text( Math.round( Math.abs( ( seconds - seconds_to_run) / 1000 ) ) );
            
            if( seconds > seconds_to_run ){
                
                // If the code inside here runs, then display a picture of the chosen winner!
                clearInterval(interval);
                $('#winner-photo').html('<p><img src="' + rsvps[0].photo + '" width="150px" /></p>');
                $('#countdown-timer').empty();
                $('#winner-banner').text('WINNER!!!').css( {'font-size':'3em','color':'blue','font-weight':'bold'} );
                
                // Shoot off some fireworks.
                var r = 4 + parseInt(Math.random()*16);
                for(var i = r; i--;){
                    setTimeout(
                        'createFirework(8,14,2,null,null,null,null,null,Math.random()>0.5,true)',
                        (i+1)*(1+parseInt(Math.random()*1000)));
                    }
                    
                return; // End the program.
                
            }
            
            shuffle( rsvps );
            
            $('#winner-name').text( rsvps[0].name );

        }, 50 );

}

/**
 * Randomize a given array
 *
 * @param array array The array to be randomized.
 * @return array The randomized array.
 */
function shuffle( array ) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While elements remain...
    while ( 0 !== currentIndex ) {

        // Pick one of the elements...
        randomIndex = Math.floor( Math.random() * currentIndex );
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
$(document).ready(function(){

    $('#submit').click(function(e){
        var event = $( '#meetingid' ).val(),
            api = $( '#meetupapi' ).val();
        
        if( event && api ){
            $('#form-container').slideUp();
            get_attendees( event, api, parse_attendees );
        } 
        
        else{
            return;
        }

    });

});
