#Pickme

A quick PHP Script to randomly select a member from a MeetUp Event
using the RSVP list via the MeetUp API.

My original version was designed to run from the command like but I got a couple
request to move my [Gist](https://gist.github.com/shocm/11260096) post to a Github Repo
to allow more people to contribute and extend it.

So here it is, feel free to add any improvement or bells and whistles you would like to it.

Thanks to @johncongdon for "making it work"

## Installation

Clone this repo

Run ```composer install```

Rename ```config-sample.php``` to ```config.php```

Add your Meetup API key to ```config.php```

### Command Line

Modify the script ```pickme-cli.php``` and add your Event Id.

Run script ```php pickme-cli.php```

### Web Front-End

Point your web server of choice at the public_html folder.



Enjoy!!