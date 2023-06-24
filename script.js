

// Старт игры
	
	// scriptV.js

//setInterval(showCounters(), 10);

// Работа с игрой

	// Начало
		function startGame() {
			console.log("FUNCTION: startGame");

			isGame = true;
			//endGameListener();

			//createGamer(3);
			setObjectBackground(gamer, gamerImg);
			
			let enemy = createFirstEnemy();
					
			mooveEnemy(enemy);

			createFood();
		
			lifesShowGamerLifes();
			lifesShowEnemyLifes();

			// Звук 
				// фон
					createAudioLoop(_2fon);
				
				//  Раунд 1
					createAudioShort(_2round1);
		}


	// Конец

		// условия завершения игры
		// true - игра окончена
		// false - игра продолжается
		// Исп createEnemy(), mooveEnemy(), document.onkeydown(event) 
		function isEndGameConditions() {
			console.log("FUNCTION: isEndGameConditions");

			if(!isGame || gamerLives <= 0) {

				// LOSE
				isGame = false;

				// ускорить врага, когда закончились жизни
				enemySpeedPX = 40;


				let timerID = setTimeout(() => {
					
					endGame();
					endGameLoose();
					clearTimeout(timerID);

				}, 6000); // 4000 для съедения игрока в mooveEnemy() -> enemyEatedGamer

			} else if(enemyKilledCount >= enemiesCount) {

				// WIN
				isGame = false;

				// Звук Well done
					playerloop.pause();
					createAudioShort(_31wellDone); 
				
				let timerID = setTimeout(() => {

					endGame();
					endGameWin();
					clearTimeout(timerID);

				}, 3000);

			}
		}

	// Вызывается в: isEndGameConditions()
		function endGame() {
			console.log("FUNCTION: ENDGAME");
			
			// собрать все объекты на поле и удалить их: еда, враги [игрок, аудио]
			removeAllObjectsFromField(gameField);

		}

		// Нажата кнопка Restart
			function reloadGame() {
				console.log("FUNCTION: reloadGame");

				if(isGamerWin) {
					
					// Выбери судьбу
						playerloop.pause();
						createAudioShort(_31chooseDestiny);

					// Таймер задержки перезагрузки окна reload
					let timerID = setTimeout(() => {
						
						// собрать все объекты на поле и удалить их
							removeAllObjectsFromField(gameField);

						location.reload();
						clearTimeout(timerID);

					}, 3000);

				} else {

					// Заставка для reloadGame() + Звук - смеется на весь экран, ha-ha
						enemyCreateReloadBg();

					// Таймер задержки перезагрузки окна reload
					let timerID = setTimeout(() => {
						
						// собрать все объекты на поле и удалить их
							removeAllObjectsFromField(gameField);

						location.reload();
						clearTimeout(timerID);

					}, 4000);
				}
			}

	// вывод счетчиков на экран
		function showCounters() {
			//console.log("FUNCTION: showCounters");

			let score = document.createElement("div");
				score.className = "score";
			let zomiCounter = document.createElement("div");
				zomiCounter.className = "zomiCounter";
			let gamerLives = document.createElement("div");
				gamerLives.className = "gamerLives";

			gameField.append(score);
			gameField.append(zomiCounter);
			gameField.append(gamerLives);


			enemyKilledCount_out.innerText = enemyKilledCount;
			foodEatedCount_out.innerText = foodEatedCount;
			gamerLives_out.innerText = gamerLives;
		}


