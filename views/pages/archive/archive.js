var archivePageModule = angular.module('archivePageModule', []);

archivePageModule.controller('ArchivePageController', ['$scope', 'API',
    function($scope,API) {

        $scope.archiveList = API.getArchive();
        $scope.undo = function(item) {
            API.undo(item);
            $scope.archiveList = API.getArchive();
        };
}]);