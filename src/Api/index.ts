import { getLsItem, updateLsItem } from '../shared/localStorage';



const TODOS_LS_KEY = 'TODOS_LS_KEY'

export function getTodos(): Promise<Todo[]> {
    const todos = getLsItem(TODOS_LS_KEY, [])
    return Promise.resolve(todos)
}

export function createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const newTodo = {
        ...todo,
        id: Date.now()
    }
    updateLsItem(TODOS_LS_KEY, (current) => {
            return [...current, newTodo]
    }, [])
    return Promise.resolve(newTodo)
}

export function editTodo(todo: Todo): Promise<Todo> {

    updateLsItem(TODOS_LS_KEY, (current) => {
        return current.map((i: Todo) => i.id === todo.id ? todo : i)
    }, [])
    return Promise.resolve(todo)
}