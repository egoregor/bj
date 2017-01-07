(function() {
  'use strict';
  angular.module('blackjack').factory('ServiceResource', serviceResource);

  /** @ngInject */
  function serviceResource($resource, $q, $cacheFactory, CacheFactory, API_BASE_URL) {
    var url = API_BASE_URL;

    if (!CacheFactory.get('resourceCache')) {
      CacheFactory.createCache('resourceCache', {
        deleteOnExpire: 'aggressive',
        cacheFlushInterval: 15 * 60 * 1000,
        maxAge: 15 * 60 * 1000
      });
    }

    var clearCache = {
      response: function (response) {
        CacheFactory.get('resourceCache').removeAll();
        return response;
      }
    };
    return function(token) {      
      return $resource(url + '/:section' + '/:id' + '/:cmd' + '/:secondId',
        {section: '@section', id: '@id', cmd: '@cmd', secondId: '@secondId'},
        {
          "get": {method:'GET', headers: {'Authorization': 'Bearer ' +  token}},
          "getCache": {method:'GET', cache:CacheFactory.get('resourceCache'), headers: {'Authorization': 'Bearer ' +  token}},
          "query": {method: 'GET', isArray: true, cache:CacheFactory.get('resourceCache'), headers: {'Authorization': 'Bearer ' +  token}},
          "save": {method: 'POST',  interceptor: clearCache, headers: {'Authorization': 'Bearer ' +  token}},
          "remove": {method: 'DELETE', interceptor: clearCache, headers: {'Authorization': 'Bearer ' +  token}},
          "update": {method: 'PUT', interceptor: clearCache, headers: {'Authorization': 'Bearer ' +  token}},
          "queryNotCache": {method: 'GET', isArray: true, ignoreLoadingBar: true, headers: {'Authorization': 'Bearer ' +  token}},
          "getNotCache": {method: 'GET', ignoreLoadingBar: true, headers: {'Authorization': 'Bearer ' +  token}}
        }
      );
    }
  }
})();