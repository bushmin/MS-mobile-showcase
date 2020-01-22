export default {

	data () {
	    return {
	   		httpTrigger: false,
	     	REST_URL: this.$root.REST_URL,
	     	COURSE_URL: this.$root.COURSE_URL,
	     	STORAGE_ID: this.$root.STORAGE_ID,
	     	http: this.$root.$http,
	      	education: [],
	      	pdf: [],
	      	videos: [],
	      	user: this.$store.state.user.profile_info,
	    }
  	},


 	methods: {
 	
 		GetMaterials: function () {
		    this.http.post(this.REST_URL + 'courses/api/course/list').then(
			  response => {
			    console.log(response.data);
			    this.httpTrigger = true;
			    this.SortCourses(response.data.courses);
			  }, 
			  response => {
			    console.log(response.data);
			});
		},

		SortCourses: function (courses) {
			for (var i = courses.length - 1; i >= 0; i--) {
				if (courses[i].file) {
					this.pdf.push({
						'title': courses[i].title,
						'file': this.COURSE_URL + courses[i].file	
					})
				} else {
					this.videos.push(courses[i])
				}
			}
		},


		OpenPDF: function (url) {
			 //need quirk for iOS!
  			window.open(encodeURI(url), '_system');
		},


	},

	created: function () {
		this.GetMaterials();
	}
  
}