angular.module('AbbApp', ['ionic']).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'pages/home/home.html',
      controller: 'HomeController'
    })
    .state('sign-up', {
      url: '/sign-up',
      templateUrl: 'pages/sign-up/sign-up.html'
    })
    .state('sign-in', {
      url: '/sign-in',
      templateUrl: 'pages/sign-in/sign-in.html'
    })
  $urlRouterProvider.otherwise('/sign-up');
})