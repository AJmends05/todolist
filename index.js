const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a new task
function addTask() {
  if (inputBox.value.trim() === '') {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.textContent = inputBox.value;

    // Create delete button
    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "\u00d7"; // × symbol
    deleteBtn.classList.add("delete");
    li.appendChild(deleteBtn);

    // Create edit button
    let editBtn = document.createElement("span");
    editBtn.innerHTML = "\u270E"; // ✎ symbol
    editBtn.classList.add("edit");
    li.appendChild(editBtn);

    listContainer.appendChild(li);
  }

  inputBox.value = ""; // Clear the input box
  saveData();
}

// Event listener for clicks on the task list
listContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    saveData();
  } else if (e.target.classList.contains("edit")) {
    const li = e.target.parentElement;
    const currentText = li.firstChild.textContent.trim();
    const newText = prompt("Edit your task:", currentText);
    if (newText !== null && newText.trim() !== "") {
      li.firstChild.textContent = newText;
      saveData();
    }
  } else if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  }
}, false);

// Function to clear all tasks
function clearTasks() {
  listContainer.innerHTML = "";
  saveData();
}

// Function to save tasks to local storage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Function to show tasks from local storage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
}

// Load tasks on page load
showTask();

// Attach clear button functionality
const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", clearTasks)