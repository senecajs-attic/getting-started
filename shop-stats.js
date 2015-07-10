var stats = {}
require('seneca')()
  .add('role:shop,info:purchase',function( msg, respond ) {
    var product_name = msg.purchase.name
    stats[product_name] = stats[product_name] || 0
    stats[product_name]++
    console.log(stats)
    respond()
  })
  .listen({port:9003,pin:'role:shop,info:purchase'})

