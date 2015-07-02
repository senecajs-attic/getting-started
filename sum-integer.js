var seneca = require('seneca')()

seneca
  .add( 
    {role:'math', cmd:'sum'}, 
    function( msg, respond ) {
      var sum = msg.left + msg.right
      respond( null, { answer: sum } )
    })

  // both these messages will match role:math,cmd:sum

  .act( 
    {role:'math', cmd:'sum', left:1.5, right:2.5}, 
    console.log // prints { answer: 4 }
  )
  .act( 
    // the extra integer property is just ignored!
    {role:'math', cmd:'sum', left:1.5, right:2.5, integer:true}, 
    console.log // prints { answer: 4 }
  )


  .add( 
    {role:'math', cmd:'sum', integer:true}, 
    function( msg, respond ) {
      var sum = Math.floor(msg.left) + Math.floor(msg.right)
      respond( null, { answer: sum } )
    })

  // this still matches role:math,cmd:sum
  .act( 
    {role:'math', cmd:'sum', left:1.5, right:2.5}, 
    console.log // prints { answer: 4 }
  )

  // BUT this matches role:math,cmd:sum,integer:true
  // because it's more specific - more properties match
  .act( 
    {role:'math', cmd:'sum', left:1.5, right:2.5, integer:true}, 
    console.log // prints { answer: 3 } !!!
  )



