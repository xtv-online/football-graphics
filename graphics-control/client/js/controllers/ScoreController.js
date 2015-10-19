angular.module('app')
    .controller('ScoreController', function($scope, ScoreCounterSvc, TeamSettingsSvc) {
        $scope.data = {};
        $scope.teamData = {};

        ScoreCounterSvc.updateData();
        ScoreCounterSvc.getUpdates(function (data) {
            $scope.data = data;
            $scope.$digest();
        });

        TeamSettingsSvc.updateData();
        TeamSettingsSvc.getUpdates(function (data) {
            $scope.teamData = data;
            $scope.$digest();
        });

        $scope.adjustScore = function(team, direction){
            switch (team) {
                case 'home':
                    switch (direction){
                        case 'up':
                            ScoreCounterSvc.incrementHome()
                            break;
                        case 'down':
                            ScoreCounterSvc.decrementHome()
                            break;
                    }
                    break;
                case 'guest':
                    switch (direction){
                        case 'up':
                            ScoreCounterSvc.incrementGuest()
                            break;
                        case 'down':
                            ScoreCounterSvc.decrementGuest()
                            break;
                    }
                    break;
            }

        };

    });