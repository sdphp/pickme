Wrote a quick PHP Script to randomly select a member of our SDPHP User Group using the MeetUp API and polling all the members who RSVP for an Event. This version is designed to run from the command like ```php randomRSVP.php``` Thanks to @johncongdon for "making it work"


Moved this Gist to a Git Repo to allow people to add contribute back and build out this simple script more.

Some ideas include creating a Web page which makes a lot of sense. 

# Create Composer file and add MeetUp API PAckage 
composer init --require="dms/meetup-api-client:~1.0"

# Install packages
composer install
