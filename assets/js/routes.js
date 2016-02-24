/**
 * Created by kelvin on 1/9/15.
 */
angular.module("hmisPortal")
    .run( function($rootScope, $location) {
        // register listener to watch route changes
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            Pace.restart()
        });
    })
    .config( function($routeProvider){
        $routeProvider.when("/home",{
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardCtrl'
        });

        $routeProvider.when("/downloads",{
            templateUrl: 'views/downloads.html',
            controller: 'dashboardCtrl'
        });

        $routeProvider.when("/district_profiles",{
            templateUrl: 'views/district_profiles.html',
            controller: 'mainCtrl'
        });

        $routeProvider.when("/maternal",{
            templateUrl: 'views/maternal.html',
            controller: 'maternalCtrl'
        });

        $routeProvider.when("/dataset/:uid",{
            templateUrl: 'views/dataset.html',
            controller: 'dataCtrl'
        });

        $routeProvider.when("/morbidity",{
            templateUrl: 'views/morbidity.html',
            controller: 'morbidityCtrl'
        });

        $routeProvider.when("/mortality",{
            templateUrl: 'views/mortality.html',
            controller: 'mortalityCtrl'
        });
        $routeProvider.when("/hiv",{
            templateUrl: 'views/hiv.html',
            controller: 'mainCtrl'
        });
        $routeProvider.when("/updates",{
            templateUrl: 'views/updates.html',
            controller: 'mainCtrl'
        });
        $routeProvider.when("/antenatal",{
            templateUrl: 'views/antenatal.html',
            controller: 'antenatalCtrl'
        });
        $routeProvider.when("/labour",{
            templateUrl: 'views/labour.html',
            controller: 'labourCtrl'
        });
        $routeProvider.when("/child",{
            templateUrl: 'views/child.html',
            controller: 'childCtrl'
        });
        $routeProvider.when("/ipd",{
            templateUrl: 'views/ipd.html',
            controller: 'ipdCtrl'
        });
        $routeProvider.when("/opd",{
            templateUrl: 'views/opd.html',
            controller: 'opdCtrl'
        });
        $routeProvider.when("/postnatal",{
            templateUrl: 'views/postnatal.html',
            controller: 'postnatalCtrl'
        });
        $routeProvider.when("/planning",{
            templateUrl: 'views/planning.html',
            controller: 'planningCtrl'
        });
        $routeProvider.when("/mortalities",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/familyPlaning",{
            templateUrl: 'views/familyPlaning.html',
            controller: 'familyPlaningCtrl'
        });
        $routeProvider.when("/fpIntegration",{
            templateUrl: 'views/fpIntegration.html',
            controller: 'fpIntegrationCtrl'
        });
        $routeProvider.when("/antenatalCare",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/malaria",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/ivd",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/nutrition",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/hivaids",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/noncommunicabledisease",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/tracer_medicine",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/tb",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/ancIntegration",{
            templateUrl: 'views/indicatorsView.html',
                controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/laborDelivery",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/ldIntegration",{
            templateUrl: 'views/ldIntegration.html',
            controller: 'ldIntegrationCtrl'
        });
        $routeProvider.when("/newbornCare",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/postnatalCare",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/pncIntegration",{
            templateUrl: 'views/pncIntegration.html',
            controller: 'pncIntegrationCtrl'
        });
        $routeProvider.when("/gbvVac",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/cervicalCancer",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/book10",{
            templateUrl: 'views/book10.html',
            controller: 'book10Ctrl'
        });
        $routeProvider.when("/death",{
            templateUrl: 'views/death.html',
            controller: 'deathCtrl'
        });


        $routeProvider.when("/hbc",{
            templateUrl: 'views/hbc.html',
            controller: 'hbcCtrl'
        });

        $routeProvider.when("/hct",{
            templateUrl: 'views/hct.html',
            controller: 'hctCtrl'
        });
        $routeProvider.when("/pmtct",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/sti",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });

        $routeProvider.otherwise({
            redirectTo: '/home'
        });



    });
