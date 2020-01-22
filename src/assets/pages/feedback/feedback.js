export default {

  data () {
      return {
      REST_URL: this.$root.REST_URL,
      http: this.$root.$http,
      STORAGE_ID: this.$root.STORAGE_ID,
      user: this.$store.state.user.profile_info,
      }
    },

  methods: {

    Feedback: function(){
      if (!document.getElementById('contact-message').value) {
        this.$f7.alert('Заполните сообщение!');
      } else {
        this.$f7.showPreloader(["Подождите..."]);
        var info = this.$f7.formToJSON('#help-form');
        info.profile_id = localStorage[this.STORAGE_ID];

        this.http.post(this.REST_URL + 'feedback/api/feedback/feedback', info ).then(
        response => {
          console.log(response.data);
            this.$f7.hidePreloader();
          document.getElementById('contact-message').value = "";
              document.getElementById('contact-message').setAttribute('style','');
              this.$f7.alert(response.data.message);
        }, 
        response => {
            console.log(response.data);
            this.$f7.hidePreloader();
            this.$store.dispatch('ShowErrow', response.data );
        });
      }
    }

  },

  created: function () {
  },


}
