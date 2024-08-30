import "./styles.css";
import { store, addTodo, toggleTodo, removeTodo, RootState } from './store';
import Logo from "./images/codigotipado_logo.png";

const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;
const logoImg = document.getElementById("logoImg") as HTMLImageElement;

// Set the src attribute of the logo image
logoImg.src = Logo;

function addTask(): void {
  const taskText = taskInput.value.trim();
  if (taskText) {
      store.dispatch(addTodo(taskText));
      taskInput.value = '';
      renderTodos();
  }
}

function toggleTask(id: number): void {
  store.dispatch(toggleTodo(id));
  renderTodos();
}

function deleteTask(id: number): void {
  store.dispatch(removeTodo(id));
  renderTodos();
}

function renderTodos(): void {
  const state = store.getState() as RootState;
  taskList.innerHTML = '';
  state.todos.todos.forEach((todo) => {
      const li = document.createElement('li');
      li.className = 'task-item';
      li.innerHTML = `
          <div class="task-content">
              <input type="checkbox" ${todo.completed ? 'checked' : ''} class="task-checkbox">
              <span class="task-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
          </div>
          <button class="task-delete">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
          </button>
      `;
      const checkbox = li.querySelector('input') as HTMLInputElement;
      checkbox.addEventListener('change', () => toggleTask(todo.id));
      const deleteButton = li.querySelector('.task-delete') as HTMLButtonElement;
      deleteButton.addEventListener('click', () => deleteTask(todo.id));
      taskList.appendChild(li);
  });
}

// Initialize the UI
renderTodos();

// Subscribe to store changes
store.subscribe(renderTodos);

// Event listeners
document.getElementById('addTaskButton')?.addEventListener('click', addTask);
taskInput.addEventListener('keyup', (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
      addTask();
  }
});

// Export for global access (if needed)
(window as any).addTask = addTask;