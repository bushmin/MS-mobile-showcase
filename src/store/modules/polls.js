import Vue from 'vue'
import Framework7 from 'framework7'
import Framework7Vue from 'framework7-vue'

const state = {
	userPoll: null, // это текущий пользовательский опрос
	question: null, // это текущий вопрос, на который отвечает участник
	user_polls: {}, // это список завершенных пользовательских опросов
	polls: {} // это список опросов, которые еще НЕ прошел текущий участник
}

const getters = {
}

const actions = {
	GetUserPolls: function( { state, commit, rootState } ) {
		Vue.http.post(rootState.REST_URL + '/polls/api/poll/by-profile', {profile_id: localStorage[rootState.STORAGE_ID]}).then(
			response => {
				console.log(response.data);
				commit('SetPolls', response.data.polls);
				commit('SetUserPolls', response.data.user_polls);
			},
			response => {
				console.log(response.data);
			});
	},
}

const mutations = {
	SetUserPoll(state, userPoll) {
		state.userPoll = userPoll;
	},
	SetQuestion(state, question) {
		state.question = question;
	},
	SetUserPolls(state, user_polls) {
		state.user_polls = user_polls;
	},
	SetPolls(state, polls) {
		state.polls = polls;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}