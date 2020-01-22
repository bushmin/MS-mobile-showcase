<template>
	<f7-page name="education" toolbar-fixed>
		<f7-navbar>
      <f7-nav-left>
        <f7-link icon="icon-bars" open-panel="left"></f7-link>
      </f7-nav-left>
      <f7-nav-center sliding>Образовательные материалы</f7-nav-center>
    </f7-navbar>
    <f7-toolbar tabbar scrollable>
		<f7-link active tab-link="#tab_educ_pdf">PDF</f7-link>
		<f7-link tab-link="#tab_educ_video">Видео</f7-link>
	</f7-toolbar>
	<f7-tabs animated>
			<f7-tab id="tab_educ_pdf" active>
				<div class="empty-space" style="height: 50px;"></div>
				<div content-block class="align-center">
			    	<div v-for="element in pdf">
			    		<f7-block-title>{{element.title}}</f7-block-title>
			    		<f7-block>
			    			<f7-button v-on:click="OpenPDF(element.file)" fill bg="teal">Читать</f7-button>
			    		</f7-block>
			    	</div>
			    </div>
			</f7-tab>
			
			<f7-tab id="tab_educ_video">
				<div class="empty-space" style="height: 50px;"></div>
				<div content-block class="align-center">
			    	<div v-for="element in videos">
			    		<!-- <f7-login-screen-title>{{element.title}}</f7-login-screen-title> -->
			    		<f7-block-title>{{element.video_1_title}}</f7-block-title>
			    		<div v-html="element.video_1_frame" class="video-container"></div>
			    		<div class="empty-space" style="height: 20px;"></div>
			    		<f7-block-title>{{element.video_2_title}}</f7-block-title>
			    		<div v-html="element.video_2_frame" class="video-container"></div>
			    		<div class="empty-space" style="height: 20px;"></div>
			    		<f7-block-title>{{element.video_3_title}}</f7-block-title>
			    		<div v-html="element.video_3_frame" class="video-container"></div>
			    		<div class="empty-space" style="height: 20px;"></div>
			    		<f7-block-title>{{element.video_4_title}}</f7-block-title>
			    		<div v-html="element.video_4_frame" class="video-container"></div>
			    		<div class="empty-space" style="height: 20px;"></div>
			    		<f7-block-title>{{element.video_5_title}}</f7-block-title>
			    		<div v-html="element.video_5_frame" class="video-container"></div>
			    		<div class="empty-space" style="height: 20px;"></div>
			    	</div>
			    </div>
			</f7-tab>
			
			
		</f7-tabs>
    
	</f7-page>
</template>

<script src="./education.js"></script>
<style scoped src="./education.css"></style>