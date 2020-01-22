export default {

  data () {
      return {
        payments: [],
        transaction_type: "phone",
        TransPhone: "+7(",
        cardSum: "",
        RSBcard: "542048",
        REST_URL: this.$root.REST_URL,
        STORAGE_ID: this.$root.STORAGE_ID,
        http: this.$root.$http,
        pickerDate: {},
        CardTax: { 'sum': '', 'string': ''},
        user: this.$store.state.user.profile_info,
      }
    },

    computed: {
      Expire: function () {
        return this.pickerDate.value[0] + "/" + this.pickerDate.value[1]
      }    
    },

  methods: {

    onF7Init: function (f7) {
      var self = this;
        self.pickerDate = f7.picker({
          input: '#valid-till',
          toolbarCloseText: 'Готово',
          onlyInPopover: true,
          value: ['01','2017'],
          cols: [
              {
                  textAlign: 'right',
                  values: ('01 02 03 04 05 06 07 08 09 10 11 12').split(' ')
              },
              {
                  divider: true,
                  content: '/'
              },
              {
                  textAlign: 'left',
                  values: ('2017 2018 2019 2020 2021 2022').split(' ')
              },
          ]
      });
      },

    OpenDatePicker: function (){
      var self = this;
      self.pickerDate.open();
    },

    GetMoneyWithdraws: function () {
        this.http.post(this.REST_URL + 'payments/api-v3/payments/by-profile', {profile_id : localStorage[this.STORAGE_ID]}).then(
        response => {
          console.log(response.data);
          this.payments = response.data.payments;
          this.GetRsbWithdraws();
        }, 
        response => {
          console.log(response.data);
      });
    },

    GetRsbWithdraws: function () {
        this.http.post(this.REST_URL + 'rsbcards/api-v3/payments/by-profile', {profile_id : localStorage[this.STORAGE_ID]}).then(
        response => {
          console.log(response.data);
        for (var i = 0; i < response.data.payments.length; i++) {
                var p = response.data.payments[i];
                this.payments.push({
                  'created_at': p.created_at,
                  'amount': p.sum,
                  'type': 'карту Русский Стандарт', //в приложении - "на телефон", "на карту" и т.д.
                  'ms_payment_id': p.id + ' (Русский Стандарт)',
                  'parameters': {
                    'phone_mobile': p.cardNumber
                  }
                }); 
              }
        }, 
        response => {
          console.log(response.data);
      });
    },

    CountTax: function( amount ){
      var info = {
        'profile_id': localStorage[this.STORAGE_ID],
        'amount': amount,
        'type': this.transaction_type
      }
      if (this.transaction_type === 'russtandart') {  this.RsbTax(info) }
      else { this.SimpleTax(info) };
    },

    SimpleTax: function( info ){
      this.http.post(this.REST_URL + 'payments/api-v3/payments/calculate', info).then(
      response => {
        this.CardTax = { 'sum': response.data.amount + response.data.commission, 'string': response.data.message}
      }, 
      response => {
        this.CardTax = { 'sum': '', 'string': ''}
      });
    },

    RsbTax: function( info ){
      this.http.post(this.REST_URL + 'rsbcards/api-v3/payments/get-commissions', info).then(
      response => {
        this.CardTax = { 'sum': response.data.totalSum, 'string': response.data.string}
      }, 
      response => {
        this.CardTax = { 'sum': '', 'string': ''}
      });
    },

    Payment: function(){
      this.$f7.showPreloader(["Подождите..."]);
      var info = this.$f7.formToJSON('#payment-form');
      var json = {
        "profile_id": localStorage[this.STORAGE_ID],
        "type": this.transaction_type,
        "amount": info.money,
        "parameters":{
          "phone_mobile_local": info.phone_mobile_local,
          "phone_mobile": info.phone_mobile
        }
      };
      this.http.post(this.REST_URL + 'payments/api-v3/payments/create', json ).then(
      response => {
          this.$f7.hidePreloader();
        console.log(response.data);
        this.$f7.alert("Перевод денег прошёл успешно!");
        this.$store.dispatch('GetProfile');
      }, 
      response => {
        this.$f7.hidePreloader();
          console.log(response.data);
          this.$store.dispatch('ShowErrow', response.data);
      });
    },

    RSBpayment: function(){
      this.$f7.showPreloader(["Подождите..."]);
      var info = this.$f7.formToJSON('#russtandart-form');
      info.cardValidMonth = this.pickerDate.value[0];
        info.cardValidYear = this.pickerDate.value[1];
        info.profile_id = localStorage[this.STORAGE_ID];
      this.http.post(this.REST_URL + 'rsbcards/api-v3/payments/create', info ).then(
      response => {
        console.log(response.data);
          this.$f7.hidePreloader();
        this.$f7.alert("Перевод денег прошёл успешно!");
        this.$store.dispatch('GetProfile');
      }, 
      response => {
          console.log(response.data);
          this.$f7.hidePreloader();
          this.$store.dispatch('ShowErrow', response.data );
      });
    },
  },

  created: function () {
     this.GetMoneyWithdraws()
  },

  filters: {
      TransStatus: function(x) {
        var message = "";
      switch (x){
          case 'phone': message = "телефон"; break;
          case 'card': message = "банковскую карту"; break;
          default: message = x;
      }
        return message;
        }
    }
}