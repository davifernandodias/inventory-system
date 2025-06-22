<?php
include_once __DIR__ . '/auth/sign-up-route.php';
include_once __DIR__ . '/auth/sign-in-route.php';

$router->group(['middleware' => 'auth:api'], function () use ($router) {
    $router->get('/me', function () {
        return response()->json(auth()->user());
    });
});
