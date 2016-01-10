/**
 * Created by mahane on 12/17/15.
 */
angular.module("hmisPortal")

    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
    })
    .controller("opdCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared) {
        $scope.lastCard = function () {
            $scope.loadingImage=true;
            var base = "http://139.162.204.124/dhis/";
            $.post(base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            }, function () {
                if ($scope.selectedOrgUnit == "m0frOspS7JY") {
                    $scope.url="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:MG98iWgxXNT;SgeSIiqTN2l;n611GaZn5Xr;q3ELeLciuTh;RifXFxv1lQq;QqqAeR0wrwS;fWq6ZXy0Uzp;Yut5amdi7iw;CWXG9lBSI7Y;HWZmyu3j4NX;zqaHIXl6j7c;iP9wSaCAZl5;SxNQQBphBOS;Y6xpjIVTsJ7;mMkFYcDVj3e;f6Q9p6uSWtS;QhpE8F5apCj;zfhmMA4HeJn;C2Rg2uPfbhs;NLBkuHemCAx;f8yQ5FUAIx0;zQQFpz3JT6g;v6sdLtxvY1K;x5cswY9qs7m;fYO2JUHPdul;anYwhLJV58B;Wyorktq1rUA;o0KObJuu9Yu;gNQ5NYT8SCz;kzj3RYX536Y;VSb3ctsTz4z;eoZtkUbfrmF;VmFo3tNlgIW;uAa5OgHFwud;GQwVaLxM9Gs;YVOid8f091G;FkKfVoslpKi;l1GL5Tmn22E;Y7upeLGM36C;DWWNT5pcrWf;kmpnqbSQLBl;MwnLlVZZJkU;NSYWPEpZBuY;uyQpafHrxLT;RlEchOC92Yr;SAD8J9zO6MF;jz1y4ru52rC;hufCs1tU1gs;a9Pxllofrpx;X0TXADJv7GA;CNzWVlVeOdx;KlePTLpBdWd;IJAImvSE7P6;cGVl8WkpBTL;EEeh0pyQISB;eTOV59Rcv4F;Lcj8osNjKQx;k3TGMJ3ru5y;NwzMLHAFMSC;qwFz1atKnbC;Ivd9opj8WCi;HMEUM6T2dxF;nWRerupXUoy;zx2fEoXul5W;QvexV259cj2;qoeOTJT0x6o;Qhi9QXHzP9b;BwJsDwQayqN;fLjZYZB3tuB;sr87SW2uEmt;ShxnDczlruP;YzWIMlVnfxq;LD4thW4OmXi;Wa3cm09YbsP;wwl4tRTnPEo;ccIfQsrfWeL;NlXYR3IJWCl;c4ZuqcOCyix;Kpa6sheYah0;W5GuP81V3Zf;aruodm4tcnY;WSaSCvJTnfQ;ctT1j57B2OL;avzBnVwWlV9;Q5AQcGLeh7y;fVzXb5qPrCp;UlFUBEpJsSs;wULlcm4Qj5S;xsoXkeM69KC;Fuwwc9CgYUN;tM1ecc8qcsJ;ItK93OX9wyu;pP6BsR5KiRM;hBSqV93WRL4;RppK9y0dY08;ACM4BHrKZNQ;mcVhgPQtLLX;pZr0OzykmJB;QtBqSDM3YCN;xCl76XUXHb9;cUHWPSXirUl;O9HZJ5frgiJ&dimension=ou:LEVEL-2;"+ $scope.selectedOrgUnit +"&filter=pe:" + $scope.selectedPeriod + "&displayProperty=NAME";
                } else {
                    $scope.url="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:MG98iWgxXNT;SgeSIiqTN2l;n611GaZn5Xr;q3ELeLciuTh;RifXFxv1lQq;QqqAeR0wrwS;fWq6ZXy0Uzp;Yut5amdi7iw;CWXG9lBSI7Y;HWZmyu3j4NX;zqaHIXl6j7c;iP9wSaCAZl5;SxNQQBphBOS;Y6xpjIVTsJ7;mMkFYcDVj3e;f6Q9p6uSWtS;QhpE8F5apCj;zfhmMA4HeJn;C2Rg2uPfbhs;NLBkuHemCAx;f8yQ5FUAIx0;zQQFpz3JT6g;v6sdLtxvY1K;x5cswY9qs7m;fYO2JUHPdul;anYwhLJV58B;Wyorktq1rUA;o0KObJuu9Yu;gNQ5NYT8SCz;kzj3RYX536Y;VSb3ctsTz4z;eoZtkUbfrmF;VmFo3tNlgIW;uAa5OgHFwud;GQwVaLxM9Gs;YVOid8f091G;FkKfVoslpKi;l1GL5Tmn22E;Y7upeLGM36C;DWWNT5pcrWf;kmpnqbSQLBl;MwnLlVZZJkU;NSYWPEpZBuY;uyQpafHrxLT;RlEchOC92Yr;SAD8J9zO6MF;jz1y4ru52rC;hufCs1tU1gs;a9Pxllofrpx;X0TXADJv7GA;CNzWVlVeOdx;KlePTLpBdWd;IJAImvSE7P6;cGVl8WkpBTL;EEeh0pyQISB;eTOV59Rcv4F;Lcj8osNjKQx;k3TGMJ3ru5y;NwzMLHAFMSC;qwFz1atKnbC;Ivd9opj8WCi;HMEUM6T2dxF;nWRerupXUoy;zx2fEoXul5W;QvexV259cj2;qoeOTJT0x6o;Qhi9QXHzP9b;BwJsDwQayqN;fLjZYZB3tuB;sr87SW2uEmt;ShxnDczlruP;YzWIMlVnfxq;LD4thW4OmXi;Wa3cm09YbsP;wwl4tRTnPEo;ccIfQsrfWeL;NlXYR3IJWCl;c4ZuqcOCyix;Kpa6sheYah0;W5GuP81V3Zf;aruodm4tcnY;WSaSCvJTnfQ;ctT1j57B2OL;avzBnVwWlV9;Q5AQcGLeh7y;fVzXb5qPrCp;UlFUBEpJsSs;wULlcm4Qj5S;xsoXkeM69KC;Fuwwc9CgYUN;tM1ecc8qcsJ;ItK93OX9wyu;pP6BsR5KiRM;hBSqV93WRL4;RppK9y0dY08;ACM4BHrKZNQ;mcVhgPQtLLX;pZr0OzykmJB;QtBqSDM3YCN;xCl76XUXHb9;cUHWPSXirUl;O9HZJ5frgiJ&dimension=ou:LEVEL-3;"+ $scope.selectedOrgUnit +"&filter=pe:" + $scope.selectedPeriod + "&displayProperty=NAME";
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
                    var lastUrl="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:MG98iWgxXNT;SgeSIiqTN2l;n611GaZn5Xr;q3ELeLciuTh;RifXFxv1lQq;QqqAeR0wrwS;fWq6ZXy0Uzp;Yut5amdi7iw;CWXG9lBSI7Y;HWZmyu3j4NX;zqaHIXl6j7c;iP9wSaCAZl5;SxNQQBphBOS;Y6xpjIVTsJ7;mMkFYcDVj3e;f6Q9p6uSWtS;QhpE8F5apCj;zfhmMA4HeJn;C2Rg2uPfbhs;NLBkuHemCAx;f8yQ5FUAIx0;zQQFpz3JT6g;v6sdLtxvY1K;x5cswY9qs7m;fYO2JUHPdul;anYwhLJV58B;Wyorktq1rUA;o0KObJuu9Yu;gNQ5NYT8SCz;kzj3RYX536Y;VSb3ctsTz4z;eoZtkUbfrmF;VmFo3tNlgIW;uAa5OgHFwud;GQwVaLxM9Gs;YVOid8f091G;FkKfVoslpKi;l1GL5Tmn22E;Y7upeLGM36C;DWWNT5pcrWf;kmpnqbSQLBl;MwnLlVZZJkU;NSYWPEpZBuY;uyQpafHrxLT;RlEchOC92Yr;SAD8J9zO6MF;jz1y4ru52rC;hufCs1tU1gs;a9Pxllofrpx;X0TXADJv7GA;CNzWVlVeOdx;KlePTLpBdWd;IJAImvSE7P6;cGVl8WkpBTL;EEeh0pyQISB;eTOV59Rcv4F;Lcj8osNjKQx;k3TGMJ3ru5y;NwzMLHAFMSC;qwFz1atKnbC;Ivd9opj8WCi;HMEUM6T2dxF;nWRerupXUoy;zx2fEoXul5W;QvexV259cj2;qoeOTJT0x6o;Qhi9QXHzP9b;BwJsDwQayqN;fLjZYZB3tuB;sr87SW2uEmt;ShxnDczlruP;YzWIMlVnfxq;LD4thW4OmXi;Wa3cm09YbsP;wwl4tRTnPEo;ccIfQsrfWeL;NlXYR3IJWCl;c4ZuqcOCyix;Kpa6sheYah0;W5GuP81V3Zf;aruodm4tcnY;WSaSCvJTnfQ;ctT1j57B2OL;avzBnVwWlV9;Q5AQcGLeh7y;fVzXb5qPrCp;UlFUBEpJsSs;wULlcm4Qj5S;xsoXkeM69KC;Fuwwc9CgYUN;tM1ecc8qcsJ;ItK93OX9wyu;pP6BsR5KiRM;hBSqV93WRL4;RppK9y0dY08;ACM4BHrKZNQ;mcVhgPQtLLX;pZr0OzykmJB;QtBqSDM3YCN;xCl76XUXHb9;cUHWPSXirUl;O9HZJ5frgiJ&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou";
                    //var lastUrl="http://139.162.204.124/dhis/api/analytics.csv?dimension=dx:i47jm4Pkkq6;vfaY7k6TINl;tit1C1VPIV7;aw1jQ1tJTmE&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }else{
                    var lastUrl="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:MG98iWgxXNT;SgeSIiqTN2l;n611GaZn5Xr;q3ELeLciuTh;RifXFxv1lQq;QqqAeR0wrwS;fWq6ZXy0Uzp;Yut5amdi7iw;CWXG9lBSI7Y;HWZmyu3j4NX;zqaHIXl6j7c;iP9wSaCAZl5;SxNQQBphBOS;Y6xpjIVTsJ7;mMkFYcDVj3e;f6Q9p6uSWtS;QhpE8F5apCj;zfhmMA4HeJn;C2Rg2uPfbhs;NLBkuHemCAx;f8yQ5FUAIx0;zQQFpz3JT6g;v6sdLtxvY1K;x5cswY9qs7m;fYO2JUHPdul;anYwhLJV58B;Wyorktq1rUA;o0KObJuu9Yu;gNQ5NYT8SCz;kzj3RYX536Y;VSb3ctsTz4z;eoZtkUbfrmF;VmFo3tNlgIW;uAa5OgHFwud;GQwVaLxM9Gs;YVOid8f091G;FkKfVoslpKi;l1GL5Tmn22E;Y7upeLGM36C;DWWNT5pcrWf;kmpnqbSQLBl;MwnLlVZZJkU;NSYWPEpZBuY;uyQpafHrxLT;RlEchOC92Yr;SAD8J9zO6MF;jz1y4ru52rC;hufCs1tU1gs;a9Pxllofrpx;X0TXADJv7GA;CNzWVlVeOdx;KlePTLpBdWd;IJAImvSE7P6;cGVl8WkpBTL;EEeh0pyQISB;eTOV59Rcv4F;Lcj8osNjKQx;k3TGMJ3ru5y;NwzMLHAFMSC;qwFz1atKnbC;Ivd9opj8WCi;HMEUM6T2dxF;nWRerupXUoy;zx2fEoXul5W;QvexV259cj2;qoeOTJT0x6o;Qhi9QXHzP9b;BwJsDwQayqN;fLjZYZB3tuB;sr87SW2uEmt;ShxnDczlruP;YzWIMlVnfxq;LD4thW4OmXi;Wa3cm09YbsP;wwl4tRTnPEo;ccIfQsrfWeL;NlXYR3IJWCl;c4ZuqcOCyix;Kpa6sheYah0;W5GuP81V3Zf;aruodm4tcnY;WSaSCvJTnfQ;ctT1j57B2OL;avzBnVwWlV9;Q5AQcGLeh7y;fVzXb5qPrCp;UlFUBEpJsSs;wULlcm4Qj5S;xsoXkeM69KC;Fuwwc9CgYUN;tM1ecc8qcsJ;ItK93OX9wyu;pP6BsR5KiRM;hBSqV93WRL4;RppK9y0dY08;ACM4BHrKZNQ;mcVhgPQtLLX;pZr0OzykmJB;QtBqSDM3YCN;xCl76XUXHb9;cUHWPSXirUl;O9HZJ5frgiJ&dimension=ou:LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou"
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