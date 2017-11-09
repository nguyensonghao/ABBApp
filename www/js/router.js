var app = angular.module('AbbApp', ['ionic', 'youtube-embed', 'ion-floating-menu']);
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
    .state('add-vote', {
      url: '/add-vote',
      templateUrl: 'pages/addVote/addVote.html'
    })
    .state('list-vote', {
      url: '/list-vote',
      templateUrl: 'pages/listVote/listVote.html'
    })
    .state('update-vote', {
      url: '/update-vote/:id',
      templateUrl: 'pages/updateVote/updateVote.html'
    })

  var user = localStorage.getItem('currentUser');
  if (user && user != 'undefined') {
    $urlRouterProvider.otherwise('/home');
  } else {
    $urlRouterProvider.otherwise('/sign-in');
  }

  $ionicConfigProvider.backButton.text('').icon('icon ion-ios-arrow-back');
})