
//переменная для кнопки старт
startButton = document.querySelector("#start button");
	console.dir("startButton");

//переменная для стартового окна
startBlock = document.querySelector("#start");

//переменная для игрового поля
gameBlock = document.querySelector("#game");

//переменная для фона в игре
videoFon = document.querySelector("video-fon");

// название игры
nazva = document.querySelector("#area");


//функция старт игры

	function startGameV() {
		nazva.style.display = "none";
		startBlock.style.display = "none";
		gameBlock.style.display = "block";
		
	}


//функция клика по кнопке старт
	startButton.onclick = function() {

		// Звук нажатия на кнопку Старот
			createAudioShort(_1choosenSkin);
			startButton.style.pointerEvents = "none";

        let timerID = setTimeout(() => {
          	
          	startGame();
			startGameV();

         	clearTimeout(timerID);

        }, 3500);		
	}


////////////////////////////////// функция конец игры проигрыш ///////////////////////////
function endGameLoose() {
	console.log("FUNCTION: endGameLoose()");

	isGamerWin = false;

	// Деактивировать кнопку reload
	let reload = document.querySelector("#end");
		reload.style.pointerEvents = "none";

	// Звук

		// Suck
		createAudioShort(_322suck);

		let timerID = setTimeout(() => {

			// Фон	
				playerloop.pause();
				createAudioLoop(_321fon);

			// Активировать кнопку reload
				reload.style.pointerEvents = "";
				
				clearTimeout(timerID);

		}, 3500);

	//переменная блока конец игры
	gameBlock.innerHTML = "";
	let endBlock = document.querySelector("#end");
	endBlock.style.display = "block";

	
	//кнопка рестарт
	let restartButton = document.querySelector("#end button");
	restartButton.onclick = reloadGame;

	let youLoose = document.querySelector("#end h2");
	
}

///////////////////////////////// функция конец игры победа ///////////////////////////
function endGameWin() {
	console.log("FUNCTION: endGameWin()");
	
	isGamerWin = true;

	// Звук	Фон
		playerloop.pause();
		createAudioLoop(_31fon);

	//переменная блока конец игры
	gameBlock.innerHTML = "";
	let endBlockWin = document.querySelector("#end2");
		endBlockWin.style.display = "block";

	
	//кнопка рестарт
	let restartButton = document.querySelector("#end2 button");
		restartButton.onclick = reloadGame;

	let youWin = document.querySelector("#end2 h2");
}

