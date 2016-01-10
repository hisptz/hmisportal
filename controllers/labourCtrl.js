/**
 * Created by mahane on 12/17/15.
 */
angular.module("hmisPortal")

    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
    })
    .controller("labourCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared) {
        $scope.lastCard = function () {
            $scope.loadingImage=true;
            var base = "http://139.162.204.124/dhis/";
            $.post(base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            }, function () {
                if ($scope.selectedOrgUnit == "m0frOspS7JY") {
                    $scope.url="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:Xd84gz2uSf9;kSaNUdTb4F8;BUotpFFSkPQ;fE7a9uGTPkO;VlxSQ27Rhi2;TTVbKsy0ujj;SZJ9iGsglqE;G4Q6UJtxHFT;nqPGDlGZsra;EdaxsmnoohA;snAJ4ADu50F;acfZzCVLmCm;kS6I0CL0w3F;yx1Ndv0hlhO;EZQIyBHGU2T;MXYoYFrLHj7;tK58tIEMA98;QY2val5hffZ;ZQRLWoLtnh5;eGn4lgspxwe;p6wxhLrgfYk;yBzz4l1UOtl;ce7ATPhE8Iv;BH38bhaFhLi;noAFjjrlq0I;VmdKpg6sNUe;q0ewoslaQzh;KO7qCF1KvPe;e0dhhtEU53v;Kt3DuTIieoT;zIPQsS1TzEE;NHA2IdQHnEf;OkyCfGRhsu0;POhKRWHhzdU;rOAjnKgHpp2;lEOPtDuEHeq;TQZK24giSbK;ElOF8D7aP0i;pD7K7AoFjpC;q9psmxRIdRH;KnK5fJWiwAj;wN5dPOtnWSH;zoBB4JFDqxR;MddGBTdCmfs;ViiJpjAB7de;jnKVqijLjMh;Kd9Uowdea8d;N48UGIUhSV2;vRP3mSESH1p;PLvP1oyWXrR;R13YvBkHIWa;XF7skY7Ev6z;kKVapmjpwMq;yB7NlvHcZ6a;TpfqEgJtyar;Ty9LnhICdhY;T19wtwnFnwG;J1GyQdPvThy;OOV4qrxoS2K;gN4pFrafOXL;BonPQF32Nzs;A4hY1vHZS5b;ZBAEsBgVrBd;awbB2k6c4dy;totaZnTeUuK;nGed5u8o6gv;kLI4iGDbN3p;rsP3ppN4gC7;FLxWc7y0Q4I;aNQkSStG64V;czV0Bdb4OMs;Pg47B29PFoR;DUlS90FQGNh;DPLR0aQemYC;fC9eHFeDvRG;OYZqyYdha5W;XJUBOFs2prE;MmVGhPhIGwf;Yxp6bGZKZPL;TbpICb7JxKO;Ejy66fSepec;Kvt72ZQhs7Y;pVTitSjQ3oL;H8pprB9HXYF;KAiGnZ0qtWd;tvscIxUNNpl;f4Woa8xSfs5;gFhqoNswp73;pa8UbdA2aHj;ZOkuTkxNEbO;p0OmYHCQPto&dimension=ou:LEVEL-2;"+ $scope.selectedOrgUnit +"&filter=pe:" + $scope.selectedPeriod + "&displayProperty=NAME";
                } else {
                    $scope.url="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:Xd84gz2uSf9;kSaNUdTb4F8;BUotpFFSkPQ;fE7a9uGTPkO;VlxSQ27Rhi2;TTVbKsy0ujj;SZJ9iGsglqE;G4Q6UJtxHFT;nqPGDlGZsra;EdaxsmnoohA;snAJ4ADu50F;acfZzCVLmCm;kS6I0CL0w3F;yx1Ndv0hlhO;EZQIyBHGU2T;MXYoYFrLHj7;tK58tIEMA98;QY2val5hffZ;ZQRLWoLtnh5;eGn4lgspxwe;p6wxhLrgfYk;yBzz4l1UOtl;ce7ATPhE8Iv;BH38bhaFhLi;noAFjjrlq0I;VmdKpg6sNUe;q0ewoslaQzh;KO7qCF1KvPe;e0dhhtEU53v;Kt3DuTIieoT;zIPQsS1TzEE;NHA2IdQHnEf;OkyCfGRhsu0;POhKRWHhzdU;rOAjnKgHpp2;lEOPtDuEHeq;TQZK24giSbK;ElOF8D7aP0i;pD7K7AoFjpC;q9psmxRIdRH;KnK5fJWiwAj;wN5dPOtnWSH;zoBB4JFDqxR;MddGBTdCmfs;ViiJpjAB7de;jnKVqijLjMh;Kd9Uowdea8d;N48UGIUhSV2;vRP3mSESH1p;PLvP1oyWXrR;R13YvBkHIWa;XF7skY7Ev6z;kKVapmjpwMq;yB7NlvHcZ6a;TpfqEgJtyar;Ty9LnhICdhY;T19wtwnFnwG;J1GyQdPvThy;OOV4qrxoS2K;gN4pFrafOXL;BonPQF32Nzs;A4hY1vHZS5b;ZBAEsBgVrBd;awbB2k6c4dy;totaZnTeUuK;nGed5u8o6gv;kLI4iGDbN3p;rsP3ppN4gC7;FLxWc7y0Q4I;aNQkSStG64V;czV0Bdb4OMs;Pg47B29PFoR;DUlS90FQGNh;DPLR0aQemYC;fC9eHFeDvRG;OYZqyYdha5W;XJUBOFs2prE;MmVGhPhIGwf;Yxp6bGZKZPL;TbpICb7JxKO;Ejy66fSepec;Kvt72ZQhs7Y;pVTitSjQ3oL;H8pprB9HXYF;KAiGnZ0qtWd;tvscIxUNNpl;f4Woa8xSfs5;gFhqoNswp73;pa8UbdA2aHj;ZOkuTkxNEbO;p0OmYHCQPto&dimension=ou:LEVEL-3;"+ $scope.selectedOrgUnit +"&filter=pe:" + $scope.selectedPeriod + "&displayProperty=NAME";
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
                    var lastUrl="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:Xd84gz2uSf9;kSaNUdTb4F8;BUotpFFSkPQ;fE7a9uGTPkO;VlxSQ27Rhi2;TTVbKsy0ujj;SZJ9iGsglqE;G4Q6UJtxHFT;nqPGDlGZsra;EdaxsmnoohA;snAJ4ADu50F;acfZzCVLmCm;kS6I0CL0w3F;yx1Ndv0hlhO;EZQIyBHGU2T;MXYoYFrLHj7;tK58tIEMA98;QY2val5hffZ;ZQRLWoLtnh5;eGn4lgspxwe;p6wxhLrgfYk;yBzz4l1UOtl;ce7ATPhE8Iv;BH38bhaFhLi;noAFjjrlq0I;VmdKpg6sNUe;q0ewoslaQzh;KO7qCF1KvPe;e0dhhtEU53v;Kt3DuTIieoT;zIPQsS1TzEE;NHA2IdQHnEf;OkyCfGRhsu0;POhKRWHhzdU;rOAjnKgHpp2;lEOPtDuEHeq;TQZK24giSbK;ElOF8D7aP0i;pD7K7AoFjpC;q9psmxRIdRH;KnK5fJWiwAj;wN5dPOtnWSH;zoBB4JFDqxR;MddGBTdCmfs;ViiJpjAB7de;jnKVqijLjMh;Kd9Uowdea8d;N48UGIUhSV2;vRP3mSESH1p;PLvP1oyWXrR;R13YvBkHIWa;XF7skY7Ev6z;kKVapmjpwMq;yB7NlvHcZ6a;TpfqEgJtyar;Ty9LnhICdhY;T19wtwnFnwG;J1GyQdPvThy;OOV4qrxoS2K;gN4pFrafOXL;BonPQF32Nzs;A4hY1vHZS5b;ZBAEsBgVrBd;awbB2k6c4dy;totaZnTeUuK;nGed5u8o6gv;kLI4iGDbN3p;rsP3ppN4gC7;FLxWc7y0Q4I;aNQkSStG64V;czV0Bdb4OMs;Pg47B29PFoR;DUlS90FQGNh;DPLR0aQemYC;fC9eHFeDvRG;OYZqyYdha5W;XJUBOFs2prE;MmVGhPhIGwf;Yxp6bGZKZPL;TbpICb7JxKO;Ejy66fSepec;Kvt72ZQhs7Y;pVTitSjQ3oL;H8pprB9HXYF;KAiGnZ0qtWd;tvscIxUNNpl;f4Woa8xSfs5;gFhqoNswp73;pa8UbdA2aHj;ZOkuTkxNEbO;p0OmYHCQPto&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou";
                    //var lastUrl="http://139.162.204.124/dhis/api/analytics.csv?dimension=dx:i47jm4Pkkq6;vfaY7k6TINl;tit1C1VPIV7;aw1jQ1tJTmE&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }else{
                    var lastUrl="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:Xd84gz2uSf9;kSaNUdTb4F8;BUotpFFSkPQ;fE7a9uGTPkO;VlxSQ27Rhi2;TTVbKsy0ujj;SZJ9iGsglqE;G4Q6UJtxHFT;nqPGDlGZsra;EdaxsmnoohA;snAJ4ADu50F;acfZzCVLmCm;kS6I0CL0w3F;yx1Ndv0hlhO;EZQIyBHGU2T;MXYoYFrLHj7;tK58tIEMA98;QY2val5hffZ;ZQRLWoLtnh5;eGn4lgspxwe;p6wxhLrgfYk;yBzz4l1UOtl;ce7ATPhE8Iv;BH38bhaFhLi;noAFjjrlq0I;VmdKpg6sNUe;q0ewoslaQzh;KO7qCF1KvPe;e0dhhtEU53v;Kt3DuTIieoT;zIPQsS1TzEE;NHA2IdQHnEf;OkyCfGRhsu0;POhKRWHhzdU;rOAjnKgHpp2;lEOPtDuEHeq;TQZK24giSbK;ElOF8D7aP0i;pD7K7AoFjpC;q9psmxRIdRH;KnK5fJWiwAj;wN5dPOtnWSH;zoBB4JFDqxR;MddGBTdCmfs;ViiJpjAB7de;jnKVqijLjMh;Kd9Uowdea8d;N48UGIUhSV2;vRP3mSESH1p;PLvP1oyWXrR;R13YvBkHIWa;XF7skY7Ev6z;kKVapmjpwMq;yB7NlvHcZ6a;TpfqEgJtyar;Ty9LnhICdhY;T19wtwnFnwG;J1GyQdPvThy;OOV4qrxoS2K;gN4pFrafOXL;BonPQF32Nzs;A4hY1vHZS5b;ZBAEsBgVrBd;awbB2k6c4dy;totaZnTeUuK;nGed5u8o6gv;kLI4iGDbN3p;rsP3ppN4gC7;FLxWc7y0Q4I;aNQkSStG64V;czV0Bdb4OMs;Pg47B29PFoR;DUlS90FQGNh;DPLR0aQemYC;fC9eHFeDvRG;OYZqyYdha5W;XJUBOFs2prE;MmVGhPhIGwf;Yxp6bGZKZPL;TbpICb7JxKO;Ejy66fSepec;Kvt72ZQhs7Y;pVTitSjQ3oL;H8pprB9HXYF;KAiGnZ0qtWd;tvscIxUNNpl;f4Woa8xSfs5;gFhqoNswp73;pa8UbdA2aHj;ZOkuTkxNEbO;p0OmYHCQPto&dimension=ou:LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou"
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