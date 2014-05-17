<!doctype html>
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Pickme: Meetup random event winner picker</title>
        <meta name="description" content="This app will select a random winner from the Yes RSVP's to a Meetup event given a Meetup event ID and valid API key." />
		<meta property="og:type" content="website" />
		<meta property="og:title" content="Pickme: Meetup random event winner picker" />
		<meta property="og:description" content="This app will select a random winner from the Yes RSVP's to a Meetup event given a Meetup event ID and valid API key." />
        <link href='//fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" type="text/css" href="normalize.css" />
        <link rel="stylesheet" type="text/css" href="bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="main.css" />
        <link rel="stylesheet" type="text/css" href="fireworks.js/css/fireworks.css" media="screen" />
        <script src="fireworks.js/script/soundmanager2-nodebug-jsmin.js"></script>
        <script src="fireworks.js/script/fireworks.js"></script>
    </head>
    <body>

        <!--

         Fireworks elements (cloned and animated via script):

         #fireworks-template
         #fireContainer

        -->

        <div id="fireworks-template">
             <div id="fw" class="firework"></div>
             <div id="fp" class="fireworkParticle"><img src="fireworks.js/image/particles.gif" alt="" /></div>
        </div>

        <div id="fireContainer"></div>

        <!--

         Main app.

        -->


        <div id="form-container" class="container">

            Enter details below.
            <p></p>
            <input type="text" class="form-control input-lg" name="event" id="meetingid" placeholder="Enter Meetup Event ID (Required)" />
            <p></p>
            <button type="submit" id="submit" class="btn btn-default btn-lg">Choose Winner</button>

        </div>

        <div id="winner-container" class="container">

			<div id="winner-banner"></div>
            <div id="countdown-timer"></div>
            <div id="winner-name"></div>
            <div id="winner-photo"></div>

        </div>

        <script src="//code.jquery.com/jquery-1.11.0.js"></script>
        <script src="main.js"></script>
    </body>
</html>
