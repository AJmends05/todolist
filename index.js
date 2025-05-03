const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const toggleButton = document.getElementById("toggle-dark-mode");
const clearButton = document.getElementById("clear-button");

// Function to create and return an edit and delete button
function createActionButtons(li) {
  const deleteBtn = document.createElement("span");
  deleteBtn.innerHTML = "\u00d7"; // × symbol
  deleteBtn.classList.add("delete");

  const editBtn = document.createElement("span");
  editBtn.innerHTML = "\u270E"; // ✎ symbol
  editBtn.classList.add("edit");

  li.appendChild(deleteBtn);
  li.appendChild(editBtn);
}

// Function to add a new task
function addTask() {
  if (inputBox.value.trim() === '') {
    alert("You must write something!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = inputBox.value;
  createActionButtons(li);
  listContainer.appendChild(li);
  inputBox.value = "";
  saveData();
}

// Event listener for clicks on the task list
listContainer.addEventListener("click", function (e) {
  const target = e.target;

  if (target.classList.contains("delete")) {
    const li = target.parentElement;
    li.classList.add("fade-out");

    // Wait for animation to finish before removing
    li.addEventListener("animationend", () => {
      li.remove();
      saveData();
    });

  } else if (target.classList.contains("edit")) {
    const li = target.parentElement;
    const currentText = li.firstChild.textContent.trim();

    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.classList.add("edit-input");

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.classList.add("save-btn");

    li.innerHTML = ""; // Clear existing content
    li.appendChild(input);
    li.appendChild(saveBtn);

    saveBtn.addEventListener("click", () => {
      if (input.value.trim() !== "") {
        li.textContent = input.value;
        createActionButtons(li);
        saveData();
      }
    });

  } else if (target.tagName === "LI") {
    target.classList.toggle("checked");
    saveData();
  }
});

// Clear all tasks
function clearTasks() {
  listContainer.innerHTML = "";
  saveData();
}

// Save tasks to local storage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Load tasks from local storage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
}

// Load tasks on page load
showTask();

// Clear button functionality
clearButton.addEventListener("click", clearTasks);

// Dark mode toggle
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  // Change icon based on dark mode
  if (document.body.classList.contains("dark-mode")) {
    toggleButton.textContent = "☀️"; // Switch to light mode icon
  } else {
    toggleButton.textContent = "🌙"; // Switch to dark mode icon
  }
});