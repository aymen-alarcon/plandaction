function CreateGamer() {
    document.forms["submitNewGamer"]
}


function getItemsFromLocalStorage(key) {
    localStorage.getItem(key)
}

function addItemsFromLocalStorage(key, list) {
    localStorage.setItem(key, list)
}