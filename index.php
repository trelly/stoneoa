<?php
define("APP_PATH",  realpath(dirname(__FILE__) . "/"));
ini_set('display_errors','off');
$application = new Yaf_Application( APP_PATH . "/configs/application.ini", "product");
$application->bootstrap()->run();
?>
