let input = document.getElementById("inputt");
let reset = document.getElementById("rst");
let txt = document.getElementById("text");
let tasks = {};
let serverData = [];

async function fetchdata() {
  try {
    let res = await fetch('https://jsonplaceholder.typicode.com/users/1/todos');
    let data = await res.json();
    serverData = [...data];
    serverData.forEach((element)=>{
      const key=element.id;
      localStorage.setItem(key, JSON.stringify({text:element.title,isMarked:element.completed}));
    })
    preProcess();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
fetchdata();

function preProcess() {
  serverData.forEach((element) => {
    addTask(element.id, { text: element.title, isMarked: element.completed });
  });
}

// Function to read data from Local Storage
function readFromDb() {
  txt.innerHTML = ""; 
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      const taskData = JSON.parse(localStorage.getItem(key));
      addTask(key, taskData);
      tasks[key] = taskData; // Add the task to the tasks object.
    }
  }
}

// Function to save tasks to Local Storage
function saveTasks() {
  for (let key in tasks) {
    localStorage.setItem(key, JSON.stringify(tasks[key]));
  }
}

// Function to generate a unique key for tasks
function generateUniqueKey() {
  let key;
  do {
    key = Math.floor(Math.random() * 1000) + 1;
  } while (tasks.hasOwnProperty(key)); // Ensure the key is unique.
  return key.toString();
}

// Function to add a task
function addTask(taskKey, taskData) {
  let newTask = document.createElement("ul");

  var removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove-button");

  var markButton = document.createElement("button");
  markButton.textContent = "Mark";
  markButton.classList.add("mark-button");

  var editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-button");

  const taskContent = document.createElement("li");
  taskContent.textContent = taskData.text;

  if (taskData.isMarked) {
    newTask.classList.add("marked");
    editButton.remove();
    removeButton.remove();
  }

  newTask.appendChild(taskContent);
  newTask.appendChild(markButton);
  newTask.appendChild(editButton);
  newTask.appendChild(removeButton);
  txt.appendChild(newTask);

  removeButton.addEventListener("click", () => {
    newTask.remove();
    delete tasks[taskKey];
    localStorage.clear();
    saveTasks();
  });

  markButton.addEventListener("click", () => {
    newTask.classList.add("marked");
    editButton.remove();
    removeButton.remove();
    taskData.isMarked = true;
    saveTasks();
  });

  editButton.addEventListener("click", () => {
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = taskData.text;

    newTask.replaceChild(inputField, taskContent);

    inputField.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const updatedTask = inputField.value;
        if (updatedTask.trim() !== "") {
          taskContent.textContent = updatedTask;
          taskData.text = updatedTask;
          saveTasks();
          newTask.replaceChild(taskContent, inputField);
        }
      }
    });
  });
}

// Load tasks from local storage and render
readFromDb();

// Event listener to add a new task
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && input.value.trim() !== "") {
    const taskKey = generateUniqueKey();
    const newTask = {
      text: input.value,
      isMarked: false,
      
    };
    tasks[taskKey] = newTask;
    saveTasks();
    addTask(taskKey, newTask);
    input.value = "";
  }
});

// Event listener to reset tasks
reset.addEventListener("click", () => {
  txt.innerHTML ="";
  tasks = {};
  localStorage.clear(); // Clear all data in local storage.
});

