export default angular.module('WaterApp')
    .factory('solver', ['$log', function ($log) {

        return {
            Solve: CalculateWaterCapacity
        };

        function CalculateWaterCapacity(walls_array) {

            const input = walls_array.slice(); // prevent original input modification

            const data = input.map(function (item, index) {
                return {
                    "index": index,
                    "value": item
                };
            });

            // sort walls from high to low
            data.sort(function (a, b) {
                return (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0);
            });

            let total_water_amount = 0;
            const water_amount_per_index = new Array(input.length).fill(0);

            // tracking visited positions for optimization
            const visited_positions = input.slice().fill(0);
            let unvisited_count = input.length - 1;
            visited_positions[data[0].index] = 1;

            for (let i = 1; i < data.length; i++) {

                // abort if all positions have been visited
                if (!(unvisited_count > 0)) {
                    $log.debug("All positions have been visited.");
                    break;
                }

                let first_peak_index = data[0].index;
                let second_peak_index = data[i].index;

                // mark as visited or skip:
                if (!visited_positions[second_peak_index]) {
                    visited_positions[second_peak_index] = 1;
                    unvisited_count--;
                } else {
                    continue; // this position was already visited
                }

                // swap indexes (run from low to hight)
                if (first_peak_index > second_peak_index) {
                    const temp = first_peak_index;
                    first_peak_index = second_peak_index;
                    second_peak_index = temp;
                }

                const water_level = data[i].value;
                $log.debug("Running from index " + first_peak_index + " to index " + second_peak_index);

                // run between two walls and add water up to water_level:
                for (let j = first_peak_index + 1; j < second_peak_index; j++) {

                    if (visited_positions[j]) continue;

                    visited_positions[j] = 1;
                    unvisited_count--;

                    if (input[j] < water_level) {
                        const water_amount_to_add = water_level - input[j];
                        total_water_amount += water_amount_to_add;
                        water_amount_per_index[j] = water_amount_to_add;
                        $log.debug("Adding water:", water_amount_to_add, "at position", j);
                        input[j] += water_amount_to_add;
                    } else {
                        // it's a wall or a full position
                        $log.debug("Position " + j + " is full.");
                    }
                }
            }

            $log.debug("Solution:", total_water_amount);

            return {
                total_water_amount: total_water_amount,
                water_amount_per_index: water_amount_per_index
            };
        }
    }]);