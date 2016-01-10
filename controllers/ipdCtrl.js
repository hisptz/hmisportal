/**
 * Created by mahane on 12/17/15.
 */
angular.module("hmisPortal")

    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
    })
    .controller("ipdCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared) {
        $scope.lastCard = function () {
            $scope.loadingImage=true;
            var base = "http://139.162.204.124/dhis/";
            $.post(base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            }, function () {
                if ($scope.selectedOrgUnit == "m0frOspS7JY") {
                    $scope.url="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:NRmqyxps5ZA;SgeSIiqTN2l;n611GaZn5Xr;q3ELeLciuTh;TsLGQxidpbn;QqqAeR0wrwS;fWq6ZXy0Uzp;AKeayZWILrh;Yut5amdi7iw;CWXG9lBSI7Y;HWZmyu3j4NX;zqaHIXl6j7c;mE81BaLRP29;Y6xpjIVTsJ7;mMkFYcDVj3e;f6Q9p6uSWtS;MOYDHlGVOZi;zfhmMA4HeJn;C2Rg2uPfbhs;v6sdLtxvY1K;yx1Ndv0hlhO;x5cswY9qs7m;anYwhLJV58B;Wyorktq1rUA;uqno4prZX61;o0KObJuu9Yu;Rlr4Y8hOejL;kzj3RYX536Y;hO9LkFt8n2p;eoZtkUbfrmF;ziUz3NmWftW;FkKfVoslpKi;l1GL5Tmn22E;Y7upeLGM36C;tfDgtMmh9TU;SjNEefHqcz4;H2R0UdSYRPn;CpP8znGTTWi;RlEchOC92Yr;SAD8J9zO6MF;jz1y4ru52rC;hufCs1tU1gs;X0TXADJv7GA;CNzWVlVeOdx;s1GFhwCZaWq;cGVl8WkpBTL;EEeh0pyQISB;PxPfeeZz5eI;eTOV59Rcv4F;d8FSoimbeKH;lJry1lLp3dJ;Lcj8osNjKQx;NwzMLHAFMSC;qwFz1atKnbC;HMEUM6T2dxF;qoeOTJT0x6o;BwJsDwQayqN;fLjZYZB3tuB;sr87SW2uEmt;ShxnDczlruP;LD4thW4OmXi;Wa3cm09YbsP;ccIfQsrfWeL;ClHcTEiVMpb;VHmWnicZtbQ;NlXYR3IJWCl;c4ZuqcOCyix;Kpa6sheYah0;W5GuP81V3Zf;aruodm4tcnY;WSaSCvJTnfQ;ctT1j57B2OL;avzBnVwWlV9;WXuqsXyNq4K;fVzXb5qPrCp;UlFUBEpJsSs;s74ccDa9ZDM;GqSZits9IeK;tM1ecc8qcsJ;ItK93OX9wyu;pP6BsR5KiRM;ACM4BHrKZNQ;mcVhgPQtLLX;pZr0OzykmJB;QtBqSDM3YCN;xCl76XUXHb9&dimension=ou:LEVEL-2;"+ $scope.selectedOrgUnit +"&filter=pe:" + $scope.selectedPeriod + "&displayProperty=NAME";
                } else {
                    $scope.url="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:NRmqyxps5ZA;SgeSIiqTN2l;n611GaZn5Xr;q3ELeLciuTh;TsLGQxidpbn;QqqAeR0wrwS;fWq6ZXy0Uzp;AKeayZWILrh;Yut5amdi7iw;CWXG9lBSI7Y;HWZmyu3j4NX;zqaHIXl6j7c;mE81BaLRP29;Y6xpjIVTsJ7;mMkFYcDVj3e;f6Q9p6uSWtS;MOYDHlGVOZi;zfhmMA4HeJn;C2Rg2uPfbhs;v6sdLtxvY1K;yx1Ndv0hlhO;x5cswY9qs7m;anYwhLJV58B;Wyorktq1rUA;uqno4prZX61;o0KObJuu9Yu;Rlr4Y8hOejL;kzj3RYX536Y;hO9LkFt8n2p;eoZtkUbfrmF;ziUz3NmWftW;FkKfVoslpKi;l1GL5Tmn22E;Y7upeLGM36C;tfDgtMmh9TU;SjNEefHqcz4;H2R0UdSYRPn;CpP8znGTTWi;RlEchOC92Yr;SAD8J9zO6MF;jz1y4ru52rC;hufCs1tU1gs;X0TXADJv7GA;CNzWVlVeOdx;s1GFhwCZaWq;cGVl8WkpBTL;EEeh0pyQISB;PxPfeeZz5eI;eTOV59Rcv4F;d8FSoimbeKH;lJry1lLp3dJ;Lcj8osNjKQx;NwzMLHAFMSC;qwFz1atKnbC;HMEUM6T2dxF;qoeOTJT0x6o;BwJsDwQayqN;fLjZYZB3tuB;sr87SW2uEmt;ShxnDczlruP;LD4thW4OmXi;Wa3cm09YbsP;ccIfQsrfWeL;ClHcTEiVMpb;VHmWnicZtbQ;NlXYR3IJWCl;c4ZuqcOCyix;Kpa6sheYah0;W5GuP81V3Zf;aruodm4tcnY;WSaSCvJTnfQ;ctT1j57B2OL;avzBnVwWlV9;WXuqsXyNq4K;fVzXb5qPrCp;UlFUBEpJsSs;s74ccDa9ZDM;GqSZits9IeK;tM1ecc8qcsJ;ItK93OX9wyu;pP6BsR5KiRM;ACM4BHrKZNQ;mcVhgPQtLLX;pZr0OzykmJB;QtBqSDM3YCN;xCl76XUXHb9&dimension=ou:LEVEL-3;"+ $scope.selectedOrgUnit +"&filter=pe:" + $scope.selectedPeriod + "&displayProperty=NAME";
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
                    var lastUrl="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:NRmqyxps5ZA;SgeSIiqTN2l;n611GaZn5Xr;q3ELeLciuTh;TsLGQxidpbn;QqqAeR0wrwS;fWq6ZXy0Uzp;AKeayZWILrh;Yut5amdi7iw;CWXG9lBSI7Y;HWZmyu3j4NX;zqaHIXl6j7c;mE81BaLRP29;Y6xpjIVTsJ7;mMkFYcDVj3e;f6Q9p6uSWtS;MOYDHlGVOZi;zfhmMA4HeJn;C2Rg2uPfbhs;v6sdLtxvY1K;yx1Ndv0hlhO;x5cswY9qs7m;anYwhLJV58B;Wyorktq1rUA;uqno4prZX61;o0KObJuu9Yu;Rlr4Y8hOejL;kzj3RYX536Y;hO9LkFt8n2p;eoZtkUbfrmF;ziUz3NmWftW;FkKfVoslpKi;l1GL5Tmn22E;Y7upeLGM36C;tfDgtMmh9TU;SjNEefHqcz4;H2R0UdSYRPn;CpP8znGTTWi;RlEchOC92Yr;SAD8J9zO6MF;jz1y4ru52rC;hufCs1tU1gs;X0TXADJv7GA;CNzWVlVeOdx;s1GFhwCZaWq;cGVl8WkpBTL;EEeh0pyQISB;PxPfeeZz5eI;eTOV59Rcv4F;d8FSoimbeKH;lJry1lLp3dJ;Lcj8osNjKQx;NwzMLHAFMSC;qwFz1atKnbC;HMEUM6T2dxF;qoeOTJT0x6o;BwJsDwQayqN;fLjZYZB3tuB;sr87SW2uEmt;ShxnDczlruP;LD4thW4OmXi;Wa3cm09YbsP;ccIfQsrfWeL;ClHcTEiVMpb;VHmWnicZtbQ;NlXYR3IJWCl;c4ZuqcOCyix;Kpa6sheYah0;W5GuP81V3Zf;aruodm4tcnY;WSaSCvJTnfQ;ctT1j57B2OL;avzBnVwWlV9;WXuqsXyNq4K;fVzXb5qPrCp;UlFUBEpJsSs;s74ccDa9ZDM;GqSZits9IeK;tM1ecc8qcsJ;ItK93OX9wyu;pP6BsR5KiRM;ACM4BHrKZNQ;mcVhgPQtLLX;pZr0OzykmJB;QtBqSDM3YCN;xCl76XUXHb9&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou";
                    //var lastUrl="http://139.162.204.124/dhis/api/analytics.csv?dimension=dx:i47jm4Pkkq6;vfaY7k6TINl;tit1C1VPIV7;aw1jQ1tJTmE&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }else{
                    var lastUrl="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:NRmqyxps5ZA;SgeSIiqTN2l;n611GaZn5Xr;q3ELeLciuTh;TsLGQxidpbn;QqqAeR0wrwS;fWq6ZXy0Uzp;AKeayZWILrh;Yut5amdi7iw;CWXG9lBSI7Y;HWZmyu3j4NX;zqaHIXl6j7c;mE81BaLRP29;Y6xpjIVTsJ7;mMkFYcDVj3e;f6Q9p6uSWtS;MOYDHlGVOZi;zfhmMA4HeJn;C2Rg2uPfbhs;v6sdLtxvY1K;yx1Ndv0hlhO;x5cswY9qs7m;anYwhLJV58B;Wyorktq1rUA;uqno4prZX61;o0KObJuu9Yu;Rlr4Y8hOejL;kzj3RYX536Y;hO9LkFt8n2p;eoZtkUbfrmF;ziUz3NmWftW;FkKfVoslpKi;l1GL5Tmn22E;Y7upeLGM36C;tfDgtMmh9TU;SjNEefHqcz4;H2R0UdSYRPn;CpP8znGTTWi;RlEchOC92Yr;SAD8J9zO6MF;jz1y4ru52rC;hufCs1tU1gs;X0TXADJv7GA;CNzWVlVeOdx;s1GFhwCZaWq;cGVl8WkpBTL;EEeh0pyQISB;PxPfeeZz5eI;eTOV59Rcv4F;d8FSoimbeKH;lJry1lLp3dJ;Lcj8osNjKQx;NwzMLHAFMSC;qwFz1atKnbC;HMEUM6T2dxF;qoeOTJT0x6o;BwJsDwQayqN;fLjZYZB3tuB;sr87SW2uEmt;ShxnDczlruP;LD4thW4OmXi;Wa3cm09YbsP;ccIfQsrfWeL;ClHcTEiVMpb;VHmWnicZtbQ;NlXYR3IJWCl;c4ZuqcOCyix;Kpa6sheYah0;W5GuP81V3Zf;aruodm4tcnY;WSaSCvJTnfQ;ctT1j57B2OL;avzBnVwWlV9;WXuqsXyNq4K;fVzXb5qPrCp;UlFUBEpJsSs;s74ccDa9ZDM;GqSZits9IeK;tM1ecc8qcsJ;ItK93OX9wyu;pP6BsR5KiRM;ACM4BHrKZNQ;mcVhgPQtLLX;pZr0OzykmJB;QtBqSDM3YCN;xCl76XUXHb9&dimension=ou:LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou"
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