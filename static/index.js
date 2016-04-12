angular.module('memoApp', ['ui.router'])

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('memo', {
                url: '/',
                templateUrl: 'memoPage.html',
                controller: 'memoController'
            })

            // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
            .state('about', {
                url: '/about',
                templateUrl: 'memoAbout.html'
            });
    }]);