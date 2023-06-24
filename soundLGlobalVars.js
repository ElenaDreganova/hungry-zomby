// 1. Выбор персонажа 
    
    //-+ Фон при выборе персонажа
      _1fon = "audio/1.fon.mp3";
    // Наведение на скин
      _1hoverSkin = "audio/1.hoverSkin.mp3";
    // Нажата кнопка выбора скина (задержка)
      _1choosenSkin = "audio/1.choosenSkin.mp3";


// 2. Игра
  
  //+ Фон игры startGame() 
    _2fon = "audio/2.fon.mp3";
    _2fon_2 = "audio/2.fon_2.mp3";
  //+ Раунд 1    startGame()
    _2round1 = "audio/2.round1.mp3";
  //+ Раунд 2    isFoodGrabed() 
    _2round2 = "audio/2.round2.mp3";
  //+ Раунд 3    isFoodGrabed() 
    _2round3 = "audio/2.round3.mp3";
  //+ Раунд 4    isFoodGrabed() 
    _2round4 = "audio/2.round4.mp3";
  //+ Съедена еда   isFoodGrabed()
    _2toasty = "audio/2.toasty.mp3";
  //+ Взрыв зомби  isFoodGrabed()
    _2zdieBoom = "audio/2.zdieBoom.mp3";
  //+ Рычит isEndGameConditions() -> enemyEatedGamer()
    _2ryk = "audio/2.rychit.mp3";
  //+ Прикончи ее mooveEnemy(enemy)
    _2finish_her = "audio/2.finish_her.mp3";
  //+ Прикончи его mooveEnemy(enemy)
    _2finish_him = "audio/2.finish_him.mp3";
    _2finish_him_2 = "audio/2.finish_him_2.mp3";


// 3.1 Окно выигрыша
  
  //+ Фон endGameWin() 
    _31fon = "audio/3.1.fon.mp3";
  //+ Похвала endGameWin() 
    _31wellDone = "audio/3.1.wellDone.mp3";
  //+ Выбери судьбу reloadGame() 
    _31chooseDestiny = "audio/3.1.chooseYourDestiny.mp3";


// 3.2 Окно проигрыша
  
  //+ Фон endGameLoose()   
    _321fon = "audio/3.2.1.fon.mp3";
    _321fon_2 = "audio/3.2.1.fon_2.mp3";
  //+ suck endGameLoose()  
    _322suck = "audio/3.2.2.suck.mp3";
  //+ Ха-ха после рестарта проигрыша reloadGame() -> enemyCreateReloadBg()
    _323haha = "audio/3.2.3.haha.mp3"; 