angular.module('app')
    .controller('PlayerControlController', function($scope, TeamSettingsSvc) {
        $scope.data = {};

        TeamSettingsSvc.updateData();
        TeamSettingsSvc.getUpdates(function (data) {
            $scope.data = data;
            $scope.$digest();
        });

        $scope.setPlayerIsPlaying = function (team, playerNumber, isPlaying) {
            TeamSettingsSvc.setPlayerIsPlaying(team, playerNumber, isPlaying);
        };


    });
