<?php
/** @var \Laravel\Lumen\Routing\Router $router */
$router->post('/user/login', 'auth\SignInController@SignIn');
