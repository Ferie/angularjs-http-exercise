/**
 * Main configuration function.
 */

(function () {
    'use strict';

    angular.module('riccardo').config(config);

    /**
     * @function config
     * @memberOf riccardo
     * @param $urlMatcherFactoryProvider
     * @param $urlRouterProvider
     * @param $stateProvider
     * @param $stateParamsProvider
     * @param $locationProvider
     * @description
     * - Define the states for the whole application (using `UI-Router`).
     * - Provide clean URL for the application.
     */
    function config($urlMatcherFactoryProvider, $urlRouterProvider, $stateProvider, $stateParamsProvider, $locationProvider) {
        $urlMatcherFactoryProvider.caseInsensitive(true);
        $urlMatcherFactoryProvider.strictMode(false);

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('riccardo', {
                abstract: true,
                views: {
                    header: {},
                    sidebar: {},
                    content: {},
                    detailsContent: {},
                    footer: {}
                }
            })
            .state('riccardo-exercise', {
                url: '/',
                parent: 'riccardo',
                data: {
                    pageTitle: 'People - Riccardo\'s Front End exercise'
                }
            })
            .state('person-details', {
                url: 'person-details/:id/:name',
                parent: 'riccardo-exercise',
                data: {
                    pageTitle: 'Person Details - Riccardo\'s Front End exercise'
                },
                params: {
                    id: $stateParamsProvider.id,
                    person: $stateParamsProvider.person
                },
                views: {
                    '!detailsContent': {
                        component: 'person'
                    }
                }
            });

        $locationProvider.html5Mode(true);
    }
}());