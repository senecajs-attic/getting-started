module.exports = function api( options ) {
  
  var valid_ops = { sum:'sum', product:'product' }

  this.add( 'role:api,path:calculate', function( msg, respond ) {
    var operation = msg.args.params.operation
    var left = msg.args.query.left
    var right = msg.args.query.right
    this.act( 'role:math', {
      cmd:   valid_ops[operation],
      left:  left,
      right: right,
    }, respond )
  })

  
  this.add( 'init:api', function( msg, respond ) {
    this.act('role:web',{routes:{
      prefix: '/api',
      pin:    'role:api,path:*',
      map: {
        calculate: { GET:true, suffix:'/:operation' }
      }
    }}, respond )
  })

}
