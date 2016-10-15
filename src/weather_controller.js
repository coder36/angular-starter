import {connect, loadWeather} from './store'
import fecha from 'fecha'
import Map from 'es6-map';
import './weather_app.css'


export default class {
    constructor($scope) {
        connect(this, $scope, this.onStoreChange)
        loadWeather()
    }

    groupWeatherByDay(list) {
        const days = new Map() // use Map as need we to maintain insertion order

        list.forEach((w) => {
            const day = fecha.format(w.dt * 1000, "dddd Do MMMM")
            if (!days[day]) days[day] = []
            days[day].push(w)
        })

        return days;
    }

    convertKmphToMph(kmph) {
        return kmph * 0.621371
    }

    onStoreChange($scope, props) {
        $scope.ready = props.ready
        if (props.ready) {
            const weather = props.weather
            const weatherRows = this.groupWeatherByDay(weather.list || [])
            $scope.weatherRows = Object.keys(weatherRows).map((day, index) => ({
                city: weather.city && weather.city.name,
                data: weatherRows[day].map( (row) => ({
                  time: `${fecha.format(row.dt*1000, "HH:mm")}`,
                  icon: `http://openweathermap.org/img/w/${row.weather[0].icon}.png`,
                  iconName: row.weather[0].description,
                  temp: `${Math.round(row.main.temp)}°C`,
                  arrowStyling: {transform: `rotate(${Math.round(row.wind.deg)}deg)`},
                  windSpeed: `${Math.round(this.convertKmphToMph(row.wind.speed))} mph`,
                  windDirection: `${Math.round(row.wind.deg)}°`
                })),
                day,
                today: index === 0
            }))
        }

    }
}
