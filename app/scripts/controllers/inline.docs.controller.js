angular.module('umbraco').controller('InlineDocsController', ['$scope', 'assetsService', 'userService',
    function($scope, assetsService, authResource) {
        $scope.model.hideLabel = true;
        //$scope.initiated = false;
        $scope.editing = false;
        $scope.isAdmin = false;
        
        // if we don't have any HTML here and we have a defaultText
        if (!$scope.model.value || $scope.model.value === '' && $scope.model.config.defaultText && $scope.model.config.defaultText.length) {
            $scope.model.value = $scope.model.config.defaultText;
        }
        
        // load markdown
        /*if ( !! window.markdown) {
            assetsService.load(['/App_Plugins/EpiphanyDocumentation/markdown.min.js']).then(function() {
                if (!$scope.initiated) {
                	$scope.initiated = true;
                }
                $scope.update();
            });
        }*/

        // are we an admin user?
        authResource.getCurrentUser().then(function(user) {
            if (user.userType === 'admin') {
                $scope.isAdmin = true;
            }
        });

        $scope.update = function() {
            $scope.html = window.markdown.toHTML($scope.model.value);
        };

        $scope.$watch('model.value', function(val) {
            $scope.update();
        });

        $scope.update();

        //assetsService.loadCss("/App_Plugins/EpiphanyDocumentation/documentation.css");
    }
]);