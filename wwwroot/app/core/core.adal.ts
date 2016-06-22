module AngularTs.Core {
    'use strict';
    var core = angular.module('angularTs.adal', []);
	
	
    // using '!' as the hashPrefix but can be a character of your choosing
    core.config(['$locationProvider', function($locationProvider: ng.ILocationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);
      //ADAL
    core.constant('appId', 'ff702e8e-9aba-462b-b869-9572c17c87bf');
	core.constant('powerBIResourceId', 'https://analysis.windows.net/powerbi/api');
    
    core.config(['$logProvider', function($logProvider: ng.ILogProvider) {
        // set debug logging to on
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }]);


    core.config(['$httpProvider', 'adalAuthenticationServiceProvider', 'appId', 'powerBIResourceId', adalConfigurator]);

    function adalConfigurator($httpProvider: ng.IHttpProvider, adalProvider: any, appId: string, powerBIResourceId: string) {
        var adalConfig = {
            instance: 'https://login.microsoftonline.com/',
            tenant: 'charlienowwot.onmicrosoft.com',//'common',
            clientId: appId,
            extraQueryParameter: 'nux=1',
            endpoints: {
                'https://api.powerbi.com/beta/myorg': powerBIResourceId
            }
            // cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost. 
        };
        //The url used to talk to the powerbi api
        adalProvider.init(adalConfig, $httpProvider);
    }
}
