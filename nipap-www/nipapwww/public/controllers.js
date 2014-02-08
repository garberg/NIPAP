/*
 * Controllers for the NIPAP AngularJS app
 */

/*
 * Define nipapApp angular application
 */
var nipapApp = angular.module('nipapApp', [ 'ui.bootstrap.dropdown' ]);

/*
 * VRFListController - used to list VRFs on the /vrf/list-page
 */
nipapApp.controller('VRFListController', function ($scope, $http) {

    // Fetch VRFs from backend
    $http.get('/xhr/list_vrf').success(function (data) {
        if (data.hasOwnProperty('error')) {
            // display some error message
        } else {
            $scope.vrfs = data;
        }
    });

});
