<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use \Firebase\JWT\JWT;
require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../bootstrap.php';

$app = AppFactory::create();

const JWT_SECRET = "makey1234567";
$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/hello","/api/hello/login"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

function addHeaders(Response $response) : Response{
    $response = $response
    ->withHeader("Content-Type","application/json")
    ->withHeader("Access-Control-Allow-Origin", ("*"))
    ->withHeader('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Accept, Origin, Authorization")
    ->withHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS')
    ->withHeader('Access-Control-Expose-Headers','Authorization');
    return $response;
}

function createJWT(Response $response): Response{
    $issuedAt = time();
    $expirationTime = $issuedAt + 600;
    $payload = array(
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );
    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    return $response;
}


$app->get('/hello/{login}', function (Request $request, Response $response, $args) {
    $response->getBody()->write($args['login']);
    $response = addHeaders($response, $response->getHeaders('Origin'));
    //$token_jwt = createJWT();
    return $response;
    });

$app->post('/user', function (Request $request, Response $response, $args) use ($entityManager){
    $postVars = $request->getBody();
    $data = json_decode($postVars, true);
    $login = $data['login'];
    $pass = $data['password'];
    $lastname = $data['lastname'];
    $firstname = $data['firstname'];
    $email = $data['email'];
    $gender = $data['gender'];
    $phone = $data['phone'];
    $postaladdress = $data['postaladdress'];
    $billingaddress = $data['billingaddress'];
    
    $client = new Client();
    $client->setLogin($login);
    $client->setPassword($pass);
    $client->setLastname($lastname);
    $client->setFirstname($firstname);
    $client->setEmail($email);
    $client->setGender($gender);
    $client->setPhone($phone);
    $client->setBillingaddress($billingaddress);
    $client->setPostaladdress($postaladdress);

    $entityManager->persist($client);
    $entityManager->flush();

    $response = addHeaders($response);
    $response = createJWT($response);

    $response->getBody()->write($login);
    $response->getBody()->write(" - ");
    $response->getBody()->write($pass);
    
    return $response;
    });

$app->options('/user', function (Request $request, Response $response, $args) {

        // Evite que le front demande une confirmation à chaque modification
        $response = $response->withHeader("Access-Control-Max-Age", 600);
    
        return addHeaders ($response);
    });

// APi d'authentification générant un JWT
$app->post('/login', function (Request $request, Response $response, $args) use ($entityManager){
    $err=false;
    $postVars = $request->getBody();
    $data = json_decode($postVars, true);
    $login = $data ['login'] ?? "";
    $pass = $data ['password'] ?? "";

    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$login))   {
        $err = true;
    }
    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$pass))  {
        $err=true;
    }
    if (!$err) {
        $utilisateurRepository = $entityManager->getRepository('Client');
        $utilisateur = $utilisateurRepository->findOneBy(array('login' => $login, 'password' => $pass));
        if ($utilisateur && $login == $utilisateur->getLogin() and $pass == $utilisateur->getPassword()) {
            $response = addHeaders ($response);
            $response = createJwT ($response);
            $data = array('nickname' => $utilisateur->getLogin(), 
                          'password' => $utilisateur->getPassword(),
                          'lastname' => $utilisateur->getLastname(),
                          'firstname' => $utilisateur->getFirstname(),
                          'email' => $utilisateur->getEmail(),
                          'gender' => $utilisateur->getGender(),
                          'phone' => $utilisateur->getPhone());
                          //'postaladdress' => $utilisateur->getPostaladdress(),
                          //'billingaddress' => $utilisateur->getBillingaddress());
            $response->getBody()->write(json_encode($data,JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        } else {
            $response = $response->withStatus(401);
        }
    } else {
        $response = $response->withStatus(401);
    }

    return $response;
});

$app->options('/login', function (Request $request, Response $response, $args) {

    // Evite que le front demande une confirmation à chaque modification
    $response = $response->withHeader("Access-Control-Max-Age", 600);

    return addHeaders ($response);
});

$app->add(new Tuupola\Middleware\JwtAuthentication($options));
// Run app
$app->run();
?>