/**
 * Created by mahane on 12/17/15.
 */
angular.module("hmisPortal")

    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
    })
    .controller("book10Ctrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared) {
        $scope.lastCard = function () {
            $scope.loadingImage=true;
            var base = "http://139.162.204.124/dhis/";
            $.post(base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            }, function () {
                if ($scope.selectedOrgUnit == "m0frOspS7JY") {
                    $scope.url="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:DzMo1KOix1E;E2iTroRO1vA;F99dNfvn18N;H4crpM0xAPZ;HJ5L1Vox2KK;HTycX8iRxwr;IjOUIRTFgPB;JF8cmYA7sHZ;KBIAlF4HsuL;KZEQScpsjmD;Lnf095vgahq;MUy8R9WmeST;OZ5YGaP6uwa;PmSZNZHac3t;R0URiqa8dOA;RyNkn76uTJo;S2qSg2IVqbR;SQ7kqkZkEwV;UDNIfd3mhin;UXKlyT99JQh;VSXdXdsSUd3;WAdaCligbNP;Y6cNfApg9Kf;ZbmHzUkeJbQ;a18JqcK1bV8;aVGmFARbjcV;axYyuzZ1pua;bcJF4WplYEH;bwiODRQr4R9;fOcVMxQyqeo;fZkqQfpnTdH;hTce3dWh9P7;hrObyRzLP7W;kSb2DwIAq9A;kksp2roOMCj;lcwBJXGfx5Z;m1PpRCnZF4l;mWk6cP12X4J;mxupZee5ML0;n62iMxfXPty;nYUBZNhU74M;r26FdABMacI;rB0DvqiPEVA;s4zyCyJ7EjQ;s8lDA0lfZRq;t6hGDeGe4qy;tIs7rshvixe;u6GJwaNN7Cy;uA7nNtZE8bv;vYXCiIEJTwU;wrDMXHwi8nx;xHS0Mp6cuZb;y1nw8IpRVtF;yAU4FxDTIrM;ykDWUlQzexW;yqA1CfsfBHQ&dimension=ou:LEVEL-2;"+ $scope.selectedOrgUnit +"&filter=pe:" + $scope.selectedPeriod + "&displayProperty=NAME";
                } else {
                    $scope.url="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:DzMo1KOix1E;E2iTroRO1vA;F99dNfvn18N;H4crpM0xAPZ;HJ5L1Vox2KK;HTycX8iRxwr;IjOUIRTFgPB;JF8cmYA7sHZ;KBIAlF4HsuL;KZEQScpsjmD;Lnf095vgahq;MUy8R9WmeST;OZ5YGaP6uwa;PmSZNZHac3t;R0URiqa8dOA;RyNkn76uTJo;S2qSg2IVqbR;SQ7kqkZkEwV;UDNIfd3mhin;UXKlyT99JQh;VSXdXdsSUd3;WAdaCligbNP;Y6cNfApg9Kf;ZbmHzUkeJbQ;a18JqcK1bV8;aVGmFARbjcV;axYyuzZ1pua;bcJF4WplYEH;bwiODRQr4R9;fOcVMxQyqeo;fZkqQfpnTdH;hTce3dWh9P7;hrObyRzLP7W;kSb2DwIAq9A;kksp2roOMCj;lcwBJXGfx5Z;m1PpRCnZF4l;mWk6cP12X4J;mxupZee5ML0;n62iMxfXPty;nYUBZNhU74M;r26FdABMacI;rB0DvqiPEVA;s4zyCyJ7EjQ;s8lDA0lfZRq;t6hGDeGe4qy;tIs7rshvixe;u6GJwaNN7Cy;uA7nNtZE8bv;vYXCiIEJTwU;wrDMXHwi8nx;xHS0Mp6cuZb;y1nw8IpRVtF;yAU4FxDTIrM;ykDWUlQzexW;yqA1CfsfBHQ&dimension=ou:LEVEL-3;"+ $scope.selectedOrgUnit +"&filter=pe:" + $scope.selectedPeriod + "&displayProperty=NAME";
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
                    var lastUrl="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:DzMo1KOix1E;E2iTroRO1vA;F99dNfvn18N;H4crpM0xAPZ;HJ5L1Vox2KK;HTycX8iRxwr;IjOUIRTFgPB;JF8cmYA7sHZ;KBIAlF4HsuL;KZEQScpsjmD;Lnf095vgahq;MUy8R9WmeST;OZ5YGaP6uwa;PmSZNZHac3t;R0URiqa8dOA;RyNkn76uTJo;S2qSg2IVqbR;SQ7kqkZkEwV;UDNIfd3mhin;UXKlyT99JQh;VSXdXdsSUd3;WAdaCligbNP;Y6cNfApg9Kf;ZbmHzUkeJbQ;a18JqcK1bV8;aVGmFARbjcV;axYyuzZ1pua;bcJF4WplYEH;bwiODRQr4R9;fOcVMxQyqeo;fZkqQfpnTdH;hTce3dWh9P7;hrObyRzLP7W;kSb2DwIAq9A;kksp2roOMCj;lcwBJXGfx5Z;m1PpRCnZF4l;mWk6cP12X4J;mxupZee5ML0;n62iMxfXPty;nYUBZNhU74M;r26FdABMacI;rB0DvqiPEVA;s4zyCyJ7EjQ;s8lDA0lfZRq;t6hGDeGe4qy;tIs7rshvixe;u6GJwaNN7Cy;uA7nNtZE8bv;vYXCiIEJTwU;wrDMXHwi8nx;xHS0Mp6cuZb;y1nw8IpRVtF;yAU4FxDTIrM;ykDWUlQzexW;yqA1CfsfBHQ&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou";
                    //var lastUrl="http://139.162.204.124/dhis/api/analytics.csv?dimension=dx:i47jm4Pkkq6;vfaY7k6TINl;tit1C1VPIV7;aw1jQ1tJTmE&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }else{
                    var lastUrl="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:DzMo1KOix1E;E2iTroRO1vA;F99dNfvn18N;H4crpM0xAPZ;HJ5L1Vox2KK;HTycX8iRxwr;IjOUIRTFgPB;JF8cmYA7sHZ;KBIAlF4HsuL;KZEQScpsjmD;Lnf095vgahq;MUy8R9WmeST;OZ5YGaP6uwa;PmSZNZHac3t;R0URiqa8dOA;RyNkn76uTJo;S2qSg2IVqbR;SQ7kqkZkEwV;UDNIfd3mhin;UXKlyT99JQh;VSXdXdsSUd3;WAdaCligbNP;Y6cNfApg9Kf;ZbmHzUkeJbQ;a18JqcK1bV8;aVGmFARbjcV;axYyuzZ1pua;bcJF4WplYEH;bwiODRQr4R9;fOcVMxQyqeo;fZkqQfpnTdH;hTce3dWh9P7;hrObyRzLP7W;kSb2DwIAq9A;kksp2roOMCj;lcwBJXGfx5Z;m1PpRCnZF4l;mWk6cP12X4J;mxupZee5ML0;n62iMxfXPty;nYUBZNhU74M;r26FdABMacI;rB0DvqiPEVA;s4zyCyJ7EjQ;s8lDA0lfZRq;t6hGDeGe4qy;tIs7rshvixe;u6GJwaNN7Cy;uA7nNtZE8bv;vYXCiIEJTwU;wrDMXHwi8nx;xHS0Mp6cuZb;y1nw8IpRVtF;yAU4FxDTIrM;ykDWUlQzexW;yqA1CfsfBHQ&dimension=ou:LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou"
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