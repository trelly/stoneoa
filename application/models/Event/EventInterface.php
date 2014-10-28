<?php
/**
 *
 * @author terry
 */
interface EventInterface {
    
    public function trigger();
    
    public function addEvent();
    
    public function removeEvent();
}
