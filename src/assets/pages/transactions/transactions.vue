<template>
	<f7-page name="transactions" toolbar-fixed>
		<f7-navbar sliding>
			 <f7-nav-left>
   				 <f7-link icon="icon-bars" open-panel="left"></f7-link>
 		 	</f7-nav-left>
 		 	<f7-nav-center>
   				 Транзакции
 		 	</f7-nav-center>
		</f7-navbar> 

		<div class="content-block">
            <div class="no-items-message" v-if="!transactions[0]">История пуста!</div>

            <f7-list>
				<ul>
					<li v-for="element in transactions" :key="element.id">
					  <div class="card item-link">
					    <div class="card-header">{{element.created_at}}<span v-bind:class="ColorMoney(element)">{{element.balance_after - element.balance_before}} руб</span></div>
					    <div class="card-content">
					      <div class="card-content-inner">
					        <div class="timeline-item-title">{{element.title}}</div>
					        <div class="timeline-item-subtitle">{{element.comment}}</div>
					      </div>
					    </div>
					    <div class="card-footer"><span>ID: {{element.id}}</span></div>
					  </div>
					</li>
				</ul>
            </f7-list>
		</div>
		<div class="empty-space"></div>

	</f7-page>
</template>

<script src="./transactions.js"></script>
<style scoped src="./transactions.css"></style>