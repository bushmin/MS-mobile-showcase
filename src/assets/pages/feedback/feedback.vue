<template>
	<f7-page name="feedback" toolbar-fixed>
		<f7-navbar sliding>
			 <f7-nav-left>
   				 <f7-link icon="icon-bars" open-panel="left"></f7-link>
 		 	</f7-nav-left>
 		 	<f7-nav-center>
   				 Написать нам
 		 	</f7-nav-center>
		</f7-navbar> 

		<f7-block-title>Задайте Ваш вопрос с помощью формы</f7-block-title>
		<f7-list form id="help-form">
        	<f7-list-item>
			    <f7-label>Имя</f7-label>
			    <f7-input type="text" name="name" :value="user.full_name"/>
		  	</f7-list-item>
		  	<f7-list-item>
			    <f7-label>E-mail</f7-label>
			    <f7-input type="text" name="email" :value="user.email"/>
		  	</f7-list-item>
		  	<f7-list-item>
			    <f7-label>Телефон</f7-label>
			    <f7-input type="text" name="phone_mobile_local" :value="user.phone_mobile"/>
		  	</f7-list-item>
		  	<f7-list-item :resizable="true">
			    <f7-label>Сообщение</f7-label>
			    <f7-input type="textarea" :resizable="true" id='contact-message' name="content"/>
		  	</f7-list-item>
		  	<f7-block>
				<f7-button v-on:click="Feedback" big fill bg="bluegray">Отправить</f7-button>
			</f7-block>
        </f7-list>
        <div class="empty-space"></div>

	</f7-page>
</template>

<script src="./feedback.js"></script>
<style scoped src="./feedback.css"></style>