angular.module('app')
    .controller('PlayerControlController', function ($rootScope, $scope, $uibModal, TeamSettingsSvc, ScoreCounterSvc) {
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

        $scope.playerScored = function (team, playerNumber) {
            // Show Graphics

            // Change Score
            switch (team) {
                case 'home':
                    ScoreCounterSvc.incrementHome();
                    break;
                case 'guest':
                    ScoreCounterSvc.incrementGuest();
                    break;
            }
        };

        $scope.playerGotCard = function (team, playerNumber, card) {
            // Show Graphics
            // team: home, guest
            // playerNumber: int
            // card: yellow, red
        };

        $scope.teamPenaltyAction = function (team, type) {
            // Show Graphics
            // team: home, guest
            // type: corner, penalty
        };

        $scope.open = function (team, playerNumber, size) {

            $rootScope.selectedTeam = team;
            $rootScope.playerToBeSubstituted = playerNumber;
            console.log('selected player is', playerNumber);

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'substituteModal',
                controller: 'ModalInstanceCtrl',
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
    .controller('ModalInstanceCtrl', function ($scope, $rootScope, $modalInstance, TeamSettingsSvc) {

        $scope.data = {};
        var team = $rootScope.selectedTeam;
        console.log('team is', team);
        var playerToBeSubstituted = $rootScope.playerToBeSubstituted;

        $scope.selected = {
            player: ""
        };

        TeamSettingsSvc.updateData();
        TeamSettingsSvc.getUpdates(function (data) {
            $scope.data = data[team].players;
            $scope.$digest();
        });

        function setPlayerIsPlaying (team, playerNumber, isPlaying) {
            TeamSettingsSvc.setPlayerIsPlaying(team, playerNumber, isPlaying);
        };

        $scope.ok = function () {
            // Show Graphics

            // Change data
            setPlayerIsPlaying(team, $scope.selected.player.number, true);
            setPlayerIsPlaying(team, playerToBeSubstituted, false);
            $modalInstance.close();
            delete $rootScope.selectedTeam
            delete $rootScope.playerToBeSubstituted
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
            delete $rootScope.selectedTeam
            delete $rootScope.playerToBeSubstituted
        };
});
