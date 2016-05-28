/**
 * Created by kelvin on 10/20/15.
 */

angular.module("hmisPortal")
    .run(function($window, $rootScope,$timeout) {
        $rootScope.online = navigator.onLine;
        $window.addEventListener("offline", function () {
            $rootScope.$apply(function() {
                $rootScope.online = false;
                $rootScope.status = "Offline";
            });
        }, false);
        $window.addEventListener("online", function () {
            $timeout(function(){
                $rootScope.$apply(function() {
                    $rootScope.online = true;
                    $rootScope.status = "Online";

                });
            },2000);
        }, false);
    })
    .controller("mainCtrl",function ($rootScope,$window,$scope,$q,$http,$timeout,$route,portalService,FPManager) {

        $scope.periodName = FPManager.getMonthName(FPManager.lastMonthWithData);
        $rootScope.showLoader = false;
        $rootScope.currentDownloading = false;
        $rootScope.$on("$routeChangeStart",
            function (event, current, previous, rejection) {
                $rootScope.online = navigator.onLine;
                $window.addEventListener("offline", function () {
                    $rootScope.$apply(function() {
                        $rootScope.online = false;
                        $rootScope.status = "Offline";
                    });
                }, false);
                $window.addEventListener("online", function () {
                    $timeout(function(){
                        $rootScope.$apply(function() {
                            $rootScope.online = true;
                            $rootScope.status = "Online";

                        });
                    },2000);
                }, false);
                $rootScope.showLoader = true;
            });
        $rootScope.$on("$routeChangeSuccess",
            function (event, current, previous, rejection) {
                $rootScope.online = navigator.onLine;
                $window.addEventListener("offline", function () {
                    $rootScope.$apply(function() {
                        $rootScope.online = false;
                    });
                }, false);
                $window.addEventListener("online", function () {
                    $timeout(function(){
                        $rootScope.$apply(function() {
                            $rootScope.online = true;
                            $rootScope.status = "Online";
                          });
                    },2000);
                }, false);
                $rootScope.showLoader = false;

            });

        $rootScope.changePeriodType = function(){

        };

        $scope.userGroupID='TzdTxMEbt1W';
        var userGroups =[];
        var dataTextToSend={};
        $scope.showLoading=false;
        $scope.messageSend=false;
        var messageUrl=portalService.base+'api/messageConversations';
        $scope.sendMessage=function(subject,textMessage,mail,phone){
            $scope.showLoading=true;
            userGroups.length=0;
            userGroups.push({'id':$scope.userGroupID});
            dataTextToSend['subject']=subject;
            dataTextToSend['text']=textMessage+" Contacts Details: Email " +mail+"  and Phone number " +phone;
            dataTextToSend['userGroups']=userGroups;
             $http({
                method: 'POST',
                url: messageUrl,
                data: dataTextToSend
            }).then(function(response) {
                     $scope.showLoading=false;
                    $scope.messageSend=true;
                    $scope.subject='';
                    $scope.textMessage='';
                    $scope.mail='';
                    $scope.phone='';
                    $timeout($scope.closeModalFunction,3000);
                },
                function(response) { // optional
                    $scope.showLoading=false;
                });


        };

        $scope.closeModalFunction=function(){
            $('#modal1').closeModal();
        };
        
        $scope.cards = {};
        $scope.data = {};
        $rootScope.periodType = 'years';
        $rootScope.selectedOrgUnit = "m0frOspS7JY";
        $rootScope.selectedPeriod = "2014";
        $scope.selectedOrgUnitLevel = "2";
        $scope.chartConfig = {
            title: {
                text: 'Combination chart'
            },
            xAxis: {
                categories: [],
                labels:{
                    rotation: -70,
                    style:{ "color": "#000000", "fontWeight": "normal" }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },labels:{
                    style:{ "color": "#000000", "fontWeight": "bold" }
                }
            },
            /*labels: {
                items: [{
                    html: 'doses',
                    style: {
                        left: '50px',
                        top: '18px',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                    }
                }]
            },*/
            series: []
        };

        $scope.leftclass = 'col s2';
        $scope.rightclass = 'col s10';
        $scope.showFilter = true;
        $scope.hideFilter = function(){
            $scope.rightclass = 'col s12';
            $scope.showFilter = false;
        };
        $scope.displayFilter = function(){
            $scope.leftclass = 'col s2';
            $scope.rightclass = 'col s10';
            $scope.showFilter = true;
        };

        $scope.linkValue = 'census';

        $scope.activateLink = function(linkValue){
            $scope.linkValue = linkValue;
            alert(linkValue);
        }
        $scope.reloadAction=function(){
            $route.reload();
        }


     }).directive('portalCard', function() {
        return {
            restrict: 'AE',
            replace: false,
            scope: {
                dataobject : "="
            },
            controller: function () {
                this.showTabale = false;
                var ctrl = this;
                this.changeTable = function (type) {
                    ctrl.showTable = (type == "table")?true:false;
                }
            },
            controllerAs: 'cardCtrl',
            bindToController: true,
            templateUrl: 'directives/portalCard.html',
            link: function (scope, element, attrs) {

            }
        };
    });


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}