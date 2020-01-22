<template>
	<f7-page name="money" toolbar-fixed>
		<f7-navbar sliding>
			 <f7-nav-left>
   				 <f7-link icon="icon-bars" open-panel="left"></f7-link>
 		 	</f7-nav-left>
 		 	<f7-nav-center>
   				 Платежи
 		 	</f7-nav-center>
		</f7-navbar> 
		<f7-toolbar tabbar scrollable>
			<f7-link active tab-link="#tab_money_trans">Перевод</f7-link>
			<f7-link tab-link="#tab_money_history">История</f7-link>
		</f7-toolbar>
		<f7-tabs animated>

			<f7-tab id="tab_money_trans" active>
				<div class="empty-space" style="height: 50px;"></div>
				<f7-block-title>На вашем счету {{user.money}} баллов</f7-block-title>
				<div class="card"> 
					<f7-list>
						<f7-list-item smart-select smart-select-back-on-select smart-select-open-in="popup" smart-select-navbar-theme="teal" smart-select-form-theme="teal" smart-select-back-text="Назад" title="Метод перевода">
						    <select name="type" v-model="transaction_type">
						      	<option selected="selected" value="phone">Мобильный телефон</option>
	                        	<option value="yandex">Яндекс.Деньги</option>
	                        	<option value="webmoney">R-кошелек Webmoney</option>
	                        	<option value="qiwi">Qiwi-кошелек</option>
	                        	<option value="russtandart">Карта РСБ</option>
						    </select>
						 </f7-list-item>
					</f7-list>
				</div>

				<form v-if="transaction_type==='russtandart'" id='russtandart-form'>
					<div class="card"> 
						<f7-list>
							<f7-list-item>
							    <f7-label>Номер карты РСБ</f7-label>
							    <masked-input
							      type="text"
							      name="cardNumber"
							      v-model="RSBcard"
							      :mask="['5', '4', '2', '0', '4', '8', /[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]"
							      :guide="false"
							      placeholderChar="_">
								</masked-input>
						  	</f7-list-item>
	                         <f7-list-item>
							    <f7-label>Месяц/год</f7-label>
							    <f7-input readonly type="text" v-on:click="OpenDatePicker" name="expire" placeholder="01.2017" id="valid-till" :value="Expire"/>
						  	</f7-list-item> 
						  	<f7-list-item>
							    <f7-label>Сумма, руб</f7-label>
							    <f7-input type="number" name="sum" :value="cardSum" v-on:input="CountTax($event)"/>
						  	</f7-list-item>
						  	<div v-if="CardTax.string" class="comission">
	                              Спишется {{CardTax.sum}} баллов {{CardTax.string}}
	                        </div>
						</f7-list>
					</div>
					<f7-block>
						<f7-button v-on:click="RSBpayment" big fill bg="bluegray">&#8381; &nbsp;&nbsp;оплатить</f7-button>
					</f7-block>
				</form>

				<form v-else id='payment-form'>
					<div class="card" > 
						<f7-list>
							<f7-list-item>
							    <f7-label>Номер</f7-label>
							    <f7-input type="number" name="phone_mobile"/>
						  	</f7-list-item>
<!-- 						  	<f7-list-item>
							    <f7-label>Номер телефона</f7-label>
							    <masked-input
							      type="text"
							      name="phone_mobile_local"
							      v-model="TransPhone"
							      :mask="['+','7', ' ','(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
							      :guide="false"
							      placeholderChar="_">
								</masked-input>
						  	</f7-list-item> -->
						  	<f7-list-item>
							    <f7-label>Сумма, руб</f7-label>
							    <f7-input type="number" v-on:input="CountTax($event)" name="money" :value="cardSum"/>
						  	</f7-list-item>
						  	<div v-if="CardTax.string" class="comission">
	                              Спишется {{CardTax.sum}} баллов {{CardTax.string}}
	                        </div>
						</f7-list>
					</div>
					<f7-block>
						<f7-button v-on:click="Payment" big fill bg="bluegray">&#8381; &nbsp;&nbsp;оплатить</f7-button>
					</f7-block>
				</form>
				<div class="empty-space" style="height: 50vh;"></div>
			</f7-tab>

			<f7-tab id="tab_money_history">
				<div class="empty-space" style="height: 50px;"></div>
				<div class="content-block">
                      <div class="no-items-message" v-if="!payments[0]">История пуста!</div>

                      <div v-for="element in payments" :key="element.created_at" class="card">
                          <div class="card-header">{{element.created_at}}<span>{{element.amount}}<small> руб</small></span></div>
                          <div class="card-content">
                            <div class="card-content-inner">
                              <div class="timeline-item-title">На {{element.type | TransStatus}}</div>
                              <div class="timeline-item-text">{{ element.parameters.phone_mobile }}
                            </div>
                          </div>
                          <div class="card-footer">Перевод денег #{{element.ms_payment_id}}</div>
                      </div>
                    </div>
                  </div>
                  <div class="empty-space"></div>


			</f7-tab>
		</f7-tabs>
<!-- 		<div class="picker-modal expire-picker" style="display: block;"></div> -->
	</f7-page>
</template>

<script src="./money.js"></script>
<style scoped src="./money.css"></style>