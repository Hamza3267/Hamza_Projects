let input = document.getElementById("inputt");
let rest = document.getElementById("rst");
let txt = document.getElementById("text");

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to save tasks in local storage
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Function to add a task
const addTask = (taskText, isMarked) => {
  let newVar = document.createElement("ul");

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
  taskContent.textContent = taskText;

  if (isMarked) {
    newVar.classList.add("marked");
    editButton.remove();
    removeButton.remove();
  }

  newVar.appendChild(taskContent);
  newVar.appendChild(markButton);
  newVar.appendChild(editButton);
  newVar.appendChild(removeButton);
  txt.appendChild(newVar);

  removeButton.addEventListener("click", () => {
    newVar.remove();
    const index = tasks.findIndex((item) => item.text === taskText);
    if (index !== -1) {
      tasks.splice(index, 1);
      saveTasks();
    }
  });

  markButton.addEventListener("click", () => {
    newVar.classList.add("marked");
    editButton.remove();
    removeButton.remove();
    // Update the marked status in the tasks array
    const index = tasks.findIndex((item) => item.text === taskText);
    if (index !== -1) {
      tasks[index].isMarked = true;
      saveTasks();
    }
  });

  editButton.addEventListener("click", () => {
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = taskText;

    newVar.replaceChild(inputField, taskContent);

    inputField.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const updatedTask = inputField.value;
        if (updatedTask.trim() !== "") {
          taskContent.textContent = updatedTask;
          // Update the task in the tasks array
          const index = tasks.findIndex((item) => item.text === taskText);
          if (index !== -1) {
            tasks[index].text = updatedTask;
            saveTasks();
          }

          newVar.replaceChild(taskContent, inputField);
        }
      }
    });
  });
};

// Load tasks from local storage and render
tasks.forEach((task) => {
  addTask(task.text, task.isMarked);
});

// Event listener to add a new task
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && input.value !== "") {
    const newTask = {
      text: input.value,
      isMarked: false
    };
    tasks.push(newTask);
    saveTasks();
    addTask(input.value, false);
    input.value = "";
  }
});

// Event listener to reset tasks
rest.addEventListener("click", () => {
  txt.innerHTML = "";
  tasks = [];
  saveTasks();
});
