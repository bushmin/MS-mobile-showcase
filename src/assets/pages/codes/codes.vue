<template>
	<f7-page name="codes" toolbar-fixed>
		<f7-navbar sliding>
			 <f7-nav-left>
   				 <f7-link icon="icon-bars" open-panel="left"></f7-link>
 		 	</f7-nav-left>
 		 	<f7-nav-center>
   				 Промокоды
 		 	</f7-nav-center>
		</f7-navbar> 
		<f7-toolbar tabbar scrollable>
			<f7-link active tab-link="#tab_code_activate">Активация</f7-link>
			<f7-link tab-link="#tab_code_history">История</f7-link>
		</f7-toolbar>
		<f7-tabs animated>

			<f7-tab id="tab_code_activate" active>
				<div class="empty-space" style="height: 50px;"></div>
				<f7-block-title></f7-block-title>
				<form id='code-form'>
					<div class="card"> 
						<f7-list>
							<f7-list-item>
							    <f7-label>Код</f7-label>
							    <f7-input type="text" name="code"/>
						  	</f7-list-item> 
						</f7-list>
					</div>
					<f7-block>
						<f7-button v-on:click="Activate" big fill bg="bluegray">&#10003; &nbsp;&nbsp; Активировать</f7-button>
					</f7-block>
				</form>
				<div class="empty-space" style="height: 50vh;"></div>
			</f7-tab>
			
			<f7-tab id="tab_code_history">
				<div class="empty-space" style="height: 50px;"></div>
				<div class="content-block">
                      <div class="no-items-message" v-if="!codes[0]">История пуста!</div>

                      <div v-for="element in codes" :key="element.created_at" class="card">
                          <div class="card-header">{{element.created_at}}<span>{{element.nominal}}<small> баллов</small></span></div>
                          <div class="card-content">
                            <div class="card-content-inner">
                              <div class="timeline-item-title">Код: {{element.value}}</div>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div class="empty-space"></div>
			</f7-tab>

		</f7-tabs>
	</f7-page>
</template>

<script src="./codes.js"></script>
<style scoped src="./codes.css"></style>

