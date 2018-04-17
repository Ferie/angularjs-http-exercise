/**
 * Header Component
 * 
 * @memberOf riccardo
 * @description
 * Header Component.
 */

(function () {
    'use strict';

    angular.module('riccardo').component('riccardoHeader', {
        bindings: {},
        controller: HeaderCmptCtrl,
        templateUrl: 'app/common/header/riccardo-header.html'
    });

    HeaderCmptCtrl.$inject = [];

    /**
     * @name HeaderCmptCtrl
     * @function HeaderCmptCtrl
     * @memberOf riccardo.riccardoHeader
     * @description
     * Header component controller.
     */
    function HeaderCmptCtrl() {
        var $ctrl = this;
    }
}());