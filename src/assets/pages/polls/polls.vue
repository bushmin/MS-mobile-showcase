<template>
	<f7-page name="polls" toolbar-fixed>
		<f7-navbar sliding>
			<f7-nav-left>
				<f7-link icon="icon-bars" open-panel="left"></f7-link>
			</f7-nav-left>
			<f7-nav-center>
				Опросы
			</f7-nav-center>
		</f7-navbar>
		<f7-toolbar tabbar>
			<f7-link active tab-link="#tab_polls_not_completed">Пройти</f7-link>
			<f7-link tab-link="#tab_polls_completed">История</f7-link>
		</f7-toolbar>
		<f7-tabs animated>

			<f7-tab id="tab_polls_not_completed" active>
				<div class="empty-space" style="height: 50px;"></div>
				<div class="content-block">
					<div class="no-items-message" v-if="!polls.length">Все опросы пройдены</div>

					<div v-for="poll in polls" :key="poll.id" class="card">
						<div class="card-header">{{poll.title}}</div>
						<div class="card-content">
							<div class="card-content-inner">
								<div class="timeline-item-title">Всего вопросов: {{poll.questions.length}}</div>
							</div>
						</div>
						<f7-block>
							<f7-button v-on:click="Question(poll.id)" big fill bg="bluegray">
								Пройти
							</f7-button>
						</f7-block>
					</div>
				</div>
				<div class="empty-space" style="height: 50vh;"></div>
			</f7-tab>


			<f7-tab id="tab_polls_completed">
				<div class="empty-space" style="height: 50px;"></div>
				<div class="content-block">
					<div class="no-items-message" v-if="!user_polls.length">История пуста!</div>

					<div v-for="user_poll in user_polls" :key="user_poll.id" class="card">
						<div class="card-header">{{user_poll.poll.title}}</div>
						<div class="card-content">
							<div class="card-content-inner">
								<div class="timeline-item-title">Всего вопросов: {{user_poll.poll.questions.length}}</div>
								<div class="timeline-item-title">Пройден: {{user_poll.finished_at}}</div>
							</div>
						</div>
					</div>
				</div>
				<div class="empty-space"></div>
			</f7-tab>

		</f7-tabs>
	</f7-page>
</template>

<script src="./polls.js"></script>

