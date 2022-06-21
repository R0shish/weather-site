function searchClick() {
    var location = document.getElementById("search").value;
    if (location == "") {
        alert("Please enter a location");
    } else {   
        alert('Searching for ' + location);
    }
}