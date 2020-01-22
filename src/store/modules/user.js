import Vue from 'vue'

const state = {
	profile_info: {},
	rules:        [],
	httpTrigger:  false,
};

const actions = {

	GetProfile({state, rootState, dispatch}, id) {
		state.httpTrigger = false;
		if (!id) id = localStorage[rootState.STORAGE_ID];
		Vue.http.post(rootState.REST_URL + 'profiles/api/auth/profile-info', {profile_id: id}).then(
			response => {
				console.log(response.data);
				dispatch('SetupProfile', response.data);
			},
			response => {
				console.log(response.data);
				dispatch('ShowErrow', response.data);
			});
	},

	UpdateProfile({rootState, dispatch}, info) {
		Vue.http.post(rootState.REST_URL + 'profiles/api/auth/profile-edit', info).then(
			response => {
				window.f7.hidePreloader();
				window.f7.alert('Данные успешно обновлены!', function() {
					dispatch('SetupProfile', response.data);
					window.f7.accordionClose(".edit-profile");
				});
			},
			response => {
				window.f7.hidePreloader();
				console.log(response.data);
				dispatch('ShowErrow', response.data);
			});
	},

	SetupProfile({state, commit, rootState, dispatch}, user) {
		state.httpTrigger = true;
		localStorage[rootState.STORAGE_ID] = user.profile.profile_id;
		commit('MountUser', user);
		dispatch('GetEPSlist');
		dispatch('GetEPShistory', user.profile.profile_id);

		// надо подождать инициализации переменной FCMPlugin
		setTimeout(function() {
			FCMPlugin.getToken(function(token) {
				let json = {
					"token":      token,
					"platform":   device.platform.toLowerCase(),
					"profile_id": localStorage["YokohamaID"]
				};
				dispatch('PushReg', json);
			});
		}, 500);
	},

	PushReg({state}, json) {
		Vue.http.post(rootState.REST_URL + 'profiles/api/auth/gcm', json).then(
			response => {
				console.log(response.data);
			},
			response => {
				console.log(response.data);
			});
	},

	GetRules({state, commit, rootState}, id) {
		Vue.http.post(rootState.REST_URL + 'profiles/api/auth/rules', {profile_id: id}).then(
			response => {
				commit('SaveRules', response.data.rules);
			},
			response => {
				console.log(response.data);
			});
	},
};

const mutations = {
	MountUser(state, newUser) {
		state.profile_info = newUser.profile;
		//state.profile_info.money = newUser.purse.balance;
	},
	SaveRules(state, rules) {
		state.rules = rules;
	}
};

export default {
	state,
	actions,
	mutations
}
