/**
 * Created by mahane on 1/6/16.
 */

angular.module("hmisPortal")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("laborDeliveryCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService) {
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
                title:'Waliojifungua Kabla ya Kufika Kituoni (BBA)',
                description:'Maelezo ya Waliojifungua Kabla ya Kufika Kituoni (BBA)',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col s12 m6",
                data:'awbB2k6c4dy',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Waliojifungulia Nyumbani',
                description:'Maelezo ya Waliojifungulia Nyumbani',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                cardSize:"medium",
                data:'nGed5u8o6gv',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'line',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'Waliojifungulia kituoni',
                description:'Maelezo ya Waliojifungulia kituoni',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m12 s12",
                data:'kLI4iGDbN3p',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'combined',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'Waliozalishwa na Wakunga wa Jadi (TBA)',
                description:'Waliozalishwa na Wakunga wa Jadi (TBA)',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'DUlS90FQGNh',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'Waliojifungua kwa Vacuum',
                description:'Waliojifungua kwa Vacuum',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'totaZnTeUuK',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Caesarian Section',
                description:'Caesarian Section',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'snAJ4ADu50F',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Breech Delivery',
                description:'Breech Delivery',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                indicatorType:portalService.indicatorType,
                cardClass:"col m6 s12",
                data:'EdaxsmnoohA',
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

