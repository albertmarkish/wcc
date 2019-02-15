var app = angular.module('WaterApp', []);

app.config(function($logProvider){
  $logProvider.debugEnabled(false);
});