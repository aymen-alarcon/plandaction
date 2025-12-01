document.getElementById("submitBtn").addEventListener("click", (event)=>{
    event.preventDefault()
    let form = document.forms["submitNewGamer"]
    
    let gamer = {
        firstName : form.FirstName.value,
        LastName : form.LastName.value,
        Game : form.Game.value,
        Phone : form.Phone.value
    }
    
    addItemsFromLocalStorage("gamers", gamer)
    form.reset()
    form.FirstName.focus()
})

function getItemsFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || []
}

function addItemsFromLocalStorage(key, list) {
    let dataList = getItemsFromLocalStorage("gamers")
    dataList.push(list)
    localStorage.setItem(key, JSON.stringify(dataList))
}

function displayNewGamers(params) {
    
}