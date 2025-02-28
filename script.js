const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const deleteSelectedButton = document.getElementById('delete-selected');

let todos = [];

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('todo-item');
    listItem.innerHTML = `
      <input type="checkbox" class="todo-checkbox" data-index="${index}">
      <span>${todo.name} (${todo.duration} minutes)</span>
      <button class="delete-button" data-index="${index}">Delete</button>
    `;
    todoList.appendChild(listItem);
  });
  if (todos.length > 0) {
    deleteSelectedButton.style.display = "block";
  } else {
    deleteSelectedButton.style.display = "none";
  }
}

function addTodo(name, duration) {
  todos.push({ name, duration });
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function deleteSelectedTodos() {
  const checkboxes = document.querySelectorAll('.todo-checkbox:checked');
  const indicesToDelete = Array.from(checkboxes).map(checkbox => parseInt(checkbox.dataset.index)).sort((a, b) => b - a); //Sort in descending order to avoid index issues.

  indicesToDelete.forEach(index => {
    todos.splice(index, 1);
  });
  renderTodos();
}

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('event-name').value;
  const duration = parseInt(document.getElementById('duration').value);
  addTodo(name, duration);
  document.getElementById('event-name').value = '';
  document.getElementById('duration').value = '';
});

todoList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-button')) {
    const index = parseInt(event.target.dataset.index);
    deleteTodo(index);
  }
});

deleteSelectedButton.addEventListener('click', deleteSelectedTodos);

renderTodos();