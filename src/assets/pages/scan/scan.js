export default {

  data () {
      return {
      scan_code: [],
      REST_URL: this.$root.REST_URL,
      STORAGE_ID: this.$root.STORAGE_ID,
      http: this.$root.$http,
      user: this.$store.state.user.profile_info,
      }
    },

  methods: {

    Scan: function () {
      var self = this;
      cordova.plugins.barcodeScanner.scan(
          function (result) {
            self.scan_code.unshift(result.text);
          },
          function (error) {
              self.$f7.alert("Ошибка сканирования: " + error);
          },
          {
              showTorchButton : true,
              torchOn: false,
              saveHistory: true,
              prompt : "Поместите штрихкод в центральную область",
              resultDisplayDuration: 0,
          }
       );
    }
    
  },


  created: function () {
     //this.GetActCodes()
  },

}