
var Express = require('express')
var Router = Express.Router
var context = new Router()

var senecaWebConfig = {
      context: context,
      adapter: require('seneca-web-adapter-express'),
      options: { parseBody: false } // so we can use body-parser
}

var app = Express()
      .use( require('body-parser').json() )
      .use( context )
      .listen(3000)

var seneca = require( 'seneca' )()
      .use( 'seneca-web', senecaWebConfig )
      .use( 'api' )
      .client( { type:'tcp', pin:'role:math' } )



