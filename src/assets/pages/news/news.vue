<template>
	<f7-page name="news">
		<f7-navbar>
      <f7-nav-left>
        <f7-link icon="icon-bars" open-panel="left"></f7-link>
      </f7-nav-left>
      <f7-nav-center sliding>Новости</f7-nav-center>
    </f7-navbar>
    <div class="preloader-wrapper">
		<f7-preloader v-if="!httpTrigger" color="teal" size="30px"></f7-preloader>
	</div>
    <f7-block>
    	<div v-for="element in news">
    		<f7-card :title="element.title" :content="element.content" :footer="element.created_at"></f7-card>
    		 <div class="empty-space" style="height: 20px;"></div>
    	</div>
    </f7-block>
    <div class="empty-space"></div>

	</f7-page>
</template>

<script src="./news.js"></script>
<style scoped src="./news.css"></style>