/**
 * Created by mahane on 1/6/16.
 */

angular.module("hmisPortal")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("familyPlaningCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService) {
        //displaying loading during page change
        $rootScope.$on("$routeChangeStart",
            function (event, current, previous, rejection) {
                $rootScope.showLoader = true;
            });
        $rootScope.$on("$routeChangeSuccess",
            function (event, current, previous, rejection) {
                $rootScope.showLoader = false
            });
        $scope.cards = {};
        $scope.data = {};
        var map = this;
        $rootScope.periodType = 'years';
        portalService.orgUnitId = $rootScope.selectedOrgUnit;
        portalService.period = $rootScope.selectedPeriod;
        $scope.selectedOrgUnitLevel = "2";

        $scope.cards.malaria = [
            {
                title:'Kufunga uzazi mama ML/LA',
                description:'Maelezo ya Kufunga uzazi mama ML/LA',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col s12 m6",
                data:'Aufg85b0HV3',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Wateja wa Vidonge CBD',
                description:'Maelezo ya Wateja wa Vidonge CBD',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                cardSize:"medium",
                data:'GWFza9xVa3F',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'line',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'Wateja wa Vidonge Kituoni',
                description:'Maelezo ya Wateja wa Vidonge Kituoni',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m12 s12",
                data:'IFxhP0O4k0W',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'combined',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'Kuweka Kitanzi IUCD"',
                description:'Kuweka Kitanzi IUCD',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'OQpasUg1Tse',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'Wateja waliochukua  kondom Kituoni',
                description:'Wateja waliochukua  kondom Kituoni',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'PHN05p61ByJ',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },{
                title:'Kufunga uzazi baba NSV',
                description:'Kufunga uzazi baba NSV',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'btKkJROB2gP',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },{
                title:'Wateja wa sindano',
                description:'Wateja wa sindano',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'epPM7fO8CnH',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },{
                title:'Njia ya dharura ya uzazi wa mpango',
                description:'Njia ya dharura ya uzazi wa mpango',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'gq90zkgvcg3',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },{
                title:'Kuweka vipandikizi',
                description:'Kuweka vipandikizi',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'pqpVKzE951Y',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },{
                title:'Wateja waliochukua kondom CBD',
                description:'Wateja waliochukua kondom CBD',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'yAPwF74EoEe',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            }
        ]


        $scope.data.chartType = 'column';
        $scope.displayTable = false;
        $scope.changeChart = function(type,card){
            card.displayTable = false;

            $scope.showReport = true;
            if(type == 'table'){
                card.displayTable = true;
                card.displayMap = false;
                card.chart = 'table';
                $scope.data.chartType = 'table';
            }else if(type == 'map'){
                card.displayMap = true;
                card.displayTable = false;
                card.chart = 'map';
                $scope.data.chartType = 'map';
            }
            else{
                card.displayMap = false;
                card.displayTable = false;
                card.chart = type;
                $scope.data.chartType = type;
            }
            portalService.orgUnitId = $rootScope.selectedOrgUnit;
            portalService.period = $rootScope.selectedPeriod;
            portalService.prepareSeries(card,$scope.data.chartType);
        };

        $scope.downloadExcel = function(id){
            portalService.downloadExcel(id);
        };




        $rootScope.firstClick = function(){
            portalService.orgUnitId = $rootScope.selectedOrgUnit;
            portalService.period = $rootScope.selectedPeriod;
            angular.forEach($scope.cards.malaria,function(value){
                portalService.prepareSeries(value,value.chart);
            });

        }
        $scope.firstClick();




    })

