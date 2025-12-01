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
    document.getElementById("gamerListContainer").innerHTML = ""
    gamersList.forEach(gamer => {        
        document.getElementById("gamerListContainer").innerHTML += `
            <div class="card p-4">
                <div>${gamer.firstName}</div>
                <div>${gamer.LastName}</div>
                <div>${gamer.Game}</div>
                <div>${gamer.Phone}</div>
                <div class="d-flex gap-3 w-100 p-2">
                    <div class="btn btn-outline-danger w-100" data-name="${gamer.id}">
                        Delete
                    </div>
                    <div class="btn btn-outline-success w-100" data-name="${gamer.id}">
                        Update
                    </div>
                </div>
            </div>
        `
    });
}

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-outline-danger")) {
        deletePlayer(event.target.getAttribute("data-name"));
    }else if (event.target.classList.contains("btn-outline-success")) {
        updatePlayer(event.target.getAttribute("data-name"))
    }
});

function deletePlayer(userId) {
    let gamersList = getItemsFromLocalStorage("gamers")

    let chosenPlayer = gamersList.findIndex(gamer => gamer.id == userId)

    gamersList.splice(chosenPlayer, 1)
    localStorage.setItem("gamers", JSON.stringify(gamersList))
}

function updatePlayer(userId) {
    let gamersList = getItemsFromLocalStorage("gamers")
    let chosenPlayer = gamersList.find(player => player.id == userId)
    let form = document.forms["submitNewGamer"]

    form.FirstName.value = chosenPlayer.firstName
    form.LastName.value = chosenPlayer.LastName
    form.Game.value = chosenPlayer.Game
    form.Phone.value = chosenPlayer.Phone
}