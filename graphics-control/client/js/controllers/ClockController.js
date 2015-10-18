angular.module('app')
    .controller('ClockController', function($scope, ClockControlSvc) {
        $scope.data = {};

        ClockControlSvc.updateData();
        ClockControlSvc.getUpdates(function (data) {
            $scope.data = data;
            $scope.$digest();
        });

        ClockControlSvc.getClockTimeString(function (time) {
            $scope.clockTimeString = time;
        });

        ClockControlSvc.getExtraTimeClockString(function (time) {
            $scope.extraTimeClockString = time;
        });

        ClockControlSvc.getExtraTime(function (time) {
            $scope.extraTime = time;
        });

        $scope.startClock = ClockControlSvc.startClock;
        $scope.resetClock = ClockControlSvc.resetClock;
        $scope.stopClock = ClockControlSvc.stopClock;

        $scope.showClock = ClockControlSvc.showClock;
        $scope.hideClock = ClockControlSvc.hideClock;

        $scope.setMinute = function () {
            ClockControlSvc.setClockTime($scope.newMinute);
            $scope.newMinute = null;
        };

        $scope.addExtraTime = function () {
            ClockControlSvc.addExtraTime($scope.newExtraTime);
            $scope.newExtraTime = null;
        };

        $scope.removeExtraTime = ClockControlSvc.removeExtraTime;

    });
