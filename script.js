const menuicon = document.querySelector("#menuicon")
const mobilemenu = document.querySelector("#mobile_menu")
const closemenu = document.querySelector("#closeMenu")

menuicon.addEventListener('click',() => {
    console.log('hello kunal');
    mobilemenu.classList.toggle("active")
})

closemenu.addEventListener('click',() => {
    mobilemenu.classList.remove('active')
})