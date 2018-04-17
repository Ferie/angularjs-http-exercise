/**
 * Riccardo's Front End exercise module definition
 * 
 * @module riccardo
 * @namespace riccardo
 * @description
 * Defines the main module for the application.
 */

(function (angular) {
    'use strict';

    if (!angular) {
        throw 'It seems that angular.js is not loaded into the project or maybe this script is loaded before angular.js reference.';
    } else {
        angular.module('riccardo', [
            'ui.router'
        ]);
    }
})(this.angular);