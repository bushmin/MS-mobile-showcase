export default {

	data () {
	    return {
	   		httpTrigger: false,
	     	REST_URL: this.$root.REST_URL,
	     	COURSE_URL: this.$root.COURSE_URL,
	     	STORAGE_ID: this.$root.STORAGE_ID,
	     	http: this.$root.$http,
	     	user: this.$store.state.user.profile_info,
	      	education: [],
	      	tests: [],
	      	testtries: [],
	      	test_try: {},
	      	testSwiper: {}
	    }
  	},

 	methods: {

 		GetTests: function () {
 			this.http.post(this.REST_URL + 'courses/api/test/list').then(
			  response => {
			    console.log(response.data);
			    this.tests = response.data.tests;
			  }, 
			  response => {
			    console.log(response.data);
			});
 		},

 		GetTestResults: function () {
 			this.http.post(this.REST_URL + 'courses/api/test-try/list', {'profile_id': localStorage[this.STORAGE_ID]}).then(
			  response => {
			    console.log(response.data);
			    this.testtries = response.data.tries;
			    this.httpTrigger = true;
			  }, 
			  response => {
			    console.log(response.data);
			});
 		},

 		TestIndex: function (id) {
 			this.http.post(this.REST_URL + 'courses/api/test-try/index', {'profile_id': localStorage[this.STORAGE_ID], 'test_id': id}).then(
			  response => {
			    console.log(response.data);
			    this.test_try = response.data.try;
			    Dom7('.swiper-container')[0].swiper.slideTo(response.data.step - 1);
			  }, 
			  response => {
			    console.log(response.data);
			});
 		},

 		ColorCircle: function (results, id) {
 			var color = [];
 			if ( results[id-1] ) {
 				if (results[id-1].is_correct) { color.push("good_answer") }
 				else { color.push("bad_answer") }
 			}
 			//console.log(color);
 			return color;
 		},

		/*TestButtonShow: function (num) {
			var classes = [];
			var test = this.$f7.formToJSON('#form-test');
			console.log(test);
			if (!test[num]) return classes;
			if (!test[num].length) classes.push('inactive');
			console.log(classes)
			return classes;
		},*/

		TestNext: function (ques_id, key) {
			var form_test = this.$f7.formToJSON('#form-test');
			//console.log(form_test);
			if (form_test[key].length != 0){
				Dom7('.swiper-container')[0].swiper.slideNext();
				this.http.post(this.REST_URL + 'courses/api/test-try/answer', {
					'profile_id': localStorage[this.STORAGE_ID],
					'try_id': this.test_try.id,
					'question_id': ques_id,
					'answer_ids': form_test[key]
					} ).then(
				  response => {
				    console.log(response.data);
				    this.test_try = response.data.try;
				  }, 
				  response => {
				    console.log(response.data);
				});
			}
		},

		RefreshTest: function () {
			this.GetTestResults();
			document.getElementById("form-test").reset();
		}

	},

	created: function () {
		this.GetTests();
		this.GetTestResults();
	}
  
}