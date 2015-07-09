
var seneca = require( 'seneca' )()
      .use( 'api' )
      .client( { type:'tcp', pin:'role:math' } )

var app = require( 'express' )()
      .use( require('body-parser').json() )
      .use( seneca.export( 'web' ) )
      .listen(3000)


