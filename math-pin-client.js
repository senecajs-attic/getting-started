require( 'seneca' )()

  // a local pattern
  .add( 'say:hello', function( msg, respond ){ respond( null, {text:"Hi!"} ) } )

  // send any role:math patterns out over the network
  // IMPORTANT: must match listening service
  .client( { type:'tcp', pin:'role:math' } )

  // executed remotely
  .act('role:math,cmd:sum,left:1,right:2',console.log)

  // executed locally
  .act('say:hello',console.log)
