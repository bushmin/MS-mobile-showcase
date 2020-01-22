export default {

	data () {
	    return {
			REST_URL: this.$root.REST_URL,
			user: this.$store.state.user.profile_info,
			eps_array: this.$store.state.eps.eps_array,
			selected_card: this.$store.state.eps.selected_card,
			selected_nominal: this.$store.state.eps.selected_nominal
	    }
  	},

  	computed: {
  		cart_length: function () { return this.$store.state.eps.cart_length }
  	},


 	methods: {

  		SelectNominal: function(num){
			this.$store.commit('SetSelectedNominal', num);
		},

		PrepareToAdd: function(){
			var info = this.$f7.formToJSON('#sertificate-form');
			info.qty = Number(info.qty);
			this.$store.dispatch('AddToCart', info);
		}

	}
}