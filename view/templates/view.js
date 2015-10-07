angular.module('<%= appname %>')
        .controller('<%= ctrlname %>', function ($scope) {
        
                var destroy = $scope.$on("$destroy", function () {
                        //Cleanup anything that would persist beyond destruction, including $on/$watch
                        destroy();
                });
        });