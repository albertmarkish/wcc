import angular from 'angular';

export default angular.module('WaterApp')
    .controller('MainController', ['$scope', '$log', 'solver', 'utils',
        function ($scope, $log, solver, utils) {

            $scope.model = {
                column_count: 10,
                row_count: 10,
                walls: [], // array of block count in each wall
                solution: null // contains total water amount and array of water amount for each wall
            };

            function RandomizeWalls() {
                const random_walls = new Array($scope.model.column_count);
                for (let i = 0; i < random_walls.length; i++) {
                    random_walls[i] = utils.GetRandomInt(0, $scope.model.row_count);
                }
                $scope.model.walls = random_walls;
            }

            function Solve() {
                $log.debug("Solving", $scope.model.walls);
                $scope.model.solution = solver.Solve($scope.model.walls);
            }

            $scope.$on('RandomizeButtonClicked', RandomizeWalls);
            $scope.$on('SolveButtonClicked', Solve);
        }
    ]);