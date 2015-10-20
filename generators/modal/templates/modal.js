angular.module('<%= appname %>')
    .controller('<%= ctrlname %>', function ($scope, $modalInstance) {
        var vm = this;
        
        // vm.save = function(){
        //     $modalInstance.close(result);
        // }
        
        var destroy = $scope.$on("$destroy", function () {
            //Cleanup anything that would persist beyond destruction, including $on/$watch
            destroy();
        });
    });