import angular from 'angular'
import uirouter from 'angular-ui-router';
import WeatherController from './weather_controller'
import WeatherPanelController from './weather_panel_controller'

const app = angular.module('app', [uirouter])

app.component( 'weather', {
  template: require('html!./weather.html'),
  controller: WeatherController
})

app.component( 'weatherpanel', {
  template: require('html!./weather_panel.html'),
  bindings: {  weather: '=' },
  controller: WeatherPanelController
})


app.config(function($stateProvider) {
  $stateProvider.state({ name: 'hello', url: '/hello', template: '<h1>Hello world</h1>' })
  $stateProvider
    .state({ name: 'weather', url: '', template: '<weather></weather>' })
})
