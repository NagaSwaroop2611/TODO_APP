// JS Code of Todo App
const todoInput = document.getElementById('todo-input');
const todoTime = document.getElementById('todo-time');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const deleteSelectedButton = document.getElementById('delete-selected');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('todo-item');
    listItem.innerHTML = `
                <input type="checkbox" data-index="${index}">
                <span>${todo.text} - ${new Date(todo.time).toLocaleString()}</span>
                <button data-index="${index}">Delete</button>
            `;
    todoList.appendChild(listItem);

    const deleteButton = listItem.querySelector('button');
    deleteButton.addEventListener('click', () => {
      deleteTodo(index);
    });

    const checkbox = listItem.querySelector('input[type="checkbox"]');
  });
}

function addTodo() {
  const text = todoInput.value.trim();
  const time = new Date(todoTime.value).getTime();

  if (text && time) {
    todos.push({ text, time });
    localStorage.setItem('todos', JSON.stringify(todos));
    todoInput.value = '';
    todoTime.value = '';
    renderTodos();
    scheduleRemoval(todos.length - 1);
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

function scheduleRemoval(index) {
  const todo = todos[index];
  const now = Date.now();
  const timeDiff = todo.time - now;

  if (timeDiff > 0) {
    setTimeout(() => {
      const listItem = todoList.children[index];
      if (listItem) {
        listItem.classList.add('fade-out');
        setTimeout(() => {
          deleteTodo(index);
        }, 300);
      }
    }, timeDiff);
  } else {
    deleteTodo(index);
  }
}

function deleteSelected() {
  const checkboxes = document.querySelectorAll('#todo-list input[type="checkbox"]:checked');
  const indicesToDelete = Array.from(checkboxes).map(cb => parseInt(cb.dataset.index)).sort((a, b) => b - a);

  indicesToDelete.forEach(index => {
    deleteTodo(index);
  });
}

addTodoButton.addEventListener('click', addTodo);
deleteSelectedButton.addEventListener('click', deleteSelected);

todos.forEach((todo, index) => {
  scheduleRemoval(index);
});

renderTodos();