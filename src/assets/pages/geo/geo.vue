<template>
	<f7-page name="geo" toolbar-fixed>
		<f7-navbar sliding>
			 <f7-nav-left>
   				 <f7-link icon="icon-bars" open-panel="left"></f7-link>
 		 	</f7-nav-left>
 		 	<f7-nav-center>
   				 Фото с геометкой
 		 	</f7-nav-center>
		</f7-navbar> 
		<f7-toolbar tabbar scrollable>
			<f7-link active tab-link="#tab_geo_photo">Добавить</f7-link>
			<f7-link tab-link="#tab_geo_history">История</f7-link>
		</f7-toolbar>
		<f7-tabs animated>

			<f7-tab id="tab_geo_photo" active>
				<div class="empty-space" style="height: 50px;"></div>
				<f7-block-title></f7-block-title>
					<f7-block>
						<div class="card">
							<div class="card-header"><a href="" v-on:click="TakePhoto" class="link"><span class="color-bluegray">Сделать фото</span></a></div>
							<div class="card-content">
                            <div class="card-content-inner">
                              <div class="avatar"><img id="geo-img" height="100px"></div>
                            </div>
                          </div>
                          <div class="card-footer">
                          	{{location.lat}}, {{location.long}}
                          </div>
						</div>
					</f7-block>
					<f7-block>
						<f7-button v-on:click="SendPhoto" big fill bg="bluegray">Отправить</f7-button>
					</f7-block>
				<div class="empty-space" style="height: 50vh;"></div>
			</f7-tab>
			
			<f7-tab id="tab_geo_history">
				<div class="empty-space" style="height: 50px;"></div>
				<div class="content-block">
                      <div class="no-items-message" v-if="!photos[0]">История пуста!</div>

                      <div v-for="element in photos" :key="element.created_at" class="card">
                          <div class="card-header">{{element.created_at}}</div>
							<div class="card-content">
                            <div class="card-content-inner">
                              <div class="timeline-item-title"><div class="avatar"><img v-bind:src="element.file_url" height="100px"></div></div>
                            </div>
                          </div>
                          <div class="card-footer">
                          	{{element.latitude}}, {{element.longitude}}
                          </div>
                      </div>
                    </div>
                  </div>
                  <div class="empty-space"></div>
			</f7-tab>

		</f7-tabs>
	</f7-page>
</template>

<script src="./geo.js"></script>
<style scoped src="./geo.css"></style>