// Работа с объектами

	// Создание объектов

		// Возвращает помещенный на поле areaOnTo в случайном месте видимой области clientArea
		// объекс с классом objectClass и картинкой objectBG
			function createGameElement(areaOnTo, clientArea, objectClass, objectBG) {
				//console.log("FUNCTION: createGameElement"); 

				let object = createObjectDivWithClassNameAndBgImg(objectClass, objectBG);
				areaOnTo.append(object);

				// поместить объект в случайное место на поле
				outputObjectInRandomAreaPosition(object, clientArea);

				return object;
			}

		// Возвращает объект с заданным именем класса и заданным setObjectBackground
	    	function createObjectDivWithClassNameAndBgImg(className, imgBg_URL) {
		    	//console.log("FUNCTION: createObjectDivWithClassNameAndBgImg");

		        let object = document.createElement("div");
		        object.className = className;

		        setObjectBackground(object, imgBg_URL);

		        return object;
		    }

	    // Задать объекту бекграунд
			function setObjectBackground(object, url) {
				//console.log("FUNCTION: setObjectBackground");

				object.style.background = url;
				object.style.backgroundSize = "contain";
			}

	// Удаление объектов

		// Собирает все объекты на поле areaOnTo и удаляет их
			function removeAllObjectsFromField(areaOnTo) {
				console.log("FUNCTION: removeAllObjectsFromField");
				 
			 // получить массив объектов заданных классов, находящихся на поле
		       let objectsAll = [].concat(
		       		//...document.querySelectorAll('.player'),
		       		//...document.querySelectorAll('.sound'),
		       		...document.querySelectorAll('.enemy'),
		       		...document.querySelectorAll('.food'));

		       console.log(objectsAll);
		    
		    	// Удалить объекты с поля.
				for(let i = 0; i < objectsAll.length; i++) {
		            let obj = objectsAll[i];
		            console.dir(obj);
		            removeElement(obj);
		       }
			}

    // Вывод объектов

	    // Вывести объект в произвольном месте area
			function outputObjectInRandomAreaPosition(object, area) {
				//console.log("FUNCTION: outputObjectInRandomPosition");

				// появление в случайном месте по высоте 
	            // 120 - отступ сверху и снизу от краев блока area
	            object.style.top = minMaxIncluded(120, area.clientHeight - 120) + "px";
	            object.style.left = minMaxIncluded(120, area.clientWidth - 120) + "px";

		        area.append(object);
			}
    
    // Движение объектов

		// Движение при нажатии на кнопку
			document.onkeydown = (event) => {
				//console.log("EVENT: document.onkeydown"); 
				if (isGame)	{
					//console.log("document.onkeydown - isGame: " + isGame);
					
					isFoodGrabed();
					isEndGameConditions();
					playerMooveOnkeydown(event);
				}
			}

		// Движение объекта по стрелкам
			function playerMooveOnkeydown(event) {
				//function playerMooveOnkeydown(event, object, objectsSpeed) {
				//console.log("FUNCTION: playerMooveOnkeydown");
				
				 // Работа с движением игрока

			    // move gamer up

			    // Запретить движение игрока, если верх игрока минус скорость выше низа жизней (40px)
			    // код кнопки буква 'w'- 87, стрелка вверх - 38
			    if (gamer.offsetTop /*- gamerSpeed / 2 */> clientArea.offsetTop + gamerSpeedLimit + 10  
			    	&& (event.keyCode == 87 || event.keyCode == 38)) {
			    	mooveObjectUp(gamer, gamerSpeed);
			    }

			    // move gamer down: 
			   
			    // Запретить движение вниз, если низ игрока + его высота + его скорость больше высоты экрана &&
			    // код кнопки буква 's'- 83, стрелка вниз - 40 
			    if (gamer.offsetTop + gamer.offsetHeight /*+ gamerSpeed/2*/ < clientArea.clientHeight - gamerSpeedLimit
			    	&& (event.keyCode == 83  || event.keyCode == 40)) {
			        mooveObjectDown(gamer, gamerSpeed);
			    }
			   
			    // move gamer left

			    // Запретить движение игрока, если его левый выходит за пределы экрана
			    // код кнопки буква 'a'- 65, стрелка влево - 37
			    if (gamer.offsetLeft /*- gamerSpeed*/ > clientArea.offsetLeft + gamerSpeedLimit
			    	&& (event.keyCode == 65 || event.keyCode == 37)) {
			        mooveObjectLeft(gamer, gamerSpeed);
			    	setObjectBackground(gamer, gamerImg);
			    }

			    // move gamer right: 
			   
			    // Запретить движение вниз, если низ игрока + его высота + его скорость больше высоты экрана &&
			    // код кнопки буква 'd'- 68, стрелка вправо - 39 
			    if (gamer.offsetLeft /*+ gamer.offsetWidth + gamerSpeed*/ < clientArea.clientWidth - gamerSpeedLimit
			    	&& (event.keyCode == 68  || event.keyCode == 39)) {
			        mooveObjectRight(gamer, gamerSpeed);
			    	setObjectBackground(gamer, gamerImgMirror);
			    }
			}

    	// Движение объекта с заданной скоростью
			function mooveObjectUp(object, speed_PX) {
				object.style.top = object.offsetTop - speed_PX + "px";
			}

			function mooveObjectDown(object, speed_PX) {
				object.style.top = object.offsetTop + speed_PX + "px";
			}

			function mooveObjectLeft(object, speed_PX) {
				object.style.left = object.offsetLeft - speed_PX + "px";
			}

			function mooveObjectRight(object, speed_PX) {
				object.style.left = object.offsetLeft + speed_PX + "px";
			}

    	//Преследование объкекта
			//object - тот, кто приследует
			// objectSpeedPX - скорость передвижениея того, кто приследует
			// target - кого приследуют
			function followTarget(object, objectSpeedPX, target) {
				//console.log("EVENT: followTarget"); 

				if(object == null && target == null) {
					console.log("FUNCTION: followTarget returned null");
					return;
				}
				
				//console.log("FUNCTION: followTarget");

				// цель правее объекта
				if(getObjCenter_X(object) > getObjCenter_X(target)) {
					mooveObjectLeft(object, objectSpeedPX);
					setObjectBackground(object, enemyImg);

				}
				
				// цель левее объекта
				if(getObjCenter_X(object) < getObjCenter_X(target)) {
					mooveObjectRight(object, objectSpeedPX);
					setObjectBackground(object, enemyImgMirror);
				}
				
				// цель ниже объекта
				if(getObjCenter_Y(object) > getObjCenter_Y(target)) {
					mooveObjectUp(object, objectSpeedPX);
				}
				
				// цель выше объекта
				if(getObjCenter_Y(object) < getObjCenter_Y(target)) {
					mooveObjectDown(object, objectSpeedPX);
				}
			}

		// Получить координату Х центра объекта
			function getObjCenter_X(object) {
				//console.dir("FUNCTION: getObjCenter_X of " + object);
				
				if (object)
					return object.offsetLeft + object.style.width / 2;
			}

		// Получить координату Y центра объекта
			function getObjCenter_Y(object) {
				//console.dir("FUNCTION: getObjCenter_Y of " + object);

				if (object)
					return object.offsetTop + object.style.height / 2;
			}


