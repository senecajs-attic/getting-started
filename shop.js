module.exports = function( options ) {

  this.add( 'role:shop,get:product', function( msg, respond ) {
    this.make( 'product' ).load$( msg.id, respond )
  })

  this.add( 'role:shop,add:product', function( msg, respond ) {
    this.make( 'product' ).data$(msg.data).save$(respond)
  })

  this.add( 'role:shop,cmd:purchase', function( msg, respond ) {
    this.make( 'product' ).load$(msg.id, function( err, product ) {
      if( err ) return respond( err )
      
      this
        .make( 'purchase' )
        .data$({
          when:    Date.now(),
          product: product.id,
          name:    product.name,
          price:   product.price,
        })
        .save$( function( err, purchase ) {
          if( err ) return respond( err )
          
          this.act('role:shop,info:purchase',{purchase:purchase})
          respond(null,purchase)
        })
    })
  })

  this.add( 'role:shop,info:purchase', function( msg, respond ) {
    this.log.info('purchase',msg.purchase)
    respond()
  })
}
