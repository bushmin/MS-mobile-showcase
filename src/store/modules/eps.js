import Vue from 'vue'
import Framework7 from 'framework7'
import Framework7Vue from 'framework7-vue'

const state = {
	httpTrigger: false,
	eps_array: [],
	eps_history: [],
	cart_length: 0,
	selected_card: 0,
	selected_nominal: 0,
	cart:{},
	cart_length: 0,
	cart_sum: 0
}

const getters = {
 
}

const actions = {

	GetEPSlist ( { state, commit, rootState } ) {
	    Vue.http.post(rootState.REST_URL + 'catalog/api-v3/cards/list').then(
		  response => {
		    console.log(response.data);
		    state.httpTrigger = true;
		    commit('SetCardArray', response.data.cards);
		  },
		  response => {
		    console.log(response.data);
		});
	},

	GetEPShistory ( { state, commit, rootState }, id ) {
	    Vue.http.post(rootState.REST_URL + 'catalog/api-v3/users/orders', {profile_id : id}).then(
		  response => {
		    console.log(response.data);
		    commit('SetCardHistory', response.data.orders);
		  },
		  response => {
		    console.log(response.data);
		});
	},

	AddToCart( { state, dispatch }, info ){
	info.card = state.eps_array[state.selected_card].type;
	info.card_name = state.eps_array[state.selected_card].name;
	if (state.cart[info.card]){
		if (state.cart[info.card][info.nominal]) {
		  	state.cart[info.card][info.nominal].qty += info.qty; 
		} else {
		  	state.cart[info.card][info.nominal] = info;
		}
	} else {
		state.cart[info.card] = {};
		state.cart[info.card][info.nominal] = info;
	}
	window.f7.alert("Корзина пополнена!");
	console.log(state.cart);
	dispatch('CountCart');
	},

	DeleteCartItem ( { state, dispatch }, info ) {
  		delete state.cart[info.name][info.nom];
  		dispatch('CountCart');
	},

	SetEpsAmount ( { state, dispatch }, info ) {
		state.cart[info.key][info.index].qty = Number(info.amount);
		dispatch('CountCart');
	},

	BuyEPS ( { state, commit, rootState, dispatch }, cart ) {
	    Vue.http.post( rootState.REST_URL + 'catalog/api-v3/orders/create', cart ).then(
		response => {
			window.f7.hidePreloader();
			console.log(response.data);
			state.cart = {};
			dispatch( 'GetProfile' );
			dispatch ( 'GetEPShistory', localStorage[rootState.STORAGE_ID] );
			window.f7.alert( "В течение 5 дней сертификаты придут на указанную почту!", function(){
				window.f7.mainView.router.load( {url: '/home/' } );
			} );
		  },
		response => {
			window.f7.hidePreloader();
		    console.log(response.data);
		    dispatch( 'ShowErrow', response.data );
		});
	},

	DeleteEPS ( { state, commit, rootState, dispatch }, id ) {
	    Vue.http.post( rootState.REST_URL + 'catalog/api-v3/orders/cancel', { "ms_order_id": id } ).then(
		response => {
			console.log(response.data);
			dispatch( 'GetProfile' );
			dispatch ( 'GetEPShistory', localStorage[rootState.STORAGE_ID] );
			window.f7.alert( "Заказ удалён!" );
		  },
		response => {
		    console.log(response.data);
		    dispatch( 'ShowErrow', response.data );
		});
	},

	CountCart ( { state, commit } ){
		var num = 0;
		var sum = 0;
		var cards_on_page = 0;
		for (var card in state.cart) {
			if (!state.cart.hasOwnProperty(card)) continue;
			var obj = state.cart[card];
			for (var prop in obj) {
			    if(!obj.hasOwnProperty(prop)) continue;
		    	cards_on_page += 1;
		      	num += obj[prop].qty;
		      	sum += prop*obj[prop].qty
			}
		}
		commit('SetCartProps', { quantity: num, bill: sum } );
		if (cards_on_page === 0) { 
			console.log('Empty Cart');
			window.f7.views.main.router.load( {url: '/eps/' } );
		}
	},

}

const mutations = {

	SetCardArray ( state, arr ){
		state.eps_array = arr
	},

	SetCardHistory ( state, arr ){
		state.eps_history = arr
	},

	SetSelectedCard ( state, i ){
		state.selected_card = i;
		state.selected_nominal = 0;
	},

	SetSelectedNominal ( state, i ){
		state.selected_nominal = i;
	},

	SetCartProps ( state, props ) {
		state.cart_length = props.quantity;
	  	state.cart_sum = props.bill;
	}

}

export default {
  state,
  getters,
  actions,
  mutations
}