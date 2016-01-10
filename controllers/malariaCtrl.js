/**
 * Created by kelvin on 10/20/15.
 */

angular.module("hmisPortal")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("malariaCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService) {
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
                title:'ANC IPT2 COVERAGE',
                description:'Maelezo ya ANC IPT2 COVERAGE',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col s12 m6",
                data:'i47jm4Pkkq6',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'ANC MALARIA PREVELANCE',
                description:'Maelezo ya ANC MALARIA PREVELANCE',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                cardSize:"medium",
                data:'vfaY7k6TINl',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'line',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'ANC Proportion  of pregnant women receiving ITN Voucher',
                description:'Maelezo ya ANC Proportion  of pregnant women receiving ITN Voucher',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m12 s12",
                data:'tit1C1VPIV7',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'combined',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'Proportional of Malaria cases in OPD',
                description:'Proportional of Malaria cases in OPD',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'xrYmEc4LCCo',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'Proportional of Malaria cases in IPD',
                description:'Proportional of Malaria cases in OPD',
                indicatorType:portalService.indicatorType,
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'CaPhxP3hIHD',
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

        $scope.lastCard=function(){
            $scope.loadingImage=true;
            var base = "http://139.162.204.124/dhis/";
            $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            },function(){
            if($scope.selectedOrgUnit == "m0frOspS7JY"){
                var lastUrl="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:Y6cNfApg9Kf;rB0DvqiPEVA;vfaY7k6TINl;tIs7rshvixe;qN1zFaX9mVe;i47jm4Pkkq6;tit1C1VPIV7;vYXCiIEJTwU;CaPhxP3hIHD;xrYmEc4LCCo&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
            }else{
                var lastUrl="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:Y6cNfApg9Kf;rB0DvqiPEVA;vfaY7k6TINl;tIs7rshvixe;qN1zFaX9mVe;i47jm4Pkkq6;tit1C1VPIV7;vYXCiIEJTwU;CaPhxP3hIHD;xrYmEc4LCCo&dimension=ou:LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
            }
            $http.get(lastUrl).success(function(dataTable){
                //setTimeout(function(){
                var generalArray=[];
                var underOne="Wajawazito Maliopima Malaria";
                var undertwo="Waliogundulika Kuwa na Malaria";
                var underMaralia="ANC Malaria prevalence";
                var underthree="Wajawazito Waliopewa IPT2";
                var underfour="Jumla Hudhurio la Kwanza";
                var underIPT2="ANC IPT 2 coverage";
                var underITN="ANC Proportion of pregnant women receiving ITN Voucher";
                var underITNOne="Wajawazito Waliopewa Hati Punguzo za Vyandaruwa";
                var underIPD="NMCP Proportion of confirmed Malaria cases in IPD";
                var underOPD="NMCP Proportion of confirmed Malaria cases in OPD";
                $scope.arrayed=[{'underOne':'ANC Pregnant women tested for Malaria','undertwo':'ANC Pregnant wowmen having Malaria Positive after test','underMaralia':'ANC Malaria prevalence',
                    'underthree':'Pregnant women receiving two dose of SP','underfour':'ANC First Visit Attendances',
                    'underIPT2': 'ANC IPT 2 coverage','underITN':'ANC Proportion  of pregnant women receiving ITN Voucher','underITNOne':'pregnant women received ITN Voucher',
                    'underIPD':'Proportional of Malaria cases in  IPD','underOPD':'Proportional of Malaria cases in  OPD'
                }];
                angular.forEach(dataTable.metaData.ou,function(region){
                    generalArray.push({"orgUnit":dataTable.metaData.names[region],underOne:ogUnitsObjectConstruct(underOne,dataTable,dataTable.rows,region),
                        undertwo:undertwoObject(undertwo,dataTable,dataTable.rows,region),underMaralia:underMaraliaObject(underMaralia,dataTable,dataTable.rows,region),
                        underthree:underthreeObject(underthree,dataTable,dataTable.rows,region),underfour:underfourObject(underfour,dataTable,dataTable.rows,region),
                        underIPT2:underIPT2Object(underIPT2,dataTable,dataTable.rows,region),underITN:underITNObject(underITN,dataTable,dataTable.rows,region),
                        underITNOne:underITNOneObject(underITNOne,dataTable,dataTable.rows,region),underOPD:underOPDObject(underOPD,dataTable,dataTable.rows,region),
                        underIPD:underIPDObject(underIPD,dataTable,dataTable.rows,region)
                    });

                });
                $scope.loadingImage=false;
                $scope.tableContent=generalArray;
                console.log($scope.tableContent);
                //},2000);
            }).error(function(error){
                //$scope.loadingImage=false;
                $scope.authenticationFailed=error;
                console.log($scope.authenticationFailed);
            });
            });
        };

        $scope.downloadExcelTotal = function(){
            var base = "http://139.162.204.124/dhis/";
            $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            },function(){
                if($scope.selectedOrgUnit == "m0frOspS7JY"){
                    var lastUrl="http://139.162.204.124/dhis/api/analytics.csv?dimension=dx:Y6cNfApg9Kf;rB0DvqiPEVA;vfaY7k6TINl;tIs7rshvixe;qN1zFaX9mVe;i47jm4Pkkq6;tit1C1VPIV7;vYXCiIEJTwU;CaPhxP3hIHD;xrYmEc4LCCo&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou";
                    //var lastUrl="http://139.162.204.124/dhis/api/analytics.csv?dimension=dx:i47jm4Pkkq6;vfaY7k6TINl;tit1C1VPIV7;aw1jQ1tJTmE&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }else{
                    var lastUrl="http://139.162.204.124/dhis/api/analytics.csv?dimension=dx:Y6cNfApg9Kf;rB0DvqiPEVA;vfaY7k6TINl;tIs7rshvixe;qN1zFaX9mVe;i47jm4Pkkq6;tit1C1VPIV7;vYXCiIEJTwU;CaPhxP3hIHD;xrYmEc4LCCo&dimension=ou:LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou"
                    //var lastUrl="http://139.162.204.124/dhis/api/analytics.csv?dimension=dx:i47jm4Pkkq6;vfaY7k6TINl;tit1C1VPIV7;aw1jQ1tJTmE&dimension=ou:LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }
                $http.get(lastUrl,{'Content-Type': 'application/octet-stream'}).success(function(data){
                    var a = document.createElement('a');
                    var blob = new Blob([data]);
                    a.href = window.URL.createObjectURL(blob);
                    a.download = "data.xls";
                    a.click();
                }).error(function(error){
                    alert("Aunthentification Failed " +error);
                });
            });
        }


        $rootScope.firstClick = function(){
            portalService.orgUnitId = $rootScope.selectedOrgUnit;
            portalService.period = $rootScope.selectedPeriod;
            angular.forEach($scope.cards.malaria,function(value){
                portalService.prepareSeries(value,value.chart);
            });
            $scope.lastCard();
        }
        $scope.firstClick();




    })

var ogUnitsObjectConstruct=function(underOne,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underOne) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var undertwoObject=function(undertwo,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(undertwo) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underthreeObject=function(underthree,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underthree) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underfourObject=function(underfour,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underfour) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}

var underMaraliaObject=function(underMaralia,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underMaralia) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underITNObject=function(underITN,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underITN) >= 0) {
                num = value[2];
            }
        }
    });
  return num;
}
var underIPT2Object=function(underIPT2,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underIPT2) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underITNOneObject=function(underITNOne,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underITNOne) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underOPDObject=function(underOPD,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underOPD) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underIPDObject=function(underIPD,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underIPD) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
function getDataFromUrl(arr,ou){
    var num = 0
    $.each(arr,function(k,v){
        if(v[1] == ou){
            num = parseInt(v[2])
        }
    });
    return num;
}