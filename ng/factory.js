var factories = angular.module('factories', ['ngStorage']);

factories.factory('API',['$localStorage','_', function($localStorage,_){

    //generate id for every to do item
    var generateId = function () {
        return (new Date()).getTime();
    };

    //get current list from local storage
    var getList = function (name) {
        if(!$localStorage[name]){
            return[];
        }
        return JSON.parse($localStorage[name]);
    };

    //set current list to local storage
    var setList = function (name, list) {
        if(!list){
            list = [];
        }
        $localStorage[name] = JSON.stringify(list);
    };

    return {
        get: function() {
            return getList('todos');
        },
        getArchive: function() {
            return getList('archiveTodos');
        },
        add: function(item) {
            var list = getList('todos');
            item.id = generateId();
            item.createdAt = (new Date()).getTime();
            item.updatedAt = item.createdAt;
            list.push(item);
            setList('todos', list);
            return item;
        },
        update: function(item) {
            if (!item.id)
            {
                throw new Error('item id not found');
            }
            var list = getList('todos');
            var it = _.findWhere(list, {id: item.id});
            if(!it) {
                throw new Error('item not found');
            }
            _.extend(it,item);
            it.updatedAt = (new Date()).getTime();
            setList('todos', list);
            return it;
        },
        archiveAll: function() {
            var list = getList('todos');
            var activeList = _.where(list, {done: false});
            setList('todos', activeList);

            var doneList = _.where(list, {done: true});
            var archiveList = getList('archiveTodos');
            archiveList = _.union(archiveList, doneList);
            setList('archiveTodos', archiveList);
        },
        undo: function (item) {
            if (!item.id){
                throw new Error('item not found');
            }
            var list = getList('archiveTodos');
            var it = _.findWhere(list, {id: item.id});
            if(!it) {
                throw new Error('item not found');
            }
            list = _.without(list, it);
            setList('archiveTodos', list);

            it.updatedAt = (new Date()).getTime();
            var activeList = getList('todos');
            activeList.push(it);
            setList('todos',activeList);
            return;
        }
    };

}]);