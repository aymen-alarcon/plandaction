let count = 0;

document.getElementById("submitBtn").addEventListener("click", (event)=>{
    event.preventDefault()
    count++
    let form = document.forms["submitNewGamer"]
    
    let gamer = {
        id : count,
        firstName : form.FirstName.value,
        LastName : form.LastName.value,
        Game : form.Game.value,
        Phone : form.Phone.value
    }
    
    addItemsToLocalStorage("gamers", gamer)
    displayNewGamers()
    form.reset()
    form.FirstName.focus()
})

function getItemsFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || []
}

function addItemsToLocalStorage(key, list) {
    let dataList = getItemsFromLocalStorage("gamers")
    dataList.push(list)
    localStorage.setItem(key, JSON.stringify(dataList))
}

document.addEventListener("DOMContentLoaded", ()=>{
    displayNewGamers()
})

function displayNewGamers() {
    let gamersList = getItemsFromLocalStorage("gamers")
    
    gamersList.forEach(gamer => {        
        document.getElementById("gamerListContainer").innerHTML += `
            <div class="card">
                <div>${gamer.firstName}</div>
                <div>${gamer.LastName}</div>
                <div>${gamer.Game}</div>
                <div>${gamer.Phone}</div>
                <div class="btn btn-outline-danger" data-name="${gamer.id}">
                    Delete
                </div>
            </div>
        `
    });
}

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-outline-danger")) {
        deletePlayer(event.target.getAttribute("data-name"));
    }
});

function deletePlayer(userId) {
    let gamerId = userId - 1
    let gamersList = getItemsFromLocalStorage("gamers")
    gamersList.splice(gamerId, 1)
    addItemsToLocalStorage("gamers", gamersList)
}