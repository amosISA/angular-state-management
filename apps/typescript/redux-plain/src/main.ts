import {
  ADD_TODO,
  AppItem,
  dispatch,
  getState,
  REMOVE_TODO,
  TOGGLE_TODO,
} from "./store";
import "./styles.css";

const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

function addTask(): void {
  const taskText = taskInput.value.trim();
  if (taskText) {
    dispatch({ type: ADD_TODO, payload: taskText });
    renderTodos();
    taskInput.value = "";
  }
}


function toggleTask(id: number): void {
  dispatch({ type: TOGGLE_TODO, payload: id });
  renderTodos();
}

function deleteTask(id: number): void {
  dispatch({ type: REMOVE_TODO, payload: id });
  renderTodos();
}

function renderTodos(): void {
  const state = getState();
  taskList.innerHTML = '';
  state.todos.forEach((todo: AppItem) => {
      const li = document.createElement('li');
      li.className = 'task-item';
      li.innerHTML = `
        <div class="flex items-center justify-center">
            <input type="checkbox" ${todo.completed ? 'checked' : ''} class="task-checkbox">
            <span class="task-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
        </div>
        <button class="task-delete">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
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

// Event listeners
document.getElementById('addTaskButton')?.addEventListener('click', addTask);
taskInput.addEventListener('keyup', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Export for global access (if needed)
(window as any).addTask = addTask;
(window as any).renderTodos = renderTodos;
