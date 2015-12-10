angular.module('app.controllers', [])
  
.controller('loginCtrl', function($scope) {

})
   
.controller('signupCtrl', function($scope) {

})
   
.controller('homeCtrl', function($scope) {
  $scope.items = [
    {
      title: 'Save Thalia',
      description: " Some writing will go here nothing crazy... just a little bit",
      src: "http://ionicframework.com/img/docs/blue-album.jpg"
    },
    {
      title: 'Arlington HS football field ',
      description: " Some writing will go here nothing crazy... just a little bit",
      src: "http://ionicframework.com/img/docs/siamese-dream.jpg"
    },
    {
      title: 'Gatlin Rehab Center',
      description: " Some writing will go here nothing crazy... just a little bit",
      src: "http://ionicframework.com/img/docs/nevermind.jpg"
    },    
    {
      title: 'PotHoleFix',
      description: " Some writing will go here nothing crazy... just a little bit",
      src: "http://ionicframework.com/img/docs/license-to-ill.jpg"
    },    
    {
      title: 'Help me pay for college',
      description: " Some writing will go here nothing crazy... just a little bit",
      src: "http://ionicframework.com/img/docs/dookie.jpg"
    }
  ];
})
   
.controller('myCampaignsCtrl', function($scope) {

})
   
.controller('createCampaignCtrl', function($scope) {

})
      
.controller('campaignSuccessPageCtrl', function($scope) {

})
   
.controller('campaignProfileCtrl', function($scope) {
  $scope.description = "Save Thaline's Life";
  $scope.raised = 79417;
  $scope.total = 115000;

})
   
.controller('myAccountCtrl', function($scope) {

})
   
.controller('supplyListCtrl', function($scope) {

})
   
.controller('volunteerCtrl', function($scope) {

})
   
.controller('donateMoneyCtrl', function($scope) {

});

IonicModule
.directive('ionSlideBox', [
  '$animate',
  '$timeout',
  '$compile',
  '$ionicSlideBoxDelegate',
  '$ionicHistory',
  '$ionicScrollDelegate',
function($animate, $timeout, $compile, $ionicSlideBoxDelegate, $ionicHistory, $ionicScrollDelegate) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      autoPlay: '=',
      doesContinue: '@',
      slideInterval: '@',
      showPager: '@',
      pagerClick: '&',
      disableScroll: '@',
      onSlideChanged: '&',
      activeSlide: '=?',
      bounce: '@'
    },
    controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
      var _this = this;

      var continuous = $scope.$eval($scope.doesContinue) === true;
      var bouncing = ($scope.$eval($scope.bounce) !== false); //Default to true
      var shouldAutoPlay = isDefined($attrs.autoPlay) ? !!$scope.autoPlay : false;
      var slideInterval = shouldAutoPlay ? $scope.$eval($scope.slideInterval) || 4000 : 0;

      var slider = new ionic.views.Slider({
        el: $element[0],
        auto: slideInterval,
        continuous: continuous,
        startSlide: $scope.activeSlide,
        bouncing: bouncing,
        slidesChanged: function() {
          $scope.currentSlide = slider.currentIndex();

          // Try to trigger a digest
          $timeout(function() {});
        },
        callback: function(slideIndex) {
          $scope.currentSlide = slideIndex;
          $scope.onSlideChanged({ index: $scope.currentSlide, $index: $scope.currentSlide});
          $scope.$parent.$broadcast('slideBox.slideChanged', slideIndex);
          $scope.activeSlide = slideIndex;
          // Try to trigger a digest
          $timeout(function() {});
        },
        onDrag: function() {
          freezeAllScrolls(true);
        },
        onDragEnd: function() {
          freezeAllScrolls(false);
        }
      });

      function freezeAllScrolls(shouldFreeze) {
        if (shouldFreeze && !_this.isScrollFreeze) {
          $ionicScrollDelegate.freezeAllScrolls(shouldFreeze);

        } else if (!shouldFreeze && _this.isScrollFreeze) {
          $ionicScrollDelegate.freezeAllScrolls(false);
        }
        _this.isScrollFreeze = shouldFreeze;
      }

      slider.enableSlide($scope.$eval($attrs.disableScroll) !== true);

      $scope.$watch('activeSlide', function(nv) {
        if (isDefined(nv)) {
          slider.slide(nv);
        }
      });

      $scope.$on('slideBox.nextSlide', function() {
        slider.next();
      });

      $scope.$on('slideBox.prevSlide', function() {
        slider.prev();
      });

      $scope.$on('slideBox.setSlide', function(e, index) {
        slider.slide(index);
      });

      //Exposed for testing
      this.__slider = slider;

      var deregisterInstance = $ionicSlideBoxDelegate._registerInstance(
        slider, $attrs.delegateHandle, function() {
          return $ionicHistory.isActiveScope($scope);
        }
      );
      $scope.$on('$destroy', function() {
        deregisterInstance();
        slider.kill();
      });

      this.slidesCount = function() {
        return slider.slidesCount();
      };

      this.onPagerClick = function(index) {
        $scope.pagerClick({index: index});
      };

      $timeout(function() {
        slider.load();
      });
    }],
    template: '<div class="slider">' +
      '<div class="slider-slides" ng-transclude>' +
      '</div>' +
    '</div>',

    link: function($scope, $element, $attr) {
      // Disable ngAnimate for slidebox and its children
      $animate.enabled(false, $element);

      // if showPager is undefined, show the pager
      if (!isDefined($attr.showPager)) {
        $scope.showPager = true;
        getPager().toggleClass('hide', !true);
      }

      $attr.$observe('showPager', function(show) {
        if (show === undefined) return;
        show = $scope.$eval(show);
        getPager().toggleClass('hide', !show);
      });

      var pager;
      function getPager() {
        if (!pager) {
          var childScope = $scope.$new();
          pager = jqLite('<ion-pager></ion-pager>');
          $element.append(pager);
          pager = $compile(pager)(childScope);
        }
        return pager;
      }
    }
  };
}])
.directive('ionSlide', function() {
  return {
    restrict: 'E',
    require: '?^ionSlideBox',
    compile: function(element) {
      element.addClass('slider-slide');
    }
  };
})

.directive('ionPager', function() {
  return {
    restrict: 'E',
    replace: true,
    require: '^ionSlideBox',
    template: '<div class="slider-pager"><span class="slider-pager-page" ng-repeat="slide in numSlides() track by $index" ng-class="{active: $index == currentSlide}" ng-click="pagerClick($index)"><i class="icon ion-record"></i></span></div>',
    link: function($scope, $element, $attr, slideBox) {
      var selectPage = function(index) {
        var children = $element[0].children;
        var length = children.length;
        for (var i = 0; i < length; i++) {
          if (i == index) {
            children[i].classList.add('active');
          } else {
            children[i].classList.remove('active');
          }
        }
      };

      $scope.pagerClick = function(index) {
        slideBox.onPagerClick(index);
      };

      $scope.numSlides = function() {
        return new Array(slideBox.slidesCount());
      };

      $scope.$watch('currentSlide', function(v) {
        selectPage(v);
      });
    }
  };

});