angular.module('app')
    .controller('LtController', function($scope, GraphicsSvc, LtsSvc) {
        $scope.data = {};

        LtsSvc.updateData();
        LtsSvc.getUpdates(function (data) {
            $scope.data = data;
            $scope.$digest();
        });

        $scope.showLowerThird = function (name, description) {
            GraphicsSvc.genericLt(name, description, null);
        };

        $scope.clear = GraphicsSvc.clearLt;

    });