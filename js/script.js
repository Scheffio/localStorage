let input = document.querySelector("input")
let start = document.querySelector(".start")
let click = document.querySelector(".click")
let cancel = document.querySelector(".cancel")
let table = document.querySelector("table")
let timeText = document.querySelector(".right p:nth-child(1)")
let username = document.querySelector(".right p:nth-child(2)")

let modal = document.querySelector(".modal")

let counter = 0

let mas = []

function generateTable() {
    let arr = JSON.parse(localStorage.getItem("records"))
    console.log(arr);

    arr.forEach((elem) => {
        let tr = document.createElement("tr")
        Array.from(Object.values(elem)).forEach((item) => {
            let td = document.createElement("td")
            td.innerHTML = item
            tr.appendChild(td)
        })
        table.appendChild(tr)
    })
}

input.addEventListener('input', () => {
    if (input.value.length >= 1) {
        start.removeAttribute("disabled")
    } else {
        click.setAttribute("disabled", true)
    }
})

start.addEventListener("click", () => {
    timer()
    username.textContent = input.value
    input.value = ''
    click.removeAttribute('disabled')
})

click.addEventListener("click", () => {
    counter++
    console.log(counter);
    if (counter > 10) {
        counter = 0
        start.setAttribute("disabled", true)
        click.setAttribute("disabled", true)
        showWin()
        addRecord(username.textContent, timefloor(date.getSeconds()), date.getMilliseconds())
    }
})

function addRecord(name, seconds, milliseconds) {
    let obj = new Object();
    obj.name = name
    obj.seconds = seconds
    obj.milliseconds = milliseconds
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
        timeText.textContent = "00.00"
        username.textContent = "name"
        modal.style.display = "none"
    }, 2000)
}


let date = new Date(0, 0, 0, 0, 0, 0, 0, 0)

function timer() {
    getTimer = setInterval(() => {
        date.setSeconds(date.getSeconds())
        date.setMilliseconds(date.getMilliseconds() + 5)
        timeText.textContent = `${timefloor(date.getSeconds())}.${date.getMilliseconds()}`
    }, 1)
}

function timefloor(n) {
    return (n < 10) ? ('0' + n) : ('' + n)
}

window.onload = () => {
    start.setAttribute("disabled", true)
    click.setAttribute("disabled", true)
    generateTable()
}