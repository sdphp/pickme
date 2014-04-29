<?php
require 'vendor/autoload.php';
use \DMS\Service\Meetup\MeetupKeyAuthClient;
 
$seconds_to_run = 10;
$time_between_name_flash = 125000;  //in microseconds
$screen_width = 80;  //If terminal font is large, this should be reduced.
 
 
// Add you Meetup.com API Key
$client = MeetupKeyAuthClient::factory(array('key' => '<YOUR MEETUP API KEY>'));
 
// Put the Event ID that you want to pull the RSVP list from
// Event ID can be pulled from the URL of the Event on MeetUp if needed
$meetup_rsvps = $client->getRSVPs(array('event_id' => '<YOUR MEETUP EVENT ID>'));
 
// Clear your screen
passthru('clear');
 
$rsvps = array();
foreach ($meetup_rsvps as $rsvp){
    $rsvps[] = $rsvp;
}
 
$start_time = time();
$seconds = 0;
while ($seconds < $seconds_to_run) {
    shuffle($rsvps);
    $seconds = time() - $start_time;
 
    $max_name_width = $screen_width - strlen($seconds) - 3;
 
    $name = substr($rsvps[0]['member']['name'], 0, $max_name_width);
    $name = str_pad($name, $max_name_width);
 
    print "\r" . str_repeat(' ', $screen_width) . "\r";
    print "$seconds - " . $name;
    usleep($time_between_name_flash);
}
 
print "\r" . str_repeat(' ', $screen_width) . "\r";
print "The winner is" . str_repeat(' ', 80) . "\n";
print $rsvps[0]['member']['name']."\n";