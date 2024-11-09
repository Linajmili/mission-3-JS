let inputBox = document.getElementById("input-box");
let listContainer = document.getElementById("list-container");

// Array to store tasks
let arrayOfTasks = [];

// Load tasks from localStorage if any
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocalStorage();

// Add Task Function
function addTask() {
  if (inputBox.value.trim() !== "") {
    addTaskToArray(inputBox.value); // Add Task to Array
    inputBox.value = ""; // Clear input field
  }
}

// Event Listener for Task Completion and Deletion
listContainer.addEventListener("click", function (e) {
  // Delete Button
  if (e.target.classList.contains("remove-btn")) {
    const taskId = e.target.parentElement.getAttribute("data-id");
    deleteTaskWith(taskId);
    e.target.parentElement.remove();
  }
  // Check Button for Task Completion
  if (e.target.classList.contains("check-btn")) {
    const taskId = e.target.parentElement.getAttribute("data-id");
    toggleStatusTaskWith(taskId);
    e.target.parentElement.classList.toggle("completed");
    e.target.classList.toggle("checked");
  }
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  addElementsToPageFrom(arrayOfTasks);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  listContainer.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let li = document.createElement("li");
    li.className = "task";
    li.setAttribute("data-id", task.id);
    if (task.completed) {
      li.classList.add("completed");
    }

    let checkBtn = document.createElement("span");
    checkBtn.className = "check-btn";
    if (task.completed) {
      checkBtn.classList.add("checked");
    }

    let taskTitle = document.createElement("span");
    taskTitle.textContent = task.title;

    let removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "Delete";

    li.appendChild(checkBtn);
    li.appendChild(taskTitle);
    li.appendChild(removeBtn);

    listContainer.appendChild(li);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  arrayOfTasks.forEach((task) => {
    if (task.id == taskId) {
      task.completed = !task.completed;
    }
  });
  addDataToLocalStorageFrom(arrayOfTasks);
}
