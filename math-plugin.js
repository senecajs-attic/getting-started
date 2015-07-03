function math( options ) { 

  this.add( 'role:math,cmd:sum', function sum( msg, respond ) {
    respond( null, { answer: msg.left + msg.right } )
  })

  this.add( 'role:math,cmd:product', function product( msg, respond ) {
    respond( null, { answer: msg.left * msg.right } )
  })

}

require('seneca')()
  .use( math )
  .act( 'role:math,cmd:sum,left:1,right:2', console.log )
