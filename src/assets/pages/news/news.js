export default {

	data () {
	    return {
	      	httpTrigger: false,
	     	REST_URL: this.$root.REST_URL,
	     	STORAGE_ID: this.$root.STORAGE_ID,
	     	http: this.$root.$http,
	      	news: [],
	      	user: this.$store.state.user.profile_info,
	    }
  	},


 	methods: {
		GetNews: function () {
		    this.http.post(this.REST_URL + 'news/api/news/list',
		    	{profile_id : localStorage[this.STORAGE_ID]} ).then(
			  response => {
			    console.log(response.data);
			    this.news = response.data.news;
			    this.httpTrigger = true;
			  }, 
			  response => {
			    console.log(response.data);
			});
		},

	},

	created: function () {
		this.GetNews();
	}
}

