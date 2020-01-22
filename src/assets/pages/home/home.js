export default {

	data () {
	    return {
	      REST_URL: this.$root.REST_URL,
	      rules: this.$store.state.user.rules,
	    }
  	},

  	computed: {
        user: function () {return this.$store.state.user.profile_info},
        httpTrigger: function () {return this.$store.state.user.httpTrigger},
      },

  	methods: {

	  	ToggleEdit:  function (){
		  this.$f7.accordionToggle(".edit-profile");
		},

		UpdateProfile: function(){
			this.$f7.showPreloader(["Подождите..."]);
			var info = this.$f7.formToJSON('#update-profile-form');
			info.profile_id = localStorage[this.$root.STORAGE_ID];
			console.log(info);
			this.$store.dispatch('UpdateProfile', info );
		}
	},

	created: function () {

	}


}