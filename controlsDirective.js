angular.module('WaterApp').directive('controls', function(){
    return {
        restrict: 'E',
        templateUrl: 'controlsTemplate.html',
        replace: true,
        scope: {
            model: '='
        },
        link: ControlsDirective
    }
    
    function ControlsDirective($scope, element, attrs){
        
        $scope.Randomize = function() {
            $scope.$emit("RandomizeButtonClicked");
        }
        
        $scope.Solve = function() {
            $scope.$emit("SolveButtonClicked");
        }
    }
});