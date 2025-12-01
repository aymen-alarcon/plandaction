let gamersList = []

document.getElementById("submitBtn").addEventListener("click", (event)=>{
    event.preventDefault()
    let form = document.forms["submitNewGamer"]
    
    let gamer = {
        firstName : form.FirstName.value,
        LastName : form.LastName.value,
        Game : form.Game.value,
        Phone : form.Phone.value
    }
    
    gamersList.push(gamer)
    addItemsFromLocalStorage("Gamers", gamersList)
})

function getItemsFromLocalStorage(key) {
    localStorage.getItem(JSON.parse(key))
}

function addItemsFromLocalStorage(key, list) {
    localStorage.setItem(key, JSON.stringify(list))
}