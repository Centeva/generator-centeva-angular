angular.module('<%= _.camelize(appname) %>', ['ui.bootstrap','<%= routerModuleName %>', 'angular-loading-bar','ngAnimate','angularMoment']);
<% if (!uirouter) { %>
angular.module('<%= _.camelize(appname) %>').config(function($routeProvider) {

    $routeProvider.otherwise({redirectTo:'/home'});

});
<% } %><% if (uirouter) { %>
angular.module('<%= _.camelize(appname) %>').config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

});
<% } %>
angular.module('<%= _.camelize(appname) %>').run(function($rootScope) {



});
