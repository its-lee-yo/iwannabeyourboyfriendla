function unterschreiben() {
    let name = prompt("Gib deinen Namen ein:");
    if (name && name.trim() !== "") {
        document.getElementById("unterschrift").innerHTML = name + " hat den Ehrenkodex unterschrieben! Danke!";
    } else if (name !== null) {
        alert("Bitte gib deinen Namen ein.");
    }
}
