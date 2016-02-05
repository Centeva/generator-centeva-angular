angular.module('<%= appname %>')
    .factory("<%= srvname %>", function ($rootScope, $modal) {
		return {
			open: function (projectToBranches, projectId) {
				var $modalInstance = $modal.open({
					templateUrl: '<%= templateUrl %>',
					controller: '<%= ctrlname %> as vm',
					resolve: {
						ProjectToBranches: function () { return projectToBranches; },
						branches: function (ds) {
							return ds.getBranches();
						}
					}
				});
				<% if (uirouter) { %>
				var listener = $rootScope.$on('$stateChangeStart', function () {
					$modalInstance.dismiss('State Changed');
				});
				<% } else { %>
				var listener = $rootScope.$on('$routeChangeStart', function () {
					$modalInstance.dismiss('State Changed');
				});
				<% } %>
				$modalInstance.result.finally(function () {
					listener();
				});
				return $modalInstance;
			}
		};
	}).controller('<%= ctrlname %>', function ($scope, $modalInstance) {
        var vm = this;
        
        // vm.save = function(){
        //     $modalInstance.close(result);
        // }
        
        var destroy = $scope.$on("$destroy", function () {
            //Cleanup anything that would persist beyond destruction, including $on/$watch
            destroy();
        });
    });