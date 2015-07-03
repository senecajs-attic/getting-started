var fs = require('fs')

function math( options ) { 

  // the logging function, built by init
  var log

  // place all the patterns together
  // this make it easier to see them at a glance
  this.add( 'role:math,cmd:sum',     sum )
  this.add( 'role:math,cmd:product', product )

  // this is the special initialization pattern
  this.add( 'init:math', init )


  function init( msg, respond ) {
    // log to a custom file
    fs.open( options.logfile, 'a', function( err, fd ) {

      // cannot open for writing, so fail
      // this error is fatal to Seneca
      if( err ) return respond( err )

      log = make_log(fd)
      respond()
    })
  }

  function sum( msg, respond ) {
    var out = { answer: msg.left + msg.right }
    log( 'sum '+msg.left+'+'+msg.right+'='+out.answer+'\n' )
    respond( null, out )
  }

  function product( msg, respond ) {
    var out = { answer: msg.left * msg.right }
    log( 'product '+msg.left+'*'+msg.right+'='+out.answer+'\n' )
    respond( null, out )
  }


  function make_log( fd ) {
    return function( entry ) {
      fs.write( fd, new Date().toISOString()+' '+entry, null, 'utf8', function(err) {
        if( err ) return console.log( err )

        // ensure log entry is flushed
        fs.fsync( fd, function(err) {
          if( err ) return console.log( err )
        })
      }) 
    }
  }
}

require('seneca')()
  .use( math, {logfile:'./math.log'} )
  .act( 'role:math,cmd:sum,left:1,right:2', console.log )
