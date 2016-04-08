angular.module('memoApp', ['ui.router'])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('landing', {
                url: '/',
                templateUrl: 'memoView.html'
            });
    }]);