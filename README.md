# angular-starter

Bootstapped Angular 1.5.x application, with support for:

* An awesome developer experience
* Linting
* ES6
* Redux
* Angular Router
* Cucumber with Chrome and Phantom support via Capybara
* Production builds optimised to support browser caching
* Hot reloading


## Usage

Starting up a dev server
```
npm install
npm start
```

Navigate to [http://localhost:3000](http://localhost:3000)


Building production code and running locally:
```
npm run build
npm install -g pushstate-server
pushstate-server build
open http://localhost:9000
```

## Testing with Cucumber
Assuming ruby 2.2.3 and chromedriver are installed

Start up server in cucumber mode:
```
npm run start_in_cucumber_mode
```

In another shell run cucumber

```
cd cucumber
bundle install
cucumber
```

It also supports running in a headless browser. Assummg Phantomjs is installed:
```
cucumber browser=phantom
```

## Production optimisation

Assuming, a web server will be serving up the static .css, .html and .js files, then cache-control headers should be added:
```
{
  "root": "build/",
  "headers": {
    "/static/css/**": {
      "Cache-Control": "max-age=31536000"
    },
    "/static/js/**": {
      "Cache-Control": "max-age=31536000"
    }
  }
}
```

## Deployment to heroku
```
  heroku create fivedays-angular --buildpack https://github.com/mars/create-react-app-buildpack.git
  git push heroku master
```

In `static.json` I've set the static assets to be cached in the browser using the `max-age` `cache-control` setting. Since I expect the final javascript minified file to be over 100K, this will make a great optimisation - on a slow internet connection ie. 3g there would otherwise be a visible delay whilst downloading the assets.


# Notes

Built on top of facebooks excellent webpack configuration provided by [create-react-app](https://github.com/facebookincubator/create-react-app)

To add angular support to the vanilla create-react-app I cloned the react-scripts subfolder from [here](https://github.com/facebookincubator/create-react-app/tree/master/packages/react-scripts) and included it in the package.json:

```
"react-scripts": "https://github.com/coder36/angular-react-scripts.git"
```

To enable support for angular 1.5.x I set `mangle: false` in [webpack.config.prod.js](https://github.com/coder36/angular-react-scripts/blob/master/config/webpack.config.prod.js).  Angular utilises dependency injection via specially named parameters.  Mangling these names breaks things.

I also changed [env.js](https://github.com/coder36/angular-react-scripts/blob/master/config/env.js) to look for environment variables starting: `ANGULAR_APP_*`
