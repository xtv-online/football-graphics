angular.module('app')
    .controller('PlayerControlController', function ($scope, $uibModal, TeamSettingsSvc) {
        $scope.data = {};
        $scope.animationsEnabled = true;

        TeamSettingsSvc.updateData();
        TeamSettingsSvc.getUpdates(function (data) {
            $scope.data = data;
            $scope.$digest();
        });

        $scope.setPlayerIsPlaying = function (team, playerNumber, isPlaying) {
            TeamSettingsSvc.setPlayerIsPlaying(team, playerNumber, isPlaying);
        };


        $scope.open = function (team, size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'substituteModal',
                controller: 'Modal' + team + 'InstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            });
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };



    })
    .controller('ModalHomeInstanceCtrl', function ($scope, $modalInstance, TeamSettingsSvc) {

        $scope.data = {};

        $scope.selected = {
            player: ""
        };

        TeamSettingsSvc.updateData();
        TeamSettingsSvc.getUpdates(function (data) {
            $scope.data = data.home.players;
            $scope.$digest();
        });

        $scope.setPlayerIsPlaying = function (team, playerNumber, isPlaying) {
            TeamSettingsSvc.setPlayerIsPlaying(team, playerNumber, isPlaying);
        };

        $scope.ok = function () {
            console.log("Selected", "to substitute with")
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
}).controller('ModalGuestInstanceCtrl', function ($scope, $modalInstance, TeamSettingsSvc) {

        $scope.data = {};

        $scope.selected = {
            player: ""
        };

        TeamSettingsSvc.updateData();
        TeamSettingsSvc.getUpdates(function (data) {
            $scope.data = data.guest.players;
            $scope.$digest();
        });

        $scope.setPlayerIsPlaying = function (team, playerNumber, isPlaying) {
            TeamSettingsSvc.setPlayerIsPlaying(team, playerNumber, isPlaying);
        };

        $scope.ok = function () {
            console.log("Selected", "to substitute with", "on team")
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
