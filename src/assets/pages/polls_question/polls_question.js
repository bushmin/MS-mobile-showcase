export default {

	data() {
		return {
			REST_URL: this.$root.REST_URL,
			http:     this.$root.$http,
			userPoll: this.$store.state.polls.userPoll,
			question: this.$store.state.polls.question
		}
	},

	methods: {
		onF7Init: function(f7) {
		},

		Answer: function(answer_id) {
			let $this = this;
			let json = {
				"profile_id": this.userPoll.profile_id,
				"poll_id":    this.userPoll.poll_id,
				"answer_id":  answer_id
			};
			this.http.post(this.REST_URL + 'polls/api/poll/answer', json).then(
				response => {
					console.log(response.data);

					if (response.data.userPoll.finished) {
						$this.$f7.alert($this.userPoll.poll.epilogue, 'Опрос завершен', function() {
							$this.$store.dispatch('GetUserPolls');
							window.f7.views.main.router.load({url: '/polls/'});
						});
					}

					$this.userPoll = response.data.userPoll;
					$this.question = response.data.question;
				},
				response => {
					console.log(response.data);
					this.$store.dispatch('ShowErrow', response.data);
				});
		},
	}
}