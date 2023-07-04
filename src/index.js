let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    console.log(addToy) // ADDING CONSOLE LOG
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

/* On the index.html page, there is a div with the id "toy-collection."

When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, 
make a <div class="card"> for each toy and add it to the toy-collection div.*/

function fetchAllToys(){
  fetch ("http://localhost:3000/toys")
  .then ((response) => response.json())
  .then ((toyList) => {
    console.log(toyList) //console.logging to check List
    addListToCardClass(toyList)})
}
fetchAllToys()

function addListToCardClass(listOfToys) {
  for (let toy of listOfToys){
    const toyContainer = document.getElementById("toy-collection")
    const cardClassDiv = document.createElement("div")
    cardClassDiv.className = 'card'

  }
}