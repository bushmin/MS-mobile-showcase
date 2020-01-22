import Vue from 'vue'
import Framework7 from 'framework7'
import Framework7Vue from 'framework7-vue'
import Vuex from 'vuex'
import VueResource from "vue-resource"
import MaskedInput from 'vue-text-mask'

import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
import Framework7Icons from './assets/css/framework7-icons.css'
import AppStyles from './assets/css/styles.css'

import Routes from './routes.js'
import App from './assets/pages/main/main.vue'
import store from './store'

Vue.use(Framework7Vue)
Vue.use(Vuex)
Vue.use(VueResource);
Vue.component('masked-input', MaskedInput);

Vue.http.headers.common['X-Token'] = store.state.X_TOKEN;

var Promo = new Vue({
	el:       '#app',
	template: '<app/>',

	framework7: {
		root:                     '#app',
		material:                 true,
		routes:                   Routes,
		preroute:                 function(view, options) {
			//console.log(view);
			if (!options.url) return true;

			var url = options.url.slice(1, -1);
			var selector = '[data-page="' + url + '"]';
			var pages = document.querySelectorAll(selector);
			if (view.activePage.name != url) {
				if (pages[0]) {
					view.router.load({pageElement: pages[0]});
					return false;
				} else {
					return true;
				}
			}
		},
		modalTitle:               "Бизнес Решения",
		modalButtonOk:            "ОК",
		modalButtonCancel:        "Отмена",
		modalPreloaderTitle:      "Подождите...",
		modalUsernamePlaceholder: 'пароль',
		modalPasswordPlaceholder: 'повторите пароль',
		sortable:                 false,
		swipeout:                 false,
		swipePanel:               'left',
		swipePanelActiveArea:     100,
		//uniqueHistorу:			  true,
		//cache:   					false,
	},

	components: {
		app: App
	},

	store,

	data: function() {
		return {
			REST_URL:    store.state.REST_URL,
			COURSE_URL:  store.state.REST_URL + 'data/courses/',
			STORAGE_ID:  'PromoID',
			current_url: '/home/',
		};
	},

	methods: {
		onF7Init: function(f7) {
			if ((!localStorage[this.STORAGE_ID]) || (localStorage[this.STORAGE_ID] === "")) {
				f7.loginScreen('#login-screen')
			}
			else {
				this.$store.dispatch('GetProfile', localStorage[this.STORAGE_ID])
			}
		}
	}
})


Dom7(document).on('page:beforeanimation', function(e) {
	Promo.current_url = '/' + e.detail.page.name + '/';
})

document.addEventListener("deviceready", DeviceReady);

function DeviceReady() {
	document.addEventListener('backbutton', onBackKeyDown, false);
	WatchFCM();
};

function WatchFCM() {
	cordova.plugins.notification.badge.clear();
	FCMPlugin.onNotification(function(data) {
		if (data.wasTapped) {
			if (data.menu) {
				window.f7.mainView.router.loadPage('/' + data.menu + '/');
			}
			window.f7.alert(data.body, data.title);
			cordova.plugins.notification.badge.clear();
		}
		else {
			cordova.plugins.notification.badge.clear();
			window.f7.addNotification({
				message: data.body,
				hold:    5000,
				button:  {
					text:  'CМОТРЕТЬ',
					color: 'green'
				},
				onClose: function() {
					if (data.menu) {
						window.f7.mainView.router.loadPage('/' + data.menu + '/');
					}
				}
			});
		}
	})
};

function onBackKeyDown() {
  if (localStorage[Promo.STORAGE_ID]) {
    window.f7.closeModal();
    window.f7.mainView.router.back();
    }
}

//helper functions//

Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};