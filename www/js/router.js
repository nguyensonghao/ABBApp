app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'pages/home/home.html',
            controller: 'HomeController'
        })
    $urlRouterProvider.otherwise('/home');
})