<template>
	<f7-page name="eps" toolbar-fixed>
 		<f7-navbar sliding>
			<f7-nav-left>
				<f7-link icon="icon-bars" open-panel="left"></f7-link>
			</f7-nav-left>
 		 	<f7-nav-center>
   				 Бонусные карты
 		 	</f7-nav-center>
		</f7-navbar> 
		<f7-toolbar tabbar scrollable>
			<f7-link active tab-link="#tab_eps_buy">Заказать</f7-link>
			<f7-link tab-link="#tab_eps_history">История</f7-link>
		</f7-toolbar>
		<f7-fab v-if="cart_length" color="indigo" v-on:click="$router.load({url: '/cart/'})" >
		  	<i class="cart-icon">&nbsp;</i>
      		<div class="cart-badge">{{cart_length}}</div>
		</f7-fab>
		<f7-tabs animated>
			<f7-tab id="tab_eps_buy" active>
				<div class="empty-space" style="height: 50px;"></div>
				<div class="preloader-wrapper">
					<f7-preloader v-if="!httpTrigger" color="orange" size="30px"></f7-preloader>
				</div>
				<f7-block>
					<div v-if="element.is_allow_to_order" v-on:click="OpenSertificate(index)" class="card grey-block card-header-pic" v-for="(element, index) in eps_array" :key="element.id">
	                  <div class="content-block-title">{{element.name}}</div>
	                  <div :style="{'background-image': 'url(' + element.image + ')' }" valign="bottom" class="card-header color-white no-border">
	                    <div class="card-layer"></div>
	                  </div>
	                </div>
					<div class="empty-space"></div>
				</f7-block>
			</f7-tab>
			
			<f7-tab id="tab_eps_history">
				<div class="empty-space" style="height: 50px;"></div>
				<f7-block>
					<div class="no-items-message" v-if="!eps_history[0]">История пуста!</div>
		            <f7-list>
		              <ul>
		                <li v-for="element in eps_history" :key="element.id" v-if="!element.is_canceled">
                            <a href="" class="card item-link no-ripple accordion-item accordion-item-toggle">
                              <div class="card-header">{{element.created_at}}<span>{{element.amount}} руб</span></div>
                              <div class="card-content accordion-item-content">
                                <div class="card-content-inner" v-for="card in element.items" :key="card.id">
                                  <div class="timeline-item-title">{{card.card_name}}</div>
                                  <div class="timeline-item-subtitle">{{card.status}}</div>
                                  <div class="timeline-item-text">Количество:{{card.qty}}<br>Номинал:{{card.nominal}} руб.</div>
                                </div>
                              </div>
                              <div class="card-footer"><span>Заказ №{{element.ms_order_id}}</span></div>
                            </a>
                            <div class="delete-cart" v-if="CanDeleteEPS(element)" v-on:click="ConfirmDeleteEps(element.ms_order_id)"><i class="f7-icons color-red">close_round_fill</i></div>
                          </li>
		              </ul>
		            </f7-list>
	    		</f7-block>
			</f7-tab>
		</f7-tabs>

	</f7-page>

</template>

<script src="./eps.js"></script>
<style scoped src="./eps.css"></style>