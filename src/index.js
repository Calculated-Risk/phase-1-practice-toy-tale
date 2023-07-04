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


 // Global Variables
    const toyContainer = document.getElementById("toy-collection")
    const cardClassDiv = document.createElement("div")
    const H2TagName = document.createElement("h2")
    const imgElement = document.createElement("img")
    const toyLikesP = document.createElement("p")
    const toyButton = document.createElement("button")
    let toyArray = []
    

function fetchAllToys(){
  fetch ("http://localhost:3000/toys")
  .then ((response) => response.json())
  .then ((toyList) => {
    console.log(toyList) //console.logging to check List
    addToysToCardClass(toyList)
    toyArray = toyList
    console.log(toyArray) //console.logging to check array
  })
}
fetchAllToys()

function addToysToCardClass(listOfToys) {
  for (let toy of listOfToys){
    console.log(toy)
    toyContainer.appendChild(cardClassDiv)
    cardClassDiv.className = 'card'     
    H2TagName.innerText = toy.name    // H2 TagName
    cardClassDiv.append(H2TagName)
    imgElement.src = toy.image       // Toy Image Link (displays image)
    cardClassDiv.append(imgElement)
    toyLikesP.innerText = `${toy.likes} likes`
    cardClassDiv.append(toyLikesP)
    

  }
}