export interface Action {
  type: string;
  payload?: any;
}

export interface AppItem {
  text: string;
  id: number;
  completed: boolean;
}

export interface AppState {
  todos: AppItem[];
}

export const initialState: AppState = {
  todos: [
    {
      text: `Item: ${Date.now().toString()}`,
      id: 0,
      completed: true,
    },
    {
      text: `Item: ${Date.now().toString()}`,
      id: 1,
      completed: false,
    },
  ],
};

let _state: AppState = initialState;

export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [
          {
            id:
              state.todos.length > 0
                ? Math.max(...state.todos.map((todo) => todo.id)) + 1
                : 0,
            text: action.payload,
            completed: true,
          },
          ...state.todos,
        ],
      };
    case REMOVE_TODO:
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case TOGGLE_TODO:
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    default:
      return state;
  }
}

export function dispatch(action: Action): void {
  _state = reducer(_state, action);
}

export function getState(): AppState {
  return _state;
}
