export default {

	data () {
	    return {
	      	REST_URL: this.$root.REST_URL,
	      	STORAGE_ID: this.$root.STORAGE_ID,
	       	http: this.$root.$http,
	       	httpTrigger: false,
	       	sales: [],
	       	products: [],
	       	calendar: {},
	       	new_sale: [],
	       	saleimg: "",
	       	selectedProd: "",
	       	user: this.$store.state.user.profile_info,
	    }
  	},


 	methods: {

 		onF7Init: function (f7) {
 			this.calendar = f7.calendar({
			    input: '#calendar-sale',
			    value: [new Date()],
			    convertToPopover: false,
			    closeOnSelect: true,
			    dateFormat: "dd.mm.yyyy",
			    toolbarCloseText: "Готово",
			    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
			    monthNames: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь',
					'Июль', 'Авг' , 'Сент' , 'Окт', 'Нояб', 'Дек'] 
			});  
  		},

  		GetSales: function () {
  			this.http.post(this.REST_URL + 'sales/api/sale/list', {profile_id : localStorage[this.STORAGE_ID]} ).then(
			  response => {
			    console.log(response.data);
			    this.sales = response.data.sales;
			    this.httpTrigger = true;
			  }, 
			  response => {
			    console.log(response.data);
			});
  		},
  		GetProducts: function () {
  			this.http.post(this.REST_URL + 'sales/api/product/list', {dealer_name : this.user.dealer_name} ).then(
			  response => {
			    console.log(response.data);
			    this.products = response.data.products;
			  }, 
			  response => {
			    console.log(response.data);
			});
  		},


  		AddProduct: function(){
		    var prod = this.$f7.formToJSON('#product-form');
		    for (var i = 0; i < this.products.length; i++) {
		      if (this.products[i].id == prod.id) {
		        prod.name = this.products[i].name;
		        prod.category_id = this.products[i].category_id;
		      }
		    }
		    console.log(prod);
		    this.new_sale.push(prod);
		    this.ClearProduct();
		},

		DeleteProduct: function (i) {
			this.new_sale.remove(i);
		},

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
		            text: 'Выбрать из галереи',
		            onClick: function () {
		                Vue.GetPhoto(Camera.PictureSourceType.PHOTOLIBRARY);
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
			var info = {
				image: img,
				type: 'jpg',
				id: this.user.id
			};
			this.http.post(this.REST_URL + 'sales/api/document/upload', info).then(
			response => {
	        	console.log(response.data);
	        	var image = document.getElementById('sale-img');
			    image.src =  response.data.webpath;
			    this.saleimg = response.data.filename;
	        }, 
	        response => {
	          	console.log(response.data);
	          	this.$store.dispatch('ShowErrow', response.data );
	      	});
		},

		ScanCode: function (){
			var self = this;
			cordova.plugins.barcodeScanner.scan(
		      function (result) {
		      	var serial = document.getElementById('prod_serial');
		      	serial.value = result.text;
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
		},


		SendSale: function () {
			this.$f7.showPreloader(["Подождите..."]);
			var info = this.$f7.formToJSON('#sale-form');
			var positions = [];
			for (var i = 0; i < this.new_sale.length; i++) {
				positions.push({
					"category_id": this.new_sale[i].category_id,
			        "product_id": this.new_sale[i].id,
			        "quantityLocal": 1,
			        "serialNumberValue": this.new_sale[i].serial,
			        "validation_method": "serial"
			    });
			}
			var json = {
				"profile_id": localStorage[this.STORAGE_ID],
				"sale": {
					"status": "adminReview",
					"sold_on_local": info.sold_on_local,
					"positions": positions
				},
				"documents": [this.saleimg] //test fix
			};
			console.log(json);
			this.http.post(this.REST_URL + 'sales/api/sale/create', json ).then(
			response => {
				this.$f7.hidePreloader();
				console.log(response.data);
				this.$f7.alert("Продажа успешно добавлена!");
				this.GetSales();
				this.$f7.showTab("#tab_sales");
			}, 
			response => {
				this.$f7.hidePreloader();
				console.log(response.data);
				this.$store.dispatch('ShowErrow', response.data);
			});
		},

		ClearProduct: function () {
			document.getElementById('selected_product').value = "";
		    document.getElementById('prod_serial').value = "";
		    Dom7("#product-form .smart-select .item-after").html('');
		},

		ClearSale: function () {
			this.calendar.setValue( [new Date()] );
			this.new_sale = [];
			document.getElementById('sale-img').src = "";
		}
	},

	created: function () {
		this.GetSales();
		this.GetProducts();
	},

	filters: {
		Status: function(value) {
		    var message = "";
		    switch (value){
		      case 'draft': message = "Черновик"; break;
		      case 'adminReview': message = "Требует подтверждения"; break;
		      case 'approved': message = "Подтверждено автоматически"; break;
		      case 'approved2': message = "Подтверждено"; break;
		      case 'declined': message = "Отклонено"; break;
		      case 'paid': message = "Баллы начислены"; break;
		      default: message = "";
		    }
		    return message;
		}
	}

}