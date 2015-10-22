angular.module('app')
    .controller('PlayerControlController', function ($rootScope, $scope, $uibModal, TeamSettingsSvc, ScoreCounterSvc, GraphicsSvc, lodash) {
        $scope.data = {};
        $scope.animationsEnabled = true;

        TeamSettingsSvc.updateData();
        TeamSettingsSvc.getUpdates(function (data) {
            $scope.data = data;
            $scope.$digest();
        });

        ScoreCounterSvc.updateData();
        ScoreCounterSvc.getUpdates(function (data) {
            $scope.scoreData = data;
            $scope.$digest();
        });

        $scope.clear = GraphicsSvc.clearLt;

        $scope.setPlayerIsPlaying = function (team, playerNumber, isPlaying) {
            TeamSettingsSvc.setPlayerIsPlaying(team, playerNumber, isPlaying);
        };

        $scope.playerScored = function (team, playerNumber) {
            // Show Graphics
            var teamData = $scope.data[team];
            var playerData = lodash.find($scope.data[team].players, lodash.matchesProperty('number', playerNumber));

            GraphicsSvc.score(teamData, playerData);

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
            var teamData = $scope.data[team];
            var playerData = lodash.find($scope.data[team].players, lodash.matchesProperty('number', playerNumber));

            switch (card) {
                case 'yellow':
                    GraphicsSvc.yellowCard(teamData, playerData);
                    break;
                case 'red':
                    GraphicsSvc.redCard(teamData, playerData);
                    break;
            }
        };

        $scope.teamPenaltyAction = function (team, type) {
            var teamData = $scope.data[team];

            switch (type) {
                case 'corner':
                    GraphicsSvc.corner(teamData);
                    break;
                case 'penalty':
                    GraphicsSvc.penalty(teamData);
                    break;
            }
        };

        $scope.showGenericLT = function (team, playerNumber) {
            var teamData = $scope.data[team];
            var playerData = lodash.find($scope.data[team].players, lodash.matchesProperty('number', playerNumber));

            GraphicsSvc.genericLt(playerData.name, playerData.description, teamData);
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
    .controller('ModalInstanceCtrl', function ($scope, $rootScope, $modalInstance, TeamSettingsSvc, GraphicsSvc, lodash) {

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
            $scope.allData = data;
            $scope.$digest();
        });

        function setPlayerIsPlaying (team, playerNumber, isPlaying) {
            TeamSettingsSvc.setPlayerIsPlaying(team, playerNumber, isPlaying);
        }

        $scope.ok = function () {
            // Show Graphics
            var teamData = $scope.allData[team];
            var offData = lodash.find($scope.allData[team].players, lodash.matchesProperty('number', playerToBeSubstituted));

            GraphicsSvc.substitution(teamData, $scope.selected.player, offData);

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
