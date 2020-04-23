//selectors
const todoInput = document.querySelector(".to-do-input");
const todoButton = document.querySelector(".to-do-button");
const todoList = document.querySelector(".to-do-lists");
const filterOption = document.querySelector(".filter-to-do");

//event listeners

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deletecheck);
filterOption.addEventListener("click", filtertodolist);

//functions
function addToDo(event) {
  event.preventDefault();
  //to do Div
  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add("todo");

  //create li
  const newToDo = document.createElement("li");
  newToDo.innerText = todoInput.value;
  newToDo.classList.add("to-do-item");
  toDoDiv.appendChild(newToDo);

  //local storage
  saveLocalTodo(todoInput.value);
  //check button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = "<i class='fas fa-check'></i>";
  completeButton.classList.add("completed-button");
  toDoDiv.appendChild(completeButton);

  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-button");
  toDoDiv.appendChild(trashButton);
  //append to list
  todoList.appendChild(toDoDiv);
  //clear todo value
  todoInput.value = "";
}

function deletecheck(e) {
  const item = e.target;
  //delete to do
  if (item.classList[0] === "trash-button") {
    const todo = item.parentElement;
    //animation
    todo.classList.add("remove-effect");
    removeLocalToDos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //check mark
  if (item.classList[0] === "completed-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filtertodolist(e) {
  const todonew = todoList.childNodes;
  todonew.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodo(todo) {
  //check
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");

    //create li
    const newToDo = document.createElement("li");
    newToDo.innerText = todo;
    newToDo.classList.add("to-do-item");
    toDoDiv.appendChild(newToDo);

    //check button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = "<i class='fas fa-check'></i>";
    completeButton.classList.add("completed-button");
    toDoDiv.appendChild(completeButton);

    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-button");
    toDoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(toDoDiv);
  });
}

function removeLocalToDos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function animatedForm() {
  const arrows = document.querySelectorAll("fa-arrow-right");

  arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      const input = arrow.previousElementSiblings;
      const parent = arrow.parentElement;
      const nextForm = parent.nextElementSibling;

      //check validation
      if (input.type === "text" && validateUser(input)) {
        console.log("everything is ok");
      }
    });
  });
}
function validateUser(user) {
  if (user.value.length < 6) {
    console.log("Not long enough, minimum of 6");
  }
}
function error(color) {
  document.body.style.backgroundColor = color;
}
