(function() {
  'use strict';

  angular
    .module('blackjack').controller('BlackjackCtrl', blackjack);

  /** @ngInject */
  function blackjack($scope, $rootScope, $state, $touch, $window, $timeout, Api) {
    var vm = this;


    Api.save({section: 'blackjack', cmd: 'restore'}).then(
      function(res){
        console.log(res);
      },
      function(err){
        console.log(err);
      }
    )

    vm.betValue = 0;
    vm.chipBetIsDisabled = false;
    vm.aiCards = [];
    vm.playerCards = [];
    vm.startGame = false;
    vm.stage = 'deal';
    vm.btnsDisabled = false;
    vm.isBetAnimation = false;


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
        angular.element(".buttonsPanel").css('opacity', 1);
    }, 1000);

    vm.getChipImg = function(value) {
      return 'images/bet-' + value + '.png';
    }

    vm.createNewCardPlayer = function() {
      vm.playerCards.push({suit: 'diamonds_A'});
    }
    vm.createNewCardAi = function(card) {
      vm.aiCards.push(card);
    }
    vm.aiCardsAdd = function() {
      if(vm.tempCardsAi.length > 0) {
        vm.aiCards.push(vm.tempCardsAi[0]);

        $timeout( function(){
        }, 500 ).then( function() {
          vm.tempCardsAi.splice(0, 1);
          vm.aiCardsAdd();
        });
      }
      else if (vm.tempCardsAi.length == 0 && vm.stage == 'game') {    // Start hand stage
        vm.playerCardsAdd();
      }
      else if (vm.tempCardsAi.length == 0 && vm.stage == 'deal') {    // End hand stage

      }
    };
    vm.playerCardsAdd = function(){
      if(vm.tempCardsPlayer.length > 0) {
        vm.playerCards.push(vm.tempCardsPlayer[0]);
        $timeout( function() {}, 500 ).then( function() {
          vm.tempCardsPlayer.splice(0, 1);
          vm.playerCardsAdd();
        });
      }
    };

    vm.deal = function(){
      vm.stage = 'deal';
      vm.aiCards[1].suit = 'spades_4';
      $('.aiCardContainer .cardInContainer:nth-child(2)').find(".cardImage").addClass(vm.aiCards[1].suit);
      vm.tempCardsAi = [{suit: 'diamonds_A', index: 2},{suit: 'spades_J', index: 3},{suit: 'hearts_7', index: 4}];
      vm.aiCardsAdd();
    }

    vm.game = function(){
      vm.startGame = true;
      if (vm.aiCards.length != 0 && vm.playerCards.length != 0) {
        vm.removeAllCards();
      }
      else {
        vm.stage = 'game';
        vm.betValue = 0;
        vm.tempCardsAi = [{suit: 'diamonds_A', index: 0},{index: 1}];
        vm.tempCardsPlayer = [{suit: 'clubs_Q', index: 0}, {suit: 'diamonds_A', index: 1}];
        vm.aiCardsAdd();
      }
    }

    vm.bet = function(value) {
      if (vm.stage != 'game' && !vm.isBetAnimation) {
        vm.betValue += value;
        var tempChipBetStyle = 'style="top:' + $('.bet-' + value).offset().top + 'px; left:' + $('.bet-' + value).offset().left + 'px; height:' + $('.bet-' + value).height() + 'px;"';
        var tempChipBet = '<div class="tempChipBet" ' + tempChipBetStyle + '><img src="images/bet-' + value + '.png"></div>';
        $('.table').append(tempChipBet);

        vm.isBetAnimation = true;
        $('.tempChipBet').animate({
          left: $('.betPoints').offset().left + 5 + 'px',
          top: $('.betPoints').offset().top + 5 + 'px',
          height: '25px',
          opacity: 0
        }, {
          duration: 200,
          complete: function(){
            vm.isBetAnimation = false;
            $('.tempChipBet').remove();
          }
        });
      };
    }

    vm.removeAllCards = function(){
      $(".aiCardContainer .cardsWrap").children().each(function(index){
        var tempCardStyle = 'style="top:' + $(this).offset().top + 'px; left:' + $(this).offset().left + 'px; height:' + $(this).height() + 'px; width:' + $(this).height()*5/7 + 'px; background-position:' + $(this).find('.cardImage').css('background-position') + '"';
        var tempCard = '<div src="images/cardsSprite.png" ' + tempCardStyle + ' class="createdCardTempExit"></div>';
        $(".table").append(tempCard);
      });
      $(".aiCardContainer .cardsWrap").children().remove();
      
      $(".playerCardContainer .cardsWrap").children().each(function(index){
        var tempCardStyle = 'style="top:' + $(this).offset().top + 'px; left:' + $(this).offset().left + 'px; height:' + $(this).height() + 'px; width:' + $(this).height()*5/7 + 'px; background-position:' + $(this).find('.cardImage').css('background-position') + '"';
        var tempCard = '<div src="images/cardsSprite.png" ' + tempCardStyle + ' class="createdCardTempExit"></div>';
        $(".table").append(tempCard);
      });
      $(".playerCardContainer .cardsWrap").children().remove();

      $('.createdCardTempExit').animate({
        left: $('.deckFoldedWrap').offset().left + $('.deckFoldedWrap').width()/4,
        top: $('.deckFoldedWrap').offset().top + $('.deckFoldedWrap').height()/4,
        width: $('.createdCardTempExit').height()*5/7 - 40,
        height: $('.createdCardTempExit').height() - 40,
        opacity: 0
      }, 400);
      setTimeout(function(){
          vm.aiCards = [];
          vm.playerCards = [];
          vm.tempCardsAi = [];
          vm.tempCardsPlayer = [];
          $('.createdCardTempExit').remove();
          vm.game();
      }, 400);
    }
  }
})();

