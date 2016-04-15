
var seneca = require( 'seneca' )()
      .use('entity')
      .use( 'api-all' )
      .client( { type:'tcp', pin:'role:math' } )
      .client( { port:9002,  pin:'role:shop' } )

var app = require( 'express' )()
      .use( require('body-parser').json() )
      .use( seneca.export( 'web' ) )
      .listen(3000)

// create a dummy product
seneca.act(
  'role:shop,add:product',{data:{name:'Apple',price:1.99}},
  console.log
)
