<template>
	<f7-page name="notif">
		<f7-navbar>
      <f7-nav-left>
        <f7-link icon="icon-bars" open-panel="left"></f7-link>
      </f7-nav-left>
      <f7-nav-center sliding>Оповещения</f7-nav-center>
    </f7-navbar>
	    
        <f7-block-title>Какие оповещения присылать?</f7-block-title>
        <form id="notif-form">
                <div class="row card notif-row">
                  <div class="col-50">
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title label">Новости</div>
                        <div class="item-input">
                          <label class="label-switch push-switch">
                            <input type="checkbox" name="push_news" v-bind:true-value="1" v-bind:false-value="0" v-model="user.push_news">
                            <div class="checkbox notif-checkbox" v-on:click="NotifSettings()"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-50">
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title label">Продажи</div>
                        <div class="item-input">
                          <label class="label-switch push-switch">
                            <input type="checkbox" checked name="push_sales" v-bind:true-value="1" v-bind:false-value="0" v-model="user.push_sales">
                            <div class="checkbox notif-checkbox" v-on:click="NotifSettings()"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="empty-space"></div>
              </form>
	</f7-page>
</template>

<script src="./notif.js"></script>
<style scoped src="./notif.css"></style>