// Работа с врагом

	// Создать первого врага		
		function createFirstEnemy() {
			//console.dir("FUNCTION: createFirstEnemy());
			let enemy = createGameElement(clientArea, clientArea, enemyClass, enemyImg);

			// Задать случайный скин врагу
				enemySetRandomSkin();

			// Ограничение игрока от появляения первого врага рядом с игроком
			// случайное число, на безопасном расстоянии от игрока. (250 х 50 от краев экрана)
			let s_top = 50;
			let s_bottom = clientArea.clientHeight - s_top;
			let s_left = 250;
			let s_right = clientArea.clientWidth - s_left;

			let rndTop = minMaxIncluded(10, s_top);
			let rndBottom = minMaxIncluded(s_bottom, clientArea.clientHeight);
			let rndLeft = minMaxIncluded(10, s_left);
			let rndRight = minMaxIncluded(s_right, clientArea.clientWidth);

			let numRnd = minMaxIncluded(1, 100);

			// если число четное
			if(numRnd < 25) {
				enemy.style.top = rndTop + "px";
				enemy.style.left = rndLeft + "px";
			} else if (numRnd >= 25 && numRnd < 50) {
				enemy.style.top = rndTop + "px";
				enemy.style.left = rndRight + "px";
			}
				else if (numRnd >= 50 && numRnd < 75) {
				enemy.style.top = rndBottom + "px";
				enemy.style.left = rndLeft + "px";
			}
				else if (numRnd >= 75) {
				enemy.style.top = rndBottom + "px";
				enemy.style.left = rndRight + "px";
			}

			return enemy;
		}

	// Создать врага
		function createEnemy() {
			//console.log("FUNCTION: createEnemy");

			// если условия завершения игры выполнсяются, выйти из функции
			if (!isGame) {

				//isEndGameConditions();
				//isFoodGrabed();

			} else {

				// Задать случайный скин врагу
				enemySetRandomSkin();

				let enemy = createGameElement(gameField, clientArea, enemyClass, enemyImg);

				// прирост скорости врага с добавлением нового врага
				enemySpeedPX += enemySpeedStep;

				mooveEnemy(enemy);
			}
		}

	// Задать случайный скин врагу
		function enemySetRandomSkin() {
			//console.log("FUNCTION: enemySetRandomSkin");

			// задание случайного скина врагу
				enemyImgCount = minMaxIncluded(1, enemySkinCount);
				enemyImg = "url(img/enemy/" + enemyImgCount + ".png)  no-repeat";
				enemySkinCountMirror = enemyImgCount + 10; // Зеркальное отображение скина врага. Смотрит влево
				enemyImgMirror = "url(img/enemy/" + enemySkinCountMirror + ".png)  no-repeat";

				console.log(enemyImgCount);
		}

	// Движение врага
		function mooveEnemy(enemy) {
			console.log("FUNCTION: mooveEnemy");

			let isSetDataTimerID = false;
			
			let timerID = setInterval(() => {

				// Задаем врагу timerID один раз
				if(!isSetDataTimerID) {
					console.log("IF: isSetDataTimerID") 
					
					setDataTimerID(enemy, timerID);
					isSetDataTimerID = true;
				}

				// преследовать элемент
				followTarget(enemy, enemySpeedPX, gamer);

				// Если враг догнал игрока
				if(isElementIntoTarget(gamer, enemy)) {
					isGame = false;

					// удалить врага
					removeElement(enemy);

					// Звук Зомби ест жертву Гифка + музыка
					enemyEatedGamer();


					isEndGameConditions();

				}

				// Проверка, съедена ли еда, здесь, т.к таймер часто обновляется
				//isFoodGrabed();

//				isEndGameConditions();
			}, enemySpeedMS);
		}

	// Зомби ест жертву Гифка + музыка - moove enemy
		function enemyEatedGamer() {	
			console.log("FUNCTION: enemyEatedGamer");

			// задать игроку больший размер, вмещающий гифку поедания
			gamer.style.width = "520px";
			gamer.style.height = "213px";
			gamer.style.background = "cover";
			
			// Поместить по центру
			gamer.style.top = "30%";
			gamer.style.left = "30%";

			// Гифка поедания с вырыванием языка
			//setObjectBackground(gamer, "url(https://acegif.com/wp-content/uploads/2022/fzk5d/zombie-acegif-40-eating-tongue-zombies.gif) no-repeat");
			setObjectBackground(gamer, "url(img/enemy/zeatedtongue.gif) no-repeat");
			
			// чтобы гифка не выделялась на фоне БГ
			gamer.style.opacity = "0.9";

			// аудио
				// Поставить фон на паузу
					playerloop.pause();

				// аудио съедающего зомбака 
					createAudioShort(_2ryk);

				// Звук в зависимости от пола персонажа прикончи его/ее
					console.log("gamerSkinCount: " + gamerSkinCount);
					gamerSkinCount == 3 ? createAudioShort(_2finish_him_2) : createAudioShort(_2finish_her);
		}

	// Заставка для reloadGame() смеющийся зомби на весь экран Гифка + звук
		function enemyCreateReloadBg() {
			// console.log("FUNCTION: enemyCreateReloadBg");

			let endBlock = document.querySelector("#end");
				endBlock.style.display = "none";

			let zombie = document.createElement("div");
			zombie.style.width = "100%";
			zombie.style.height = "100%";
			zombie.style.margin = 0;
			zombie.style.top = 0;
			zombie.style.left = 0;
			
			zombie.style.background = "url(img/enemy/zblooded.gif) no-repeat";
			zombie.style.backgroundSize = "cover";
			zombie.style.opacity = "0.4";
			
			clientArea.append(zombie);

			// Звук zombie's Смеется
				createAudioShort(_323haha);
		}


