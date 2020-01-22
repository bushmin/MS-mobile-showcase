<template>
	<f7-page name="home">
		<f7-navbar>
			<f7-nav-left>
				<f7-link icon="icon-bars" open-panel="left"></f7-link>
			</f7-nav-left>
			<f7-nav-center sliding>Промо</f7-nav-center>
		</f7-navbar>

		<div class="preloader-wrapper">
			<f7-preloader v-if="!httpTrigger" color="teal" size="30px"></f7-preloader>
		</div>

		<f7-block>
	      <div class="profile-card">
	        <div class="top-card">
	          <div v-on:click="" class="avatar"><img id="avatar-img" height="50px" src="~static/img/avatar.png"></div>
	          <div class="main-info">
	            <div class="profile-name">{{user.full_name}}</div>
	            <div class="city-card">{{user.phone_mobile}}</div>
	          </div>
	        </div>
	        <div ng-click="Goto('#bonuses')" class="bonus-card">
	          <div class="left-bonus">
	            <div class="bonus-label">&nbsp;&nbsp;БОНУСОВ:</div>
	            <div class="bonus-amount">{{user.balance}}</div>
	          </div>
	          <div class="right-bonus">
	            <a href="/money/" class="link button to-card">на карту</a>
	            <div class="line-bonus"></div>
	            <a href="/eps/" class="link button to-card">сертификаты</a>
	          </div>
	        </div>
	        <div class="card-footer">
	          <a href="" v-on:click="ToggleEdit" class="link"><span class="color-bluegray">настроить профиль</span></a>
	        </div>
	        
	      </div>
	    </f7-block>

	    <div class="edit-profile accordion-item" id="update-profile-form">
	    <div class="accordion-item-content">
	        <f7-list form>
	        	<f7-list-item>
				    <f7-label>Фамилия *</f7-label>
				    <f7-input type="text" name="last_name" :value="user.last_name"/>
			  	</f7-list-item>
			  	<f7-list-item>
				    <f7-label>Имя *</f7-label>
				    <f7-input type="text" name="first_name" :value="user.first_name"/>
			  	</f7-list-item>
			  	<f7-list-item>
				    <f7-label>Отчество</f7-label>
				    <f7-input type="text" name="middle_name" :value="user.middle_name"/>
			  	</f7-list-item>
			  	<f7-list-item>
				    <f7-label>Email *</f7-label>
				    <f7-input type="email" name="email" :value="user.email"/>
			  	</f7-list-item>

	        </f7-list>
	        <f7-block>
	        	<f7-button v-on:click="UpdateProfile" big fill bg="teal">сохранить</f7-button>
	        </f7-block>
	    </div>
	    </div>

	    <div v-if="rules[0]" class="content-block-title" style="padding-top: 0;">Правила акций</div>
	    <div v-else class="content-block-title" style="padding-top: 0;">Правил акций пока нет!</div>
            <div v-if="rules[0]" class="list-block content-block media-list">
              <ul>
                <li>
                  <div class="profile-card">
                    <div class="card-header" style="font-size: 14px; min-height: 20px;">{{rules[0].date_add}}</div>
                    <div class="card-content">
                      <div class="card-content-inner">
                        <div class="timeline-item-title" style="font-size: 13px; text-align: justify;">{{rules[0].rules}}</div>
                      </div>
                    </div>
                    <div class="card-footer">
                      <a href="/rules/" class="link"><span class="color-bluegray">история правил</span></a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
	    <div class="empty-space"></div>
	  	<!-- <div ng-hide="user.full_name" class="white-blanket"></div> -->

	</f7-page>
</template>

<script src="./home.js"></script>
<style scoped src="./home.css"></style>