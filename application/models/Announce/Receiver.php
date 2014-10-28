<?php
/**
 * Description of Receiver
 *
 * @author terry
 */
class Announce_ReceiverModel{
    public $receiver_id;
    public $announce_id;

    public function getReceiver_id() {
        return $this->receiver_id;
    }

    public function getAnnounce_id() {
        return $this->announce_id;
    }

    public function setReceiver_id($receiver_id) {
        $this->receiver_id = $receiver_id;
    }

    public function setAnnounce_id($announce_id) {
        $this->announce_id = $announce_id;
    }

    public function toArray(){
        return (array)$this;
    }
}