// Работа с едой

	// Создать еду по таймеру
		function createFood() {
			//console.log("FUNCTION: createFood");
			
		/*!! перенесено на стр.558
			// Если игра не закончена
			if(isGame) {*/

			// создавть новую еду, с интервалом foodNextFoodTimeout
			let timerID = setInterval(() => {
	
			// Если игра не закончена
				if(isGame) {
	
					isFoodGrabed(); 
					isEndGameConditions();
					

					// если игра завершена, удалить таймер
					if(!isGame) {
						clearInterval(timerID);
						return;
					}

					// задание случайного скина еде
					let foodSkin = minMaxIncluded(1, foodSkinCount);
					foodImg = "url(img/food/" + foodSkin + ".png)  no-repeat";

					food = createGameElement(gameField, clientArea, foodClass, foodImg);

					// задать пользовательский аттрибут isEated: 0 - не съедена, 1 - съедена
					food.setAttribute("isEated", 0);
						//console.log("food.data-isEated = " + food.getAttribute("isEated"));

					if(isGame) { showFood(food); }
				}

			}, foodNextFoodTimeout);
		}

	// Появление еды
		function showFood(food) {
			//console.log("FUNCTION: showFood");

			// установить значение для новой еды, что она не съедена
        	isGamerEatedFood = false;

			// показывать еду заданное время foodTimeout
			let foodId = setTimeout(() => {	
               	
               	setDataTimerID(food, foodId);

               	//isFoodGrabed(); // Вызывает ошибку при окончании. Эта проверка есть в createFood(). 

	            //если аттрибут еды = 0, удалить жизнь игрока
	            let bool = food.getAttribute("isEated");
        		
        		if( parseInt(bool) == 0) {
        			
        			gamerRemoveLifeMinusSpeed();
        		}

        		removeElement(food);

        		clearTimeout(foodId);

        	} ,foodTimeout);
		}

	// Если схватил еду
		function isFoodGrabed() {
			//console.log("FUNCTION: isFoodGrabed");

			if(isGame) {

				// вывести жизни игрока
				lifesShowGamerLifes();
			}

				// вывести жизни врага
				lifesShowEnemyLifes();

			// если игрок еду съел 
			if(isElementIntoTarget(food, gamer)) {

				// съедена ли еда игроком
				food.setAttribute("isEated", 1);

				// удалить еду
				removeElement(food);

				// Увеличить счетчик еды для убийства врага
				foodEatedCount++;

				// Звук съел еду
					if(isGame) { createAudioShort(_2toasty); }

				// уменьшить счетчик жизней врага
				countLifesOfEnemy--;


				// Увеличить скорость игрока gamerSpeed на gamerSpeedStep до лимита 
				gamerAddLifePlusSpeed();


				// если съел достаточно еды, убить врага
				if(foodEatedCount >= foodEatedLimit) {

//					isEndGameConditions();

						// удалить врага
						let obj = document.querySelector(".enemy");
						createBoom(obj);
						removeElement(obj);

						// Звук взрыва врага
							if(isGame) { createAudioShort(_2zdieBoom);}

						// обнулить счетчик еды для убийства врага
						foodEatedCount = 0;


						// добавить 1 к убитым врагам
						enemyKilledCount++;

						// Увеличить размер игрока на 5px
							/*	не получилось, т.к. после увеличения игрока останавливается движение зомби
							gamer.style.height = gamer.clientHeight + 10 + "px";
							gamer.style.width = gamer.clientWidth + 5 + "px";*/

						// Звук раунд 2, раунд 3
						if(!isGame) { 

							if (enemyKilledCount == 1) {

								// Звук
									// Раунд 2
										playerloop.pause();
										createAudioShort(_2round2);
									
									// Начать заново фон
										//createAudioLoop(_2fon);
									

							} else if (enemyKilledCount == 2) {
								
								// Звук
									// Начать заново фон
										//playerloop.play();
									
									// Раунд 2
										createAudioShort(_2round3);
							}

						}

					if(enemyKilledCount < enemiesCount) {

						// создать врага
						createEnemy();

						// восстановить счетчик жизней нового врага
						countLifesOfEnemy = foodEatedLimit;
					} else {
						//isGame = false;
						//isEndGameConditions();
					}
				}
			}  
		
		}


