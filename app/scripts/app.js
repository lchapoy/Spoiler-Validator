	'use strict';

/**
 * @ngdoc overview
 * @name todoApp
 * @description
 * # todoApp
 *
 * Main module of the application.
 */
angular
  .module('validateApp', [
    'ngCookies',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'ngResource'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/spoiler', {
        templateUrl: 'views/spoiler.html',
        controller: 'SpoilerCtrl',
        controllerAs: 'spoiler'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
