<template>
	<f7-page name="polls_question" toolbar-fixed>

		<f7-navbar sliding>
			<f7-nav-left>
				<f7-link icon="icon-bars" open-panel="left"></f7-link>
			</f7-nav-left>
			<f7-nav-center>
				{{userPoll.poll_title}}
			</f7-nav-center>
		</f7-navbar>

		<div v-if="question">
			<f7-block-title>{{question.question}}</f7-block-title>
			<div class="content-block">
				<f7-list>
					<f7-list-item v-for="(answer, index) in question.answers"
								  v-on:click="Answer(answer.id)"
								  radio
								  :key="answer.id"
								  :name="'question_' + question.id"
								  :value="answer.id">
						{{answer.answer}}
					</f7-list-item>
				</f7-list>
			</div>
		</div>

	</f7-page>
</template>

<script src="./polls_question.js"></script>

