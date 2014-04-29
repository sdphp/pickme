#Pickme

A quick PHP Script to randomly select a member from a MeetUp Event
using the RSVP list via the MeetUp API.

My original version was designed to run from the command like but I got a couple
request to move my [Gist](https://gist.github.com/shocm/11260096) post to a Github Repo
to allow more people to contribute and extend it.

So here it is, feel free to add any improvement or bells and whistles you would like to it.

Thanks to @johncongdon for "making it work"

## Installation

### Command Line

Clone this repo
run ```composer install```

Modify the script ```pickme-cli.php``` and add you MeetUp API Key and you Event Id.

Run script ```php pickme-cli.php```

### Web Front-End

Clone this repo

Point your web server of choice at the public_html folder.

Enjoy.
