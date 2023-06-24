

    // Возвращает случайное число включительно min max
    function minMaxIncluded(min, max) {

        return Math.floor(Math.random() * (max - min + 1) + min);
    }

   
    /* Задать объекту пользовательское свойство object.dataset.name

        object - объект, которому задается пользовательский аттрибут
        name - имя аттрибута. Задается без кавычек. 
                Имя аттрибута будет: data-name
                Префикс data- добавляется автоматически JS
        value - значение аттрибута*/
    function setObjectDataAttribute(object, name, value) {
        object.dataset.name = value;
    }

    // Задает пользовательское свойство element.dataset.timerid
    // Имя аттрибута будет: data-name
    function setDataTimerID(element, timerID) {
        element.dataset.timerid = timerID;
        //return element;
    }

    // удаляет элемент и останавливает таймер, если он есть
    // [таймер элементу задается по setDataTimerID()]
    function removeElement(element) {
        //console.log("FUNCTION: removeElement")

         if(element == null) {
            console.dir("Null element was transferred");
            return;
        }

        if(element.hasAttribute("class")) {

            //console.dir("removeElement className: " + element.className);
         }


        // если у элемента есть таймер, остановить таймер
        if(element.hasAttribute("data-timerid")) {

            //console.dir("removeElement DataID: " + element.dataset.timerid);

            let timerID = parseInt(element.dataset.timerid);
            //console.dir("removeElement.parseInt.timerid: " + timerID);
            clearInterval(timerID);
            clearTimeout(timerID);
        }
        // удалить элемент
        element.remove();
    }

     // Возвращает true, если элемент element находится а зоне элемента target
    // Делает проверку на null этих элементов
    function isElementIntoTarget(element, target) {
       
        if ( element != null && target != null
            && element.offsetTop + element.clientHeight > target.offsetTop
            && element.offsetTop < target.offsetTop + target.clientHeight  
            && element.offsetLeft + element.clientWidth > target.offsetLeft 
            && element.offsetLeft < target.offsetLeft + target.clientWidth) {

            console.dir("ISELEMENTINTOTARGET FUNCTION RETURN: TRUE");
            
            return true;
        }

       // console.dir("ISELEMENTINTOTARGET FUNCTION RETURN: FALSE");
    }

     function isElementIntoTarget_(element, target) {
       
        if ( element != null && target != null
            && element.offsetTop > target.offsetTop 
            && element.offsetTop < target.offsetTop + target.clientHeight
            && element.offsetLeft > target.offsetLeft 
            && element.offsetLeft < target.offsetLeft + target.clientWidth) {

            console.dir("ISELEMENTINTOTARGET_ FUNCTION RETURN: TRUE");
            
            return true;
        }

        console.dir("ISELEMENTINTOTARGET_ FUNCTION RETURN: FALSE");
    }

