<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('America/Lima');
require_once "vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
'host' => 'ec2-3-222-49-168.compute-1.amazonaws.com',
'driver' => 'pdo_pgsql',
'user' => 'yivbdbiykhmayc',
'password' => 'bc9d4859369ed527201035b4f1d76d5c16aa0058b58225f2b5e7784b60d09720',
'dbname' => 'd8opg91vl5kq6l',
'port' => '5432'
);
$entityManager = EntityManager::create($conn, $config);
?>