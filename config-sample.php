<?php
require 'vendor/autoload.php';
use \DMS\Service\Meetup\MeetupKeyAuthClient;

// Add you Meetup.com API Key
$client = MeetupKeyAuthClient::factory(array('key' => '<YOUR MEETUP API KEY>'));