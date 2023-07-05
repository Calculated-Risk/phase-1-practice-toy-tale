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


 //////////////////////////////////// Global Variables////////////////////////////////////
    const toyCollection = document.getElementById("toy-collection")
    const toyFormContainer = document.querySelector(".container")
    const toyForm = document.querySelector(".add-toy-form")
 ////////////////////////////////////////////////////////////////////////////////////////   

function getAllToys(){
  return fetch ("http://localhost:3000/toys")
  .then ((response) => response.json())
  .then ((toys) => {
     toys.forEach(toy => addToysToDOM(toy))
  })
}
getAllToys()




/* h2 tag with the toy's name, Image tag with link, P tag for # of likes, button, & div
*/

  function addToysToDOM(toy){
  let h2Tag = document.createElement('h2')
  h2Tag.innerText = toy.name

  let imgTag = document.createElement('img')
  imgTag.setAttribute('src', toy.image)
  imgTag.className = "toy-avatar"

  let numberOfLikes = document.createElement('p')
  numberOfLikes.innerText = `${toy.likes}` + " likes"

  let likeButton = document.createElement("button")
  likeButton.setAttribute("id", toy.id)
  likeButton.className = 'like-btn'
  likeButton.innerText = 'Like ❤️'
  likeButton.addEventListener('click', (e) => increaseLike(e))

  let cardDivClass = document.createElement("div")
  cardDivClass.className = 'card'
  cardDivClass.append(h2Tag, imgTag, numberOfLikes, likeButton)
  toyCollection.append(cardDivClass)
}



/*When a user submits the toy form, two things should happen:

A POST request should be sent to http://localhost:3000/toys and the new toy added to Andy's Toy Collection.
If the post is successful, the toy should be added to the DOM without reloading the page. 
*/

toyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewToyFromForm();
  toyForm.reset()
})

function addNewToyFromForm(){
  const newSubmittedToy =  {
    "name": document.getElementById("toyName").value,
    "image": document.getElementById("toyImg").value,
    "likes": 0
  }
  
  fetch ("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
      },

      body: JSON.stringify(newSubmittedToy)
  })
    .then(resolution => resolution.json())
    .then(addedToy => addToysToDOM(addedToy))
}

function increaseLike(e){
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1
  
  fetch (`http://localhost:3000/toys/${e.target.id}`,{
      method: "PATCH",
      headers: {
       "Content-Type": "application/json",
       "Accept": "application/json"
      },
      body: JSON.stringify({
        'likes': more
      })
    })  
      .then(res => res.json())
      .then((objectLiked => {
        e.target.previousElementSibling.innerText = `${more} likes`;
      }))
}

