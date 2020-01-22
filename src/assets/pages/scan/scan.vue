<template>
	<f7-page name="scan" toolbar-fixed>
		<f7-navbar sliding>
			 <f7-nav-left>
   				 <f7-link icon="icon-bars" open-panel="left"></f7-link>
 		 	</f7-nav-left>
 		 	<f7-nav-center>
   				 Сканирование
 		 	</f7-nav-center>
		</f7-navbar> 
		<div class="empty-space" style="height: 50px;"></div>
			<f7-block>
				<f7-button v-on:click="Scan" big fill bg="bluegray">Сканировать</f7-button>
			</f7-block>
	    	<div class="card" v-show="scan_code[0]">
	    		<div class="card-header">Отсканированные коды:</div>
	    		<div class="card-content">
	    			<div class="card-content-inner">
	    				<div v-for="element in scan_code" :key="element">
	    					{{element}} <br><br>
	    				</div>
	    			</div>
	    		</div>
	    	</div>
	</f7-page>
</template>

<script src="./scan.js"></script>
<style scoped src="./scan.css"></style>

