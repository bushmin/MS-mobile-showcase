export default {

	data () {
	    return {
	      REST_URL: this.$root.REST_URL,
        STORAGE_ID: this.$root.STORAGE_ID,
        user: this.$store.state.user.profile_info,
	    }
  	},

    computed: {
      cart_length: function () { return this.$store.state.eps.cart_length },
      cart: function () { return this.$store.state.eps.cart },
      cartsum: function () { return this.$store.state.eps.cart_sum }
    },

 	methods: {

		DeleteItem: function (card, nominal) {
      this.$store.dispatch('DeleteCartItem', {'name': card, 'nom': nominal});
		},

		NewAmountEps: function( e, key, index ) {
			this.$store.dispatch('SetEpsAmount', {'key': key, 'index': index, 'amount': e});
		},

    PrepareCart: function (argument) {
      this.$f7.showPreloader(["Подождите..."]);
      var final_cart = this.$f7.formToJSON('#cart-form');
      final_cart.profile_id = localStorage[this.STORAGE_ID];
      var items = [];
      for (var card in this.cart) {
        if (!this.cart.hasOwnProperty(card)) continue;
        var obj = this.cart[card];
        for (var prop in obj) {
        if(!obj.hasOwnProperty(prop)) continue;
        items.push(obj[prop]);
        }
      }
      final_cart.items = items;
      this.$store.dispatch('BuyEPS', final_cart);
    },
	}
  
}