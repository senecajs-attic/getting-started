var seneca = require('seneca')()

function make_respond( tag ) {
  return function( msg, respond ) {
    respond(null,{ was: msg.tag, expected:tag })
  }
}

seneca
  .add( 'a:1,c:3,d:4', make_respond( 'red' ) ) 
  .add( 'a:1,b:2,d:4', make_respond( 'orange' ) ) 
  .add( 'a:1,b:2,c:3', make_respond( 'yellow' ) ) 
  .add( 'a:1,c:3',     make_respond( 'green' ) ) 
  .add( 'a:1,b:2',     make_respond( 'blue' ) ) 
  .add( 'a:1',         make_respond( 'indigo' ) ) 

  .act( 'a:1,b:2, tag:blue', console.log )
  .act( 'a:1,b:2,d:4, tag:orange', console.log )
  .act( 'a:1,b:2,c:3, tag:yellow', console.log )


