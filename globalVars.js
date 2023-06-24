/*При игре*/
gameField = document.querySelector(".game");
gameField = document.querySelector("#game");
isGame = false;
endGanmeTimeout = 4000; // задержка игры до появления окон конца игры

// Видимая часть экрана
clientArea = document.querySelector(".app");
clientArea = document.querySelector("#app");

/*Игрок*/
gamer = document.querySelector(".player");
gamerSpeed = 50; // скорость игрока, 
gamerSpeedStep = 10; // Шаг увеличения скорости
gamerSpeedLimit = 70; // Лимит, до которого можно увеличивать скорость игрока

gamerFreeSpaceCount = 3; // интервалы безопасного расстояния до игрока, шт
gamerFreeSpaceInterval = 20; // ширина безопасного интервала, px

gamerSkinCount = 4; // Номер (в папке) скина игнока
gamerImg = "url(img/gamer/" + gamerSkinCount + ".png)  no-repeat"; // playerMooveOnkeydown(event) - left
gamerSkinCountMirror = gamerSkinCount + 10; // смотрит вправо
gamerImgMirror = "url(img/gamer/" + gamerSkinCountMirror + ".png)  no-repeat"; // playerMooveOnkeydown(event) - right

isGamerAlive = true; // Игрок жив, пока его не догнал зомби. Исп: mooveEnemy(), endGameConditions()
isGamerWin = true; // Выиграл ли игрок. Задается в endGameWin(), endGameLoose(). Проверка в reloadGame()

gamerLives = 3; // Жизни игрока. isEndGameConditions(), isFoodGrabed(). Отображается 3 и меньше. Если больше 3 - добавляюся, но не отображаются
gamerLives_out = document.querySelector(".gamerLives");
isGamerEatedFood = false; // съел ли игрок еду. isFoodGrabed(), showFood()


/*Еда*/
food = document.createElement("div");
foodTimeout = 4000; 	// через какое время еда исчезнет, ms
foodNextFoodTimeout = 5000; // периодичность появления новой еды

foodImg = "url(img/pn.png)  no-repeat";

foodSkinCount = 10; // Количество скинов в папке = исп. createFood(). Имя скинов еды в папке от 1 до foodSkinCount. Задает правую границу при выборе случайного скина еды.
	//foodImg = "url(img/food/" + foodSkinCount + ".png)  no-repeat"; // Для примера. исп в createFood
foodClass = "good food";

foodEatedLimit = 3; // количество еды, которое нужно съесть, чтобы убить зомби
foodEatedCount = 0; // счетчик еды, которую съели нужно съесть, чтобы убить врага. 
foodEatedCount_out = document.querySelector(".score"); // += исп. isFoodGrabed()


/*Враг*/
enemy = document.querySelector("enemy type-1");
enemySpeedPX = 5; 	// скорость врагов, px
enemySpeedStep = 1; // шаг увеличения скороси врагов > 0
enemySpeedMS = 100; // скорость врагов, ms

enemyKilledCount = 0; // количество убитых едой зомби (после foodEatedCount еды)
countLifesOfEnemy = foodEatedLimit; // Количество жизней врага = количесву еды, которое нужно съесть. Это счетчик для энергии врага
enemyKilledCount_out = document.querySelector(".zomiCounter");
enemiesCount = 3; // количество врагов за одну игру

enemiesArr = [];

// Количество скинов в папке = порядковый номер скина врага в папке. 
// Не изменяется. Исп, чтобы понимать, какой скин создался.
enemySkinCount = 5; 
enemyImgCount = enemySkinCount; // в createEnemy() задает случайое число, определяющее скин в процессе игры
enemyImg = "url(img/enemy/" + enemyImgCount + ".png)  no-repeat"; // для примера, в createEnemy()
enemyClass = "enemy type-1";
enemySkinCountMirror = enemyImgCount + 10; // Зеркальное отображение скина врага. Смотрит влево
enemyImgMirror = "url(img/enemy/" + enemySkinCountMirror + ".png)  no-repeat";





