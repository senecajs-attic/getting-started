module.exports = function api( options ) {
  
  var valid_ops = { sum:'sum', product:'product' }

  this.add( 'role:api,path:calculate', function( msg, respond ) {
    this.act( 'role:math', {
      cmd:   valid_ops[msg.operation],
      left:  msg.left,
      right: msg.right,
    }, respond )
  })

  
  this.add( 'init:api', function( msg, respond ) {
    this.act('role:web',{use:{
      prefix: '/api',
      pin:    'role:api,path:*',
      map: {
        calculate: { GET:true, suffix:'/:operation' }
      }
    }}, respond )
  })

}
