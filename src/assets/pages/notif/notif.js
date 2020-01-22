export default {

	data () {
	    return {
	      REST_URL: this.$root.REST_URL,
	      STORAGE_ID: this.$root.STORAGE_ID,
	      http: this.$root.$http,
	      user: this.$store.state.user.profile_info,
	    }
  	},

 	methods: {

 		NotifSettings: function(){
 			var Vue = this;
			if (this.user) {
				setTimeout(function () {
					var json = Vue.$f7.formToJSON('#notif-form');
					json.profile_id = localStorage[Vue.STORAGE_ID];
					json.push_news = json.push_news.length;
					json.push_sales = json.push_sales.length;
					console.log(json);
					Vue.http.post(Vue.REST_URL + 'profiles/api/auth/profile-edit', json ).then(
					response => {
						console.log(response.data);
						Vue.$store.dispatch('GetProfile');
						},
					response => {
						console.log(response.data);
						Vue.$store.dispatch('ShowErrow', response.data);
					});
				}, 400);
			}
		}

	}

}
