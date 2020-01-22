<template>
	<f7-page name="select_eps">
		<f7-navbar title="Сертификат" back-link="Back" sliding></f7-navbar>
		<f7-fab v-if="cart_length" color="indigo" v-on:click="$router.load({url: '/cart/'})" >
		  	<i class="cart-icon">&nbsp;</i>
      		<div class="cart-badge">{{cart_length}}</div>
		</f7-fab>
		<div slot="fixed">
      <div class="chip chip-money">
            <div class="chip-media chip-img">
              <i class="f7-icons color-bluegray">money_rubl_fill</i>
            </div>
            <div class="chip-label">{{user.balance}} баллов</div>
        </div>
    </div>


        <div class="card accordion-item no-ripple"><a href="#" class="no-ripple align-center item-link">
            <div class="">
              <div class="content-block-title">{{eps_array[selected_card].name}}</div>
              <img class="card-image" :src="eps_array[selected_card].image">
            </div></a>
            <div class="accordion-item-content">
              <div v-html="eps_array[selected_card].description" class="content-block">
            </div>
          </div>
        </div>

    	<f7-list form id="sertificate-form" onkeypress="return event.keyCode != 13;">
    		<f7-list-group>
    			<f7-list-item>
				    <f7-label>Количество карт</f7-label>
				    <f7-input type="number" name="qty" :value="1" id="picker-amount"/>
				</f7-list-item>
    		</f7-list-group>
    		<div class="list-title">Номинал</div>
    		<f7-list-group>
    			<f7-list-item  v-for="(element, index) in eps_array[selected_card].nominals" :key="index" radio :checked="index == selected_nominal" name="nominal" :value="element" v-on:click="SelectNominal(index)" :title="element + ' рублей'"></f7-list-item>
    		</f7-list-group>
		</f7-list>
    <f7-block>
      <f7-button v-on:click="PrepareToAdd()" big fill bg="teal">В корзину</f7-button>
    </f7-block>
		
        <div class="empty-space"></div>
	</f7-page>
</template>

<script src="./select_eps.js"></script>
<style scoped src="./select_eps.css"></style>