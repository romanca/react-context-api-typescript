
export const initialTodoState = {
	loading: false,
	data: [] as Todo[],
};

export type TTodoState = typeof initialTodoState

export const todoActions = {
  fetchTodosStart: () => ({ type: 'FETCH_TODOS_START' }) as const,
  fetchTodosFinnish: (payload: Todo[]) => ({ type: 'FETCH_TODOS_FINNISH', payload }) as const,
  addTodo: (payload: Todo) => ({ type: 'ADD_TODO', payload }) as const,
  removeTodo: (payload: number) => ({ type: 'REMOVE_TODO', payload }) as const,
  editTodo: (id: number, payload: Partial<Todo>) => ({ type: 'EDIT_TODO', payload, id }) as const,
  completeTodo: (id: number, payload: Partial<Todo>) => ({type: "COMPLETE_TODO", payload, id}) as const,
}

export type TTodoAction = ReturnType<typeof todoActions[keyof typeof todoActions]>

export function todoReducer(state: TTodoState, action: TTodoAction) {
  const temp = () => {
    switch (action.type) {
      case 'FETCH_TODOS_START':
        return {
          ...state,
          loading: true,
        }
      case 'FETCH_TODOS_FINNISH':
        return {
          ...state,
          loading: false,
          data: action.payload
        }
        
      case 'ADD_TODO':
        return {
          ...state,
          data: [...state.data, action.payload]
        }
      case 'REMOVE_TODO':
        return {
          ...state,
          data: state.data.filter(i => i.id !== action.payload)
        }
      case 'EDIT_TODO':
        return {
          ...state,
          data: state.data.map(i => {
            if (i.id === action.id) {
              return {
                ...i,
                ...action.payload
              }
            }
            return i
          })
        }
        case "COMPLETE_TODO": 
          return{
          ...state,
          data: state.data.map(i => {
            if (i.id === action.id) {
              return{
                ...i,
                ...action.payload
              }
            }
            return i
          })
        }
      default:
        return state
    }
  }

  const newState = temp()
  return newState

}