'use strict';

angular.module('app')
    .service('LtsSvc', function (WebSocketSvc) {
        var namespace = 'ltData';

        this.updateData = function () {
            WebSocketSvc.sendMessage(namespace, 'requestData', null);
        };

        this.getUpdates = function (callback) {
            WebSocketSvc.listen(namespace, 'newData', function (data) {
                callback(data);
            });
        };

    });
