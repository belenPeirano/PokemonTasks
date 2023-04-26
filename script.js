const input = document.getElementById("input");
const inputDescription = document.getElementById("inputDescription");
const btnSubmit = document.getElementById("btnSubmit");

let namePokemon = "";

const uri = 'https://my-json-server.typicode.com/Joelit0/UT2-TA2/tasks';
const uriPokemon = 'https://pokeapi.co/api/v2/pokemon';

async function getPosts(uri) {
  const response = await fetch(uri);
  const jsonData = await response.json();

  return jsonData;
}

async function createPost(title, description) {
  const data = { "title": title, "description": description, "completed": false }

  const response = await fetch(uri, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  const jsonData = await response.json();

  return jsonData;
}

async function deletePost(id) {
  const response = await fetch(uri + `/${id}`, {
    method: 'DELETE'
  });

  const jsonData = await response.json();

  return jsonData;
}

function addListenerToDelete(element) {
  element.addEventListener("click", () => {
    const id = element.id;
    deletePost(id);
    let parent = element.parentNode;
    parent.removeChild(element);
  })
}

window.addEventListener("DOMContentLoaded", async (_event) => {
  getPosts(uriPokemon).then((response) => {
    response.results.forEach((pokemon) => {
      let pokemons = document.getElementById("pokemons");

      let option = document.createElement("option");
      option.value = pokemon.name;
      option.text = pokemon.name;
      pokemons.appendChild(option);

      namePokemon = option.value;
    })
  })
  
  await getPosts(uri).then((response) => {
    response.forEach((element) => {
      let tasks = document.getElementById("tasks");
      let id = element.id;
      let title = element.title;
      let description = element.description;
      let newTask = document.createElement("div");

      newTask.classList.add("task");
      
      let titleElement = document.createElement("h2");
      let descriptionElement = document.createElement("p");


      titleElement.innerText = title;
      descriptionElement.innerText = description;

      newTask.appendChild(titleElement);
      newTask.appendChild(descriptionElement);
      newTask.setAttribute('id', id);
      tasks.appendChild(newTask);

      addListenerToDelete(newTask);
    })
  }).catch((error) => {
    alert(error);
  })
})

btnSubmit.addEventListener("click", async () => {
  const title = input.value;
  const description = inputDescription.value;
  createPost(title, description);
  let tasks = document.getElementById("tasks");

  let newTask = document.createElement("div");
  let titleElement = document.createElement("h2");
  let descriptionElement = document.createElement("p");
  let namePokemonElement = document.createElement("p");
  let pokemon = document.getElementById("pokemons").options[0].text;

  titleElement.innerText = title;
  descriptionElement.innerText = description;
  namePokemonElement.innerText = pokemon;

  newTask.appendChild(titleElement);
  newTask.appendChild(descriptionElement);
  newTask.appendChild(namePokemonElement);
  tasks.appendChild(newTask);

  addListenerToDelete(newTask);
})