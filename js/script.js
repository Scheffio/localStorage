let input = document.querySelector("input")
let start = document.querySelector(".start")
let click = document.querySelector(".click")
let cancel = document.querySelector(".cancel")
let table = document.querySelector("table")
let timeText = document.querySelector(".right p:nth-child(1)")
let username = document.querySelector(".right p:nth-child(2)")
let nametosave = ''

let modal = document.querySelector(".modal")

let counter = 0

let mas = []

cancel.addEventListener("click", () => {
    table.innerHTML = ' '
    let titles = document.createElement("tr")
    let nametd = document.createElement("td")
    let timetd = document.createElement("td")

    nametd.innerHTML = "Имя"
    timetd.innerHTML = "Время"

    table.appendChild(titles)
    titles.appendChild(nametd)
    titles.appendChild(timetd)

    localStorage.clear()
})

function recordsSort(arr) {
    arr.sort(({ time: a }, { time: b }) => a - b)
    return arr
}

function generateTable() {
    let arr = recordsSort(JSON.parse(localStorage.getItem("records")))

    table.innerHTML = ' '
    let titles = document.createElement("tr")
    let nametd = document.createElement("td")
    let timetd = document.createElement("td")

    nametd.innerHTML = "Имя"
    timetd.innerHTML = "Время"

    table.appendChild(titles)
    titles.appendChild(nametd)
    titles.appendChild(timetd)

    arr.forEach((elem) => {
        let tr = document.createElement("tr")
        Array.from(Object.values(elem)).forEach((item,index) => {
            let td = document.createElement("td")
            td.innerHTML = item
            tr.appendChild(td)

            if(index == 1) {
                
            }
        })
        table.appendChild(tr)
    })
}

input.addEventListener('input', () => {
    if (input.value.length >= 1) {
        start.removeAttribute("disabled")
        start.classList.remove("disabled")
    } else {
        start.setAttribute("disabled", true)
        start.classList.add("disabled")
    }
})

start.addEventListener("click", () => {
    timer()
    username.textContent = `Имя: ${input.value}`
    nametosave = input.value
    input.value = ''
    click.removeAttribute('disabled')
    start.classList.remove("disabled")
    start.addAttribute('disabled', true)
    start.classList.add("disabled")
})

click.addEventListener("click", () => {
    counter++
    if (counter > 9) {
        counter = 0
        start.setAttribute("disabled", true)
        click.setAttribute("disabled", true)
        start.classList.add("disabled")
        click.classList.add("disabled")
        showWin()
        addRecord(nametosave, timefloor(date.getSeconds()) + date.getMilliseconds())
        generateTable()
    }
})

function addRecord(name, time) {
    let obj = new Object();
    obj.name = name
    obj.time = time
    mas.push(obj)


    localStorage.setItem("records", JSON.stringify(mas))
    input.focus()
}

function showWin() {
    let wintime = document.querySelector('.content-modal > p')
    wintime.innerHTML = `Время игры ${timefloor(date.getSeconds())}.${(date.getMilliseconds())}`
    clearInterval(getTimer)
    modal.style.display = "flex"
    setTimeout(() => {
        date = new Date(0, 0, 0, 0, 0, 0, 0, 0)
        timeText.textContent = "Время: 00.00"
        username.textContent = "Имя: имя"
        modal.style.display = "none"
    }, 2000)
}


let date = new Date(0, 0, 0, 0, 0, 0, 0, 0)

function timer() {
    getTimer = setInterval(() => {
        date.setSeconds(date.getSeconds())
        date.setMilliseconds(date.getMilliseconds() + 5)
        timeText.textContent = `Время: ${timefloor(date.getSeconds())}.${date.getMilliseconds()}`
    }, 1)
}

function timefloor(n) {
    return (n < 10) ? ('0' + n) : ('' + n)
}

window.onload = () => {
    start.setAttribute("disabled", true)
    start.classList.add("disabled")
    click.setAttribute("disabled", true)
    click.classList.add("disabled")
    generateTable()
}
