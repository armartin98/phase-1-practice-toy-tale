let addToy = false;
const toyCollection = document.querySelector('#toy-collection')
const form = document.querySelector('.add-toy-form')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(data => data.forEach(toy => {
      const card = document.createElement('div')
      card.className = 'card'
      toyCollection.appendChild(card)
      const name = document.createElement('h3')
      name.innerText = toy.name
      card.appendChild(name)
      const image = document.createElement('img')
      image.src = toy.image
      image.className = 'toy-avatar'
      card.appendChild(image)
      const likes = document.createElement('p')
      likes.innerText = `${toy.likes} Likes`
      card.appendChild(likes)
      const button = document.createElement('button')
      button.className = 'like-btn'
      button.id = toy.id
      button.innerText = `Like ❤︎`
      card.appendChild(button)
      button.addEventListener('click', () => {
        toy.likes += 1
        likes.innerText = `${toy.likes} Likes`

        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            likes: toy.likes
          })
        })
        .then(resp => resp.json())
        .then(toy => toy)
      })
    }))

  form.addEventListener('submit', (e) => {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0
      })
    })
    .then(resp => resp.json())
    .then(data => data)
  })
});
