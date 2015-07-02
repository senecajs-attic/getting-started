var seneca = require('seneca')()

seneca.add( 
  {role:'math', cmd:'sum'}, 
  function( msg, respond ) {
    var sum = msg.left + msg.right
    respond( null, { answer: sum } )
  })

seneca.act( 
  {role:'math', cmd:'sum', left:1, right:2}, 
  function( err, result ) {
    if( err ) return console.error( err )
    console.log( result )
  })
