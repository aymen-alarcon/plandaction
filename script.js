document.getElementById("submitBtn").addEventListener("click", (event)=>{
    event.preventDefault()
    let form = document.forms["submitNewGamer"]

    let dataList = getItemsFromLocalStorage("gamers")

    let gamer = {
        id : dataList.length,
        firstName : form.FirstName.value,
        LastName : form.LastName.value,
        Game : form.Game.value,
        Phone : form.Phone.value
    }
    
    addItemsToLocalStorage("gamers", gamer)
    let gamerList = getItemsFromLocalStorage("gamers")
    displayNewGamers(gamerList)
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
    let gamerList = getItemsFromLocalStorage("gamers")
    displayNewGamers(gamerList)
})

function displayNewGamers(arr) {
    document.querySelector(".card").innerHTML = ""
    arr.forEach(gamer => {        
        document.querySelector(".card").innerHTML += `
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
        displayNewGamers(gamerList)
    displayNewGamers(gamerList)
}

function updatePlayer(userId) {
    let gamersList = getItemsFromLocalStorage("gamers")
    let chosenPlayer = gamersList.find(player => player.id == userId)
    let form = document.forms["submitNewGamer"]

    form.FirstName.value = chosenPlayer.firstName
    form.LastName.value = chosenPlayer.LastName
    form.Game.value = chosenPlayer.Game
    form.Phone.value = chosenPlayer.Phone

    document.querySelector(".btn-outline-dark").addEventListener("click", ()=>{
        chosenPlayer.firstName = form.FirstName.value
        chosenPlayer.LastName = form.LastName.value
        chosenPlayer.Game = form.Game.value
        chosenPlayer.Phone = form.Phone.value

        for (let index = 0; index < gamersList.length; index++) {
            if (gamersList[index].id == userId) {
                gamersList[index] = chosenPlayer
            }
        }

        localStorage.setItem("gamers", JSON.stringify(gamersList))
    })
}

document.getElementById("selectSort").addEventListener("change", ()=>{
    let dataList = getItemsFromLocalStorage("gamers")
    let sortedArray = dataList.sort((a, b) => a.game.localeCompare(b.game))
    displayNewGamers(sortedArray)
})

document.getElementById("searchPanel").addEventListener("input", ()=>{
    let dataList = getItemsFromLocalStorage("gamers")
    let chosenPlayers = dataList.filter(contact => contact.firstName.includes(document.getElementById("searchPanel").value))
    displayNewGamers(chosenPlayers)
})