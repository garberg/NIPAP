/*
 * Controllers for the NIPAP AngularJS app
 */

/*
 * Define nipapApp angular application
 */
var nipapApp = angular.module('nipapApp', []);

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

    $scope.showVrfMenu = function (vrf_id, vrf_rt) {
        var menu = getPopupMenu($(this), 'VRF', vrf_id);

        menu.append('<a href="/vrf/edit/' + vrf_id + '">Edit</a>');
        menu.append('<a id="vrf_remove' + vrf_id + '" href="/vrf/remove/' + vrf_id + '">Remove</a>');

        $('#vrf_remove' + vrf_id).click(function(e) {
            e.preventDefault();
            var dialog = showDialogYesNo('Really remove VRF?', 'Are you sure you want to remove the VRF "' + vrf_rt + '"?',
            function () {
                var data = {
                    'id': vrf_id
                };
                $.getJSON('/xhr/remove_vrf', data, vrfRemoved);

                hidePopupMenu();
                dialog.dialog('close');

            });
        });

        menu.slideDown('fast');
        e.preventDefault();
        e.stopPropagation();
    }

});
