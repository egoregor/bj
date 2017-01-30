(function() {
  'use strict';

  angular
    .module('blackjack').controller('BlackjackCtrl', blackjack);

  /** @ngInject */
  function blackjack($scope, $rootScope, $state, $touch, $window, $timeout) {
    var vm = this;

    vm.aiCards = [{suit: 'd_a'},{}];
    vm.playerCards = [{suit: 'd_a'}, {suit: 'd_a'}];


    angular.element($window).bind('resize', function(){
        angular.element(".cardInContainer .cardImage").width(angular.element(".cardInContainer").height()*5/7 + 'px');
        angular.element(".tableBgWrap").width(angular.element(".tableBgWrap .tableBgImg").width() + 'px');
        angular.element(".tableBgWrap").css('marginLeft', '-' + angular.element(".tableBgWrap .tableBgImg").width()/2 + 'px');
     });
    $timeout(function () {
        angular.element(".cardInContainer .cardImage").width(angular.element(".cardInContainer").height()*5/7 + 'px');
        angular.element(".tableBgWrap").width(angular.element(".tableBgWrap .tableBgImg").width() + 'px');
        angular.element(".tableBgWrap").css('marginLeft', '-' + angular.element(".tableBgWrap .tableBgImg").width()/2 + 'px');
        angular.element(".tableWrap").css('opacity', 1);
    }, 1000);

    vm.createNewCardPlayer = function() {
      vm.playerCards.push({suit: 'd_a'});
    }
    vm.createNewCardAi = function(card) {
      vm.aiCards.push(card);
    }
    vm.newCardsAi = [{suit: 'd_a'},{suit: 'd_a'},{suit: 'd_a'}];
    vm.aiCardsAll = function(){
      vm.aiCards[1].suit = 'd_a';
      $('.cardInContainer:nth-child(2)').find(".cardImage").addClass(vm.aiCards[1].suit);
      if(vm.newCardsAi.length > 0) {
        vm.createNewCardAi(vm.newCardsAi[0]);
        $timeout( function(){
        }, 200 ).then( function() {
          vm.newCardsAi.splice(0, 1);
          vm.aiCardsAll();
        });
      }
    };
    vm.removeAllCards = function(){

    }
  }
})();

