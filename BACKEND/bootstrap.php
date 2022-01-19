<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('America/Lima');
require_once "vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
'host' => 'ec2-34-194-171-47.compute-1.amazonaws.com',
'driver' => 'pdo_pgsql',
'user' => 'zodwzexnkwqwaz',
'password' => '5e34762c8904c675a2fba1ff71f5255d031f1050f61e41d6448c2246cf517f18',
'dbname' => 'd25tb2apr00dbu',
'port' => '5432'
);
$entityManager = EntityManager::create($conn, $config);
?>