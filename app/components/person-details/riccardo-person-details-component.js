/**
 * Person Details Component
 * 
 * @memberOf riccardo
 * @description
 * Person Details Component.
 */

(function () {
    'use strict';

    angular.module('riccardo').component('person', {
        bindings: {},
        controller: PersonDetailsCmptCtrl,
        templateUrl: 'app/components/person-details/riccardo-person-details.html'
    });

    PersonDetailsCmptCtrl.$inject = ['$rootScope', '$state', '$stateParams', 'peopleService'];

    /**
     * @name PersonDetailsCmptCtrl
     * @function PersonDetailsCmptCtrl
     * @memberOf riccardo.PersonDetailsCmptCtrl
     * @param $rootScope
     * @param $state
     * @param $stateParams
     * @param peopleService
     * @description
     * Person Details component controller.
     */
    function PersonDetailsCmptCtrl($rootScope, $state, $stateParams, peopleService) {
        var $ctrl = this;

        if (!!$stateParams.person) {
            $ctrl.person = $stateParams.person;
        } else {
            $state.go('riccardo-exercise', {}, {
                inherit: false,
                location: true,
                reload: true,
                notify: true
            });
        }
    }
}());