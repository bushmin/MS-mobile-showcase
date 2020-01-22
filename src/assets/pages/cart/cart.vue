<template>
	<f7-page name="cart">
		<f7-navbar sliding back-link="Back" title="Корзина"></f7-navbar> 
	    <div slot="fixed">
      <div class="chip chip-money">
            <div class="chip-media chip-img">
              <i class="f7-icons color-bluegray">money_rubl_fill</i>
            </div>
            <div class="chip-label">{{user.balance}} баллов</div>
        </div>
    </div>
        <f7-block-title>Оформление заказа</f7-block-title>
        <f7-list form id="cart-form">
			    <div v-for="(card, key) in cart">
                    <div v-for="(item, index) in card" class="card">
	                    <div class="card-header">{{item.card_name}}</div>
	                    <div class="card-subheader">
	                    	<f7-list>
	                    		<f7-list-item :title="'Номинал : '+ item.nominal + ' баллов'">
	                    		</f7-list-item>
	                    		<f7-list-item>
	                    			<f7-label>Кол-во: </f7-label>
				    				<f7-input type="number" :value="item.qty" v-on:input="NewAmountEps($event, key, index)"/>
	                    		</f7-list-item>
	                    	</f7-list>
	                    </div>
	                    <div class="card-footer">{{item.qty*item.nominal}} баллов</div>
	                    <div  v-if="item.qty" class="delete-cart" v-on:click ="DeleteItem(item.card,item.nominal)"><i class="f7-icons">trash</i></div>
                    </div>
                </div>
 			 <f7-list-group>
			 	 <f7-list-item>
				    <f7-label>Эл. почта для получения сертификата</f7-label>
				    <f7-input type="text" :value="user.email" name="delivery_email"/>
				</f7-list-item>
				<li>
                  <label class="label-radio item-content">
                    <input type="radio" name="is_allow_cancel" value="0" checked="checked">
                    <div class="item-media">
                      <i class="icon icon-form-radio"></i>
                    </div>
                    <div class="item-inner">
                      <div class="item-title">Я уверен в своем заказе и хочу сразу отправить его на обработку. Я понимаю, что его нельзя будет отменить. (Вы получите данный заказ быстрее)</div>
                    </div>
                  </label>
                </li>
                <li>
                  <label class="label-radio item-content">
                    <input type="radio" name="is_allow_cancel" value="1">
                    <div class="item-media">
                      <i class="icon icon-form-radio"></i>
                    </div>
                    <div class="item-inner">
                      <div class="item-title">Я хочу иметь возможность отменить свой заказ в течении 24 часов с момента его создания.</div>
                    </div>
                  </label>
                </li>

			 </f7-list-group> 

        </f7-list>
        <f7-block-title>Итого: {{cartsum}} баллов</f7-block-title>
        <f7-block>
          <f7-button v-on:click="PrepareCart()" big fill bg="teal">Оплатить</f7-button>
        </f7-block>
        <div class="empty-space"></div>
	</f7-page>
</template>

<script src="./cart.js"></script>
<style scoped src="./cart.css"></style>