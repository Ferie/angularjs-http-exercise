/**
 * Run function.
 */

(function () {
    'use strict';

    angular.module('riccardo').run(run);

    /**
     * @function run
     * @memberOf riccardo
     * @param $rootScope
     * @param $state
     * @param $stateParams
     * @param $trace
     */
    function run($rootScope, $state, $stateParams, $trace) {
        /*************************/
        /*** Debug transitions ***/
        /*************************/
        // For debug purposes, uncomment this line and in the console there will be all the
        // states transitions
        // $trace.enable('TRANSITION');

        /********************************************************************/
        /*** Set the `$state` available to the `$rootScope`               ***/
        /*** With this trick we can have available the title of the pages ***/
        /********************************************************************/
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
}());