// Работа с игроком

	// Задать начальный скин игроку по выбору в начальном окне

		// Выбор 1-го игрока и задание ему скина
	     var selectedSkin1 = document.querySelector("#skin1");

	        selectedSkin1.onclick = () => {
	        	selectedSkin1.className = "selected";                    ////////////////// прописал классы 599, 600///////////////
				selectedSkin2.className = "";
				gamerSkinCount = 3;
	        	createGamer(3);

	        }

	    // Выбор 2-го игрока и задание ему скина
	    var selectedSkin2 = document.querySelector("#skin2");
	        
	        selectedSkin2.onclick = () => {
	        	selectedSkin2.className = "selected";             ////////////////// прописал классы 609, 610///////////////
				selectedSkin1.className = "";
				gamerSkinCount = 4;
	        	createGamer(4);
	        }

	// Создать игрока
		function createGamer(gamerSkinCount_) {
			console.log("FUNCTION: createGamer");

			gamerSkinCount = gamerSkinCount_;
			gamerImg = "url(img/gamer/" + gamerSkinCount + ".png)  no-repeat"; // playerMooveOnkeydown(event) - left
			gamerSkinCountMirror = gamerSkinCount + 10; // смотрит вправо
			gamerImgMirror = "url(img/gamer/" + gamerSkinCountMirror + ".png)  no-repeat"; // playerMooveOnkeydown(event) - right
			
			setObjectBackground(gamer, gamerImg);

		}

	// Работа с энергией игрока и его скоростью

		// отнять энергию игроку и уменьшить его скорость
			function gamerRemoveLifeMinusSpeed() {
				console.log("FUNCTION: gamerRemoveLifeMinusSpeed");

				// уменьшить энергию игрока
				gamerLives--;

				// если скорость игрока меньше 5, отнимать по 1
					if(gamerSpeed <= 5) {
						gamerSpeed--;
					}

				// уменьшить скорость игрока
					gamerSpeed -= gamerSpeedStep;

				//lifesShowGamerLifes(gamerLives);
			}

		// Добавить энергию игроку и увеличить его скорость
			function gamerAddLifePlusSpeed() {
				console.log("FUNCTION: gamerAddLifePlusSpeed");

				// увеличить энергию игрока
					gamerLives++;

				// Увеличить скорость игрока gamerSpeed на gamerSpeedStep до лимита 
					if (gamerSpeed < gamerSpeedLimit) {
						gamerSpeed += gamerSpeedStep;
						console.log(gamerSpeed);
					}
			}