//TODO
/* Возвращает true, если объект находится в области, огрниченной процентами от краёв переданной 
    object - проверяемый объект
    clientArea - область, в которой нужно проверить этот объект
    percentHeight - проценты сверху и снизу (20% = 20% от верха, 20% от низа clientArea)
    percentWidth - проценты слева и справа (30% = 30% слева, 30% справа clientArea)

    Задается область внутри области clientArea, в которой проверяется вхождение объекта
        Пример: clientArea = 1000 х 800;
        Вернет true, если объект находится в области, которая:
            - на 20% ниже верха clientArea
            - на 20% выше низа clientArea
            - на 30% правее левого края clientArea
            - на 30% левее левого края clientArea
        */ 
        function isObjectInAreaFrom(object, clientArea, percentWidth, percentHeight) {
            
            let clientAreaHeight_ = clientArea.clientHeight;
            let clientAreaWidth_ = clientArea.clientWidth;

            let percentHeight_ = parseInt(percentHeight);
            let percentWidth_ = parseInt(percentWidth);

            // 20% высоты клиентской области
            let clientAreaTop_20per = clientAreaHeight_ - clientAreaHeight_ / 100 * (100 - percentHeight_);
            // 80% высоты клиентской области
            let clientAreaTop_80per = clientAreaHeight_ - clientAreaHeight_ / 100 * percentHeight_;
            
            // 20% ширины клиентской области
            let clientAreaLeft_20per = clientAreaWidth_ - clientAreaWidth_ / 100 * (100 - percentWidth_);
            // 80% ширины клиентской области
            let clientAreaLeft_80per = clientAreaWidth_ - clientAreaWidth_ / 100 * percentWidth_;
            
            if ((object.offsetTop > clientAreaTop_20per
                || object.offsetTop < clientAreaTop_80per)
                && (object.offsetLeft > clientAreaLeft_20per
                || object.offsetLeft < clientAreaLeft_80per)) {

                return true;
            }

            return false;
        }


    // Выводит значения элемента: 
    // offsetLeft, clientLeft, offsetTop, clientTop, offsetWidth, clientWidth, offsetHeight, clientHeight
    function showElementDimensions(element) {

        if(element == null) {
            console.dir("Null element was transferred");
            return;
        }

        console.dir("---showElementDimensions()---");
        console.dir(element);
        console.log(element);

        console.dir("offsetLeft = " + element.offsetLeft);
        console.dir("clientLeft = " + element.clientLeft);

        console.dir("offsetTop = " + element.offsetTop);
        console.dir("clientTop = " + element.clientTop);

        console.dir("offsetWidth = " + element.offsetWidth);
        console.dir("clientWidth = " + element.clientWidth);

        console.dir("offsetHeight = " + element.offsetHeight);
        console.dir("clientHeight = " + element.clientHeight);

        console.dir("---End of showElementDimensions()---");
        console.dir("");
    }

    // Выводит квадрат в координатах client and offset (правый нижний угол)
    // Отличие client от offset
    function squareClientOffset() {
        
        let someDiv = document.createElement("div");
            someDiv.style = "border: 5px solid red";
            someDiv.style.width = "50px"; 
            someDiv.style.height = "50px"; 
            someDiv.style.position = "absolute"; 

        let dim = 60;

            someDiv.style.left = clientArea.offsetWidth - dim + "px";
            someDiv.style.top = clientArea.offsetHeight - dim + "px";

            /*someDiv.style.left = clientArea.clientWidth - dim + "px";
            someDiv.style.top = clientArea.clientHeight - dim + "px";*/

            gameBlock.append(someDiv);
    }



    // Возвращает true, если элемент object находится внутри объекта area
    // Делает проверку на null этих элементов
    function isObjectIntoArea(object, area) {
        /*obj*/
        let o_x0 = object.offsetLeft; // up-ll
        let o_y0 = object.offsetTop;

        let o_xr = object.offsetLeft + object.clientWidth; // up-rr
        let o_yr = object.offsetTop + object.clientWidth;

        /*area*/


       
        if ( element != null && target != null
            && object.offsetTop > area.offsetTop // up-ll
            && object.offsetLeft > area.offsetLeft

            && object.offsetTop + object.clientHeight < area.offsetTop + area.clientHeight // down-ll
            && object.offsetLeft + object.clientHeight > area.offsetLeft + area.clientHeight

            && object.offsetTop + object.clientWidth > area.offsetTop + area.offsetWidth 
            && object.offsetLeft + object.clientWidth < area.offsetLeft + area.offsetWidth // up-rr


            && object.offsetTop + object.offsetWidth < area.offsetTop + area.clientWidth // up-rr
            && object.offsetTop + object.offsetWidth < area.offsetTop + area.offsetWidth + area.clientHeight // down-rr
            && element.offsetLeft >= target.offsetLeft 
            && element.offsetLeft <= target.offsetLeft + target.clientWidth) {

            console.dir("ISELEMENTINTOTARGET FUNCTION RETURN: TRUE");
            
            return true;
        }

        //console.dir("ISELEMENTINTOTARGET FUNCTION RETURN: FALSE");
    }

    // Возвращает true, если object касается другой объект
    function isObjectBampOther(object, other) {
         // object сверху area

            // object снизу area

            // object слева от area

            // object справа area
    }


