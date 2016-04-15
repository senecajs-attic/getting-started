var assert = require('assert')

var seneca = require('seneca')()
      .use('entity')
      .use('shop')

      // uncomment to send messages to the shop-stats service
      // .client({port:9003,pin:'role:shop,info:purchase'})

      .error( assert.fail )

add_product()

function add_product() {
  seneca.act(
    'role:shop,add:product,data:{name:Apple,price:1.99}',
    function( err, save_apple ) {

      this.act(
        'role:shop,get:product', {id:save_apple.id},
        function( err, load_apple ) {

          assert.equal( load_apple.name, save_apple.name )

          do_purchase( load_apple )
        })
    })
}

function do_purchase( apple ) {
  seneca.act(
    'role:shop,cmd:purchase',{id:apple.id},
    function( err, purchase) {
      assert.equal( purchase.product, apple.id )
    }
  )
}
