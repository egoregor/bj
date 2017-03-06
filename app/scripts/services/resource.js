(function() {
  'use strict';
  angular.module('blackjack').factory('ServiceResource', serviceResource);

  /** @ngInject */
  function serviceResource($resource, $q, $cacheFactory, API_BASE_URL) {
    var url = API_BASE_URL;

    return $resource(url + '/:section' + '/:id' + '/:cmd' + '/:secondId',
      {section: '@section', id: '@id', cmd: '@cmd', secondId: '@secondId'},
      {
        "get": {method:'GET'},
        "getCache": {method:'GET'},
        "query": {method: 'GET', isArray: true},
        "save": {method: 'POST'},
        "remove": {method: 'DELETE'},
        "update": {method: 'PUT'},
        "queryNotCache": {method: 'GET', isArray: true, ignoreLoadingBar: true},
        "getNotCache": {method: 'GET', ignoreLoadingBar: true}
      }
    );
  }
})();