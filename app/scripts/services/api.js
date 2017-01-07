(function() {
  'use strict';
  
  angular.module('blackjack').factory('Api', api);

  /** @ngInject */
  function api(ServiceResource, $q, localStorageService, moment, ServiceRefreshToken, $state) {
    var typeRequest = '';

    function request(paramDefaults, options) {
      var deferred = $q.defer();
      var data = {};

      ServiceResource(localStorageService.get('jwtToken'))[typeRequest](paramDefaults, options,
        function(response) {
          data.result = response;
          deferred.resolve(data);
        },
        function(error) {
          data.error = error;
          deferred.resolve(data);
        }
      );
      return deferred.promise;
    }

    function refreshToken() {
      var deferred = $q.defer();
      var data = {};
      ServiceRefreshToken(localStorageService.get('jwtToken')).get(
        function(res, headers) {
          console.log('refresh: ', headers().authorization.split(' ')[1]);
          localStorageService.set('jwtToken', headers().authorization.split(' ')[1]);
          localStorageService.set('tokenDate', new Date());
          $state.reload();
        }
      );
      return deferred.promise;
    }

    return {
      get: function(options){
        typeRequest = 'get';
        return request(options);
      },
      query: function(options){
        typeRequest = 'query';
        return request(options);
      },
      queryNotCache: function(options){
        typeRequest = 'queryNotCache';
        return request(options);
      },
      getCache: function(options){
        typeRequest = 'getCache';
        return request(options);
      },
      save: function(paramDefaults, options){
        typeRequest = 'save';
        return request(paramDefaults, options);
      },
      remove: function(options){
        typeRequest = 'remove';
        return request(options);
      },
      update: function(paramDefaults, options){
        typeRequest = 'update';
        return request(paramDefaults, options);
      }
    }
  }
})();