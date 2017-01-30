angular
  .module('blackjack')
  .directive('card', card);
  

function card() {
  var directive = {
    restrict: 'EA',
    template: '<div class="cardImage"></div>',
    scope: {
    	index: '=',
    	type: '=',
      suit: '='
    },
    link: function(scope, elem, attr) {
    	var tempCardStyle = 'style="top:' + $('.deckBoxWrap').offset().top + 'px; left:' + $('.deckBoxWrap').offset().left + 'px; height:' + $('.deckBoxWrap').height() + 'px;"';
  		var tempCard = '<img src="images/cardBack.png" class="createdCardTemp createdCardTemp' + scope.index + '" ' + tempCardStyle + '>';
      
      var overlaping = function(){
        if((scope.index + 1) > 2) {
          setTimeout(function(){
            $('.' + scope.type + 'CardContainer .cardInContainer')
            .not('.' + scope.type + 'CardContainer .cardInContainer:last-child')
            .width($(elem).height()/100*20);
            $(elem).last().find('.cardImage').width($(elem).height()*5/7);
          }, 0);
        }
        else {
          $(elem).find('.cardImage').width($(elem).height()*5/7);
        }
      };
      overlaping();
      $(window).resize(function() {
        overlaping();
      });

      setTimeout(function(){
        $(".table").append(tempCard);
        $(".createdCardTemp" + scope.index).animate({
          height: $(elem).height() + 'px',
          top: $(elem).offset().top + 'px',
          left: $(elem).offset().left + 'px',
          opacity: 1
        }, {
          duration: 200,
          easing: 'linear',
          complete: function(){
            $(elem).css({
              opacity: 1
            });
            $(elem).find(".cardImage").addClass(scope.suit);
            
            $(".createdCardTemp" + scope.index).remove();
              // $(this).animate({
              //   borderSpacing: -90
              // }, {
              //   duration: 100,
              //   easing: 'linear',
              //   step: function(now,fx) {
              //     console.log(now);
              //     $(this).css('-webkit-transform','rotateY('+now+'deg)'); 
              //   },
              //   complete: function(){
              //     $(this).remove();
              //     $(elem).css({
              //       opacity: 1,
              //       transform: 'rotateY(90deg)',
              //       borderSpacing: -90
              //     })
              //     .animate({
              //       borderSpacing: 0
              //     }, {
              //       duration: 100,
              //       easing: 'linear',
              //       step: function(now,fx) {
              //         console.log(now);
              //         $(this).css('-webkit-transform','rotateY('+now+'deg)'); 
              //       },
              //     });
              //   }
              // })
          }
        });
      }, 2);
    },
    controller: Card
  }
  return directive;
}

function Card($scope) {

}