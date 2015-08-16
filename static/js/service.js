belong.factory('dataService', ['$http', function ($http) {
    return {
        getRecords: function (category, facet, page) {
            return $http.get('http://api.buyingiq.com/v1/search/?tags='+category+'&facet='+facet+'&page='+page);
        },
        getSorting: function () {
            return [
                {id: 'review_count', value: 'Popularity High - Low'},
                {id: 'biq_score', value: 'IQ Score High - Low'},
                {id: 'min_price', value: 'Price High - Low'},
                {id: 'price-asc', value: 'Price Low - High'},
                {id: 'avg_rating', value: 'Rating High - Low'}
            ];
        }
    };
}]);