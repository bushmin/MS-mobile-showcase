<template>
	<f7-page name="sales" toolbar-fixed>
 		<f7-navbar sliding>
			<f7-nav-left>
				<f7-link icon="icon-bars" open-panel="left"></f7-link>
			</f7-nav-left>
 		 	<f7-nav-center>
   				 Продажи
 		 	</f7-nav-center>
		</f7-navbar> 
		<f7-tabs animated>
			<f7-tab id="tab_sales" active>
				<div class="preloader-wrapper">
					<f7-preloader v-if="!httpTrigger" color="teal" size="30px"></f7-preloader>
				</div>


					<f7-block>
						<f7-button v-on:click="ClearSale" tab-link="#tab_new_sale" big fill bg="bluegray">&#43; Новая продажа</f7-button>
					</f7-block>
				<f7-block>

					<div class="no-items-message" v-if="!sales[0]">История пуста!</div>
		            <f7-list>
		              <ul>
		                <li v-for="element in sales" :key="element.id">
                            <a href="" class="card item-link no-ripple accordion-item accordion-item-toggle">
                              <div class="card-header">{{element.created_at}}<span>{{element.bonuses}} руб</span></div>
                              <div class="card-content accordion-item-content">
                                <div class="card-content-inner">
                                  <div class="timeline-item-title">Товаров: {{element.positions.length}}</div>
                                  <div class="timeline-item-subtitle">Статус продажи: {{element.status | Status}}</div>
                                  <div class="timeline-item-text"></div>
                                </div>
                              </div>
                              <div class="card-footer"><span>Продажа №{{element.id}}</span></div>
                            </a>
                          </li>
		              </ul>
		            </f7-list>
	    		</f7-block>
			</f7-tab>
			
			<f7-tab id="tab_new_sale">
				<div class="empty-space" style="height: 15px;"></div>
				<a href="#tab_sales" style="width: 100px; " class="tab-link back-button item-link button button-normal color-red"><i class="f7-icons back-icon">arrow_left</i> Отмена</a>
				<f7-block-title>Оформление продажи</f7-block-title>
				<f7-list media-list form id="sale-form">
					<f7-grid>
						<f7-col>
							<div class="card"> 
								<f7-list>
									<f7-list-item>
									    <f7-label>Дата продажи</f7-label>
									    <f7-input type="text" placeholder="__.__.__" readonly name="sold_on_local" id="calendar-sale"/>
									</f7-list-item>
								</f7-list>
							</div>
						</f7-col>
						<f7-col>
							<div class="card" v-on:click="TakePhoto"> 
								<f7-list media-list>
									<f7-list-item title="" subtitle="Добавить фото или скан чека">
										<div slot="media"><div class="avatar"><img id="sale-img" height="40px"></div></div>
									 </f7-list-item>
								</f7-list>
							</div>
						</f7-col>
					</f7-grid>
					
					<div class="card">
						<div class="card-header"><span class="goods-label">Товары</span><f7-button v-on:click="ClearProduct" tab-link="#tab_choose_product" class="link add-button"><i class="f7-icons add-icon">add_round_fill</i></f7-button></div>
						<div class="card-content">
							<div class="card-content-inner">
								<f7-list>
									<li v-for="(element, index) in new_sale" :key="index">
					                    <div class="item-content">
					                      <a href="" class="item-media item-link" ng-click="DeleteProduct($index)">
					                      <i v-on:click="DeleteProduct(index)" class="f7-icons color-black delete-icon">close</i></a>
					                      <div class="item-inner">
					                        <div class="item-title-row">
					                          <div class="item-title product-title">{{element.name}}</div>
					                        </div>
					                        <div class="item-subtitle">{{element.serial}}</div>
					                      </div>
					                    </div>
				                  	</li>
								</f7-list>
							</div>
						</div>				
					</div>
		        </f7-list>
		        <f7-block>
					<f7-button v-on:click="SendSale" big fill bg="bluegray">Отправить</f7-button>
				</f7-block>
			</f7-tab>

			<f7-tab id="tab_choose_product">
				<div class="empty-space" style="height: 15px;"></div>
				<a href="#tab_new_sale" style="width: 100px; " class="tab-link back-button item-link button button-normal color-red"><i class="f7-icons back-icon">arrow_left</i> Назад</a>
				<div class="empty-space" style="height: 30px;"></div>
				<form id="product-form">
					<div class="card">
						<f7-list>
						<f7-list-item smart-select smart-select-back-on-select title="Продукт">
						    <select name="id" v-model="selectedProd" id="selected_product">
						      <option value="" selected></option>
						      <option v-for="staff in products" :key="staff.id" :value="staff.id">{{staff.name}}</option>
						    </select>
						</f7-list-item>
					</f7-list>
					</div>
					<div class="card">
						<div class="card-content">
					      <div class="card-content-inner">
								<f7-list>
									<f7-list-item>
										<f7-label>Серийный номер</f7-label>
									    <f7-input type="text" placeholder="123456" name="serial" id="prod_serial"/>
									</f7-list-item>
						        </f7-list>
						    </div>
						</div>
					   	<div class="card-footer"><a href="" v-on:click="ScanCode" class="link"><span class="color-bluegray"><i class="f7-icons footer-label">camera</i> Сканировать штрихкод</span></a></div>
					</div>
					<f7-block>
						<f7-button v-if="selectedProd" v-on:click="AddProduct" tab-link="#tab_new_sale" small fill bg="bluegray">внести</f7-button>
					</f7-block>
					
			    </form>
			</f7-tab>
		</f7-tabs>

	</f7-page>

</template>

<script src="./sales.js"></script>
<style scoped src="./sales.css"></style>