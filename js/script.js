let input = document.querySelector("input")
let start = document.querySelector(".start")
let click = document.querySelector(".click")
let cancel = document.querySelector(".cancel")
let table = document.querySelector("table")
let timeText = document.querySelector(".right p:nth-child(1)")
let username = document.querySelector(".right p:nth-child(2)")

let counter = 0

let modal = document.querySelector(".modal")

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
    click.addEventListener("click", () => {
        counter++
        console.log(counter)
        if (counter > 10) {
            counter = 0
            start.setAttribute("disabled", true)
            click.setAttribute("disabled", true)
            showWin()
            addRecord(username.textContent, timefloor(date.getSeconds()), date.getMilliseconds())
        }
    })

})

function addRecord(name, seconds, milliseconds) {
    let mas = [{}]
    mas.forEach((elem, index) => {
        elem[index] = name
    })
    localStorage.setItem("records", JSON.stringify(mas))
    input.focus()
}

function showWin() {
    let wintime = document.querySelector('.content-modal > p')
    wintime.innerHTML = `Время игры ${timefloor(date.getSeconds())}.${(date.getMilliseconds())}`
    clearInterval(getTimer)
    modal.style.display = "flex"
    setTimeout(()=> {
        date = new Date(0,0,0,0,0,0,0,0)
        timeText.textContent = "00.00"
        username.textContent = "name"
        modal.style.display = "none"
    }, 2000)
}


let date = new Date(0,0,0,0,0,0,0,0)

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
}