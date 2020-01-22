export default {

  data () {
      return {
      transactions: [],
      REST_URL: this.$root.REST_URL,
      STORAGE_ID: this.$root.STORAGE_ID,
      http: this.$root.$http,
      user: this.$store.state.user.profile_info,
      }
    },

  methods: {

    GetTransactions: function () {
        this.http.post(this.REST_URL + 'profiles/api/transaction/list', {profile_id : localStorage[this.STORAGE_ID]}).then(
        response => {
          console.log(response.data);
          this.transactions = response.data.transactions;
        }, 
        response => {
          console.log(response.data);
      });
    },

    ColorMoney: function (element) {
        return {
          'color-green': (element.balance_after - element.balance_before > 0),
          'color-red': (element.balance_after - element.balance_before < 0)
        }
    },

  },

  created: function () {
     this.GetTransactions()
  },


}
