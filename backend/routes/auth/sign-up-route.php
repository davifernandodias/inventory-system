<?php
/** @var \Laravel\Lumen\Routing\Router $router */
$router->post('/user/create', 'auth\SignUpController@SignUp');
