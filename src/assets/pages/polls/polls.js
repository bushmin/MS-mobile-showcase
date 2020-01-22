export default {

	data() {
		return {
			REST_URL:   this.$root.REST_URL,
			STORAGE_ID: this.$root.STORAGE_ID,
			http:       this.$root.$http,
			user:       this.$store.state.user.profile_info,
		}
	},

	computed: {
		polls: function() { return this.$store.state.polls.polls },
		user_polls: function() { return this.$store.state.polls.user_polls }
	},

	methods: {

		Question: function(poll_id) {
			this.$f7.showPreloader(["Подождите..."]);
			var json = {
				"profile_id": localStorage[this.STORAGE_ID],
				"poll_id":    poll_id,
			};
			this.http.post(this.REST_URL + 'polls/api/poll/question', json).then(
				response => {
					this.$f7.hidePreloader();
					console.log(response.data);
					this.$store.commit('SetUserPoll', response.data.userPoll);
					this.$store.commit('SetQuestion', response.data.question);
					window.f7.views.main.router.load( { url: '/polls_question/'} );
				},
				response => {
					this.$f7.hidePreloader();
					console.log(response.data);
					this.$store.dispatch('ShowErrow', response.data);
				});
		}
	},

	created: function() {
		this.$store.dispatch('GetUserPolls');
	},
}
