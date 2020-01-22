export default {

	data () {
	    return {
	      REST_URL: this.$root.REST_URL,
	       http: this.$root.$http,
	       httpTrigger: this.$store.state.user.httpTrigger,
	       eps_array: this.$store.state.eps.eps_array,
	       
	    }
  	},
  	computed: {
  		cart_length: function () { return this.$store.state.eps.cart_length },
  		eps_history: function () { return this.$store.state.eps.eps_history }
  	},

 	methods: {

  		OpenSertificate: function(num){
			this.$store.commit('SetSelectedCard', num);
			/*document.getElementById("picker-amount").value = "1";*/
			this.$router.load( { url: '/select_eps/'} );
		},


  		CanDeleteEPS: function(order){
		  var then = Date.parse(order.created_at);
		  var diff = new Date() - then;
		  var one_day = 86400000;
		  if ( (order.is_allow_cancel) && (diff < one_day) ) {return true}
		  else  {return false}
  		},

		ConfirmDeleteEps: function (id) {
			var store = this.$store;
          	this.$f7.confirm("Удалить заказ № " + id + "?", function(){ 
              	store.dispatch( 'DeleteEPS', id )
          })
        }
	}

}