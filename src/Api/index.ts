import { getLsItem, updateLsItem } from '../shared/localStorage';



const TODOS_LS_KEY = 'TODOS_LS_KEY'
const LABELS_LS_KEY = 'LABELS_LS_KEY'

export function getTodos(): Promise<Todo[]> {
    const todos = getLsItem(TODOS_LS_KEY, [])
    return Promise.resolve(todos)
}

export function getLabels(): Promise<Label[]> {
    const labels = getLsItem(LABELS_LS_KEY, [])
    return Promise.resolve(labels)
}

export function createLabel(label:Omit<Label, 'id'>): Promise<Label> {
    const newLabel = {
        ...label,
        id: Date.now()
    }
    updateLsItem(LABELS_LS_KEY, current => {
        return [...current, newLabel]
    }, [])
    return Promise.resolve(newLabel)
}

export function removeLabel(id: number): Promise<number> {
    updateLsItem(LABELS_LS_KEY, current => {
       return current.filter((label: Label) => label.id !== id)
    }, [])
    return Promise.resolve(id)
}
 
export function editLabel(label:Label): Promise<Label> {
   updateLsItem(LABELS_LS_KEY, (current) => {
       return current.map((i: Label) => i.id === label.id ? label : i)
   }, [])
    return Promise.resolve(label)
}
 
 
export function createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const newTodo = {
        ...todo,
        id: Date.now(),
        complete: false,
    }
    updateLsItem(TODOS_LS_KEY, (current) => {
            return [...current, newTodo]
    }, [])
    return Promise.resolve(newTodo)
}

export function removeTodo(id: number): Promise<number> {
    updateLsItem(TODOS_LS_KEY, current => {
        return   current.filter((todo: Todo) => todo.id !== id)
    }, [])
    return Promise.resolve(id)
}
 
export function editTodo(todo: Todo): Promise<Todo> {

    updateLsItem(TODOS_LS_KEY, (current) => {
        return current.map((i: Todo) => i.id === todo.id ? todo : i)
    }, [])
    return Promise.resolve(todo)
}

export function completeTodo(selectedTodo: Todo): Promise<Todo> {
  updateLsItem(TODOS_LS_KEY, current => {
      return current.map((todo: Todo) => {
        if (todo.id === selectedTodo.id) {
            return {
                ...todo,
                complete: !todo.complete,
            };
        }
        return todo;
    })
  }, [])
  return Promise.resolve(selectedTodo)
}


 