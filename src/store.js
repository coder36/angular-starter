import {createStore, applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'
import 'whatwg-fetch'

const DATA_LOADED = "DATA_LOADED"

function reducer(state = {ready: false, weather: {} }, action) {
    switch(action.type) {
        case DATA_LOADED:
            return {
                ready: true,
                weather: action.data
            }
        default:
            return state
    }
}


function dataReady(data) {
    return {
        type: DATA_LOADED,
        data
    }
}



const store = createStore( reducer, applyMiddleware( reduxThunk) )

function loadWeather() {
  store.dispatch( (dispatch) => {
    const url = process.env.ANGULAR_APP_API || "http://api.openweathermap.org/data/2.5/forecast?APPID=019a736fd448ec0464f324f3f7063003&units=metric&q=Newcastle,uk&mode=json"
    return fetch(url).then(resp => resp.json()).then((data) => dispatch( dataReady(data) ) )
  })
}

function connect( instance, $scope, handler ) {
  const fn = handler.bind(instance)
  fn($scope, store.getState() )
  const unsubscribe = store.subscribe( () => {
    fn( $scope, store.getState() )
    $scope.$apply()
  })

  $scope.$on('$destroy', unsubscribe);
}

export {
  store,
  connect,
  loadWeather
}
