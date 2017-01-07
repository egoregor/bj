(function() {
  'use strict';

  angular
    .module('blackjack').controller('MainCtrl', main);

  /** @ngInject */
  function main($scope, $rootScope, $state, $touch) {
    var vm = this;
    $scope.$state = $state;
    
    // Toggling of Navigation menu (for Mobile)
    $scope.menuOpened = false;
    $scope.menuToggle = function(){
      $scope.menuOpened = !$scope.menuOpened;
    };

  }
})();
