<% if (hasRoute) {%><% if (!uirouter) { %>angular.module('<%= _.camelize(appname) %>').config(function($routeProvider) {
    
    $routeProvider.when('<%= route %>', {
        templateUrl: '<%= viewUrl%>',
        controller: '<%= ctrlname%> as vm'
        });
<% } %><% if (uirouter) { %>angular.module('<%= _.camelize(appname) %>').config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider.state('<%= name%>', {
        url: '<%= route%>',
        controller: '<%= ctrlname%> as vm',
        templateUrl: '<%= viewUrl%>',
    });    
<% } %>
}).controller('<%= ctrlname %>', function ($scope) {
<% } else { %>
angular.module('<%= _.camelize(appname) %>').controller('<%= ctrlname %>', function ($scope) {
<% } %> 
    var vm = this;
    var destroy = $scope.$on("$destroy", function () {
        //Cleanup anything that would persist beyond destruction, including $on/$watch
        destroy();
    });
});