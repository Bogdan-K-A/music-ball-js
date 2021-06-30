
var audio, context, analyser, array, logo; // переенная аудио

logo = document.getElementById("logo").style;

audio = document.getElementById("audio"); // помогает контролировать элемент

// обработчик событий клика
window.onclick = function () {
    if(!context){
        preparation();
    }
    if(audio.paused){
        audio.play();
        loop();
    }else{
        audio.pause();
    }
}

//эта функция подготавливает необходимое к старту визуализации
function preparation() {
    context = new AudioContext(); //содержит методы контролировать и изменять звук.дорожку
    analyser = context.createAnalyser(); // даёт доступ к данным аудио файла (например к его чистотам или форме волны)
    src = context.createMediaElementSource(audio); /* создаём обьект из нашего элемента аудио который мы получили ранее(теперь над звуком можно производить разные изменения)*/
    src.connect(analyser); // подключает к нашему аудио анализатор
    analyser.connect(context.destination); // передаёт звук на колонки
    loop(); // функция которая обновляет анимацию
}

// описание спецюметодом зацыкливания для снижения нагрузки на браузер
function loop() {
    if(!audio.paused){
        window.requestAnimationFrame(loop);
    } /* по умолчанию вызывает указаню функцию в скобках 60кадров/1сек. (если браузеру тяжело обрабатывать информацию число обрабатываемых кадров в секунду автоматически снизится) */
    array = new Uint8Array(analyser.frequencyBinCount); /*значение в скобках стандартно =1024; МАССИВ. Этот тип массива оптимизирует все входящие данные в целые числа без знаков + и -, со значениями от 0 до 255.*/
    analyser.getByteFrequencyData(array); // копирует данные текущей частоты в массив.

    logo.minHeight = (array[40]) + "px";
    logo.width = (array[40]) + "px";
}