// Работа со взрывами

    // Создает взрыв на месте переданного параметра element
	    function createBoom(element) {
	       //console.log("FUNCTION: createBoom");

	    	if (!isGame) return;

	        let boom = document.createElement("div");
	            boom.className = "boom";

	            // координаты взрыва равные координатам element
	            boom.style.top = element.offsetTop + "px";
	            boom.style.left = element.offsetLeft + "px";
	        
	        gameBlock.append(boom);

	        // Удалить объект boom через 1 секунду
	        var timerID = setTimeout(() => {
	            
	            // задать взрыву пользовательский аттрибут data-timerid, в который передаем значение ID таймера
	            // это нужно для остановки этого таймера в функции removeElement(element)
	            boom.dataset.timerid = timerID;
	            removeElement(boom);
	        }, 1000);
	    }


// Работа с жизнями

    // Выводит жизнь врага. Исп isFoodGrabed()
	    function lifesShowEnemyLifes() {
	    	//console.log("FUNCTION: lifesShowEnemyLifes");

	    	//console.log("lifesShowEnemyLifes() -> isGame: " + isGame);

	    	var lifes = document.querySelector("#lifes");
	        
	        // очистить предыдущие элементы в блоке
	        lifes.innerHTML = "";  // не всегда может вычитать в конце игры.

	        let count = 0;
	        
	        // Пока количество жизней зомби больше нуля (количество съеденной еды, чтобы убить врага)
	        while(count < countLifesOfEnemy) {
	            count++;
	            lifes.append(document.createElement("span"));
        	}
	    }

    // Выводит жизнь игрока. Исп isFoodGrabed()
	    function lifesShowGamerLifes() {
	    	//console.log("FUNCTION: lifesShowGamerLifes");

	    	let gamerLifesBlock = document.querySelector(".energy");
	    	
	    	// очистить предыдущие элементы в блоке
	    	gamerLifesBlock.innerHTML = "";


	    	let red = document.createElement("span");
	    	red.className = "red";
	    	gamerLifesBlock.append(red);

	    	let yellow = document.createElement("span");
	    	yellow.className = "yellow";
	    	gamerLifesBlock.append(yellow);

	    	let green = document.createElement("span");
	    	green.className = "green";
	    	gamerLifesBlock.append(green);


	    	switch(gamerLives) {
	    		case 0:
	    			green.style.background = "none";
	    			yellow.style.background = "none";
	    			red.style.background = "none";
	    		case 1:
	    			green.style.background = "none";
	    			yellow.style.background = "none";
	    			break;
	    		case 2:
	    			green.style.background = "none";
	    			break;
	    		default:
	    			gamerLifesBlock.style.background = "block";
	    			break;
	    	} 

	    }


// Работа со звуком 

	// soundL.js
    

// Дополнительно

	// Возвращает случайное число включительно min max
		function minMaxIncluded(min, max) {
			console.log("FUNCTION: minMaxIncluded");

   	    	 return Math.floor(Math.random() * (max - min + 1) + min);
    	}
