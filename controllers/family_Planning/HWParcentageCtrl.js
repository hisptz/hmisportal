
/**
 * Created by kelvin on 1/11/16.
 */
angular.module("hmisPortal")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("HWParcentageCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService,FPManager) {
        //lidt of all facilities providing fp
        //https://hmisportal.moh.go.tz/dhis/api/dataSets/TfoI3vTGv1f.json?fields=id,name,organisationUnits[id,name]
        $rootScope.showProgressMessage = false;
        $scope.geographicalZones = FPManager.zones;
        $scope.geoToUse = [];
        $scope.zones = "";
        $scope.data = {};
        $scope.selectedYear = FPManager.latestYear;
        $scope.data.selectedMonth = FPManager.latestMonth;

        $scope.updateTree = function(){
            $scope.data.orgUnitTree1 = [];
            $scope.data.orgUnitTree = [];
            angular.forEach($scope.geographicalZones.organisationUnitGroups,function(value){
                var zoneRegions = [];
                angular.forEach(value.organisationUnits,function(regions){
                    var regionDistricts = [];
                    angular.forEach(regions.children,function(district){
                        regionDistricts.push({name:district.name,id:district.id });
                    });
                    zoneRegions.push({ name:regions.name,id:regions.id, children:regionDistricts });
                });
                $scope.data.orgUnitTree1.push({ name:value.name,id:value.id, children:zoneRegions,selected:true });
            });
            $scope.data.orgUnitTree.push({name:"Tanzania",id:'m0frOspS7JY',children:$scope.data.orgUnitTree1});
        };
        $scope.updateTree();

        $scope.updateTreeWithOne = function(){
            $scope.data.orgUnitTree1 = [];
            $scope.data.orgUnitTree = [];
            angular.forEach($scope.geographicalZones.organisationUnitGroups,function(value){
                var zoneRegions = [];
                angular.forEach(value.organisationUnits,function(regions){
                    var regionDistricts = [];
                    angular.forEach(regions.children,function(district){
                        regionDistricts.push({name:district.name,id:district.id });
                    });
                    zoneRegions.push({ name:regions.name,id:regions.id, children:regionDistricts });
                });
                $scope.data.orgUnitTree1.push({ name:value.name,id:value.id, children:zoneRegions });
            });
            $scope.data.orgUnitTree.push({name:"Tanzania",id:'m0frOspS7JY',children:$scope.data.orgUnitTree1,selected:true});
        };

        $scope.selectOnly1Or2 = function(item, selectedItems) {
            if (selectedItems  !== undefined && selectedItems.length >= 7) {
                return false;
            } else {
                return true;
            }
        };

        $scope.changeMethod = function(data){
            if(data == "all"){

            }else{
                $scope.updateTree();
            }
        };
        $scope.selectedMethod = 't8vQoqdY0en';


        //FP method Defination
        $scope.FPmethods = [
            {'name':'Short Acting','uid':'iWDh2fUbRTJ'},
            {'name':'Implants','uid':'Igxe3yXGEoW'},
            {'name':'IUCDs','uid':'t8vQoqdY0en'},
            {'name':'NSV','uid':'BLqgpawRwGN'},
            {'name':'Mini Lap','uid':'acbet8SSjCY'}
        ];
        $scope.updateMethod = function(){
            $scope.data.menuMethods = [];
            angular.forEach($scope.FPmethods,function(value){
                if(value.name == 'Implants'){
                    $scope.data.menuMethods.push({name:value.name,id:value.uid,selected:true });
                }else{
                    $scope.data.menuMethods.push({name:value.name,id:value.uid });
                }

            });
        };
        $scope.updateMethod();

        $scope.$watch('data.outOrganisationUnits', function() {
            if($scope.data.outOrganisationUnits){
                if($scope.data.outOrganisationUnits.length > 1){
                    $scope.updateMethod();
                }else{

                }
            }

        }, true);

        $scope.$watch('data.outMethods', function() {
            if($scope.data.outMethods){
                if($scope.data.outMethods.length > 1){
                    $scope.updateTreeWithOne();
                }else{

                }
            }

        }, true);

        $scope.selectOnly1Or3 = function(item, selectedItems) {
            if (selectedItems  !== undefined && selectedItems.length >= 7) {
                return false;
            } else {
                return true;
            }
        };

        //$scope.getSelectedMethod = function(){
        //    angular.forEach()
        //}

        $scope.getMethodName = function(uid){
            var name  = ""
            angular.forEach($scope.FPmethods, function (value) {
                if(value.uid == uid){

                    name = value.name;
                }
            });

            return name;
        };
        $scope.findValue = function(arr,ou,pe,dx,type){

            var amount = 0;

            return amount;
        }

        $scope.orgUnitType = function(arr,type){
            var name = false;
            angular.forEach(arr,function(value){
                if(value.name == type){
                    name = true;
                }
            });
            return name;
        };

        $scope.getNumberPerOu = function(arr,ou,arr2,pe,type){
            var count = 0;
            var item = {  name: type }

            angular.forEach(arr,function(value){
                if ($scope.orgUnitType(value.organisationUnitGroups,type)) {
                    angular.forEach(value.ancestors, function (val) {
                        if ((ou.indexOf(';') > -1)) {
                            var orgArr = ou.split(";");
                            $.each(orgArr, function (c, j) {
                                if (j == val.id) {
                                    count++;
                                }
                            });
                        } else {
                            if (ou == val.id) {
                                count++;
                            }
                        }
                    });
                }
            });
            var num = $scope.getDataFromUrl(arr2,ou,pe);
            var percent = (num/count)*100;
            return percent.toFixed(2);
        };



        $scope.getNumberPerOu1 = function(arr,ou,arr2,pe,type,method){
            var item = {  name: type };
            var count = 0;
            angular.forEach(arr,function(value){
                if ($scope.orgUnitType(value.organisationUnitGroups,type)) {
                    angular.forEach(value.ancestors, function (val) {
                        if ((ou.indexOf(';') > -1)) {
                            var orgArr = ou.split(";");
                            $.each(orgArr, function (c, j) {
                                if (j == val.id) {
                                    count++;
                                }
                            });
                        } else {
                            if (ou == val.id) {
                                count++;
                            }
                        }
                    });
                }
            });
            var num = $scope.getDataFromUrl1(arr2,ou,pe,method);
            var percent = (num/count)*100;
            return percent.toFixed(2);
        };


        $scope.getSelectedValues = function(){
            if($scope.data.outOrganisationUnits.length === 0){
                alert("no orgunit selected")
            }else
            {
                $.post( portalService.base + "dhis-web-commons-security/login.action?authOnly=true", {
                    j_username: "portal", j_password: "Portal123"
                },function() {

                    var orgUnits = [];
                    angular.forEach($scope.data.outOrganisationUnits,function(orgUnit){
                        var name = orgUnit.name;
                        if(name.indexOf("Zone") > -1){
                            var names = [];
                            angular.forEach(orgUnit.children,function(regions){
                                names.push(regions.id);
                            });
                            orgUnits.push({'name':orgUnit.name,'id':names.join(";")});
                        }else{
                            orgUnits.push({'name':orgUnit.name,'id':orgUnit.id});
                        }
                    });

                    var methodss = [];
                    angular.forEach($scope.data.outMethods,function(method){
                        methodss.push({'name':method.name,'id':method.id});
                    });

                    $scope.chartObject = angular.copy(FPManager.chartObject);
                    $scope.chartObject1 = angular.copy(FPManager.chartObject);
                    $scope.chartObject2 = angular.copy(FPManager.chartObject);


                    $scope.chartObject.options.yAxis.title.text ="% of Facilities";
                    $scope.chartObject1.options.yAxis.title.text ="% of Facilities";
                    $scope.chartObject2.options.yAxis.title.text ="% of Facilities";

                    $scope.chartObject.options.yAxis.labels = {
                        formatter: function () {
                            return this.value + '%';
                        }
                    };
                    $scope.chartObject1.options.yAxis.labels = {
                        formatter: function () {
                            return this.value + '%';
                        }
                    };
                    $scope.chartObject2.options.yAxis.labels = {
                        formatter: function () {
                            return this.value + '%';
                        }
                    };

                    var orgUnits = $scope.prepareCategory('zones');
                    var periods = [];
                    if($scope.data.outMethods.length == 1){
                        $scope.titleToUse = $scope.data.outMethods[0].name;
                        angular.forEach($scope.data.outMethods,function(value){
                            periods.push({name:value.name,id:value.id})
                        });
                    }else{
                        $scope.titleToUse = $scope.data.outOrganisationUnits[0].name;
                        angular.forEach($scope.data.outOrganisationUnits,function(value){
                            periods.push({name:value.name,id:value.id})
                        });
                    }
                    $scope.chartObject.options.title.text ="Percent of Hospitals with 2 or more Health Workers Trained in - " + $scope.titleToUse+" " + FPManager.getMonthName($scope.data.selectedMonth);
                    $scope.chartObject1.options.title.text ="Percent of Health Centres  with 2 or more Health Workers Trained in - " + $scope.titleToUse+" " + FPManager.getMonthName($scope.data.selectedMonth);
                    $scope.chartObject2.options.title.text ="Percent of Dispensaries  with 2 or more Health Workers Trained in - " + $scope.titleToUse+" " + FPManager.getMonthName($scope.data.selectedMonth);
                    angular.forEach(periods, function (val) {
                        $scope.chartObject.options.xAxis.categories.push(val.name);
                        $scope.chartObject.options.xAxis.labels.style = { visibility: 'hidden' };
                    });
                    angular.forEach(periods, function (val) {
                        $scope.chartObject1.options.xAxis.categories.push(val.name);
                        $scope.chartObject1.options.xAxis.labels.style = { visibility: 'hidden' };
                    });
                    angular.forEach(periods, function (val) {
                        $scope.chartObject2.options.xAxis.categories.push(val.name);
                        $scope.chartObject2.options.xAxis.labels.style = { visibility: 'hidden' };
                    });


                    $scope.chartObject.loading = true;
                    $scope.chartObject1.loading = true;
                    $scope.chartObject2.loading = true;
                    var method = $scope.data.outMethods[0].id;
                    FPManager.getFPFacilityList().then(function(data){
                        if($scope.data.outMethods.length  == 1){

                            $http.get(portalService.base+'api/sqlViews/YsaDLZ51aQA/data.json?var=types:Hospital&var=methods:'+method+'&var=year:'+$scope.data.selectedMonth).success(function(val1){
                                $rootScope.showProgressMessage = false;
                                angular.forEach(orgUnits, function (yAxis) {
                                    var serie = [];
                                    angular.forEach(periods, function (xAxis) {
                                        serie.push(parseFloat($scope.getNumberPerOu(data.organisationUnits,yAxis.id,val1.rows,xAxis.id,'Hospital')));
                                    });
                                    $scope.chartObject.series.push({type: 'column', name: yAxis.name, data: serie})
                                });
                                $scope.csvdata = FPManager.prepareDataForCSV($scope.chartObject);
                                $scope.chartObject.loading = false;
                            });

                            $http.get(portalService.base+'api/sqlViews/YsaDLZ51aQA/data.json?var=types:Health Center&var=methods:'+method+'&var=year:'+$scope.data.selectedMonth).success(function(val1){
                                $rootScope.showProgressMessage = false;
                                angular.forEach(orgUnits, function (yAxis) {
                                    var serie = [];
                                    angular.forEach(periods, function (xAxis) {
                                        serie.push(parseFloat($scope.getNumberPerOu(data.organisationUnits,yAxis.id,val1.rows,xAxis.id,'Health Center')));
                                    });
                                    $scope.chartObject1.series.push({type: 'column', name: yAxis.name, data: serie})
                                });
                                $scope.csvdata1 = FPManager.prepareDataForCSV($scope.chartObject1);
                                $scope.chartObject1.loading = false;
                            });

                            $http.get(portalService.base+'api/sqlViews/YsaDLZ51aQA/data.json?var=types:Dispensary&var=methods:'+method+'&var=year:'+$scope.data.selectedMonth).success(function(val1){
                                $rootScope.showProgressMessage = false;
                                angular.forEach(orgUnits, function (yAxis) {
                                    var serie = [];
                                    angular.forEach(periods, function (xAxis) {
                                        serie.push(parseFloat($scope.getNumberPerOu(data.organisationUnits,yAxis.id,val1.rows,xAxis.id,'Dispensary')));
                                    });
                                    $scope.chartObject2.series.push({type: 'column', name: yAxis.name, data: serie})
                                });
                                $scope.csvdata2 = FPManager.prepareDataForCSV($scope.chartObject2);
                                $scope.chartObject2.loading = false;
                            });

                        }else{

                            $http.get(portalService.base+'api/sqlViews/c7WkP7lk9cr/data.json?var=types:Hospital&var=year:'+$scope.data.selectedMonth).success(function(val1){
                                $rootScope.showProgressMessage = false;
                                angular.forEach(methodss, function (yAxis) {
                                    var serie = [];
                                    angular.forEach(periods, function (xAxis) {
                                        serie.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits,$scope.data.outOrganisationUnits[0].id,val1.rows,xAxis.id,'Hospital',yAxis.name)));
                                    });
                                    $scope.chartObject.series.push({type: 'column', name: yAxis.name, data: serie})
                                });
                                $scope.csvdata = FPManager.prepareDataForCSV($scope.chartObject);
                                $scope.chartObject.loading = false;
                            });

                            $http.get(portalService.base+'api/sqlViews/c7WkP7lk9cr/data.json?var=types:Health Center&var=year:'+$scope.data.selectedMonth).success(function(val1){
                                $rootScope.showProgressMessage = false;
                                angular.forEach(methodss, function (yAxis) {
                                    var serie = [];
                                    angular.forEach(periods, function (xAxis) {
                                        serie.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits,$scope.data.outOrganisationUnits[0].id,val1.rows,xAxis.id,'Health Center',yAxis.name)));
                                    });
                                    $scope.chartObject1.series.push({type: 'column', name: yAxis.name, data: serie})
                                });
                                $scope.csvdata1 = FPManager.prepareDataForCSV($scope.chartObject1);
                                $scope.chartObject1.loading = false;
                            });

                            $http.get(portalService.base+'api/sqlViews/c7WkP7lk9cr/data.json?var=types:Dispensary&var=year:'+$scope.data.selectedMonth).success(function(val1){
                                $rootScope.showProgressMessage = false;
                                angular.forEach(methodss, function (yAxis) {
                                    var serie = [];
                                    angular.forEach(periods, function (xAxis) {
                                        serie.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits,$scope.data.outOrganisationUnits[0].id,val1.rows,xAxis.id,'Dispensary',yAxis.name)));
                                    });
                                    $scope.chartObject2.series.push({type: 'column', name: yAxis.name, data: serie})
                                });
                                $scope.csvdata2 = FPManager.prepareDataForCSV($scope.chartObject2);
                                $scope.chartObject2.loading = false;
                            });

                        }

                    });
                });
            }

        };
        $scope.data.outOrganisationUnits = [{name:'Tanzania',id:'m0frOspS7JY'}];
        $scope.getSelectedValues();





        $scope.selectedMethod = 'all';
        $scope.selectedPeriod = '2014';
        $scope.data.chartType = 'column';
        $scope.displayTable = false;
        $scope.currentOrgUnit = "m0frOspS7JY";


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
            $scope.prepareSeries(card,$scope.data.chartType);
        };

        //switching between tables and charts
        $scope.displayTables = {card1: false, card2: false, card3: false}
        $scope.changeTable = function (card, value) {
            if (value == "table") {
                if (card == "card1") {
                    $scope.displayTables.card1 = true
                }
                if (card == "card2") {
                    $scope.displayTables.card2 = true
                }
                if (card == "card3") {
                    $scope.displayTables.card3 = true
                }
            }
            if (value == "chart") {
                if (card == "card1") {
                    $scope.displayTables.card1 = false
                }
                if (card == "card2") {
                    $scope.displayTables.card2 = false
                }
                if (card == "card3") {
                    $scope.displayTables.card3 = false
                }
            }
        };
        $scope.prepareCategory = function(type){
            var data = [];
            var per = $scope.selectedPeriod;
            if(type == 'zones'){
                data.push({'name':"Tanzania",'id':"m0frOspS7JY"});
                angular.forEach($scope.data.outOrganisationUnits,function(orgUnit){
                    var name = orgUnit.name;
                    if(name.indexOf("Zone") > -1){
                        var names = [];
                        angular.forEach(orgUnit.children,function(regions){
                            names.push(regions.id);
                        });
                        data.push({'name':orgUnit.name,'id':names.join(";")});
                    }else{
                        if(orgUnit.id !== 'm0frOspS7JY'){
                            data.push({'name':orgUnit.name,'id':orgUnit.id});
                        }

                    }
                });
            }if(type == 'quarter'){
                data.push({'name':'Jan - Mar '+per,'id':per+'Q1'});
                data.push({'name':'Apr - Jun '+per,'id':per+'Q2'});
                data.push({'name':'Jul - Sep '+per,'id':per+'Q3'});
                data.push({'name':'Oct - Dec '+per,'id':per+'Q4'});
            }if(type == 'month'){
                data.push({'name':'Jan '+per,'id':per+'01'});
                data.push({'name':'Feb '+per,'id':per+'02'});
                data.push({'name':'Mar '+per,'id':per+'03'});
                data.push({'name':'Apr '+per,'id':per+'04'});
                data.push({'name':'May '+per,'id':per+'05'});
                data.push({'name':'Jun '+per,'id':per+'06'});
                data.push({'name':'Jul '+per,'id':per+'07'});
                data.push({'name':'Aug '+per,'id':per+'08'});
                data.push({'name':'Sep '+per,'id':per+'09'});
                data.push({'name':'Oct '+per,'id':per+'10'});
                data.push({'name':'Nov '+per,'id':per+'11'});
                data.push({'name':'Dec '+per,'id':per+'12'});
            }if(type == 'methods'){
                angular.forEach()
            }

            return data;
        };

        $scope.getDataFromUrl  = function(arr,ou,pe){

            var num = 0;
            if(ou == "m0frOspS7JY" ){
                $.each(arr, function (k, v) {
                    num += parseInt(v[2]);
                });
            }else{
                if (ou.indexOf(';') > -1) {
                    var orgArr = ou.split(";");
                    var i = 0;
                    $.each(orgArr, function (c, j) {
                        i++;
                        $.each(arr, function (k, v) {
                            if (v[0] == j || v[1] == j) {
                                num += parseInt(v[2]);
                            }
                        });
                    });
                } else {
                    $.each(arr, function (k, v) {
                        if (v[0] == ou || v[1] == ou) {
                             num += parseInt(v[2]);
                        }
                    });
                }
            }
            return num;
        }
        $scope.getDataFromUrl1  = function(arr,ou,pe,method){

            var index = 0;
            if(method == 'Short Acting'){
                index = 3;
            }if(method == 'Implants'){
                index = 4;
            }if(method == 'IUCDs'){
                index = 5;
            }if(method == 'NSV'){
                index = 6;
            }if(method == 'Mini Lap'){
                index = 7;
            }


            var num = 0;
            if(ou == "m0frOspS7JY" ){
                $.each(arr, function (k, v) {
                    if(v[index] !== ""){
                        num += parseInt(v[index]);
                    }
                });
            }else{
                if (ou.indexOf(';') > -1) {
                    var orgArr = ou.split(";");
                    var i = 0;
                    $.each(orgArr, function (c, j) {
                        i++;
                        $.each(arr, function (k, v) {
                            if (v[0] == j || v[1] == j) {
                                if(v[index] !== ""){
                                    num += parseInt(v[index]);
                                }
                            }
                        });
                    });
                } else {
                    $.each(arr, function (k, v) {
                        if (v[0] == ou || v[1] == ou) {
                            if(v[index] !== ""){
                                num += parseInt(v[index]);
                            }
                        }
                    });
                }
            }

            return num;
        }

    });





function preparePeriod(period){

    return ""+period+"01;"+period+"02;"+period+"03;"+period+"04;"+period+"05;"+period+"06;"+period+"07;"+period+"08;"+period+"09;"+period+"10;"+period+"11;"+period+"12;"+period+"Q1;"+period+"Q2;"+period+"Q3;"+period+"Q4";
}
