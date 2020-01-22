export default {

  data () {
      return {
      codes: [],
      REST_URL: this.$root.REST_URL,
      STORAGE_ID: this.$root.STORAGE_ID,
      http: this.$root.$http,
      user: this.$store.state.user.profile_info,
      }
    },

  methods: {

    onF7Init: function (f7) {
      
    },

    Activate: function () {
      this.$f7.showPreloader(["Подождите..."]);
      var info = this.$f7.formToJSON('#code-form');
      var json = {
        "profile_id": localStorage[this.STORAGE_ID],
        "code": info.code,
      };
      this.http.post(this.REST_URL + 'codes/api-v3/codes/activate', json ).then(
      response => {
        this.$f7.hidePreloader();
        console.log(response.data);
        this.$f7.alert("Промокод активирован!");
        this.$store.dispatch('GetProfile');
      }, 
      response => {
        this.$f7.hidePreloader();
          console.log(response.data);
          this.$store.dispatch('ShowErrow', response.data);
      });
    
    },

    GetActCodes: function () {
        this.http.post(this.REST_URL + '/codes/api-v3/codes/list', {profile_id : localStorage[this.STORAGE_ID]}).then(
        response => {
          console.log(response.data);
          this.codes = response.data.codes;
        }, 
        response => {
          console.log(response.data);
      });
    },

    
  },

  created: function () {
     this.GetActCodes()
  },

}