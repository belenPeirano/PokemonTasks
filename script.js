const inputTitle = document.getElementById("inputTitle");
const inputDescription = document.getElementById("inputDescription");
const btnSubmit = document.getElementById("btnSubmit");

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

//ToDo
function createTask() {
  let tasks = document.getElementById("tasks");
      let newTask = document.createElement("li");
      let titleElement = document.createElement("h2");
      let descriptionElement = document.createElement("p");


      titleElement.innerText = title;
      descriptionElement.innerText = description;

      newTask.appendChild(titleElement);
      newTask.appendChild(descriptionElement);
      newTask.setAttribute('id', id);
      tasks.appendChild(newTask);

      addListenerToDelete(newTask);
}

window.addEventListener("DOMContentLoaded", async (_event) => {
  getPosts(uriPokemon).then((response) => {
    response.results.forEach((pokemon) => {
      let pokemons = document.getElementById("pokemons");

      let option = document.createElement("option");
      option.value = pokemon.name;
      option.text = pokemon.name;
      pokemons.appendChild(option);
    })
  })

  await getPosts(uri).then((response) => {
    response.forEach((element) => {
      
      let id = element.id;
      let title = element.title;
      let description = element.description;
      newTask.classList.add("task");

      createTask();
    })
  }).catch((error) => {
    alert(error);
  })
})

btnSubmit.addEventListener("click", async () => {
  const title = inputTitle.value;
  const description = inputDescription.value;
  createPost(title, description);
  
  let pokemon = document.getElementById("pokemons").value;
  namePokemonElement.innerText = pokemon;

  createTask();
})