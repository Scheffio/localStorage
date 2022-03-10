let input = document.querySelector("input")
let start = document.querySelector(".start")
let click = document.querySelector(".click")
let cancel = document.querySelector(".cancel")
let table = document.querySelector("table")
let timeText = document.querySelector(".right p:nth-child(1)")
let username = document.querySelector(".right p:nth-child(2)")
let counter = 0


input.addEventListener('input', () => {
    if (input.value.length >= 1) {
        start.removeAttribute("disabled")
    } else {
        click.setAttribute("disabled", true)
    }
})

start.addEventListener("click", () => {
    let starttime = new Date.now()

    username.textContent = input.value
    click.removeAttribute('disabled')
    click.addEventListener("click", () => {
        counter++
        if (counter > 10) {

            start.setAttribute("disabled", true)
            click.setAttribute("disabled", true)
            let endtime = new Date.now()
        }
    })

})






window.onload = () => {
    start.setAttribute("disabled", true)
    click.setAttribute("disabled", true)
}