var app = angular.module('AbbApp', ['ionic']);
app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'pages/home/home.html',
      controller: 'HomeController'
    })
    .state('home-page', {
      url: '/home-page',
      templateUrl: 'pages/newFeed/newFeed.html'
    })
    .state('event-detail', {
      url: '/event-detail',
      templateUrl: 'pages/eventDetail/eventDetail.html',
    })
    .state('sign-up', {
      url: '/sign-up',
      templateUrl: 'pages/signUp/signUp.html',
      controller: 'SignUpController'
    })
    .state('sign-in', {
      url: '/sign-in',
      templateUrl: 'pages/signIn/signIn.html',
      controller: 'SignInController'
    })

  // var user = JSON.parse(localStorage.getItem('currentUser'));
  // if (user) {
  //   $urlRouterProvider.otherwise('/home');
  // } else {
  //   $urlRouterProvider.otherwise('/sign-up');
  // }
  $urlRouterProvider.otherwise('/home-page');
})