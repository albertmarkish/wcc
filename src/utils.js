export default angular.module('WaterApp')
    .service('utils', function () {

        this.GetRandomInt = function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    });