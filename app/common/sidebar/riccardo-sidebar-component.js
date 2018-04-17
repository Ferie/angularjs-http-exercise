/**
 * Sidebar Component
 * 
 * @memberOf riccardo
 * @description
 * Sidebar component.
 */

(function () {
    'use strict';

    angular.module('riccardo').component('riccardoSidebar', {
        bindings: {},
        controller: SidebarCmptCtrl,
        templateUrl: 'app/common/sidebar/riccardo-sidebar.html'
    });

    SidebarCmptCtrl.$inject = ['$rootScope', '$state', 'peopleService'];

    /**
     * @name SidebarCmptCtrl
     * @function SidebarCmptCtrl
     * @memberOf riccardo.SidebarCmptCtrl
     * @param $rootScope
     * @param $state
     * @description
     * Sidebar component controller.
     */
    function SidebarCmptCtrl($rootScope, $state, peopleService) {
        var $ctrl = this;
        $ctrl.open = true;

        $rootScope.overlay = true;

        // Get the people from the service
        peopleService.getPeople()
        // Supply the success and failure response
        .then(successRequest, failureRequest);

        /**
         * @name successRequest
         * @function successRequest
         * @memberOf riccardo.PersonDetailsCmptCtrl
         * @param response
         * @description
         * HTTP success response.
         */
        function successRequest(response) {
            if (!!response.data.People) {
                $ctrl.people = response.data.People;
                // Hide loader
                $rootScope.overlay = false;
            } else {
                console.error('Http request error in retrieving the information from the server');
                // Hide loader
                $rootScope.overlay = false;
            }
        }

        /**
         * @name failureRequest
         * @function failureRequest
         * @memberOf riccardo.PersonDetailsCmptCtrl
         * @param reason
         * @description
         * HTTP failure reason.
         */
        function failureRequest(reason) {
            console.error('Error in sending the request to the server: ', reason.data);
            // Hide loader
            $rootScope.overlay = false;
        }
    }
}());