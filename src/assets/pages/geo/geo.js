export default {

  data () {
      return {
      photos: [],
      location: { lat: 0, long: 0 },
      photo_base64: "",
      REST_URL: this.$root.REST_URL,
      STORAGE_ID: this.$root.STORAGE_ID,
      http: this.$root.$http,
      user: this.$store.state.user.profile_info,
      }
    },

  methods: {

    TakePhoto: function(){
      var Vue = this;
      var buttons = [
            {
                text: 'Сделать фото',
                onClick: function () {
                  Vue.GetPhoto(Camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Отмена',
                color: 'red'
            }
        ];
        this.$f7.actions(buttons);
    },

    GetPhoto: function(type){
      var Vue = this;
      navigator.camera.getPicture(
      function success(imageData) {
        Vue.SetPhoto(imageData);
      }, 

      function error(error) {
        console.log('photo error');
      },
      { destinationType: Camera.DestinationType.DATA_URL,
      sourceType: type } );
    },

    SetPhoto: function (img) {
      var Vue = this;
      var image = document.getElementById('geo-img');
      image.src =  'data:image/jpg;base64,' + img;
      this.photo_base64 = img;
      navigator.geolocation.getCurrentPosition(function (position) {
          Vue.location = {
            lat: position.coords.latitude,
            long: position.coords.longitude
          }
        },
        function(error){});
    },

    SendPhoto: function () {
      this.$f7.showPreloader(["Подождите..."]);
      var json = {
        "profile_id": localStorage[this.STORAGE_ID],
        "type": "jpg",
        "latitude": this.location.lat,
        "longitude": this.location.long,
        "image": this.photo_base64
      };
      this.http.post(this.REST_URL + 'pictures/api/pictures/load-image', json ).then(
      response => {
        this.$f7.hidePreloader();
        console.log(response.data);
        this.$f7.alert("Фото загружено!");
        this.$store.dispatch('GetProfile');
        this.ClearPhoto();
      }, 
      response => {
        this.$f7.hidePreloader();
          console.log(response.data);
          this.$store.dispatch('ShowErrow', response.data);
      });
    
    },

    ClearPhoto: function () {
      this.location = { lat: 0, long: 0 },
      this.photo_base64 = "";
    },

    GetPhotos: function () {
        this.http.post(this.REST_URL + 'pictures/api/pictures/list', {profile_id : localStorage[this.STORAGE_ID]}).then(
        response => {
          console.log(response.data);
          this.photos = response.data.pictures;
        }, 
        response => {
          console.log(response.data);
      });
    },

    
  },

  created: function () {
     this.GetPhotos()
  },

}