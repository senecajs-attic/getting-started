
// these are equivalent
require('seneca')()
  .use( require('./math.js') )
  .act( 'role:math,cmd:sum,left:1,right:2', console.log )

require('seneca')()
  .use( 'math' ) // finds ./math.js in local folder
  .act( 'role:math,cmd:sum,left:1,right:2', console.log )

