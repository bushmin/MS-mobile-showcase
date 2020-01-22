export default {

	data() {
		return {
			REST_URL:     this.$root.REST_URL,
			http:         this.$root.$http,
			phoneMask:    "+7(",
			dealers:      [],
			preRegOpened: false,
			regOpened:    false,
		}
	},

	computed: {
		user: function() { return this.$store.state.user.profile_info }
	},

	methods: {
		IsOpened: function(url) {
			if (this.$root.current_url === url) return['selected-menu'];
			return [];
		},

		SetTab:        function(tab) {
			this.$f7.showTab(tab);
		},
		PullLoginForm: function() {
			this.$f7.showPreloader(["Подождите..."]);
			var loginfo = this.$f7.formToJSON('#login-form');
			this.http.post(this.REST_URL + 'profiles/api/auth/login', loginfo).then(
				response => {
					this.$f7.hidePreloader();
					this.$f7.closeModal('#login-screen');
					console.log(response.data);
					this.$store.dispatch('SetupProfile', response.data)
				},
				response => {
					this.$f7.hidePreloader();
					console.log(response.data);
					this.$store.dispatch('ShowErrow', response.data);
				});
		},
		PhoneSMS:      function() {
			this.$f7.showPreloader(["Подождите..."]);
			this.http.post(this.REST_URL + 'profiles/api/auth/token', {phone: this.phoneMask}).then(
				response => {
					var self = this;
					this.$f7.hidePreloader();
					console.log(response.data);
					this.$f7.prompt("Введите присланный код", " ",
						function(code) {
							if (code == response.data.token) {
								self.GetDealers();
								self.OpenRegPopup();
								self.ClosePreRegPopup();
							} else {
								self.$f7.alert("Введён неправильный код!");
							}
							;
						},
						function() {
						})
				},
				response => {
					this.$f7.hidePreloader();
					console.log(response.data);
					this.$store.dispatch('ShowErrow', response.data);
				});
		},
		Register:      function() {
			this.$f7.showPreloader(["Подождите..."]);
			var reginfo = this.$f7.formToJSON('#reg-form');
			reginfo.allowPersonalDataProcessing = reginfo.allowPersonalDataProcessing.length;
			reginfo.agreeWithTerms = reginfo.agreeWithTerms.length;
			console.log(reginfo);
			this.http.post(this.REST_URL + 'profiles/api/auth/register', reginfo).then(
				response => {
					var self = this;
					this.$f7.hidePreloader();
					console.log(response.data);
					this.$store.dispatch('SetupProfile', response.data);
					this.$f7.app.alert('Регистрация прошла успешно!', function() {
						self.CloseRegPopup();
						self.ClosePreRegPopup();
					});
				},
				response => {
					this.$f7.hidePreloader();
					console.log(response.data);
					this.$store.dispatch('ShowErrow', response.data);
				});
		},
		GetDealers:    function() {
			this.http.post(this.REST_URL + 'profiles/api/auth/register-info').then(
				response => {
					console.log(response.data);
					this.dealers = response.data.dealers;
				},
				response => {
					console.log(response.data);
					this.$store.dispatch('ShowErrow', response.data);
				});
		},

		OpenPreRegPopup:  function() {
			var self = this;
			self.preRegOpened = true;
		},
		ClosePreRegPopup: function() {
			var self = this;
			self.preRegOpened = false;
		},
		OpenRegPopup:     function() {
			this.$f7.popup('.reg');
		},

		CloseRegPopup: function() {
			this.$f7.closeModal('.reg');
		},

		Logout: function() {
			this.$f7.closePanel();
			localStorage[this.$root.STORAGE_ID] = '';
			this.$f7.loginScreen("#login-screen");
		},

		ResetData: function() {
			this.$f7.showPreloader(["Данные загружаются..."]);
			var json = {
				"site": this.$root.REST_URL
			};
			this.http.post(this.REST_URL + 'profiles/api/auth/reset-data', json).then(
				response => {
					this.$f7.hidePreloader();
					this.$f7.alert('Данные успешно сброшены!');
					this.$store.dispatch('GetUserPolls');
					this.$f7.mainView.router.load({url: '/home/'});
				},
				response => {
					this.$f7.hidePreloader();
					this.$store.dispatch('ShowErrow', response.data);
				});
		}
	}
}
