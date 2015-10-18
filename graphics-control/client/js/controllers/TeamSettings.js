angular.module('app')
    .controller('TeamSettingsController', function($scope, TeamSettingsSvc) {
        $scope.data = {};

        TeamSettingsSvc.updateData();
        TeamSettingsSvc.getUpdates(function (data) {
            $scope.data = data;
            $scope.$digest();
        });

        $scope.newHomePlayer = {
            'name': '',
            'number': '',
            'filename': '',
            'description': '',
            'isPlaying': false
        };

        $scope.addHomePlayer = function () {
            if ($scope.newHomePlayer.name !== '') {
                if ($scope.newHomePlayer.number !== '') {
                    TeamSettingsSvc.addHomePlayer($scope.newHomePlayer);
                    $scope.newHomePlayer = {
                        'name': '',
                        'number': '',
                        'filename': '',
                        'description': '',
                        'isPlaying': false
                    };
                }
            }
        };

        $scope.newGuestPlayer = {
            'name': '',
            'number': '',
            'filename': '',
            'description': ''
        };

        $scope.addGuestPlayer = function () {
            if ($scope.newGuestPlayer.name !== '') {
                if ($scope.newGuestPlayer.number !== '') {
                    TeamSettingsSvc.addGuestPlayer($scope.newGuestPlayer);
                    $scope.newGuestPlayer = {
                        'name': '',
                        'number': '',
                        'filename': '',
                        'description': ''
                    }
                }
            }
        };

        $scope.removeHomePlayer = function (id) {
            TeamSettingsSvc.removeHomePlayer(id);
        };

        $scope.removeGuestPlayer = function (id) {
            TeamSettingsSvc.removeGuestPlayer(id);
        };

        $scope.changeHomeTeamName = function () {
            TeamSettingsSvc.changeHomeTeamName($scope.data.home.name);
        };

        $scope.changeGuestTeamName = function () {
            TeamSettingsSvc.changeGuestTeamName($scope.data.guest.name);
        };

        $scope.changeHomeColour = function () {
            TeamSettingsSvc.changeHomeTeamColour($scope.data.home.colour);
            $scope.newHomeColour = '';
        };

        $scope.changeGuestColour = function () {
            TeamSettingsSvc.changeGuestTeamColour($scope.data.guest.colour);
        };

        $scope.changeHomeTeamShortName = function () {
            TeamSettingsSvc.changeHomeTeamShortName($scope.data.home.shortName);
        };

        $scope.changeGuestTeamShortName = function () {
            TeamSettingsSvc.changeGuestTeamShortName($scope.data.guest.shortName);
        };

    });
