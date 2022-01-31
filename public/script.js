// Псевдозагрузка
function loaderF() {
    setTimeout(() => {
        const container = document.querySelector('.orange-back')
        const loader = document.querySelector('.loader')

        // Убираем loader и показываем контент
        container.classList.toggle('hide', false)
        loader.classList.toggle('hide', true)

    }, 500)
}

// Получаем указанную дату и считаем, сколько осталось времени до нее
function dateNow (date) {
    
    let dayTest = new Date()
    let ms = date-dayTest
    let allS = (ms/1000).toFixed()
    let s = Math.round(allS%60)
    let m = Math.floor((allS/60)%60)
    let h =  Math.floor((allS/60/60)%24)
    let d =  Math.floor((allS/60/60/24))

    // Выбираем необходимые блоки для добавления контента
    const ymdDiv = document.querySelector('.ymd')
    const hourDiv = document.querySelector('.hour')
    const minuteDiv = document.querySelector('.minute')
    const secondDiv = document.querySelector('.second')

    // Добавляем контент
    ymdDiv.innerHTML =`Days: ${d}`
    hourDiv.innerHTML = `${h.toString().length === 1 ? '' + '0' + h : h}:${m.toString().length === 1 ? '' + '0' + m : m}:${s.toString().length === 1 ? '' + '0' + s : s}`

}

// Получаем данные из инпутов
function chosenDate () {

    const yearInput = parseInt(document.querySelector('#input-year').value, 10)
    const monthInput = parseInt(document.querySelector('#input-month').value, 10)
    const dayInput = parseInt(document.querySelector('#input-day').value, 10)
    const hourInput = parseInt(document.querySelector('#input-hour').value, 10)
    const minuteInput = parseInt(document.querySelector('#input-minute').value, 10)
    const secondInput = parseInt(document.querySelector('#input-second').value, 10)
    const chosenDate = document.querySelector('.chosen-date')
    const title = document.querySelector('.title')
    const confirm = document.querySelector('.confirm')
    const reset = document.querySelector('.reset')

    // Проверяем будущая дата указана или прошедшая
    if (new Date(yearInput, monthInput-1, dayInput, hourInput, minuteInput, secondInput) - new Date() <= 0) {
        return title.innerHTML = 'Chose future date'
    } else {
        title.innerHTML = 'Timer to date:'
    }

    // Меняем кнопку
    confirm.classList.toggle('hide', true)
    reset.classList.toggle('hide', false)

    // Добавляем введенную дату в title, чтобы видеть, что мы выбрали
    chosenDate.innerHTML = 
    `${dayInput}/${monthInput}/${yearInput} 
    ${hourInput.toString().length === 1 ? '' + '0' + hourInput : hourInput}:
    ${minuteInput.toString().length === 1 ? '' + '0' + minuteInput : minuteInput}:
    ${secondInput.toString().length === 1 ? '' + '0' + secondInput : secondInput}`


    // Первая секунда
    dateNow(new Date(yearInput, monthInput-1, dayInput, hourInput, minuteInput, secondInput))

    // Все остальные секунды
    setInterval(() => { 
        dateNow(new Date(yearInput, monthInput-1, dayInput, hourInput, minuteInput, secondInput))
    }, 1000)
}
