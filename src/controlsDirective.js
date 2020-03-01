import angular from 'angular';

export default angular.module('WaterApp')
    .directive('controls', function () {
        return {
            restrict: 'E',
            templateUrl: '../dist/controlsTemplate.html',
            replace: true,
            scope: {
                model: '='
            },
            link: ControlsDirective
        }

        function ControlsDirective($scope, element, attrs) {

            $scope.Randomize = function () {
                $scope.$emit("RandomizeButtonClicked");
            }

            $scope.Solve = function () {
                $scope.$emit("SolveButtonClicked");
            }
        }
    });