var app = angular.module('AbbApp', ['ionic']);
app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'pages/home/home.html'
    })
    .state('new-feed', {
      url: '/new-feed/:type',
      templateUrl: 'pages/newFeed/newFeed.html'
    })
    .state('event-detail', {
      url: '/event-detail/:id',
      templateUrl: 'pages/eventDetail/eventDetail.html'
    })
    .state('sign-up', {
      url: '/sign-up',
      templateUrl: 'pages/signUp/signUp.html'
    })
    .state('forgot-pass', {
      url: '/forgot-pass',
      templateUrl: 'pages/forgotPass/forgotPass.html'
    })
    .state('sign-in', {
      url: '/sign-in',
      templateUrl: 'pages/signIn/signIn.html'
    })
    .state('vote', {
      url: '/vote',
      templateUrl: 'pages/vote/vote.html'
    })
    .state('vote-detail', {
      url: '/vote-detail/:id',
      templateUrl: 'pages/voteDetail/voteDetail.html'
    })

  var user = JSON.parse(localStorage.getItem('currentUser'));
  if (user) {
    $urlRouterProvider.otherwise('/home');
  } else {
    $urlRouterProvider.otherwise('/sign-in');
  }

  $ionicConfigProvider.backButton.text('').icon('icon ion-ios-arrow-back');
})