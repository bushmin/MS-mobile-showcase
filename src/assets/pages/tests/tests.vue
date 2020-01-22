<template>
	<f7-page name="tests" toolbar-fixed>
		<f7-navbar>
	      <f7-nav-left>
	        <f7-link icon="icon-bars" open-panel="left"></f7-link>
	      </f7-nav-left>
	      <f7-nav-center sliding>Тесты</f7-nav-center>
	    </f7-navbar>
	    <f7-tabs animated>
	    	<f7-tab id="tab_test_main" active>
	    		<div class="preloader-wrapper">
					<f7-preloader v-if="!httpTrigger" color="teal" size="30px"></f7-preloader>
				</div>
				<div v-for="test in tests" :key="test.id">
					<f7-block-title>{{test.title}}</f7-block-title>
					<f7-block>
						<f7-button v-on:click="TestIndex(test.id)" tab-link="#tab_test_solve" small fill bg="bluegray">Начать тест</f7-button>
					</f7-block>
					<f7-block-title>Прошлые результаты:</f7-block-title>
					<div v-for="attempt in testtries" :key="attempt.id">
    					<div class="card">
    						<div class="card-header">{{attempt.test_title}}</div>
    						<div class="card-content">
    							<div class="card-content-inner">
    								<f7-grid>
										<f7-col v-for="num in attempt.test_questions" :key="num" :width="100/attempt.test_questions">
											<div :class="ColorCircle(attempt.results, num)" class="answer_circle">{{num}}</div>
										</f7-col>
									</f7-grid>
    							</div>
    						</div>
    						<div v-if="attempt.paid" class="card-footer">Начислено {{attempt.test_bonuses}} бонусов</div>
						</div>
						<div class="empty-space" style="height: 20px;"></div>
					</div>
				</div>
				<div class="empty-space"></div>
	    	</f7-tab>

	    	<f7-tab id="tab_test_solve">
	    		<div class="empty-space" style="height: 50px;"></div>
	    		<form id="form-test">
					<div v-for="test in tests" :key="test.id"> <!-- needs fix if more than 1 test -->
						<f7-grid>
							<f7-col v-for="num in test_try.test_questions" :key="num" :width="100/test_try.test_questions">
								<div :class="ColorCircle(test_try.results, num)" class="answer_circle">{{num}}</div>
							</f7-col>
						</f7-grid>

						<f7-swiper scrollbar :params="{effect: 'slide', touchRatio: 0}">
							<f7-swiper-slide v-for="(ques, index) in test.questions" :key="ques.id">
						        <f7-block-title>{{index+1}}) {{ques.title}}</f7-block-title>
					        	<f7-list>
				    					<f7-list-item v-for="(answer, index) in ques.answers" :key="answer.id" checkbox :name="'question_' + ques.id" :value="answer.id" :title="answer.title"></f7-list-item>
								</f7-list>
								<f7-block>
				    				<f7-button v-on:click="TestNext(ques.id, 'question_' + ques.id)" small fill bg="bluegray">Далее</f7-button>
				    			</f7-block>
							</f7-swiper-slide>
							<f7-swiper-slide>
						        <f7-block-title>Поздравляем. Тест пройден!</f7-block-title>
								<f7-block>
									<div>Правильных ответов: {{test_try.correct_answers}} из {{test_try.test_questions}}</div>
				    				<f7-button v-on:click="RefreshTest" tab-link="#tab_test_main" fill bg="bluegray">Вернуться в меню</f7-button>
				    			</f7-block>
							</f7-swiper-slide>
						</f7-swiper>
					</div>
				</form>
	    	</f7-tab>
		</f7-tabs>
	</f7-page>
</template>

<script src="./tests.js"></script>
<style scoped src="./tests.css"></style>