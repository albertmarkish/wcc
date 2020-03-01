export default angular.module('WaterApp')
    .directive('visualization', function () {
        return {
            restrict: 'E',
            templateUrl: '../dist/visualizationTemplate.html',
            replace: true,
            scope: {
                model: '='
            },
            link: VisualizationDirective
        }

        function VisualizationDirective($scope, element, attrs) {

            // create default state (no walls):
            $scope.model.walls = new Array($scope.model.column_count).fill(0);

            $scope.$watch('model.column_count', function (newVal) {
                $scope.model.walls = new Array(newVal).fill(0);
                $scope.model.solution = null;
                BuildWalls();
            });

            $scope.$watch('model.row_count', function () {
                $scope.model.walls = new Array($scope.model.column_count).fill(0);
                $scope.model.solution = null;
                BuildWalls();
            });

            $scope.$watch('model.walls', function () {
                $scope.model.solution = null;
                BuildWalls();
            });

            $scope.$watch('model.solution', function (solution, old_solution) {
                if (old_solution && old_solution.total_water_amount) {
                    BuildWalls();
                }
                if (solution && solution.total_water_amount > 0) {
                    AddWater(solution.water_amount_per_index);
                }
            });

            function AddWater(water) {
                water.forEach(function (water_amount, col_index) {
                    if (water_amount) {
                        const wall_height = $scope.model.walls[col_index];
                        const total_height = $scope.model.row_count;
                        while (water_amount) {
                            const water_index = total_height - (wall_height + water_amount);
                            $scope.data[col_index].rows[water_index].is_water = true;
                            water_amount--;
                        }
                    }
                });
            }

            function BuildWalls() {
                const height = $scope.model.row_count;
                $scope.data = $scope.model.walls.map(function (value, index) {
                    const rows = [];
                    let empty_count = height - value;
                    for (let i = 0; i < height; i++) {
                        rows.push({
                            is_wall: empty_count <= 0
                        });
                        empty_count--;
                    }
                    return {
                        rows: rows
                    };
                });
            }

            $scope.OnCellClicked = function () {

                const col = this.$parent.$index;
                const row = this.$index;

                // update walls array:
                this.model.walls[col] = this.model.row_count - row;

                // update visualization model:
                this.data[col].rows.forEach(function (item) {
                    item.is_wall = false;
                });
                for (let i = row; i < this.model.row_count; i++) {
                    this.data[col].rows[i].is_wall = true;
                    this.data[col].rows[i].is_water = false;
                }
            }

            $scope.OnCellMouseover = function () {
                const col = this.$parent.$index;
                const row = this.$index;
                for (let i = row; i < this.model.row_count; i++) {
                    this.data[col].rows[i].is_hover = true;
                }
            }

            $scope.OnCellMouseleave = function () {
                const col = this.$parent.$index;
                const row = this.$index;
                this.data[col].rows.forEach(function (item) {
                    item.is_hover = false;
                });
            }
        }
    });