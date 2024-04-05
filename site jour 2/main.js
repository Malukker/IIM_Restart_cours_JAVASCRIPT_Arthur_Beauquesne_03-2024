let button = document.getElementById("button")
let main = document.getElementById("big_section")

button.addEventListener("click", function() {
    this.classList.toggle("button_light")
    main.classList.toggle("light")
})

