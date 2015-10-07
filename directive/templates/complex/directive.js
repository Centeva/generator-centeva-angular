angular.module('<%= appname %>').directive('<%= _.camelize(name) %>', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {

        },
        templateUrl: '<%= htmlPath %>',
        link: function(scope, element, attrs, fn) {

            var destroy = scope.$on("$destroy", function(){
                //Cleanup anything that would persist beyond destruction, including $on/$watch
                destroy();
            });
        }
    };
});
