clientArea = document.querySelector("#app");


/*Звуки*/
  
  //gameField = document.querySelector("#game");


      // Проигрывание фоновой музыки
      playerloop = document.createElement("audio");

      function createAudioLoop(src) {
          
          playerloop.className = "audio loop";
          playerloop.src = src;
         // gameField.append(playerloop); // если аппендить, возникает ошибка при работе с потоками.
          playerloop.load();
          playerloop.play();
          playerloop.loop = true;
          playerloop.muted = false;
          playerloop.style.display = "none";
          playerloop.innerText = "";
          playerloop.innerHTML = "";
      }

 
      // Проигрывание коротких звуков
        function createAudioShort(src) {
          let playerShort = document.createElement("audio");
          playerShort.className = "audio short";
          playerShort.src = src;
          playerShort.autoplay;
          // gameBlock.append(playerShort);
          playerShort.load();
          playerShort.play();
          playerShort.style.display = "none";
          playerShort.innerText = "";
          playerShort.innerText = "";
    }   


// Выбор игрока

    // Он:hover
    /*let heSkinChoose = document.querySelector("#skin1");
        heSkinChoose.style.pointerEvents = "none";*/



    // Она:hover








// Создать кнопку включения-отключения звука
  let muted = document.createElement("div");
      muted.className = "muted";
      muted.top = "50px";
      muted.style.cursor = "pointer";

      clientArea.append(muted);

      // Запустить первую музыку 1 раз
      isPlayed = false;

    // Обработчик клика по кнопке Mute
      mute = false;
  document.querySelector('.muted').onclick = () => {

    if(!isPlayed) {
      // Звук фона первого окна
      createAudioLoop(_1fon);
      isPlayed = true;
    }
      
      let audios = document.querySelectorAll(".audio");

      // если звук включен - выключить
      if(mute) {
        
        setObjectBackground(muted, "url(img/muted_off_clear.png)");
        mute = false;
        //playerloop.muted = false;   // TODO

        console.dir("audios: " + audios.length);
        audios.forEach(item => item.muted = false);   // TODO

      } else {  // если звук выключен - включить
        
        setObjectBackground(muted, "url(img/muted_on_clear.png)");
        mute = true;
        //playerloop.muted = true; // TODO
       
        console.dir("audios: " + audios.length);  // TODO
        audios.forEach(item => item.muted = true);
      }

  }

  document.addEventListener('audio.play', () => {
  console.log('play');
});


  