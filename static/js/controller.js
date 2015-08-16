belong.controller('MobileController', ['$rootScope', 'dataService', '$filter', function ($rootScope, dataService, $filter) {
    var mCtrl = this;
    $rootScope.title = "BuyingIQ (Mobiles)";
    mCtrl.sorting = dataService.getSorting();
    mCtrl.sortedAs = mCtrl.sorting[0].id;
    dataService.getRecords('mobiles', 1, 1).then(function (response) {
        mCtrl.data = response.data;
        var sorted = $filter('orderBy')(mCtrl.data.products, mCtrl.sortedAs, true);
        mCtrl.data.productData = _.chunk(sorted, 4);
    });
    mCtrl.getOrder= function () {
        var reverse = true, sortBy = mCtrl.sortedAs;
        if (mCtrl.sortedAs === 'price-asc') {
            reverse = false;
            sortBy = 'min_price'
        }
        var sorted = $filter('orderBy')(mCtrl.data.products, sortBy, reverse);
        mCtrl.data.productData = _.chunk(sorted, 4);
    };
    mCtrl.getRecords = function () {
        var items = 'mobiles';
        if (mCtrl.search) {
            var searchKey = mCtrl.search.toLowerCase();
            items = items + "&tags=" + searchKey;
        }
        dataService.getRecords(items, 1, 1).then(function (response) {
            mCtrl.data = response.data;
            var sorted = $filter('orderBy')(mCtrl.data.products, mCtrl.sortedAs, true);
            mCtrl.data.productData = _.chunk(sorted, 4);
        });
    };
    mCtrl.getFacets = function () {
        var tags = "mobiles";
        _.each(mCtrl.data.folders, function(value, key){
            if (value.uri !== 'categories') {
                _.each(value.facets, function (each) {
                    if(each.is_selected === true){
                        tags = tags + "&tags=" + each.tag;
                    }
                })
            }
        });
        dataService.getRecords(tags, 1, 1).then(function (response) {
            mCtrl.data = response.data;
            var sorted = $filter('orderBy')(mCtrl.data.products, mCtrl.sortedAs, true);
            mCtrl.data.productData = _.chunk(sorted, 4);
        });
    }
}]);