/**
 * Created by mahane on 12/17/15.
 */
angular.module("hmisPortal")

    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
    })
    .controller("planningCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared) {
        $scope.lastCard = function () {
            $scope.loadingImage=true;
            var base = "http://139.162.204.124/dhis/";
            $.post(base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            }, function () {
                if ($scope.selectedOrgUnit == "m0frOspS7JY") {
                    $scope.url="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:tNQvNURFbOA;oAdnR7jRTSN;btKkJROB2gP;Aufg85b0HV3;E6H1ofZdLcL;c5T3R6QjgQG;OQpasUg1Tse;pqpVKzE951Y;MW8C96hZ5nQ;v05hOYtwSs3;GGpsoh0DX6T;mlfh4fgiFhd;GQ3JD2MeTIp;KLiLjLEQDrh;IZgTEU5SD0H;sTuAOvNzZVG;A4MRLy7M3DB;f096Uub9EvE;udebdxs4kt0;twBzX6Uja4u;bZCT8NgyVw0;Ek7VMzwW1jp;qEWJizgHHot;aMN0UOjdXnO;SuFTWRyy3q0;mh5Y8qINbqT;zzKyPYGLeP7;IhLMQ2V6wqu;GWFza9xVa3F;IFxhP0O4k0W;epPM7fO8CnH;PHN05p61ByJ;yAPwF74EoEe;TWRJN2QjrqP;duYu8OhlYLu;bdq4tW5fxur;gfDQ0CooRX8&dimension=ou:LEVEL-2;"+ $scope.selectedOrgUnit +"&filter=pe:" + $scope.selectedPeriod + "&displayProperty=NAME";
                } else {
                    $scope.url="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:tNQvNURFbOA;oAdnR7jRTSN;btKkJROB2gP;Aufg85b0HV3;E6H1ofZdLcL;c5T3R6QjgQG;OQpasUg1Tse;pqpVKzE951Y;MW8C96hZ5nQ;v05hOYtwSs3;GGpsoh0DX6T;mlfh4fgiFhd;GQ3JD2MeTIp;KLiLjLEQDrh;IZgTEU5SD0H;sTuAOvNzZVG;A4MRLy7M3DB;f096Uub9EvE;udebdxs4kt0;twBzX6Uja4u;bZCT8NgyVw0;Ek7VMzwW1jp;qEWJizgHHot;aMN0UOjdXnO;SuFTWRyy3q0;mh5Y8qINbqT;zzKyPYGLeP7;IhLMQ2V6wqu;GWFza9xVa3F;IFxhP0O4k0W;epPM7fO8CnH;PHN05p61ByJ;yAPwF74EoEe;TWRJN2QjrqP;duYu8OhlYLu;bdq4tW5fxur;gfDQ0CooRX8&dimension=ou:LEVEL-3;"+ $scope.selectedOrgUnit +"&filter=pe:" + $scope.selectedPeriod + "&displayProperty=NAME";
                }

                $http.get($scope.url).success(function (metaData) {
                    var dataElementArray = metaData.metaData.dx;
                    var orgUnitArray = [];
                    var prepareTableHeaders = [];
                    var allData = [];
                    for (var i = 0; i < dataElementArray.length; i++) {
                        prepareTableHeaders.push({
                            "uid": dataElementArray[i],
                            "name": metaData.metaData.names[dataElementArray[i]]
                        })
                    }
                    angular.forEach(metaData.metaData.ou, function (values) {
                        allData.push({"orGunit": metaData.metaData.names[values], "orgUnitId": values});
                    });
                    angular.forEach(allData, function (value) {
                        var dataElement = [];
                        angular.forEach(prepareTableHeaders, function (headers) {
                            var values = '';
                            angular.forEach(metaData.rows, function (val) {
                                if (value.orgUnitId == val[1] && val[0] == headers.uid) {
                                    values = val[2];
                                }

                            });
                            dataElement.push({"name": headers.name, "uid": headers.uid, "value": values})
                        });
                        orgUnitArray.push({"name": value.orGunit, 'uid': value.orgUnitId, 'dataElement': dataElement});
                    });
                    $scope.loadingImage=false;
                    $scope.headers = prepareTableHeaders;
                    $scope.rows = orgUnitArray;
                    console.log(orgUnitArray);
                });
            })
        }
        $scope.downloadExcelTotal = function(){
            var base = "http://139.162.204.124/dhis/";
            $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            },function(){
                if($scope.selectedOrgUnit == "m0frOspS7JY"){
                    var lastUrl="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:tNQvNURFbOA;oAdnR7jRTSN;btKkJROB2gP;Aufg85b0HV3;E6H1ofZdLcL;c5T3R6QjgQG;OQpasUg1Tse;pqpVKzE951Y;MW8C96hZ5nQ;v05hOYtwSs3;GGpsoh0DX6T;mlfh4fgiFhd;GQ3JD2MeTIp;KLiLjLEQDrh;IZgTEU5SD0H;sTuAOvNzZVG;A4MRLy7M3DB;f096Uub9EvE;udebdxs4kt0;twBzX6Uja4u;bZCT8NgyVw0;Ek7VMzwW1jp;qEWJizgHHot;aMN0UOjdXnO;SuFTWRyy3q0;mh5Y8qINbqT;zzKyPYGLeP7;IhLMQ2V6wqu;GWFza9xVa3F;IFxhP0O4k0W;epPM7fO8CnH;PHN05p61ByJ;yAPwF74EoEe;TWRJN2QjrqP;duYu8OhlYLu;bdq4tW5fxur;gfDQ0CooRX8&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou";
                    //var lastUrl="http://139.162.204.124/dhis/api/analytics.csv?dimension=dx:i47jm4Pkkq6;vfaY7k6TINl;tit1C1VPIV7;aw1jQ1tJTmE&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }else{
                    var lastUrl="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:tNQvNURFbOA;oAdnR7jRTSN;btKkJROB2gP;Aufg85b0HV3;E6H1ofZdLcL;c5T3R6QjgQG;OQpasUg1Tse;pqpVKzE951Y;MW8C96hZ5nQ;v05hOYtwSs3;GGpsoh0DX6T;mlfh4fgiFhd;GQ3JD2MeTIp;KLiLjLEQDrh;IZgTEU5SD0H;sTuAOvNzZVG;A4MRLy7M3DB;f096Uub9EvE;udebdxs4kt0;twBzX6Uja4u;bZCT8NgyVw0;Ek7VMzwW1jp;qEWJizgHHot;aMN0UOjdXnO;SuFTWRyy3q0;mh5Y8qINbqT;zzKyPYGLeP7;IhLMQ2V6wqu;GWFza9xVa3F;IFxhP0O4k0W;epPM7fO8CnH;PHN05p61ByJ;yAPwF74EoEe;TWRJN2QjrqP;duYu8OhlYLu;bdq4tW5fxur;gfDQ0CooRX8&dimension=ou:LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou"
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
            $scope.lastCard();
        }
        $scope.firstClick();
    });