var indexPageModule = angular.module('indexPageModule', ['factories']);


indexPageModule.controller('IndexPageController', ['$scope', 'API', '_', 'Analytics',
    function ($scope, API, _, Analytics) {
    //app logic

    var updateList = function() {
        var list = API.get();
        $scope.activeList = _.where(list, {done: false});
        $scope.doneList = _.where(list, {done: true});
    };

    $scope.submit = function () {
        Analytics.trackEvent('click', 'add', $scope.newItem);
        API.add({
            name: $scope.newItem,
            done: false
        });
        updateList();
        $scope.newItem = '';
    };
    $scope.update = function (item) {
        API.update(item);
        updateList();
    };
    $scope.archiveAll = function() {
        API.archiveAll();
        updateList();
    }

    updateList();
}]);