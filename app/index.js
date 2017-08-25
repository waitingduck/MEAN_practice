/**
 * @module MemoApp - App configuration 
 */
angular.module('memoApp', ['ui.router'])

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('memo', {
                url: '/',
                templateUrl: 'pages/memo/memoPage.html',
                controller: 'memoController'
            })

            // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
            .state('about', {
                url: '/about',
                templateUrl: 'pages/about/memoAbout.html'
            });
    }]);

/**
 * It is a test jsdoc demo function
 * @param a input a
 * @returns {boolean} jsdoc detect output type
 */
function test(a) {
    return true;
}
