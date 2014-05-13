<?php
require '../config.php';

$meetup_rsvps = $client->getRSVPs(array('event_id' => $_POST['event_id'] ));

$rsvps = array();
foreach ($meetup_rsvps as $rsvp){
    $rsvps[] = $rsvp;
}

echo json_encode($rsvps);