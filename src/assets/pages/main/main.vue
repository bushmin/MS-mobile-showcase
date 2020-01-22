<template>
	<div id="app">
		<div class="statusbar-overlay" style="background-color: #009688"></div>
		
		<f7-panel left cover>
			<f7-view id="left-panel-view" theme="teal">
				<f7-pages>
					<f7-page>
						<div class="navheader">
							<div class="navheader-toprow">
								<div class="nav-avatar"></div>
								<div class="nav-logout" v-on:click="Logout"><i class="f7-icons">logout_fill</i></div>
							</div>
							<div class="navheader-bottomrow">
								<div class="nav-name">{{user.full_name}}</div>
								<div class="nav-mail">{{user.email}}</div>
							</div>
						</div>
						<div class="nav-menu list-block">
							<ul>
								<li>
									<a v-bind:class="IsOpened('/home/')" href="/home/" data-view="#main-view" class="item-link ripple-bluegray item-content close-panel">
										<div class="nav-menu-icon"><i class="f7-icons">person_fill</i></div>
										<div class="nav-menu-title">Профиль</div>
									</a>
								</li>
								<li>
									<a href="/sales/" v-bind:class="IsOpened('/sales/')" v-on:click="SetTab('#tab_sales')" data-view="#main-view" class="item-link ripple-bluegray item-content close-panel">
										<div class="nav-menu-icon"><i class="f7-icons">ticket_fill</i></div>
										<div class="nav-menu-title">Продажи</div>
									</a>
								</li>
								<li>
									<a href="/news/" v-bind:class="IsOpened('/news/')" data-view="#main-view" class="item-link ripple-bluegray item-content close-panel">
										<div class="nav-menu-icon"><i class="f7-icons">data_fill</i></div>
										<div class="nav-menu-title">Новости</div>
									</a>
								</li>
								<li>
									<a href="/education/" v-bind:class="IsOpened('/education/')" data-view="#main-view" class="item-link ripple-bluegray item-content close-panel">
										<div class="nav-menu-icon"><i class="f7-icons">play_round_fill</i></div>
										<div class="nav-menu-title">Образование</div>
									</a>
								</li>
								<li>
									<a href="/tests/" v-bind:class="IsOpened('/tests/')" data-view="#main-view" class="item-link ripple-bluegray item-content close-panel">
										<div class="nav-menu-icon"><i class="f7-icons">list_fill</i></div>
										<div class="nav-menu-title">Тесты</div>
									</a>
								</li>
								<li>
									<a href="/polls/" v-bind:class="IsOpened('/polls/')" data-view="#main-view" class="item-link ripple-bluegray item-content close-panel">
										<div class="nav-menu-icon"><i class="f7-icons">help_fill</i></div>
										<div class="nav-menu-title">Опросы</div>
									</a>
								</li>
								<li>
									<a href="/notif/" v-bind:class="IsOpened('/notif/')" data-view="#main-view" class="item-link ripple-bluegray item-content close-panel">
										<div class="nav-menu-icon"><i class="f7-icons">gear_fill</i></div>
										<div class="nav-menu-title">Оповещения</div>
									</a>
								</li>
								<li>
									<a href="/geo/" v-bind:class="IsOpened('/geo/')" data-view="#main-view" class="item-link ripple-bluegray item-content close-panel">
										<div class="nav-menu-icon"><i class="f7-icons">world_fill</i></div>
										<div class="nav-menu-title">Геопозиция</div>
									</a>
								</li>
								<li>
									<a href="/scan/" v-bind:class="IsOpened('/scan/')" data-view="#main-view" class="item-link ripple-bluegray item-content close-panel">
										<div class="nav-menu-icon"><i class="f7-icons">camera_fill</i></div>
										<div class="nav-menu-title">Скан кодов</div>
									</a>
								</li>
							</ul>
							<div class="hairline"></div>
							<div class="nav-subheader">Бонусы</div>
							<ul>
								<li>
									<a href="/codes/" v-bind:class="IsOpened('/codes/')" data-view="#main-view" class="item-link ripple-bluegray item-content close-panel">
										<div class="nav-menu-icon"><i class="f7-icons">keyboard_fill</i></div>
										<div class="nav-menu-title">Промокод</div>
									</a>
								</li>
								<li>
									<a href="/transactions/" v-bind:class="IsOpened('/transactions/')" data-view="#main-view" class="item-link ripple-bluegray item-content close-panel">
										<div class="nav-menu-icon"><i class="f7-icons">calendar_fill</i></div>
										<div class="nav-menu-title">Транзакции</div>
									</a>
								</li>
								<li>
									<a href="/money/" v-bind:class="IsOpened('/money/')" data-view="#main-view" class="item-link ripple-bluegray item-content close-panel">
										<div class="nav-menu-icon"><i class="f7-icons">money_rubl_fill</i></div>
										<div class="nav-menu-title">Вывод денег</div>
									</a>
								</li>
								<li>
									<a href="/eps/" v-bind:class="IsOpened('/eps/')" data-view="#main-view" class="item-link ripple-bluegray item-content close-panel">
										<div class="nav-menu-icon"><i class="f7-icons">card_fill</i></div>
										<div class="nav-menu-title">Сертификаты</div>
									</a>
								</li>
							</ul>
							<div class="hairline"></div>
							<div class="nav-subheader">Помощь</div>
							<ul>
								<li>
									<a href="/about/" v-bind:class="IsOpened('/about/')" data-view="#main-view" class="item-link ripple-bluegray item-content close-panel">
										<div class="nav-menu-icon"><i class="f7-icons">info_fill</i></div>
										<div class="nav-menu-title">О приложении</div>
									</a>
								</li>
								<li>
									<a href="/feedback/" v-bind:class="IsOpened('/feedback/')" data-view="#main-view" class="item-link ripple-bluegray item-content close-panel">
										<div class="nav-menu-icon"><i class="f7-icons">chats_fill</i></div>
										<div class="nav-menu-title">Написать нам</div>
									</a>
								</li>
								 <li>
									<a v-on:click="ResetData()" class="item-link ripple-bluegray item-content close-panel">
										<div class="nav-menu-icon"><i class="f7-icons">refresh_round_fill</i></div>
										<div class="nav-menu-title">Сбросить все данные</div>
									</a>
								</li>
							</ul>
						</div>
					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-panel>
	
		
		<!-- Main View -->
		<f7-views>
			<f7-view id="main-view" navbar-through :dynamic-navbar="true" url="/home/" main theme="teal">
				<f7-pages>

				</f7-pages>
			</f7-view>
		</f7-views>

		
 		<f7-login-screen id="login-screen">
			<f7-view theme="teal">
				<f7-pages>
					<f7-page login-screen>
						<f7-login-screen-title>Войти</f7-login-screen-title>
						<f7-list form id="login-form">
							<f7-list-item>
								<f7-label>Телефон</f7-label>
								<masked-input
							      type="tel"
							      name="phone"
							      class="form-control"
							      v-model="phoneMask"
							      :mask="['+','7', ' ','(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
							      :guide="false"
							      placeholderChar="_">
							    </masked-input>
							</f7-list-item>
							<f7-list-item>
								<f7-label>Пароль</f7-label>
								<f7-input name="password" type="password" placeholder="******"></f7-input>
							</f7-list-item>
						</f7-list>
						<f7-block>
							<f7-list>
								<f7-button v-on:click="PullLoginForm" big fill bg="teal">войти</f7-button>
								<f7-list-label>
									<a v-on:click="OpenPreRegPopup" class="color-teal">Регистрация</a>
								</f7-list-label>
							</f7-list>
						</f7-block>	
					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-login-screen>

		<f7-popup theme="teal" id="pre-reg" :opened="preRegOpened" v-on:popup:closed="ClosePreRegPopup" tablet-fullscreen>
			<f7-view>
				<f7-pages>
					<f7-page login-screen>
						<f7-login-screen-title>Проверка номера</f7-login-screen-title>
						<f7-list form id="pre-reg-form">
							<f7-list-item>
								<f7-label>Телефон</f7-label>
								<masked-input
							      type="tel"
							      name="phone"
							      class="form-control"
							      v-model="phoneMask"
							      :mask="['+','7', ' ','(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
							      :guide="false"
							      placeholderChar="_">
							    </masked-input>
							</f7-list-item>
						</f7-list>
						<f7-list>
							<f7-button v-on:click="PhoneSMS" big fill bg="teal">Отправить СМС</f7-button>
							<f7-list-label>
								<a v-on:click="ClosePreRegPopup" class="regText color-teal">назад</a>
							</f7-list-label>
						</f7-list>
					</f7-page>
				</f7-pages> 
			</f7-view>
		</f7-popup>

		<div class="popup reg tablet-fullscreen theme-teal">
			<div class="view">
	    		<div class="page">
	      			<div class="page-content page-notopmargin login-screen-content">
						<f7-login-screen-title>Регистрация</f7-login-screen-title>
						<f7-list form grouped id="reg-form">
							<f7-list-group>
								<f7-list-item title="Личные данные" group-title></f7-list-item>
								<f7-list-item>
								    <f7-label>Дата рождения</f7-label>
								    <f7-input type="date" name="passport_birthday_local"/>
							  	</f7-list-item>
							  	<f7-list-item>
								    <f7-label>Регион, город</f7-label>
								    <f7-input type="text" name="region"/>
							  	</f7-list-item>
							  	<f7-list-item smart-select smart-select-open-in="picker" smart-select-back-text="Назад" smart-select-back-on-select smart-select-form-theme="teal" title="Дилер">
								    <select name="dealer_id">
								    	<option selected></option>
								      <option v-for="item in dealers" :value="item.id">{{item.name}}</option>
								    </select>
								</f7-list-item>				
							</f7-list-group>
							<f7-list-group>
								<f7-list-item title="Данные для доступа в личный кабинет" group-title></f7-list-item>
								<f7-list-item>
								    <f7-label>Телефон</f7-label>
								    <f7-input type="tel" readonly name="phone_mobile_local" :value="phoneMask"/>
							  	</f7-list-item>
							  	<f7-list-item>
								    <f7-label>Пароль</f7-label>
								    <f7-input type="password" name="password" placeholder="***"/>
							  	</f7-list-item>
							  	<f7-list-item>
								    <f7-label>Повтор пароля</f7-label>
								    <f7-input type="password" name="passwordCompare" placeholder="***"/>
							  	</f7-list-item>
							</f7-list-group>
							<f7-list-group>
								<f7-list-item title="Персональные данные" group-title></f7-list-item>
								<f7-list-item>
								    <f7-label>Фамилия *</f7-label>
								    <f7-input type="text" name="last_name"/>
							  	</f7-list-item>
							  	<f7-list-item>
								    <f7-label>Имя *</f7-label>
								    <f7-input type="text" name="first_name"/>
							  	</f7-list-item>
							  	<f7-list-item>
								    <f7-label>Отчество</f7-label>
								    <f7-input type="text" name="middle_name"/>
							  	</f7-list-item>
							  	<f7-list-item>
								    <f7-label>Email *</f7-label>
								    <f7-input type="email" name="email" placeholder="example@mail.ru"/>
							  	</f7-list-item>
							</f7-list-group>
							<f7-list-group>
								<f7-list-item title="Прочее" group-title></f7-list-item>
								<li>
				                  <div class="item-content">
				                    <div class="item-inner">
				                      <a href="https://loyality-uvelka.msforyou.ru/media/uploads/rules.pdf" target="_blank" style="text-decoration: underline;" class="item-title label external">Согласен(сна) с правилами программы</a>
				                      <div class="item-input">
				                        <label class="label-switch">
				                          <input name="agreeWithTerms" type="checkbox" checked>
				                          <div class="checkbox"></div>
				                        </label>
				                      </div>
				                    </div>
				                  </div>
				                </li>
				                <li>
				                  <div class="item-content">
				                    <div class="item-inner">
				                      <a href="https://loyality-uvelka.msforyou.ru/media/uploads/pers.pdf" target="_blank" style="text-decoration: underline;" class="item-title label external">Даю согласие на обработку данных</a>
				                      <div class="item-input">
				                        <label class="label-switch">
				                          <input name="allowPersonalDataProcessing" type="checkbox" checked>
				                          <div class="checkbox"></div>
				                        </label>
				                      </div>
				                    </div>
				                  </div>
				                </li>
							</f7-list-group>
				        </f7-list>
						<f7-list>
							<f7-button v-on:click="Register" big fill bg="teal">Регистрация</f7-button>
							<f7-list-label>
								<a v-on:click="CloseRegPopup" class="regText color-teal">назад</a>
							</f7-list-label>
						</f7-list>
	        		</div>
	     		</div>
	    	</div>
		</div> 
	
	</div>
</template>

<script src="./main.js"></script>
<style scoped src="./main.css"></style>

