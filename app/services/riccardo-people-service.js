/**
 * User Details Service
 * 
 * @factory peopleService
 * @namespace peopleService
 * @memberOf riccardo
 * @return {object}
 * @description
 * This service is used to get the people and the person details.
 */

(function () {
    'use strict';

    angular.module('riccardo').factory('peopleService', peopleService);

    peopleService.$inject = ['$http'];

    function peopleService($http) {
        var service = {};

        service.getPeople = getPeople;

        return service;

        /**
         * @name getPeople
         * @function getPeople
         * @memberOf riccardo.peopleService
         * @description
         * Get the people.
         */
        function getPeople() {
            // Preparing parameters object for the Http request
            var httpParam = {
                method: 'GET',
                url: 'data/people.json'
            };

            // Http request
            return $http(httpParam);
        }
    }
}());