import angular from 'angular';

const app = angular.module('WaterApp', []);

app.config(function($logProvider){
  $logProvider.debugEnabled(false);
});

export default app;