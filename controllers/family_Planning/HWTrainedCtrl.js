/**
 * Created by kelvin on 2/1/16.
 */
/**
 * Created by kelvin on 12/10/15.
 */
/**
 * Created by kelvin on 11/26/15.
 */

angular.module("hmisPortal")
    .config(function($httpProvider) {

    })
    .controller("HWTrainedCtrl",function ($rootScope,$scope,$http,portalService,FPManager) {

        $rootScope.showProgressMessage = false;
        $scope.geographicalZones = FPManager.zones;
        $scope.geoToUse = [];
        $scope.zones = "";
        $scope.data = {};
        $scope.selectedYear = FPManager.latestYear;
        $scope.data.selectedMonth = FPManager.latestMonth;

        $scope.data.outMethods = [];
        $scope.data.outOrganisationUnits = [];
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
                $scope.data.outOrganisationUnits.push({ name:value.name,id:value.id, children:zoneRegions,selected:true })
                $scope.data.orgUnitTree1.push({ name:value.name,id:value.id, children:zoneRegions,selected:true });
            });
            $scope.data.orgUnitTree.push({name:"Tanzania",id:'m0frOspS7JY',children:$scope.data.orgUnitTree1});
            FPManager.prepareOrganisationUnitTree($scope.data.orgUnitTree,'parent');
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
            FPManager.prepareOrganisationUnitTree($scope.data.orgUnitTree,'parent');
        };

        $scope.selectOnly1Or2 = function(item, selectedItems) {
            if (selectedItems  !== undefined && selectedItems.length >= 7) {
                return false;
            } else {
                return true;
            }
        };
        $scope.changeMethod = function(){
            $scope.currentOrgUnit = "m0frOspS7JY";
            angular.forEach($scope.geoToUse,function(value){
                value.ticked = true;
            });
//            $('#orgunitss option[value="m0frOspS7JY"]').prop('selected', true);
            $scope.firstClick();
        };


        $scope.selectedMethod = 'all';
        $scope.selectedPeriod = '2015';
        $scope.selectedMonth = FPManager.lastMonthWithData;
        $scope.data.chartType = 'column';
        $scope.displayTable = false;
        $scope.currentOrgUnit = "m0frOspS7JY";
        $scope.currentMonthperiod = FPManager.getMonthYear($scope.selectedPeriod);

        $scope.methods = [
            {'name':'Short Acting','uid':'iWDh2fUbRTJ'},
            {'name':'Implants','uid':'Igxe3yXGEoW'},
            {'name':'IUCDs','uid':'t8vQoqdY0en'},
            {'name':'NSV','uid':'BLqgpawRwGN'},
            {'name':'Mini Lap','uid':'acbet8SSjCY'}
        ];

        $scope.updateMethod = function(){
            $scope.data.menuMethods = [];
            angular.forEach($scope.methods,function(value){
                if(value.name == "Implants"){
                    $scope.data.menuMethods.push({ name:value.name,id:value.uid,selected:true });
                }else{
                    $scope.data.menuMethods.push({ name:value.name,id:value.uid });
                }
            });
        };
        $scope.clearMethods = function(){
            $scope.data.menuMethods = [];
            angular.forEach($scope.methods,function(value){
                if(value.name == "Implants"){
                    $scope.data.menuMethods.push({ name:value.name,id:value.uid });
                }else{
                    $scope.data.menuMethods.push({ name:value.name,id:value.uid });
                }
            });
        };
        $scope.updateMethod();

        $scope.$watch('data.outOrganisationUnits', function() {
            if($scope.data.outOrganisationUnits){
                if($scope.data.outOrganisationUnits.length > 1 && $scope.data.outMethods.length > 1 ){
                    $scope.updateMethod();
                }else{

                }
            }

        }, true);

        $scope.$watch('data.outMethods', function() {
            if($scope.data.outMethods){
                if($scope.data.outMethods.length > 1 && $scope.data.outOrganisationUnits.length > 1 ){
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

        $scope.getSingleMethods = function(methods){
            var method = "";
            if(methods.length === 1){
                angular.forEach(methods,function(value){
                    method= value.name;
                });
            }else{
                angular.forEach($scope.data.outOrganisationUnits,function(value){
                    method += value.name+", ";
                });
            }
            return method;


        };


        $scope.fpCards = [
            {
                title:'Total Health Workers Trained as of ',
                description:'Total Health Workers Trained as of ',
                cardClass:"col s12 m12",
                data:$scope.methods,
                category:'month',
                category1:'quarter',
                icons:angular.copy(portalService.minimalIcons),
                displayTable:false,
                displayMap:false,
                chart:'column',
                yaxisTittle:'# Health Workers Trained',
                visible:'consumption by method',
                chartObject:angular.copy(FPManager.chartObject),
                showLoader:true,
                loadingMessage: "",
                description:'This charts displays the current total number of health workers trained in the selected FP method/s, in the selected geographies, in the indicated month',
                display_option_1:'If you select one FP method (eg implants) and multiple geographies (eg 6 districts within your region) you can compare the total number of health workers trained in implants across the 6 selected districts. This allows you to identify which districts have the larger gaps in number health workers trained in implants.',
                display_option_2:'If you select one geography (eg "Pwani Region") and multiple FP methods, you can compare the total number of health workers trained in each selected FP method, within Pwani Region. This allows you to identify which FP methods have the larger gaps in number of health workers trained, in Pwani Region',
                option_2:true,
                indicator_type:'Number',
                numerator:'Total number of health workers that have achieved training competency in selected FP method/s (short-acting, implants, IUCDs, minilap, NSV) in the selected geography in the indicated month',
                denominator:'N/A',
                data_source:'Train Tracker'
            }];


        $scope.getAllMethods = function(){
            var methods = [];
            angular.forEach($scope.methods,function(value){
                methods.push(value.uid);
            });
            return methods.join(";");
        };


        $scope.prepareSeries = function(cardObject,chart){
            cardObject.chartObject.loading = true;
            cardObject.loadingMessage = "Authenticating portal...";
            $.post( portalService.base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            },function() {

                if (chart == 'table') {
                    cardObject.displayTable = true;
                    cardObject.displayMap = false;
                }
                else {
                    cardObject.displayMap = false;
                    cardObject.displayTable = false;
                }

                cardObject.chartObject.options.yAxis.title.text = cardObject.yaxisTittle;

                var peri = preparePeriod($scope.selectedPeriod);
                $scope.url = portalService.base+"api/analytics.json?dimension=dx:"+$scope.getAllMethods()+"&dimension=ou:"+FPManager.getUniqueOrgUnits($scope.data.outOrganisationUnits)+"&dimension=pe:"+$scope.data.selectedMonth+"&displayProperty=NAME";
                var area = [];
                cardObject.chartObject.loading = true;
                var datass = '';

                cardObject.loadingMessage = "Fetching Data...";
                $http.get($scope.url).success(function(data){
                    if(data.hasOwnProperty('metaData')){
                        var xAxisItems = [];
                        var yAxisItems = [];
                        var methodId = [];
                        if($scope.data.outMethods.length == 1){
                            $scope.titleToUse = $scope.data.outMethods[0].name;
                            cardObject.chartObject.options.title.text = cardObject.title+' '+ FPManager.getMonthName($scope.data.selectedMonth) +' - '+ $scope.titleToUse;
                            xAxisItems = $scope.prepareCategory('zones');
                            yAxisItems = $scope.prepareCategory('methods');
                        }else{
                            $scope.titleToUse = $scope.data.outOrganisationUnits[0].name;
                            cardObject.chartObject.options.title.text = cardObject.title+' '+ FPManager.getMonthName($scope.data.selectedMonth)+' - '+ $scope.titleToUse;
                            xAxisItems = $scope.prepareCategory('methods');
                            yAxisItems = $scope.prepareCategory('zones');
                        }

                        cardObject.chartObject.options.xAxis.categories = [];
                            angular.forEach(yAxisItems, function (value) {
                                cardObject.chartObject.options.xAxis.categories.push(value.name);
                            });
                            $scope.normalseries1 = [];
                            angular.forEach(xAxisItems, function (val) {
                                var serie = [];
                                angular.forEach(yAxisItems, function (value) {
                                    if($scope.data.outMethods.length == 1){
                                        var number = $scope.getDataFromUrl(data.rows, val.id, $scope.currentYear, value.id);
                                    }else{
                                        var number = $scope.getDataFromUrl(data.rows,value.id, $scope.currentYear, val.id);
                                    }
                                    serie.push(number);
                                });
                                $scope.normalseries1.push({type: 'column', name: val.name, data: serie})
                            });
                            cardObject.chartObject.series = $scope.normalseries1;
                        cardObject.csvdata = FPManager.prepareDataForCSV(cardObject.chartObject);

                        cardObject.chartObject.loading = false
                        cardObject.showLoader = false;
                    }else{
                        cardObject.chartObject.loading = false
                        cardObject.showLoader = false;
                    }

                    $rootScope.showProgressMessage = false;
                    cardObject.showLoader = false;

                });
            });

        };

        $scope.prepareData = function(jsonObject,categories,type,card){
            var structure = {};
            var data = [];
            var elements = [];
            var arr = card.data;
            angular.forEach(arr,function(val){
                elements.push({'name':val.name,'uid':val.id})
            });
            angular.forEach(categories,function(region){
                data.push({'name':region.name,'id':region.id});
            });
            structure.regions = data;
            structure.elements = elements;

            return structure;
        };

        $scope.getDataFromUrl  = function(arr,ou,pe,de){

            var num = 0;
            var k = 1;


            k =1
            num =0;
            if(ou == 'none'){
                $.each(arr,function(k,v){
                    if(v[0] == de){
                        num += parseInt(v[3])
                    }
                });
            }else{
                if ((ou.indexOf(';') > -1)) {
                    var orgArr = ou.split(";");
                    var i = 0;
                    $.each(orgArr, function (c, j) {
                        i++;
                        $.each(arr, function (k, v) {
                            if (v[0] == de) {
                                if (v[1] == j) {
                                    num += parseInt(v[3]);
                                }
                            }
                        });
                    });
                } else {
                    $.each(arr, function (k, v) {
                        if (v[0] == de) {
                            if (v[1] == ou) {
                                num += parseInt(v[3]);
                            }
                        }
                    });
                }
            }

            return num;
        }

        $scope.prepareCategory = function(type){
            var data = [];
            var per = $scope.selectedPeriod;
            if(type == 'zones'){
                angular.forEach($scope.data.outOrganisationUnits,function(orgUnit){
                    var name = orgUnit.name;
                    if(name.indexOf("Zone") > -1){
                        var names = [];
                        angular.forEach(orgUnit.children,function(regions){
                            names.push(regions.id);
                        });
                        data.push({'name':orgUnit.name,'id':names.join(";")});
                    }else{
                        data.push({'name':orgUnit.name,'id':orgUnit.id});

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
                data.push({'name':'Nov'+per,'id':per+'11'});
                data.push({'name':'Dec '+per,'id':per+'12'});
            }if(type == 'methods'){
                angular.forEach($scope.data.outMethods,function(value){
                    data.push({'name':value.name,'id':value.id})
                });
            }if(type == 'method'){
                angular.forEach($scope.data.outOrganisationUnits,function(orgUnit){
                    var name = orgUnit.name;
                    if(name.indexOf("Zone") > -1){
                        var names = [];
                        angular.forEach(orgUnit.children,function(regions){
                            names.push(regions.id);
                        });
                        data.push({'name':orgUnit.name,'id':names.join(";")});
                    }else{
                        data.push({'name':orgUnit.name,'id':orgUnit.id});

                    }
                });
            }

            return data;
        };


        $rootScope.getSelectedValues = function(){
            if($scope.data.outMethods.length === 0){

            }
            angular.forEach($scope.fpCards,function(value){
                $scope.prepareSeries(value,value.chart);
            });
        };
        $scope.getSelectedValues();
    });

function preparePeriod(period){

    return ""+period+"01;"+period+"02;"+period+"03;"+period+"04;"+period+"05;"+period+"06;"+period+"07;"+period+"08;"+period+"09;"+period+"10;"+period+"11;"+period+"12";
}



